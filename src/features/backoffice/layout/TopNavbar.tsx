import { ActionIcon, AppShell, Avatar, Badge, Box, Text, Tooltip } from '@mantine/core';

import './backofficeLayout.css';
import { useTraslate } from '@/shared/hooks/useTraslate';

interface TopNavbarProps {
	leftOpened: boolean;
	rightOpened: boolean;
	onToggleLeft: () => void;
	onToggleRight: () => void;
	pageTitle?: string;
}

export const TopNavbar = ({
	leftOpened,
	rightOpened,
	onToggleLeft,
	onToggleRight,
	pageTitle = 'Dashboard',
}: TopNavbarProps) => {
	const { t } = useTraslate();

	return (
		<AppShell.Header className="header">
			{/* Lado izquierdo */}
			<div className="headerLeft">
				<Box hiddenFrom="sm">
					<Tooltip label={leftOpened ? 'Colapsar menú' : 'Expandir menú'} withArrow>
						<ActionIcon
							variant="subtle"
							color={leftOpened ? 'brand' : 'gray'}
							size="md"
							onClick={onToggleLeft}
							title="Toggle sidebar izquierdo"
						>
							☰
						</ActionIcon>
					</Tooltip>
				</Box>
				<span style={{ fontSize: 18 }}>🏠</span>
				<Text fw={600} size="md" c="dark">
					{t(`topTitles.${pageTitle}`, { defaultValue: pageTitle })}
				</Text>
			</div>

			{/* Centro: búsqueda */}
			{/* <div className="headerCenter">
				<TextInput
					placeholder="Buscar..."
					size="xs"
					radius="md"
					leftSection={<span style={{ fontSize: 12 }}>🔍</span>}
					rightSection={
						<Text size="xs" c="gray.4" style={{ userSelect: 'none' }}>
							/
						</Text>
					}
					styles={{
						input: {
							backgroundColor: 'var(--mantine-color-gray-0)',
							border: '1px solid var(--mantine-color-gray-2)',
						},
					}}
				/>
			</div> */}

			{/* Lado derecho */}
			<div className="headerRight">
				{/* Notificaciones */}
				<Tooltip label="Notificaciones" withArrow>
					<ActionIcon
						variant="subtle"
						color={rightOpened ? 'brand' : 'gray'}
						size="md"
						onClick={onToggleRight}
						title="Toggle sidebar derecho"
						pos="relative"
					>
						🔔
						<Badge
							size="xs"
							color="red"
							variant="filled"
							circle
							style={{ position: 'absolute', top: 2, right: 2 }}
						>
							2
						</Badge>
					</ActionIcon>
				</Tooltip>

				{/* Usuario */}
				<div className="userBlock">
					<Box visibleFrom="sm">
						<div style={{ textAlign: 'right', lineHeight: 1.2 }}>
							<Text size="xs" fw={600} c="dark">
								Mia Taylor
							</Text>
							<Text size="xs" c="gray.5">
								Comercial
							</Text>
						</div>
					</Box>
					<Avatar size="sm" radius="xl" color="brand">
						MT
					</Avatar>
				</div>

				{/* Toggle sidebar derecho (icono panel) */}
				<Tooltip label={rightOpened ? 'Cerrar panel' : 'Abrir panel'} withArrow>
					<ActionIcon
						variant="subtle"
						color={rightOpened ? 'brand' : 'gray'}
						size="md"
						onClick={onToggleRight}
						title="Panel derecho"
					>
						⊞
					</ActionIcon>
				</Tooltip>
			</div>
		</AppShell.Header>
	);
};
