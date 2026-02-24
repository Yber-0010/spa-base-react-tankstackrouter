# base-react-v2 — TanStack Router Edition

> Equivalente de **base-react** (React Router v7) reescrito con **@tanstack/react-router**.  
> La arquitectura de módulos, guards y separación de lógica es intencionalmente idéntica para poder comparar ambos routers en el mismo contexto.

---

## Índice

1. [File System](#file-system)
2. [Arquitectura de enrutamiento](#arquitectura-de-enrutamiento)
3. [Equivalencias base-react → base-react-v2](#equivalencias)
4. [Guards: de componentes a `beforeLoad`](#guards)
5. [Redirección y control de flujo](#redirección-y-control-de-flujo)
6. [Hash Router](#hash-router)
7. [Lazy loading y Suspense](#lazy-loading-y-suspense)
8. [Loader de datos](#loader-de-datos)
9. [Mejoras de TanStack Router](#mejoras-de-tanstack-router)
10. [Limitaciones y trade-offs](#limitaciones-y-trade-offs)
11. [Estructura de carpetas completa](#estructura-de-carpetas-completa)

---

## File System

### Convención de carpetas

| Carpeta | Propósito |
|---------|-----------|
| `src/App/` | **Páginas** de la aplicación, organizadas por sección |
| `src/App/helpers/` | Utilidades compartidas de componentes (ej. `NotFoundRedirect`) |
| `src/App/guard/` | Guards de ruta (lógica de protección) |
| `src/App/hooks/` | Hooks compartidos entre páginas |
| `src/features/` | Componentes internos específicos de cada sección |
| `src/router/` | Router principal y rutas de redirección base |
| `src/providers/` | Providers globales de contexto |
| `src/provider/` | Utilidades de datos: API, storage |

### Diferencia clave con base-react

| base-react | base-react-v2 |
|---|---|
| `src/app/pages/` | `src/App/` |
| `src/app/components/` | `src/features/` (componentes feature-scoped) |
| `src/app/guard/` | `src/App/guard/` |
| `src/app/hooks/` | `src/App/hooks/` |

La separación en `src/features/` sigue un **feature-sliced design** ligero: cada sección conoce solo sus propias partes internas y no las comparte globalmente.

---

## Arquitectura de enrutamiento

Cada sección sigue la misma estructura de carpetas:

```
src/App/<sección>/
├── <página>/
│   └── <página>.tsx            ← componente de página
├── layout/
│   └── <sección>Layout.tsx     ← layout de la sección
├── loaders/                    ← solo donde aplica (ej. landing/product)
│   └── productLoader.ts
└── router/
    ├── <sección>.metadata.ts   ← metadatos (title, etc.)
    ├── routes.ts               ← array de configuración de rutas
    └── <sección>.routes.tsx    ← factory function del router
```

Cada sección expone su factory a través de un barrel `index.ts`:

```ts
// src/App/landing/index.ts
export * from './router/landing.routes'
```

El router principal ensambla el árbol completo desde las factories:

```ts
// base-react (React Router)
const router = createBrowserRouter([
  baseRedirectRouter(baseRoute),
  landingRouter(),
  authRouter(),
  backofficeRouter(),
])

// base-react-v2 (TanStack Router)
const routeTree = rootRoute.addChildren([
  ...baseRedirectRouter(baseRoute, rootRoute),
  landingRouter(rootRoute),
  authRouter(rootRoute),
  backofficeRouter(rootRoute),
])
```

La diferencia es que cada factory **recibe `rootRoute` como parámetro**, porque TanStack exige `getParentRoute` con una referencia al padre en tiempo de compilación.

---

## Equivalencias

### Router principal

| base-react | base-react-v2 |
|---|---|
| `createBrowserRouter([...])` | `createRootRoute()` + `.addChildren([...])` + `createRouter({ routeTree })` |
| `RouterProvider` | `RouterProvider` (misma API) |
| `errorElement: <Error404 />` | `errorComponent: Error404` |
| `basename: basePath` | `basepath` en `createRouter({ routeTree, basepath })` |

### Rutas de sección

| base-react | base-react-v2 |
|---|---|
| Objeto plano `{ element, children }` | `createRoute(...)` con `.addChildren()` |
| `element: <LandingLayout />` | `component: LandingLayout` |
| `path: '/product/:id'` | `path: '/product/$id'` (`$` en lugar de `:`) |
| `loader: productLoader` | `loader: productLoader` (misma posición) |

### Navegación desde componentes

| base-react | base-react-v2 |
|---|---|
| `navigate('/path')` | `navigate({ to: '/path' })` |
| `<Link to="/path">` | `<Link to="/path">` (misma API) |
| `useNavigation().state` | `useRouterState().status` |
| `useLoaderData()` | `useLoaderData({ strict: false })` |

---

## Guards

### base-react — componente wrapper

```jsx
export const AuthGuard = ({ children }) => {
  const auth = useCheckAuthenticated() // hook de React
  const location = useLocation()
  if (auth) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />
  }
  return children
}

// En auth.routes.jsx — envuelve el layout:
element: <AuthGuard><AuthLayout /></AuthGuard>
```

### base-react-v2 — `beforeLoad`

```ts
// authGuard.ts — función pura, sin JSX
export const authGuard = () => {
  const isAuth = checkAuthenticated() // utilidad directa, sin hooks
  if (isAuth) {
    throw redirect({ to: '/dashboard/users' })
  }
}

// En auth.routes.tsx — declarado en la ruta:
const authLayoutRoute = createRoute({
  component: AuthLayout,
  beforeLoad: authGuard,
})
```

`beforeLoad` se ejecuta **antes del render**, por lo que no hay flash de contenido protegido.

`checkAuthenticated()` es la versión sin hooks de `useCheckAuthenticated()`, necesaria porque `beforeLoad` no es un componente de React y no puede usar hooks.

| Guard | base-react | base-react-v2 |
|---|---|---|
| Si autenticado → redirige a dashboard | `<AuthGuard>` wrapper | `beforeLoad: authGuard` |
| Si no autenticado → redirige a /auth | `<BackofficeGuard>` wrapper | `beforeLoad: backofficeGuard` |

---

## Redirección y control de flujo

### El problema: rutas `*` no funcionan en TanStack

TanStack Router tiene un sistema propio de "not found" que tiene **prioridad sobre el matching de rutas `*`**. Agregar `{ path: '*', beforeLoad: redirect }` no funciona — TanStack lo bypasea y dispara `notFoundComponent` directamente.

### Solución: `notFoundComponent` + `createNotFoundRedirect`

Se creó el helper `src/App/helpers/NotFoundRedirect.tsx`:

```tsx
export const createNotFoundRedirect = (to: string) => {
  const NotFoundRedirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
      navigate({ to, replace: true }) // replace: no queda en el historial
    }, [navigate])
    return null
  }
  return NotFoundRedirect
}
```

Se conecta como `notFoundComponent` en cada ruta de layout y en el root:

```tsx
// Root — cualquier URL fuera de todos los módulos → /home
const rootRoute = createRootRoute({
  notFoundComponent: createNotFoundRedirect('/home'),
})

// Landing layout — /home/cualquiercosa → /home
const landingLayoutRoute = createRoute({
  notFoundComponent: createNotFoundRedirect('/home'),
})

// Auth layout — /auth/cualquiercosa → /auth
const authLayoutRoute = createRoute({
  notFoundComponent: createNotFoundRedirect('/auth'),
})

// Backoffice layout — /dashboard/cualquiercosa → /dashboard/users
const backofficeLayoutRoute = createRoute({
  notFoundComponent: createNotFoundRedirect('/dashboard/users'),
})
```

### Comportamiento resultante

| URL ingresada | `notFoundComponent` que dispara | URL final |
|---|---|---|
| `/otracosa` | Root | `/home` ✅ |
| `/home/otracosa` | Landing layout | `/home` ✅ |
| `/auth/otracosa` | Auth layout | `/auth` ✅ |
| `/dashboard/otracosa` | Backoffice layout | `/dashboard/users` ✅ |
| `/` | Index redirect (`beforeLoad`) | `/home` ✅ |
| `/dashboard` | Index redirect (`beforeLoad`) | `/dashboard/users` ✅ |

La URL **sí cambia** en todos los casos porque `navigate({ to, replace: true })` ejecuta una navegación real.

### Diferencia con `errorComponent`

| Hook | Cambia URL | Cuándo se dispara |
|---|---|---|
| `notFoundComponent` | ✅ (con `navigate`) | Ninguna ruta hija coincide |
| `errorComponent` | ❌ | Se lanzó un error/excepción en la ruta |

---

## Hash Router

Para despliegues en rutas que no controlas (GitHub Pages, subdirectorios, etc.) TanStack Router tiene `createHashHistory`, equivalente al `createHashRouter` de React Router.

Está preparado como comentario en `tankStackRouter.tsx`:

```ts
import { createHashHistory, createRouter } from '@tanstack/react-router'

// Activar para rutas tipo /#/home en lugar de /home
// const hashHistory = createHashHistory()
// const router = createRouter({ routeTree, history: hashHistory })

// Por defecto usa browser history:
const router = createRouter({ routeTree })
```

Solo hay que descomentar las dos líneas y comentar la última para pasar de `/home` a `/#/home`.

---

## Lazy loading y Suspense

### base-react

```jsx
const AuthLayout = lazy(async () => await import('../layout/authLayout'))

element: (
  <Suspense fallback={<Loading />}>
    <Component metaData={metadata} />
  </Suspense>
)
```

### base-react-v2

```tsx
const Login = lazy(() => import('../login/login'))

component: () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Component metaData={metadata} />
  </Suspense>
)
```

El patrón es idéntico. TanStack también acepta `component: lazy(...)` directamente y gestiona Suspense internamente, pero el wrapper explícito mantiene consistencia con base-react.

---

## Loader de datos

### base-react

```js
export const productLoader = ({ params }) => {
  if (params.id === '2') throw new Response('', { status: 404 })
  return { params }
}
// Componente:
const { params } = useLoaderData()
```

### base-react-v2

```ts
export const productLoader = ({ params }: { params: Record<string, string> }) => {
  if (params.id === '2') throw new Response('Not Found', { status: 404 })
  return { params }
}
// Componente:
const loaderData = useLoaderData({ strict: false })
```

La API es prácticamente idéntica. `strict: false` evita errores de inferencia cuando el componente puede montarse desde múltiples rutas.

---

## Mejoras de TanStack Router

### 1. Tipado end-to-end de rutas

Con file-based routing (o tipando el árbol completo) TypeScript conoce todos los paths, params y search params:

```tsx
<Link to="/product/$id" params={{ id: '1' }} />
// TS valida que $id existe y params.id es string
```

### 2. Guards nativos con `beforeLoad`

Función pura, testeable sin JSX, imposible de olvidar porque está declarada en la ruta.

### 3. Search params tipados

```tsx
const route = createRoute({
  validateSearch: (search) => z.object({ page: z.number() }).parse(search)
})
```

React Router no tiene esto nativo.

### 4. DevTools integrados

`TanStackRouterDevtools` muestra en tiempo real el árbol de rutas, la ruta activa, loader data y estado `pending/resolved`.

### 5. Contexto tipado para loaders y guards

```tsx
const router = createRouter({ routeTree, context: { auth, queryClient } })
// Disponible en beforeLoad, loader de cualquier ruta
```

### 6. Invalidación de loaders

```tsx
router.invalidate() // recarga todos los loaders activos sin recargar la página
```

### 7. Prefetching con `<Link>`

```tsx
<Link to="/product/$id" params={{ id: '1' }} preload="intent">
// Precarga el loader cuando el cursor pasa sobre el enlace
```

---

## Limitaciones y trade-offs

| Aspecto | Detalle |
|---|---|
| `getParentRoute` obligatorio | React Router acepta objetos planos anidados. TanStack requiere pasar el padre como referencia, lo que obliga a pasar `parentRoute` a cada factory. |
| `createFileRoute` descartado | El método oficial para rutas modulares de TanStack genera `routeTree.gen.ts` automáticamente. Se descartó para mantener la misma arquitectura manual de base-react. |
| `AnyRoute` como tipo del padre | Usar `AnyRoute` en las factories sacrifica el tipado estricto de paths en `Link`/`navigate`. Es el trade-off inevitable del routing por código modular sin `createFileRoute`. |
| Rutas `*` no funcionan como en React Router | TanStack tiene su propio sistema `notFoundComponent` que bypasea el matching de wildcards. Hay que usar `createNotFoundRedirect` + `notFoundComponent` en cada layout. |
| `checkAuthenticated` vs hook | Los guards con `beforeLoad` no pueden usar hooks de React — requieren una función utilitaria pura que lea `localStorage` directamente. |

---

## Estructura de carpetas completa

```
src/
├── app.tsx
├── app.css
│
├── App/
│   ├── error404/
│   │   └── error404.tsx
│   ├── guard/
│   │   ├── authGuard.ts              ← beforeLoad: redirige si autenticado
│   │   └── backofficeGuard.ts        ← beforeLoad: redirige si no autenticado
│   ├── helpers/
│   │   └── NotFoundRedirect.tsx      ← factory de componente redirect para notFoundComponent
│   ├── hooks/
│   │   ├── useStorage.ts
│   │   └── useCheckAuthenticated.ts  ← hook (componentes) + utilidad pura (guards)
│   │
│   ├── landing/
│   │   ├── index.ts
│   │   ├── layout/layout.tsx
│   │   ├── home/home.tsx
│   │   ├── about/about.tsx
│   │   ├── contact/contact.tsx
│   │   ├── product/product.tsx
│   │   ├── loaders/productLoader.ts
│   │   └── router/
│   │       ├── landing.metadata.ts
│   │       ├── routes.ts
│   │       └── landing.routes.tsx    ← landingRouter(parentRoute)
│   │
│   ├── auth/
│   │   ├── index.ts
│   │   ├── layout/authLayout.tsx
│   │   ├── login/login.tsx
│   │   └── router/
│   │       ├── auth.metadata.ts
│   │       ├── routes.ts
│   │       └── auth.routes.tsx       ← authRouter(parentRoute) + authGuard
│   │
│   └── backoffice/
│       ├── index.ts
│       ├── layout/backofficeLayout.tsx
│       ├── users/users.tsx
│       ├── tickets/tickets.tsx
│       └── router/
│           ├── backoffice.metadata.ts
│           ├── routes.ts
│           └── backoffice.routes.tsx ← backofficeRouter(parentRoute) + backofficeGuard
│
├── features/
│   └── (componentes internos de cada sección)
│
├── providers/providers.tsx
├── provider/storage/keyStorage.ts
│
└── router/
    ├── baseRedirect.routes.tsx       ← index redirect / → /home
    └── tankStackRouter.tsx           ← rootRoute + routeTree + RouterProvider
```
