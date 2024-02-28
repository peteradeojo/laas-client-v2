import { useParams } from 'react-router-dom';
import { useAppQuery } from '../services/apps';
import { App as AppType } from './Dashboard';
import React, { useEffect } from 'react';

import Logs from '../components/Logs';

const App: React.FC<{ app: AppType }> = ({ app }) => {
	useEffect(() => {
		document.title = app.title;

		return () => {
			document.title = 'LAGS';
		};
	}, []);

	return (
		<>
			<div className="bg-teal p-4 rounded">
				<h1>{app.title}</h1>
				<p>Created on: {app.createdAt}</p>
				<p className="pt-3">{app.token || 'No wahala'}</p>
			</div>
		</>
	);
};

export default function Apps() {
	const { id } = useParams();
	const { isSuccess, isError, data, isLoading } = useAppQuery(id);
	return (
		<>
			{isLoading ? <></> : null}
			{isError ? <></> : null}
			{isSuccess ? (
				<>
					<App app={data.data} />
					<div className="py-4"></div>
					<Logs appId={data.data.id} />
				</>
			) : null}
		</>
	);
}
