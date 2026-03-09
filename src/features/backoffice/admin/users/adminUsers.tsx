import { Button, Stack, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { ROUTES } from '../../../../shared/constants/routes';
import { type MetaHelmetProps, MetaTags } from '../../../../shared/helpers/MetaTags';

interface AdminUsersProps {
	metaData?: MetaHelmetProps['metaData'];
}

export const AdminUsers = ({ metaData }: AdminUsersProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<Stack gap="md">
				<Title order={3}>Admin Users</Title>
				<div>
					<Button component={Link} to={ROUTES.admin.userDetail.to('1')} variant="light" size="sm">
						Ver usuario 1
					</Button>
				</div>
			</Stack>
		</>
	);
};
