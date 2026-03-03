import { ThemeMantineProvider } from "./themeMantineProvider"
import { MetaHelmetProvider } from './metaHelmetProvider';

type Props = {
	children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
	return (
		<MetaHelmetProvider>
			<ThemeMantineProvider>
				{children}
			</ThemeMantineProvider>
		</MetaHelmetProvider>
	)
}
