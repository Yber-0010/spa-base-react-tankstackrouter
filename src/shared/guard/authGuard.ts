import { redirect } from '@tanstack/react-router'
import { checkAuthenticated } from '../hooks/useCheckAuthenticated'
import { ROUTES } from '../constants/routes'

export const authGuard = () => {

	const isAuth = checkAuthenticated()
	
	if (isAuth) {
		throw redirect({ to: ROUTES.backoffice.dashboard.fullPath })
	}
}
