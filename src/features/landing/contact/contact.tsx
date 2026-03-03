import { MetaTags, type MetaHelmetProps } from '../../../shared/helpers/MetaTags'

interface ContactProps {
	metaData?: MetaHelmetProps['metaData']
}

export const Contact = ({ metaData }: ContactProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Contact</div>
		</>
	)
}
