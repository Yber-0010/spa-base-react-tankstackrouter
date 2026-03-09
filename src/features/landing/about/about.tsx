import { type MetaHelmetProps, MetaTags } from '../../../shared/helpers/MetaTags';

interface AboutProps {
	metaData?: MetaHelmetProps['metaData'];
}

export const About = ({ metaData }: AboutProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>About</div>
		</>
	);
};
