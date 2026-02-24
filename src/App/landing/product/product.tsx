import { useLoaderData } from '@tanstack/react-router'

/**
 * Product receives the loader data automatically via useLoaderData,
 * which is TanStack Router's equivalent of React Router's useLoaderData.
 */
export const Product = () => {
	const loaderData = useLoaderData({ strict: false }) as { params: Record<string, string> }
	console.log('params', loaderData?.params)

	return (
		<div>
			<p>Product</p>
		</div>
	)
}

export default Product
