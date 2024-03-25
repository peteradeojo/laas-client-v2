import { useParams } from 'react-router-dom';
import {
	useShowTeamQuery,
	useInviteMemberMutation,
} from '../../services/teams';
import React, { useEffect, useState } from 'react';
import { notification, Table } from 'antd';

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
			/>
			<button onClick={add}>Add</button>
		</>
	);
};

const Team = () => {
	const { id } = useParams();
	const { data, isLoading, isError, error, isSuccess } = useShowTeamQuery({
		id,
	});

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
					<h3 className="mb-2">Members</h3>
					<AddMember id={data.id} />
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
