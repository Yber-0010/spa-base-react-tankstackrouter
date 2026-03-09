import { type MetaHelmetProps, MetaTags } from '../../../shared/helpers/MetaTags';

interface RegisterProps {
	metaData?: MetaHelmetProps['metaData'];
}

export const Register = ({ metaData }: RegisterProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Register</div>
		</>
	);
};
