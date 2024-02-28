import { useAppsQuery } from '../services/apps';
import { Link } from 'react-router-dom';
import { User } from '../contexts/AuthContext';

import styles from './Dashboard.module.scss';

export type App = {
	createdAt: string;
	updatedAt: string;
	id: number;
	title: string;
	token?: string;
	user?: User;
};

const Apps = () => {
	const {
		isSuccess,
		isLoading,
		isError,
		data,
	}: any | { data: { data: Array<App> } } = useAppsQuery(null);
	return (
		<>
			{isLoading ? <>loading apps</> : null}
			{isError ? <></> : null}
			{isSuccess ? (
				<div className="row between">
					{data.data.slice(0, 5).map((app: App) => (
						<div key={app.id} className={`col-5 p-1 pb-3`}>
							<Link
								to={'/apps/' + app.id}
								className={`${styles.app} py-5 px-3 rounded`}
							>
								<p><strong>{app.title}</strong></p>
								<p>{app.createdAt}</p>
							</Link>
						</div>
					))}
				</div>
			) : null}
		</>
	);
};

const Dashboard = () => {
	return (
		<>
			<h1>Your Integrations</h1>
			<Apps></Apps>
		</>
	);
};

export default Dashboard;
