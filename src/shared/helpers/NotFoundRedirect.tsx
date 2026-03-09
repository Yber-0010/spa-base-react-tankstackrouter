import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const createNotFoundRedirect = (to: string) => {
	const NotFoundRedirect = () => {
		const navigate = useNavigate();

		useEffect(() => {
			navigate({ to, replace: true });
		}, [navigate]);

		return null;
	};

	NotFoundRedirect.displayName = `NotFoundRedirect(${to})`;

	return NotFoundRedirect;
};
