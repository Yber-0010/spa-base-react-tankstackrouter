import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { useStorage } from '../../hooks/useStorage'

/**
 * Backoffice section layout – mirrors BackofficeLayout from base-react.
 * useNavigate works the same way; navigate({ to }) is the TanStack signature.
 */
export const BackofficeLayout = () => {
	const navigate = useNavigate()
	const { removeAllStorage } = useStorage()

	const logout = () => {
		removeAllStorage()
		navigate({ to: '/home' })
	}

	return (
		<>
			<div>BackofficeLayout</div>
			<nav>
				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/dashboard/users" activeProps={{ style: { fontWeight: 'bold' } }}>
							Users
						</Link>
					</li>
					<li>
						<Link to="/dashboard/tickets" activeProps={{ style: { fontWeight: 'bold' } }}>
							Tickets
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
