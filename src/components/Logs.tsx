import React, { useState } from 'react';

import styles from './Logs.module.scss';

import { App } from '../pages/Dashboard';
import { useLogsQuery } from '../services/logs';
import { dateToString } from '../functions';

type Log = {
	id: string | number;
	text: string;
	level: string;
	app: App;
	ip?: string;
	createdAt: string;
	updatedAt: string;
	context?: any;
	tags?: string[];
};

const ContextDisplay: React.FC<{ k: string; v: any }> = ({ k, v }) => {
	const [expand, setEx] = useState(false);

	v = typeof v != 'string' ? JSON.stringify(v) : v;
	return (
		<>
			<div className="row">
				<span
					className="mw-12"
					onClick={() => setEx(!expand)}
					style={{ cursor: 'pointer' }}
				>
					<strong>{k}:</strong>
				</span>
				<p
					style={{
						maxWidth: '100%',
						overflow: expand ? 'visible' : 'hidden',
						textOverflow: expand ? undefined : 'ellipsis',
						lineBreak: 'anywhere',
						whiteSpace: expand ? 'wrap' : 'nowrap',
					}}
					className={!expand ? 'w-88' : ''}
				>
					{v}
				</p>
			</div>
		</>
	);
};

const Display: React.FC<{ log?: Log }> = ({ log }) => {
	if (!log)
		return (
			<>
				<p>Click on a log to view it here</p>
			</>
		);

	return (
		<>
			<p className="h3">{log.level.toUpperCase()}</p>
			<p>
				<strong>Date:</strong> {dateToString(log.createdAt)}
			</p>
			<p>
				<strong>IP Address:</strong> {log.ip || "No ip address provided"}
			</p>
			<p>
				<strong>Tags:</strong>{' '}
				{log.tags?.map((t, i) => (
					<>
						<span
							style={{
								padding: '4px',
								background: 'grey',
								borderRadius: '6px',
								color: '#fff',
								marginRight: '4px',
								fontSize: '0.8em'
							}}
							key={i}
						>
							{t}
						</span>
					</>
				))}
			</p>
			<div className="py-2"></div>
			<p>{log.text}</p>
			<div className="py-2"></div>
			<div className="py-2"></div>
			<div
				style={{
					maxWidth: '100%',
					// textOverflow: 'ellipsis',
					overflowX: 'auto',
					whiteSpace: 'wrap',
				}}
			>
				{log.context
					? Object.keys(log.context).map((key) => (
							<>
								<ContextDisplay k={key} v={log.context[key]} />
								<div className="pb-2"></div>
							</>
					  ))
					: null}
			</div>
		</>
	);
};

const Log: React.FC<{ log: Log; display: any }> = ({ log, display }) => {
	return (
		<>
			<div className={`${styles[log.level]} p-1`} onClick={display}>
				<p className="h3">{log.level.toUpperCase()}</p>
				<small>{dateToString(log.createdAt)}</small>
				<p
					style={{
						maxWidth: '100%',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{log.text.slice(0, 70)}
				</p>
			</div>
		</>
	);
};

const Logs: React.FC<{ appId: number | string }> = ({ appId }) => {
	const [page, setPage] = useState(1);
	const { isSuccess, isError, isLoading, data, error } = useLogsQuery({
		id: appId,
		page,
	});
	const [frontLog, setFrontLog] = useState<Log | undefined>(undefined);

	const pushLog = (log: Log) => {
		setFrontLog(log);
	};

	const maxPage = () => {
		const i = Math.floor(data?.total / 20);
		return i > 0 ? i : 1;
	};

	return (
		<>
			{isLoading ? <>loading</> : null}
			{isError ? <>{(error as any).data.message}</> : null}
			{isSuccess ? (
				<>
					<button onClick={() => setPage(page <= 1 ? 1 : page - 1)}>
						{'< Prev'}
					</button>
					<span className="py-1 px-3 bg-white">{data.page}</span>
					<button
						onClick={() => setPage(page >= maxPage() ? maxPage() : page + 1)}
					>
						{'Next >'}
					</button>
					<div className="py-4"></div>
					<div className="row stretch" style={{ height: '60vh' }}>
						<div
							className="col-3"
							style={{ maxHeight: '100%', overflowY: 'auto' }}
						>
							{data.data.length > 0 ? (
								data.data.map((l: Log) => (
									<Log
										log={l}
										key={l.id}
										display={() => {
											pushLog(l);
										}}
									/>
								))
							) : (
								<>You don't have any logs yet.</>
							)}
						</div>
						<div
							className="col-7 px-2 py-5 bg-white"
							style={{
								border: '2px solid #fff',
								maxHeight: '100%',
								overflowY: 'auto',
							}}
						>
							<Display log={frontLog} />
						</div>
					</div>
				</>
			) : null}
		</>
	);
};

export default Logs;
