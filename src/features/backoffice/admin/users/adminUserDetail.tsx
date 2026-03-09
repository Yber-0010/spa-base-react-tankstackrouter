import { Button, Stack, Text, Title } from '@mantine/core';
import { Link, useParams } from '@tanstack/react-router';

export const AdminUserDetail = () => {
	const { userId } = useParams({ strict: false });

	return (
		<Stack gap="md">
			<div>
				<Button component={Link} to="/backoffice/admin/users" variant="subtle" size="xs">
					← Volver a usuarios
				</Button>
			</div>
			<Title order={3}>Detalle del usuario</Title>
			<Text>
				ID: <strong>{userId}</strong>
			</Text>
			<Text c="dimmed" size="sm">
				(Aquí iría la información completa del usuario {userId})
			</Text>
		</Stack>
	);
};
