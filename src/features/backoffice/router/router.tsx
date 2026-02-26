import React, { Suspense } from 'react'
import { createRoute, redirect } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'

import { BackofficeLayout } from '../layout/backofficeLayout'
import { Error404 } from '../../error404/error404'
import { backofficeGuard } from '../../../shared/guard/backofficeGuard'
import { createNotFoundRedirect } from '../../../shared/helpers/NotFoundRedirect'
import { ROUTES } from '../../../shared/constants/routes'
import { routes } from './routes'
import { adminRouter } from '../admin/router/router'

export const backofficeRouter = (parentRoute: AnyRoute) => {

	const backofficeLayoutRoute = createRoute({
		getParentRoute: () => parentRoute,
		path: ROUTES.backoffice.backoffice.path,
		component: BackofficeLayout,
		beforeLoad: backofficeGuard,
		errorComponent: Error404,
		notFoundComponent: createNotFoundRedirect(ROUTES.backoffice.dashboard.fullPath),
	})

	const dashboardIndexRoute = createRoute({
		getParentRoute: () => backofficeLayoutRoute,
		path: '/',
		beforeLoad: () => { throw redirect({ to: ROUTES.backoffice.dashboard.fullPath }) },
	})

	const childRoutes = routes.map(({ path, component, metadata }) => {

		const Component = component as React.ComponentType<any>

		return createRoute({
			getParentRoute: () => backofficeLayoutRoute,
			path: path,
			component: () => (
				<Suspense fallback={<div>Loading…</div>}>
					<Component metaData={metadata} />
				</Suspense>
			),
			errorComponent: Error404,
		})
	})

	return backofficeLayoutRoute.addChildren([
		dashboardIndexRoute,
		...childRoutes,
		adminRouter(backofficeLayoutRoute),
	])
}
