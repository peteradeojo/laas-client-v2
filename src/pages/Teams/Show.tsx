import { Link, useParams } from 'react-router-dom';
import {
	useShowTeamQuery,
	useInviteMemberMutation,
	useGetTeamAppsQuery,
} from '../../services/teams';
import React, { useContext, useEffect, useState } from 'react';
import { notification, Table } from 'antd';
import AuthContext from '../../contexts/AuthContext';
import { App } from '../Dashboard';
import { dateToString } from '../../functions';

type TeamMember = {
	id: number;
	name: string;
	email: string;
};

export type TeamT = {
	id: number;
	name: string;
	createdat: string;
	members: Array<TeamMember>;
};

import Card from '../../components/Card';
import AddApp from './AddApp';

const Apps: React.FC<{ apps: App[] }> = ({ apps }) => {
	return (
		<>
			<div className="row">
				{apps.map((app: App) => (
					<Link to={'/apps/' + app.id} className="p-1 link" key={app.id}>
						<Card className="py-5">
							<p>
								<strong>{app.title}</strong>
							</p>
							<p>Created On: {dateToString(app.createdat!)}</p>
						</Card>
					</Link>
				))}
			</div>
		</>
	);
};

const AddMember: React.FC<{ id: number }> = ({ id }) => {
	const [email, setEmail] = useState('');

	const [trigger] = useInviteMemberMutation();

	const add = async () => {
		const regex = new RegExp('^.+@.+..{2,4}$');
		try {
			if (!email || regex.test(email) == false) {
				notification.error({
					message: 'Invalid email address',
					duration: 3,
					placement: 'topRight',
				});
				return;
			}
			await trigger({ id, email }).unwrap();

			notification.success({
				message: 'Invite sent successfully',
				duration: 3,
				placement: 'topRight',
			});
		} catch (error) {
			console.error(error);
			notification.error({
				message: 'An error occurred',
				duration: 3,
				placement: 'topRight',
			});
		}
	};

	return (
		<>
			<input
				className="w-35"
				type="email"
				onChange={(e) => {
					setEmail(e.target.value);
				}}
				value={email}
				placeholder="bestmate@team.com"
			/>
			<div className="pt-1"></div>
			<button onClick={add}>Add</button>
		</>
	);
};

const Team = () => {
	const { id } = useParams();
	const { data, isLoading, isError, error, isSuccess } = useShowTeamQuery({
		id,
	});
	const taHook = useGetTeamAppsQuery({ id });
	const user = useContext(AuthContext);

	useEffect(() => {
		if (isError) {
			notification.error({
				message: (error as any).message,
				duration: 3,
				placement: 'topRight',
			});
		} else if (isSuccess) {
			document.title = data.name;
		}

		return () => {
			document.title = 'LAGs';
		};
	}, [isError, isSuccess]);

	return (
		<>
			{isLoading ? null : isSuccess ? (
				<>
					<h1>{data.name}</h1>
					<div className="py-2"></div>
					<h3 className="mb-2">Apps</h3>

					{taHook.isLoading ? (
						<>Loading apps...</>
					) : isError ? null : (
						<>
							<AddApp team={data} exclude={taHook.data.map((t: any) => t.id)} />
							<Apps apps={taHook.data} />
						</>
					)}

					<div className="py-2"></div>
					<h3 className="mb-2">Members</h3>
					{user?.id == (data as any).ownerid && <AddMember id={data.id} />}
					<div className="py-2"></div>
					<Table
						columns={[
							{ title: 'Name', dataIndex: 'name' },
							{ title: 'E-mail', dataIndex: 'email' },
						]}
						dataSource={data.members}
					/>
				</>
			) : null}
		</>
	);
};

export default Team;
