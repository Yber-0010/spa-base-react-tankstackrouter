import { Suspense } from 'react'
import { Outlet, RouterProvider, /* createHashHistory */ createRootRoute, createRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Error404 } from '../../features/error404/error404'
import { createNotFoundRedirect } from '../../shared/helpers/NotFoundRedirect'
import { baseRedirectRouter } from './baseRedirectRouter'
import { landingRouter } from '../../features/landing/router/router'
import { authRouter } from '../../features/auth/router/router'
import { backofficeRouter } from '../../features/backoffice/router/router'
import { ROUTES } from '../../shared/constants/routes'
import { env } from '../environments/environments'
import { parseStringToBool } from '../../shared/utils/parse'

const baseRoute = ROUTES.auth.login.fullPath

// para añadir # router
// const hashHistory = createHashHistory()

const rootRoute = createRootRoute({

	component: () => (
		<Suspense fallback={<div>Loading…</div>}>
			<Outlet />
		</Suspense>
	),
	errorComponent: Error404,

	notFoundComponent: createNotFoundRedirect(baseRoute),
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
			{parseStringToBool(env.VITE_TANKSTACK_ROUTER_TOOLS) && (
				<TanStackRouterDevtools
					router={router}
					initialIsOpen={false}
				/>
			)}
		</>
	)
}
