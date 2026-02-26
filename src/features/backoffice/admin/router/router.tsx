import React, { Suspense } from 'react'
import { createRoute, redirect } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'

import { AdminLayout } from '../layout/adminLayout'
import { Error404 } from '../../../error404/error404'
import { createNotFoundRedirect } from '../../../../shared/helpers/NotFoundRedirect'
import { ROUTES } from '../../../../shared/constants/routes'
import { routes } from './routes'

/**
 * Recibe el backofficeLayoutRoute como padre (NO el rootRoute).
 * Se llama desde backofficeRouter:
 *   adminRouter(backofficeLayoutRoute)
 *
 * Árbol resultante:
 *   /backoffice                  ← backofficeLayoutRoute
 *     /backoffice/admin          ← adminLayoutRoute  (este router)
 *       /backoffice/admin/users
 *       /backoffice/admin/roles
 *       /backoffice/admin/permissions
 */
export const adminRouter = (parentRoute: AnyRoute) => {

	const adminLayoutRoute = createRoute({
		getParentRoute: () => parentRoute,
		path: ROUTES.admin.root.path,
		component: AdminLayout,
		errorComponent: Error404,
		notFoundComponent: createNotFoundRedirect(ROUTES.admin.users.fullPath),
	})

	const adminIndexRoute = createRoute({
		getParentRoute: () => adminLayoutRoute,
		path: '/',
		beforeLoad: () => { throw redirect({ to: ROUTES.admin.users.fullPath }) },
	})

	const childRoutes = routes.map(({ path, component, metadata }) => {

		const Component = component as React.ComponentType<any>

		return createRoute({
			getParentRoute: () => adminLayoutRoute,
			path: path,
			component: () => (
				<Suspense fallback={<div>Loading…</div>}>
					<Component metaData={metadata} />
				</Suspense>
			),
			errorComponent: Error404,
		})
	})

	return adminLayoutRoute.addChildren([adminIndexRoute, ...childRoutes])
}
