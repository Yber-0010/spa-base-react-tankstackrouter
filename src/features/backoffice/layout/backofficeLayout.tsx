import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { useStorage } from '../../../shared/hooks/useStorage'

export const BackofficeLayout = () => {

	const navigate = useNavigate()
	
	const { removeAllStorage } = useStorage()

	const logout = () => {
		removeAllStorage()
		navigate({ to: '/login' })
	}

	return (
		<>
			<div>BackofficeLayout</div>
			<nav>
				<ul>
					{/* <li>
						<Link to="/home">Home</Link>
					</li> */}
					<li>
						<Link to="/backoffice/dashboard" activeProps={{ style: { fontWeight: 'bold' } }}>
							Dashboard
						</Link>
					</li>
					<li>
						<Link to="/backoffice/admin/users" activeProps={{ style: { fontWeight: 'bold' } }}>
							Users
						</Link>
					</li>
					<li>
						<Link to="/backoffice/admin/roles" activeProps={{ style: { fontWeight: 'bold' } }}>
							Roles
						</Link>
					</li>
					<li>
						<Link to="/backoffice/admin/permissions" activeProps={{ style: { fontWeight: 'bold' } }}>
							Permissions
						</Link>
					</li>
					<li>
						<button onClick={logout}>Logout</button>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	)
}

export default BackofficeLayout
