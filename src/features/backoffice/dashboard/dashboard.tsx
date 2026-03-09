import { type MetaHelmetProps, MetaTags } from '../../../shared/helpers/MetaTags';

interface DashboardProps {
	metaData?: MetaHelmetProps['metaData'];
}

export const Dashboard = ({ metaData }: DashboardProps) => {
	return (
		<>
			<MetaTags metaData={metaData} />
			<div>Dashboard</div>
		</>
	);
};

export default Dashboard;
