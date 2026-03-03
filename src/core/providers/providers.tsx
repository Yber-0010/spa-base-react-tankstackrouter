import { ThemeMantineProvider } from "./themeMantineProvider"

type Props = {
	children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
	return (
		<ThemeMantineProvider>
			{children}
		</ThemeMantineProvider>
	)
}
