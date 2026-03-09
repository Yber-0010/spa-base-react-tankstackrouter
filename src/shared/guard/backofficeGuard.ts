import { redirect } from '@tanstack/react-router';
import { ROUTES } from '../constants/routes';
import { useCheckAuthenticated } from '../hooks/useCheckAuthenticated';

export const backofficeGuard = () => {
	const isAuth = useCheckAuthenticated();

	if (!isAuth) {
		throw redirect({ to: ROUTES.auth.login.fullPath });
	}
};
