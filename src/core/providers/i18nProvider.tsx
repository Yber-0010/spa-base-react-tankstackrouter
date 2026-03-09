import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '../i18n/en.json';
import es from '../i18n/es.json';

const i18nInstance = i18n.createInstance(); // ← instancia aislada

i18nInstance.use(initReactI18next).init({
	resources: {
		es: { translation: es },
		en: { translation: en },
	},
	lng: 'es',
	fallbackLng: 'en',
	interpolation: { escapeValue: false },
});

type Props = {
	children: React.ReactNode;
};

export const I18nProvider = ({ children }: Props) => {
	return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
};
