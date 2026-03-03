import { MetaTags, type MetaHelmetProps } from '../../../../shared/helpers/MetaTags'

interface AdminUsersProps {
	metaData?: MetaHelmetProps['metaData']
}

export const AdminUsers = ({ metaData }: AdminUsersProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Admin Users</div>
		</>
	)
}
