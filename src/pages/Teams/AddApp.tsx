import { TeamT } from './Show';
import { useAppsQuery, useAddToTeamMutation } from '../../services/apps';
import { useState } from 'react';
import { notification } from 'antd';
import { App } from '../Dashboard';

const AddApp: React.FC<{ team: TeamT; exclude: (App | number)[] }> = ({
	team,
	exclude = [],
}) => {
	const { data: apps, isError, isSuccess, isLoading } = useAppsQuery(null);
	const [selected, setSelected] = useState<undefined | number>();

	const [trigger, _result] = useAddToTeamMutation();

	const submit = async () => {
		try {
			await trigger({
				team: team.id,
				app: selected,
			}).unwrap();
			notification.success({
				message: 'App added successfully',
				duration: 3,
				placement: 'topRight',
			});
		} catch (error) {
			console.error(error);
			notification.error({
				message: 'Unable to add app to team',
				duration: 3,
				placement: 'topRight',
			});
		}
	};

	return (
		<>
			{isLoading ? null : isError ? null : isSuccess ? (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						submit();
					}}
				>
					<div className="form-group">
						<select
							className="form-control"
							onChange={(e) => {
								setSelected(Number(e.target.value));
							}}
							value={selected}
						>
							<option>
								Select App to Add
							</option>
							{apps.data
								.filter((app) => exclude.includes(app.id) == false)
								.map((app) => (
									<option value={app.id} key={app.id}>
										{app.title}
									</option>
								))}
						</select>
					</div>

					{selected ? <button>Save</button> : null}
				</form>
			) : null}
		</>
	);
};

export default AddApp;
