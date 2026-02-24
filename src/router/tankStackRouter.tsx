import { Suspense } from 'react'
import { Outlet, RouterProvider, /* createHashHistory */ createRootRoute, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Error404 } from '../App/error404/error404'
import { createNotFoundRedirect } from '../App/helpers/NotFoundRedirect'
import { baseRedirectRouter } from './baseRedirect.routes'
import { landingRouter } from '../App/landing/router/landing.routes'
import { authRouter } from '../App/auth/router/auth.routes'
import { backofficeRouter } from '../App/backoffice/router/backoffice.routes'

const baseRoute = '/home'

// para añadir # router
// const hashHistory = createHashHistory()

const rootRoute = createRootRoute({

	component: () => (
		<Suspense fallback={<div>Loading…</div>}>
			<Outlet />
		</Suspense>
	),
	errorComponent: Error404,

	notFoundComponent: createNotFoundRedirect('/home'),
})

const routeTree = rootRoute.addChildren([
	...baseRedirectRouter(baseRoute, rootRoute),
	landingRouter(rootRoute),
	authRouter(rootRoute),
	backofficeRouter(rootRoute),
])

const router = createRouter({ routeTree })
// const router = createRouter({ routeTree, history: hashHistory })

export const TankStackRouter = () => {
	return (
		<>
			<RouterProvider router={router} />
			<TanStackRouterDevtools
				router={router}
				initialIsOpen={false}
			/>
		</>
	)
}
