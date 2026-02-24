import { redirect } from '@tanstack/react-router'
import { checkAuthenticated } from '../hooks/useCheckAuthenticated'

/**
 * TanStack Router equivalent of <AuthGuard> in base-react.
 *
 * Mirrors logic: if the user IS already authenticated, redirect to
 * the dashboard so they cannot access the auth section again.
 *
 * Usage – attach as `beforeLoad` on the auth layout route:
 *   beforeLoad: authGuard
 */
export const authGuard = () => {
	const isAuth = checkAuthenticated()
	if (isAuth) {
		throw redirect({ to: '/dashboard/users' })
	}
}
