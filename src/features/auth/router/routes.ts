import { lazy } from 'react'
import { authMetaData } from './metadata'
import { ROUTES } from '../../../shared/constants/routes'

// const AdminUsers     = lazy(() => import('../users/adminUsers').then(m => ({ default: m.AdminUsers })))
const Login = lazy(() => import('../login/presenter/views/login').then(m => ({ default: m.Login })))

const { auth } = ROUTES
const { login } = authMetaData()

export const routes = [
	{
		path: auth.login.path,
		component: Login,
		metadata: login,
	},
] as const
