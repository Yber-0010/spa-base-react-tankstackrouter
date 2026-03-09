import { type MetaHelmetProps, MetaTags } from '../../../../shared/helpers/MetaTags';

interface AdminPermitionsProps {
	metaData?: MetaHelmetProps['metaData'];
}

export const AdminPermitions = ({ metaData }: AdminPermitionsProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Admin Permitions</div>
		</>
	);
};
