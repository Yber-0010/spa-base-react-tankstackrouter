import { lazy } from 'react';
import { ROUTES } from '../../../shared/constants/routes';
import { backofficeMetaData } from './metadata';

// const AdminUsers     = lazy(() => import('../users/adminUsers').then(m => ({ default: m.AdminUsers })))
const Users = lazy(() => import('../users/users').then((m) => ({ default: m.Users })));
const Dashboard = lazy(() =>
	import('../dashboard/dashboard').then((m) => ({ default: m.Dashboard }))
);

const { backoffice } = ROUTES;
const { users, dashboard } = backofficeMetaData();

export const routes = [
	{
		path: backoffice.users.path,
		component: Users,
		metadata: users,
	},
	{
		path: backoffice.dashboard.path,
		component: Dashboard,
		metadata: dashboard,
	},
] as const;
