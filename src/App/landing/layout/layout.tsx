import { Link, Outlet, useRouterState } from '@tanstack/react-router'

/**
 * Landing section layout – equivalent of LandinLayout in base-react.
 * Uses TanStack's Link and Outlet instead of React Router's.
 * useRouterState().status === 'pending' replaces useNavigation() for load states.
 */
export const LandingLayout = () => {
	const { status } = useRouterState()

	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/home" activeProps={{ style: { fontWeight: 'bold' } }}>
							Home
						</Link>
					</li>
					<li>
						<Link to="/auth" activeProps={{ style: { fontWeight: 'bold' } }}>
							Auth
						</Link>
					</li>
					<li>
						<Link to="/product/$id" params={{ id: '1' }} activeProps={{ style: { fontWeight: 'bold' } }}>
							Product
						</Link>
					</li>
					<li>
						<Link to="/contact" activeProps={{ style: { fontWeight: 'bold' } }}>
							Contact
						</Link>
					</li>
					<li>
						<Link to="/about" activeProps={{ style: { fontWeight: 'bold' } }}>
							About
						</Link>
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
				</ul>
			</nav>
			{status === 'pending' && <div>Loading…</div>}
			<Outlet />
		</>
	)
}
