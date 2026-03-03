import { MetaTags, type MetaHelmetProps } from '../../../shared/helpers/MetaTags'

interface HomeProps {
	metaData?: MetaHelmetProps['metaData']
}

export const Home = ({ metaData }: HomeProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Home</div>
		</>
	)
}
