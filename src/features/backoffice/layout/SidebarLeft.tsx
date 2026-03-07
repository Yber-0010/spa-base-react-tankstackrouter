import { Link, useRouterState } from '@tanstack/react-router'
import {
	AppShell,
	ActionIcon,
	Group,
	Stack,
	Tooltip,
	ScrollArea,
	Divider,
} from '@mantine/core'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { useNavigate } from '@tanstack/react-router'
import { backofficeRouteList, adminRouteList } from '@/shared/constants/routes'

import './backofficeLayout.css'

/* ─── Emoji por ruta ─── */
const routeEmojis: Record<string, string> = {
	'/backoffice/dashboard': '🏠',
	'/backoffice/users': '👥',
	'/backoffice/admin/users': '👤',
	'/backoffice/admin/roles': '🛡️',
	'/backoffice/admin/permissions': '🔑',
}

interface SidebarLeftProps {
	collapsed: boolean
	onToggle: () => void
}

export const SidebarLeft = ({ collapsed, onToggle }: SidebarLeftProps) => {
	const navigate = useNavigate()
	const { removeAllStorage } = useLocalStorage()
	const routerState = useRouterState()
	const currentPath = routerState.location.pathname

	const logout = () => {
		removeAllStorage()
		navigate({ to: '/login' })
	}

	const navItems = [
		...backofficeRouteList,
		...adminRouteList,
	]

	return (
		<>

			<AppShell.Section p="sm">
				<Group justify={collapsed ? 'center' : 'space-between'} wrap="nowrap">
					{!collapsed && (
						<img
							src="/logo-datec-blue.png"
							alt="Logo"
							height={40}
						/>
					)}
					<ActionIcon
						variant="subtle"
						color="gray"
						size="md"
						onClick={onToggle}
					>
						☰
					</ActionIcon>
				</Group>
			</AppShell.Section>

			<AppShell.Section grow component={ScrollArea} className="navSection">
				<Stack gap={2} p={8}>
					{navItems.map((route) => {
						const isActive = currentPath === route.fullPath
						return (
							<Tooltip
								key={route.fullPath}
								label={route.name}
								position="right"
								withArrow
								disabled={!collapsed}
							>
								<Link
									to={route.fullPath as string}
									className={['navItem', isActive ? 'navItemActive' : ''].join(' ')}
								>
									<span className="navItemIcon">
										{routeEmojis[route.fullPath] ?? '📄'}
									</span>
									<span className={collapsed ? 'navLabelHidden' : 'navItemLabel'}>
										{route.name}
									</span>
									{!collapsed && isActive && (
										<span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 12 }}>›</span>
									)}
								</Link>
							</Tooltip>
						)
					})}
				</Stack>
			</AppShell.Section>

			<Divider />

			<AppShell.Section className="navFooter">
				<Tooltip label="Cerrar sesión" position="right" withArrow disabled={!collapsed}>
					<button className="navItem" onClick={logout}>
						<span className="navItemIcon">🚪</span>
						<span className={collapsed ? 'navLabelHidden' : 'navItemLabel'}>
							Cerrar sesión
						</span>
					</button>
				</Tooltip>
			</AppShell.Section>
		</>
	)
}
