export const productLoader = ({ params }: { params: Record<string, string> }) => {
	const id = params.id;
	// console.info('id', id);
	if (id === '2') {
		throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
	}
	return { params };
};
