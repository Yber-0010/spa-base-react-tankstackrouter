// src/core/hooks/useScreenSize.ts
import { useMediaQuery } from '@mantine/hooks';

export const BREAKPOINTS = {
	mobile: 768,
	tablet: 900,
	tabletLarge: 1200,
	desktop: 1800,
};

export function useScreenSize() {
	const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);
	const isTablet = useMediaQuery(
		`(min-width: ${BREAKPOINTS.mobile + 1}px) and (max-width: ${BREAKPOINTS.tablet}px)`
	);
	const isTabletLarge = useMediaQuery(
		`(min-width: ${BREAKPOINTS.tablet + 1}px) and (max-width: ${BREAKPOINTS.tabletLarge}px)`
	);
	const isDesktop = useMediaQuery(
		`(min-width: ${BREAKPOINTS.tabletLarge + 1}px) and (max-width: ${BREAKPOINTS.desktop}px)`
	);
	const isDesktopXL = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop + 1}px)`);

	return {
		isMobile,
		isTablet,
		isTabletLarge,
		isDesktop,
		isDesktopXL,
	};
}
