import React, { Suspense } from 'react'
import { createRoute } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'

import { LandingLayout } from '../layout/layout'
import { Error404 } from '../../error404/error404'
import { createNotFoundRedirect } from '../../helpers/NotFoundRedirect'
import { routes } from './routes'

export const landingRouter = (parentRoute: AnyRoute)  => {

	const landingLayoutRoute = createRoute({
		getParentRoute: () => parentRoute,
		id: 'landing',
		component: LandingLayout,
		errorComponent: Error404,
		notFoundComponent: createNotFoundRedirect('/home'),
	})

	const childRoutes = routes.map((route) => {

		const { path, metaData } = route

		const Component = route.component as React.ComponentType<any>

		const loader = 'loader' in route ? route.loader : undefined

		return createRoute({
			getParentRoute: () => landingLayoutRoute,
			path: path,
			component: () => (
				<Suspense fallback={<div>Loading…</div>}>
					<Component metaData={metaData} />
				</Suspense>
			),
			...(loader ? { loader } : {}),
			errorComponent: Error404,
		})
	})

	return landingLayoutRoute.addChildren(childRoutes)
}
