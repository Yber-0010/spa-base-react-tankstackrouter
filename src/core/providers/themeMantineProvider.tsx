import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '../../shared/styles/font.css';
import { myTheme as theme } from '../../shared/theme/theme';
import { env } from '../../shared/environments/environments';

type Props = {
	children: React.ReactNode
}

export const ThemeMantineProvider = ({ children }: Props) => {
	return (
		<MantineProvider theme={theme} defaultColorScheme={env.VITE_MANTINE_DEFAULT_THEME}>
			{children}
		</MantineProvider>
	)
}
