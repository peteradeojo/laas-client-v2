import { useAppsQuery } from '../../services/apps';
import { Link } from 'react-router-dom';
import { User } from '../../contexts/AuthContext';

import styles from './index.module.scss';
import { dateToString } from '../../functions';
import Teams from './Teams';
import { FaPlus } from 'react-icons/fa';

export type App = {
	createdat?: string;
	updatedat?: string;
	createdAt?: string;
	updatedAt?: string;
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
				<div className="row between py-2">
					{data.data.slice(0, 5).map((app: App) => (
						<div key={app.id} className={`col-5 p-0 pb-3 pr-3`}>
							<Link
								to={'/apps/' + app.id}
								className={`${styles.app} py-5 px-3 rounded`}
							>
								<p>
									<strong>{app.title}</strong>
								</p>
								<p>{dateToString(app.createdat!)}</p>
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
			<button className="row spaced">
				<Link to={'/apps/new'} className="link">
					<span>Add an App</span>
				</Link>
				<FaPlus />
			</button>
			<Apps />

			<div className="pb-5"></div>
			<div className="row">
				<h1>Teams</h1>
				<span className="px-2"></span>
				<Link to={'/teams'} color="#fff" className="text-light">
					Manage
				</Link>
			</div>
			<Teams />
		</>
	);
};

export default Dashboard;
