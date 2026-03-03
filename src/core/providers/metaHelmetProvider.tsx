import { HelmetProvider } from 'react-helmet-async';

type Props = {
	children: React.ReactNode
}

export const MetaHelmetProvider = ({ children }: Props) => {
	return (
		<HelmetProvider>
			{children}
		</HelmetProvider>
	)
}
