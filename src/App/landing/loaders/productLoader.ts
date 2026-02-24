/**
 * Equivalent of productLoader in base-react.
 * Receives `params` from TanStack Router's loader context.
 * Throw a redirect or Response-like error the same way React Router does.
 */
export const productLoader = ({ params }: { params: Record<string, string> }) => {
	const id = params.id
	console.log('id', id)
	if (id === '2') {
		throw new Response('Not Found', { status: 404, statusText: 'Not Found' })
	}
	return { params }
}
