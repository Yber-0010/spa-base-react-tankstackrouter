import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

const i18nInstance = i18n.createInstance(); // ← instancia aislada

i18nInstance
    .use(initReactI18next)
    .init({
        resources: { 
            es: { translation: es },
            en: { translation: en },
        },
        lng: 'es',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

type Props = {
    children: React.ReactNode
}


export const I18nProvider = ({ children }: Props) => {
    return (
        <I18nextProvider i18n={i18nInstance}>
            {children}
        </I18nextProvider>
    )
}
