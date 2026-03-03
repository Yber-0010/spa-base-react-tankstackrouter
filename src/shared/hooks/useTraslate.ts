import { useTranslation } from 'react-i18next';

export const useTraslate = () => {

	const { t, i18n } = useTranslation();

	return { t, i18n };
}
