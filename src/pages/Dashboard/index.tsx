import { useAppsQuery } from '../../services/apps';
import { Link } from 'react-router-dom';
import { User } from '../../contexts/AuthContext';

import { dateToString } from '../../functions';
import Teams from './Teams';
import { FaPlus } from 'react-icons/fa';
import Card from '../../components/Card';

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
				<div className="row py-2">
					{data.data.slice(0, 5).map((app: App) => (
						<Link to={'/apps/' + app.id} className="w-25 py-1 pr-2 link">
							<Card className='py-5'>
								<p>
									<strong>{app.title}</strong>
								</p>
								<p>{dateToString(app.createdat!)}</p>
							</Card>
						</Link>
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
