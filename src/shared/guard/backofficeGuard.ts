import { redirect } from '@tanstack/react-router'
import { useCheckAuthenticated } from '../hooks/useCheckAuthenticated'
import { ROUTES } from '../constants/routes'

export const backofficeGuard = () => {

	const isAuth = useCheckAuthenticated()
	
	if (!isAuth) {
		throw redirect({ to: ROUTES.auth.login.fullPath })
	}
}
