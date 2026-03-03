import { redirect } from '@tanstack/react-router'
import { useCheckAuthenticated } from '../hooks/useCheckAuthenticated'
import { ROUTES } from '../constants/routes'

export const authGuard = () => {

	const isAuth = useCheckAuthenticated()
	
	if (isAuth) {
		throw redirect({ to: ROUTES.backoffice.dashboard.fullPath })
	}
}
