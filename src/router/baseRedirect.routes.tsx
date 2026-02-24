import { createRoute, redirect } from '@tanstack/react-router'
import type { AnyRoute } from '@tanstack/react-router'

export const baseRedirectRouter = (baseRoute: string, parentRoute: AnyRoute): AnyRoute[] => {

	const indexRedirectRoute = createRoute({
		getParentRoute: () => parentRoute,
		path: '/',
		beforeLoad: () => { throw redirect({ to: baseRoute }) },
	})

	return [indexRedirectRoute] as const
}
