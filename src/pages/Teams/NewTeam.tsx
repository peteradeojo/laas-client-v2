import React, { useEffect, useState } from 'react';
import { useAppsQuery } from '../../services/apps';
import { useCreateTeamMutation } from '../../services/teams';
import { notification } from 'antd';
import { App } from '../Dashboard';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { FaCheck, FaTimes } from 'react-icons/fa';

const TeamApp: React.FC<{ app: App; adder: (id: number) => boolean }> = ({
	app,
	adder,
}) => {
	const [selected, setSelected] = useState(false);

	return (
		<div
			className={
				styles.teamApp +
				' p-2 mb-2 mx-1 w-33 row between ' +
				(selected ? styles.selected : '')
			}
			onClick={() => {
				const r = adder(app.id);
				setSelected(r);
			}}
		>
			<span>{app.title}</span>
			<span>{selected ? <FaTimes /> : <FaCheck />}</span>
		</div>
	);
};

const NewTeam = () => {
	const {
		data: apps,
		isLoading,
		isError,
		isSuccess,
		error: appError,
	} = useAppsQuery({});

	const [name, setName] = useState('');
	const [appsToAdd, setAppsToAdd] = useState<number[]>([]);
	const [create, ..._rest] = useCreateTeamMutation();

	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			notification.error({
				message: (appError as any).message,
				duration: 3,
				placement: 'topRight',
			});
		}
	}, [isError]);

	const addApp = (id: number): boolean => {
		let apps = [...appsToAdd];
		let t = true;
		if (apps.includes(id)) {
			apps = apps.filter((v) => v != id);
			t = false;
		} else {
			apps = [...apps, id];
		}
		setAppsToAdd(apps);
		return t;
	};

	const createTeam = async () => {
		try {
			const data = { name, apps: appsToAdd };
			const r = await create(data).unwrap();

			if (r.status == "failed") {
				notification.error({
					message: r.message,
					duration: 3,
					placement: 'topRight',
				});
				return;
			}

			notification.success({
				message: 'Team created successfully',
				duration: 3,
				placement: 'topRight',
			});
			navigate('/teams');
		} catch (error) {
			notification.error({
				message: 'Unable to create team at this time.',
				duration: 3,
				placement: 'topRight',
			});
		}
	};

	return (
		<>
			<h1>New Team</h1>
			<div className="py-2"></div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createTeam();
				}}
			>
				<div className="form-group">
					<label htmlFor="name">Give your team a name</label>
					<input
						type="text"
						name="name"
						className="form-control"
						placeholder="Justice League"
						id="name"
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className="pt-2"></div>
				<div className="form-group">
					{isLoading ? (
						'loading apps...'
					) : isSuccess ? (
						<>
							<p className="py-3">You've selected {appsToAdd.length} app(s)</p>
							<div className="row">
								{apps.data.map((app: any, index) => (
									<TeamApp app={app} key={index} adder={addApp} />
								))}
							</div>
						</>
					) : (
						<>Unable to load apps</>
					)}
				</div>
				<div className="form-group">
					<button type="submit">Submit</button>
				</div>
			</form>

			<div className="py-4"></div>
		</>
	);
};

export default NewTeam;
