import { ThemeMantineProvider } from "./themeMantineProvider"
import { MetaHelmetProvider } from './metaHelmetProvider';
import { I18nProvider } from './i18nProvider';

type Props = {
	children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
	return (
		<MetaHelmetProvider>
			<ThemeMantineProvider>
				<I18nProvider>
					{children}
				</I18nProvider>
			</ThemeMantineProvider>
		</MetaHelmetProvider>
	)
}
