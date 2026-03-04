import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '../../shared/styles/font.css';
import { myTheme as theme } from '../../shared/theme/theme';

type Props = {
	children: React.ReactNode
}

export const ThemeMantineProvider = ({ children }: Props) => {
	return (
		<MantineProvider theme={theme} defaultColorScheme="auto">
			{children}
		</MantineProvider>
	)
}
