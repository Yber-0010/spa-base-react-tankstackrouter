import { type MetaHelmetProps, MetaTags } from '../../../../shared/helpers/MetaTags';

interface AdminRolesProps {
	metaData?: MetaHelmetProps['metaData'];
}

export const AdminRoles = ({ metaData }: AdminRolesProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Admin Roles</div>
		</>
	);
};
