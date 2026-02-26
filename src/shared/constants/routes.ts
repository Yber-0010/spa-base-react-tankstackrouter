
export interface AppRoute {
	path: string
	fullPath: string
	name: string
	to?: (...args: string[]) => string
}

const LANDING_ROUTES = {
	home: {
		path: '/home',
		fullPath: '/home',
		name: 'Home',
	},
	product: {
		path: '/product/$id',
		fullPath: '/product/$id',
		name: 'Product',
		to: (id: string) => `/product/${id}`,
	},
	contact: {
		path: '/contact',
		fullPath: '/contact',
		name: 'Contact',
	},
	about: {
		path: '/about',
		fullPath: '/about',
		name: 'About',
	},
} as const satisfies Record<string, AppRoute>

const AUTH_ROUTES = {
	login: {
		path: '/login',
		fullPath: '/login',
		name: 'Login',
	},
} as const satisfies Record<string, AppRoute>

// El layout de backoffice usa path: '/backoffice'
// Los hijos usan paths relativos (sin /) tal como los espera TanStack Router
const BACKOFFICE_ROUTES = {
	backoffice: {
		path: '/backoffice',
		fullPath: '/backoffice',
		name: 'Backoffice',
	},
	dashboard: {
		path: 'dashboard',
		fullPath: '/backoffice/dashboard',
		name: 'Dashboard',
	},
	users: {
		path: 'users',
		fullPath: '/backoffice/users',
		name: 'Users',
	},
} as const satisfies Record<string, AppRoute>

// Sub-sección admin dentro de /backoffice
// El layout admin usa path: 'admin' (relativo a /backoffice → da /backoffice/admin)
// Sus hijos usan paths relativos a /backoffice/admin
const ADMIN_ROUTES = {
	root: {
		path: 'admin',
		fullPath: '/backoffice/admin',
		name: 'Admin',
	},
	users: {
		path: 'users',
		fullPath: '/backoffice/admin/users',
		name: 'Admin Users',
	},
	roles: {
		path: 'roles',
		fullPath: '/backoffice/admin/roles',
		name: 'Roles',
	},
	permissions: {
		path: 'permissions',
		fullPath: '/backoffice/admin/permissions',
		name: 'Permissions',
	},
} as const satisfies Record<string, AppRoute>

export const ROUTES = {
	landing:    LANDING_ROUTES,
	auth:       AUTH_ROUTES,
	backoffice: BACKOFFICE_ROUTES,
	admin:      ADMIN_ROUTES,
} as const

export const landingRouteList    = Object.values(LANDING_ROUTES)
export const authRouteList       = Object.values(AUTH_ROUTES)
// Excluye 'root' de la lista de hijos navegables del backoffice
export const backofficeRouteList = [BACKOFFICE_ROUTES.dashboard, BACKOFFICE_ROUTES.users]
// Excluye 'root' de la lista de hijos navegables del admin
export const adminRouteList      = [ADMIN_ROUTES.users, ADMIN_ROUTES.roles, ADMIN_ROUTES.permissions]

export const allRouteList: AppRoute[] = [
	...landingRouteList,
	...authRouteList,
	...backofficeRouteList,
	...adminRouteList,
]

// usage
// Navegar
// navigate({ to: ROUTES.landing.product.to('abc-123') })
// navigate({ to: ROUTES.landing.contact.path })


// Link
// <Link to={ROUTES.landing.product.to(product.id)}>Ver producto</Link>
// <Link to={ROUTES.landing.contact.path}>Contacto</Link>