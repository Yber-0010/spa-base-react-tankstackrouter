import { Helmet } from "react-helmet-async";
import { useTraslate } from '@/shared/hooks/useTraslate';

export type MetaHelmetProps = {
	metaData?: {
		title: string;
		description?: string;
		ogTitle?: string;
		ogDescription?: string;
		robot?: string;
	}
};

export const MetaTags = ({ metaData }: MetaHelmetProps) => {
	
	if (!metaData) return null;

	const { title, description = '', ogTitle = '', ogDescription = '', robot = '' } = metaData;

	const { t } = useTraslate()

	return (
		<Helmet>
			<title>{t(`rutes.${title}`) || title}</title>
			<meta name="description" content={description} />
			<meta name="og:title" content={ogTitle} />
			<meta name="og:description" content={ogDescription} />
			<meta name="robots" content={robot} />
			<meta name="og:type" content="website" />
			{/* add your meta data here */}
		</Helmet>
	)
}
