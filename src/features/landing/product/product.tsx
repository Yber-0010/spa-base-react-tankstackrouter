import { useLoaderData } from '@tanstack/react-router'
import { MetaTags, type MetaHelmetProps } from '../../../shared/helpers/MetaTags'

interface ProductProps {
	metaData?: MetaHelmetProps['metaData']
}

/**
 * Product receives the loader data automatically via useLoaderData,
 * which is TanStack Router's equivalent of React Router's useLoaderData.
 */
export const Product = ({ metaData }: ProductProps) => {
	const loaderData = useLoaderData({ strict: false }) as { params: Record<string, string> }
	console.log('params', loaderData?.params)

	return (
		<>
			<MetaTags metaData={metaData} />
			<div>
				<p>Product</p>
			</div>
		</>
	)
}
