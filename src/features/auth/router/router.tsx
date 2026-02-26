import React, { Suspense } from 'react'
import { createRoute } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'

import { AuthLayout } from '../layout/authLayout'
import { Error404 } from '../../error404/error404'
import { authGuard } from '../../../shared/guard/authGuard'
import { createNotFoundRedirect } from '../../../shared/helpers/NotFoundRedirect'
import { routes } from './routes'
import { ROUTES } from '../../../shared/constants/routes'

export const authRouter = (parentRoute: AnyRoute) => {

	const authLayoutRoute = createRoute({
		getParentRoute: () => parentRoute,
		id: 'auth',
		component: AuthLayout,
		beforeLoad: authGuard,
		errorComponent: Error404,
		notFoundComponent: createNotFoundRedirect(ROUTES.auth.login.fullPath),
	})

	const childRoutes = routes.map(({ path, component, metadata }) => {
		
		const Component = component as React.ComponentType<any>

		return createRoute({
			getParentRoute: () => authLayoutRoute,
			path: path,
			component: () => (
				<Suspense fallback={<div>Loading…</div>}>
					<Component metaData={metadata} />
				</Suspense>
			),
			errorComponent: Error404,
		})
	})

	return authLayoutRoute.addChildren(childRoutes)
}
