import { type MetaHelmetProps, MetaTags } from '../../../shared/helpers/MetaTags';

interface UsersProps {
	metaData?: MetaHelmetProps['metaData'];
}

export const Users = ({ metaData }: UsersProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Users</div>
		</>
	);
};
