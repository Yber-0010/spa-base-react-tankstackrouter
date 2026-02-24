import { lazy } from 'react'
import { authMetaData } from './auth.metadata'

const Login = lazy(() => import('../login/login'))
const { login } = authMetaData()

export const routes = [
	{
		path: '/auth',
		component: Login,
		metadata: login,
	},
] as const
