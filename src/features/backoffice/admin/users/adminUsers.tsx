import { Link } from '@tanstack/react-router'
import { Stack, Title, Button } from '@mantine/core'
import { MetaTags, type MetaHelmetProps } from '../../../../shared/helpers/MetaTags'
import { ROUTES } from '../../../../shared/constants/routes'

interface AdminUsersProps {
	metaData?: MetaHelmetProps['metaData']
}

export const AdminUsers = ({ metaData }: AdminUsersProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<Stack gap="md">
				<Title order={3}>Admin Users</Title>
				<div>
					<Button
						component={Link}
						to={ROUTES.admin.userDetail.to('1')}
						variant="light"
						size="sm"
					>
						Ver usuario 1
					</Button>
				</div>
			</Stack>
		</>
	)
}
