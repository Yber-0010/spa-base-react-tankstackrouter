import { lazy } from 'react'
import { backofficeMetaData } from './backoffice.metadata'

const Users = lazy(() => import('../users/users'))
const Tickets = lazy(() => import('../tickets/tickets'))

const { users, tickets } = backofficeMetaData()

/**
 * Routes config – mirrors routes.js from base-react backoffice.
 * Paths here are RELATIVE to the `/dashboard` layout route parent,
 * exactly as base-react uses `path: 'users'` / `path: 'tickets'`.
 * The full redirect on `/dashboard` is handled in backoffice.routes.tsx via beforeLoad.
 */
export const routes = [
	{
		path: 'users',
		component: Users,
		metadata: users,
	},
	{
		path: 'tickets',
		component: Tickets,
		metadata: tickets,
	},
] as const
