import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '../../shared/styles/font.css';
import { env } from '../environments/environments';
import { myTheme as theme } from '../theme/theme';

type Props = {
	children: React.ReactNode;
};

export const ThemeMantineProvider = ({ children }: Props) => {
	return (
		<MantineProvider theme={theme} defaultColorScheme={env.VITE_MANTINE_DEFAULT_THEME}>
			{children}
		</MantineProvider>
	);
};
