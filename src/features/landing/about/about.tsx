import { MetaTags, type MetaHelmetProps } from '../../../shared/helpers/MetaTags'

interface AboutProps {
	metaData?: MetaHelmetProps['metaData']
}

export const About = ({ metaData }: AboutProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>About</div>
		</>
	)
}
