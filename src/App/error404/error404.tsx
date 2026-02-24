import { useRouterState } from '@tanstack/react-router'

/**
 * Equivalent of Error404 in base-react.
 * Used as `errorComponent` on routes and the root route.
 */
export const Error404 = () => {
	const routerState = useRouterState()
	const error = routerState.matches.at(-1)?.error as Error | undefined

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			{error && (
				<p>
					<i>{error.message}</i>
				</p>
			)}
		</div>
	)
}
