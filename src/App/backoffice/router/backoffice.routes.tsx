import React, { Suspense } from 'react'
import { createRoute, redirect } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'

import { BackofficeLayout } from '../layout/backofficeLayout'
import { Error404 } from '../../error404/error404'
import { backofficeGuard } from '../../guard/backofficeGuard'
import { createNotFoundRedirect } from '../../helpers/NotFoundRedirect'
import { routes } from './routes'

export const backofficeRouter = (parentRoute: AnyRoute) => {

	const backofficeLayoutRoute = createRoute({
		getParentRoute: () => parentRoute,
		path: '/dashboard',
		component: BackofficeLayout,
		beforeLoad: backofficeGuard,
		errorComponent: Error404,
		notFoundComponent: createNotFoundRedirect('/dashboard/users'),
	})

	const dashboardIndexRoute = createRoute({
		getParentRoute: () => backofficeLayoutRoute,
		path: '/',
		beforeLoad: () => { throw redirect({ to: '/dashboard/users' }) },
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

	return backofficeLayoutRoute.addChildren([dashboardIndexRoute, ...childRoutes])
}
