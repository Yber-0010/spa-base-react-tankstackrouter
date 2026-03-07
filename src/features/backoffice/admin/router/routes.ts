import { lazy } from 'react'
import { ROUTES } from '../../../../shared/constants/routes'
import { adminMetaData } from './metadata'

const AdminUsers      = lazy(() => import('../users/adminUsers').then(m => ({ default: m.AdminUsers })))
const AdminRoles      = lazy(() => import('../roles/adminRoles').then(m => ({ default: m.AdminRoles })))
const AdminPermitions = lazy(() => import('../permitions/adminPermitions').then(m => ({ default: m.AdminPermitions })))
const AdminUserDetail = lazy(() => import('../users/adminUserDetail').then(m => ({ default: m.AdminUserDetail })))

const { admin } = ROUTES
const { users, roles, permissions, userDetail } = adminMetaData()

export const routes = [
	{
		path: admin.users.path,
		component: AdminUsers,
		metadata: users,
	},
	{
		path: admin.roles.path,
		component: AdminRoles,
		metadata: roles,
	},
	{
		path: admin.permissions.path,
		component: AdminPermitions,
		metadata: permissions,
	},
	{
		path: admin.userDetail.path,
		component: AdminUserDetail,
		metadata: userDetail,
		staticData: { title: userDetail.title },
	},
]
