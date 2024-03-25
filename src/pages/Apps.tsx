import { useParams } from 'react-router-dom';
import {
	useAppQuery,
	useCreateTokenMutation,
	useEditAppMutation,
} from '../services/apps';
import { App as AppType } from './Dashboard';
import React, { useEffect, useState } from 'react';

import Logs from '../components/Logs';
import { dateToString } from '../functions';
import { FaSpinner } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa6';

const EditableHeader: React.FC<{
	title: string;
	trigger: () => void;
	capture: (currentValue: any) => void;
}> = ({ trigger, title, capture }) => {
	const [edit, setEdit] = useState(false);

	return (
		<div>
			{edit ? (
				<>
					<input
						value={title}
						onChange={(e) => capture(e.target.value)}
						style={{
							background: 'inherit',
							border: 'none',
							borderRadius: 0,
							borderBottom: '1px solid #fff',
							color: '#fff',
						}}
						className="my-2"
					/>
					<button
						onClick={() => {
							trigger();
							setEdit(false);
						}}
					>
						Save
					</button>
				</>
			) : (
				<div className="row between">
					<h1>{title}</h1>
					<span
						onClick={() => {
							setEdit(true);
						}}
						style={{ cursor: 'pointer' }}
					>
						Edit
					</span>
				</div>
			)}
		</div>
	);
};

const GetAppToken: React.FC<{ appId: number }> = ({ appId }) => {
	const [trigger, result] = useCreateTokenMutation();

	const generateToken = async () => {
		try {
			const res = await trigger({ id: appId }).unwrap();

			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<button disabled={result.isLoading} onClick={generateToken}>
				Generate Token
				{result.isLoading && <small>loading...</small>}
			</button>
		</>
	);
};

const CopyToken: React.FC<{ token: any }> = ({ token }) => {
	const [copying, setCopying] = useState(false);

	const copy = async () => {
		setCopying(true);
		await navigator.clipboard.writeText(token);

		setTimeout(() => {
			setCopying(false);
		}, 1000);
	};

	return (
		<>
			<button className="row center" onClick={copy}>
				<span>{token}</span>
				<div className="px-1"></div>
				{copying ? <FaSpinner /> : <FaClipboardList color="#bb3344" />}
			</button>
		</>
	);
};

const App: React.FC<{ app: AppType }> = ({ app }) => {
	useEffect(() => {
		document.title = app.title;

		return () => {
			document.title = 'LAGS';
		};
	}, [app]);

	const [update, _] = useEditAppMutation();
	const [apptitle, setAppTitle] = useState(app.title);

	return (
		<>
			<div className="bg-teal p-4 rounded">
				<EditableHeader
					title={apptitle}
					trigger={async () => {
						try {
							await update({ id: app.id, title: apptitle }).unwrap();
						} catch (error) {
							console.log(error);
						}
					}}
					capture={(value: string) => {
						setAppTitle(value);
					}}
				/>
				<p>Created on: {dateToString(app.createdAt!)}</p>
				<p className="pt-3">
					{app.token ? (
						<CopyToken token={app.token} />
					) : (
						<GetAppToken appId={app.id} />
					)}
				</p>
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
