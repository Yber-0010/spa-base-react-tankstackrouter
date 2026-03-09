import {
	ActionIcon,
	AppShell,
	Badge,
	Divider,
	Group,
	ScrollArea,
	Stack,
	Text,
} from '@mantine/core';

import './backofficeLayout.css';

const mockNotifications = [
	{ id: 1, title: 'Registro inicial completado', time: 'Hoy 9:30', read: false },
	{ id: 2, title: 'Nuevo usuario registrado', time: 'Hace 2h', read: false },
	{ id: 3, title: 'Reporte mensual disponible', time: 'Ayer 14:00', read: true },
	{ id: 4, title: 'Configuración actualizada', time: 'Ayer 10:15', read: true },
	{ id: 5, title: 'Backup completado exitosamente', time: 'Hace 2 días', read: true },
];

interface SidebarRightProps {
	onClose: () => void;
}

export const SidebarRight = ({ onClose }: SidebarRightProps) => {
	const unread = mockNotifications.filter((n) => !n.read).length;

	return (
		<>
			<AppShell.Section className="asideHeader">
				<Group gap={8}>
					<span>🔔</span>
					<Text fw={600} size="sm">
						Notificaciones
					</Text>
					{unread > 0 && (
						<Badge size="xs" color="brand" variant="filled" circle>
							{unread}
						</Badge>
					)}
				</Group>
				<ActionIcon variant="subtle" color="gray" size="sm" onClick={onClose} title="Cerrar panel">
					✕
				</ActionIcon>
			</AppShell.Section>

			<AppShell.Section grow component={ScrollArea} className="asideContent">
				<Stack gap={4}>
					{mockNotifications.map((notif) => (
						<div key={notif.id} className="notificationItem">
							{!notif.read ? (
								<span className="notificationDot" />
							) : (
								<span style={{ width: 8, flexShrink: 0 }} />
							)}
							<div>
								<Text size="sm" fw={notif.read ? 400 : 600} c={notif.read ? 'gray.6' : 'dark'}>
									{notif.title}
								</Text>
								<Text size="xs" c="gray.5" mt={2}>
									{notif.time}
								</Text>
							</div>
						</div>
					))}
				</Stack>
			</AppShell.Section>

			<Divider />

			<AppShell.Section p="sm">
				<Text size="xs" c="gray.5" ta="center" style={{ cursor: 'pointer' }}>
					Ver todas las notificaciones
				</Text>
			</AppShell.Section>
		</>
	);
};
