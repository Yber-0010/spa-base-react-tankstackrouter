import { redirect } from '@tanstack/react-router'
import { checkAuthenticated } from '../hooks/useCheckAuthenticated'

/**
 * TanStack Router equivalent of <BackofficeGuard> in base-react.
 *
 * Mirrors logic: if the user is NOT authenticated, redirect to /auth
 * so they cannot access protected backoffice pages.
 *
 * Usage – attach as `beforeLoad` on the backoffice layout route:
 *   beforeLoad: backofficeGuard
 */
export const backofficeGuard = () => {
	const isAuth = checkAuthenticated()
	if (!isAuth) {
		throw redirect({ to: '/auth' })
	}
}
