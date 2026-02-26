import { redirect } from '@tanstack/react-router'
import { checkAuthenticated } from '../hooks/useCheckAuthenticated'
import { ROUTES } from '../constants/routes'

export const backofficeGuard = () => {

	const isAuth = checkAuthenticated()
	
	if (!isAuth) {
		throw redirect({ to: ROUTES.auth.login.fullPath })
	}
}
