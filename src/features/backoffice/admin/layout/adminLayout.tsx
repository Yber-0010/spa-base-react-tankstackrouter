import { Outlet } from '@tanstack/react-router'

export const AdminLayout = () => {
	return (
		<>
			{/* Aquí podés agregar nav/sidebar propio del admin */}
			<Outlet />
		</>
	)
}
