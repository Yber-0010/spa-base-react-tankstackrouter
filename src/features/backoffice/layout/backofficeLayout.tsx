import { Outlet, useMatches } from '@tanstack/react-router'
import { AppShell, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TopNavbar } from './TopNavbar'
import { SidebarLeft } from './SidebarLeft'
import { SidebarRight } from './SidebarRight'
import { useScreenSize } from '@/shared/hooks/useScreenSize'
import { backofficeRouteList, adminRouteList } from '@/shared/constants/routes'
import './backofficeLayout.css'

const NAVBAR_EXPANDED_WIDTH = 220
const NAVBAR_COLLAPSED_WIDTH = 68
const ASIDE_WIDTH = 280
const HEADER_HEIGHT = 60

export const BackofficeLayout = () => {

	const [leftOpened, { toggle: toggleLeft, close: closeLeft }] = useDisclosure(false)
	const [rightOpened, { toggle: toggleRight, close: closeRight }] = useDisclosure(false)
	const [leftCollapsed, { toggle: toggleLeftCollapse }] = useDisclosure(false)

	let { isMobile } = useScreenSize()

	/* ── Título dinámico de la página ── */
	const matches = useMatches()
	const lastMatch = matches[matches.length - 1]
	const allNavItems = [...backofficeRouteList, ...adminRouteList]
	// Rutas dinámicas: staticData.title — Rutas estáticas: lookup en navItems
	const staticTitle = (lastMatch?.staticData as Record<string, unknown>)?.title as string | undefined
	const navTitle = allNavItems.find(r => r.fullPath === lastMatch?.pathname)?.name
	const pageTitle = staticTitle ?? navTitle ?? 'Backoffice'
	


	const handleToggleLeft = () => {
		if (isMobile) {
			/* Mobile: toggl apertura, cierra el derecho */
			if (!leftOpened) closeRight()
			toggleLeft()
		} else {
			/* Desktop: colapsa/expande (siempre visible) */
			toggleLeftCollapse()
		}
	}

	const handleToggleRight = () => {
		if (isMobile && !rightOpened) {
			/* Mobile: cierra el izquierdo antes de abrir derecho */
			closeLeft()
		}
		toggleRight()
	}

	/* En mobile el sidebar izquierdo se comporta como drawer (colapsa cuando cerrado) */
	const navbarWidth = leftCollapsed && !isMobile ? NAVBAR_COLLAPSED_WIDTH : NAVBAR_EXPANDED_WIDTH
	const asideCollapsed = !rightOpened

	return (
		<AppShell
			layout="alt"
			header={{ height: HEADER_HEIGHT }}
			navbar={{
				width: navbarWidth,
				breakpoint: 'sm',
				collapsed: {
					mobile: true,              // En mobile siempre oculto, usamos Drawer en su lugar
					desktop: false,
				},
			}}
			aside={{
				width: ASIDE_WIDTH,
				breakpoint: 'sm',
				collapsed: {
					mobile: asideCollapsed,
					desktop: asideCollapsed,
				},
			}}
			padding="md"
		>
			{/* ─── Header ─── */}
			<TopNavbar
				leftOpened={leftOpened || !isMobile}
				rightOpened={rightOpened}
				onToggleLeft={handleToggleLeft}
				onToggleRight={handleToggleRight}
				pageTitle={pageTitle}
			/>

			{/* ─── Sidebar Izquierdo: Drawer en mobile, Navbar en desktop ─── */}
			{isMobile ? (
				<Drawer
					opened={leftOpened}
					onClose={closeLeft}
					position="left"
					size="70%"
					withCloseButton={false}
					padding={0}
					overlayProps={{ backgroundOpacity: 0.3, blur: 2 }}
					transitionProps={{ transition: 'slide-right', duration: 250, timingFunction: 'ease' }}
					styles={{ body: { padding: 0, height: '100%', display: 'flex', flexDirection: 'column' } }}
				>
					<SidebarLeft collapsed={false} onToggle={closeLeft} />
				</Drawer>
			) : (
				<AppShell.Navbar className="navbar">
					<SidebarLeft
						collapsed={leftCollapsed}
						onToggle={handleToggleLeft}
					/>
				</AppShell.Navbar>
			)}

			{/* ─── Sidebar Derecho ─── */}
			<AppShell.Aside className="aside">
				<SidebarRight onClose={handleToggleRight} />
			</AppShell.Aside>

			{/* ─── Contenido principal ─── */}
			<AppShell.Main className="main">
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}

export default BackofficeLayout
