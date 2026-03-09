import type { AnyRoute } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import type React from 'react';
import { Suspense } from 'react';
import { ROUTES } from '../../../shared/constants/routes';
import { createNotFoundRedirect } from '../../../shared/helpers/NotFoundRedirect';
import { Error404 } from '../../error404/error404';
import { LandingLayout } from '../layout/layout';
import { routes } from './routes';

export const landingRouter = (parentRoute: AnyRoute) => {
	const landingLayoutRoute = createRoute({
		getParentRoute: () => parentRoute,
		id: 'landing',
		component: LandingLayout,
		errorComponent: Error404,
		notFoundComponent: createNotFoundRedirect(ROUTES.landing.home.fullPath),
	});

	const childRoutes = routes.map((route) => {
		const { path, metaData } = route;

		const Component = route.component as React.ComponentType<any>;

		const loader = 'loader' in route ? route.loader : undefined;

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
		});
	});

	return landingLayoutRoute.addChildren(childRoutes);
};
