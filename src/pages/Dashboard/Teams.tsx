import { useEffect } from 'react';
import { useGetTeamsQuery } from '../../services/teams';
import { notification } from 'antd';
import { Link } from 'react-router-dom';

import styles from './teams.module.scss';
import { dateToString } from '../../functions';

type TeamT = {
	id: number;
	name: string;
	createdat: string;
	user: string;
};

const Teams = () => {
	const { isLoading, data, error, isError, isSuccess } =
		useGetTeamsQuery(undefined);

	useEffect(() => {
		if (isError) {
			notification.error({
				duration: 3,
				message: (error as any).message,
				placement: 'topRight',
			});
		}
	}, [isError, isSuccess]);

	return (
		<>
			{isLoading
				? 'Loading...'
				: isError
				? null
				: data?.map((t: TeamT) => (
						<div key={t.id} className={`col-5 p-1 pb-3`}>
							<Link
								to={'/teams/' + t.id}
								className={`${styles.app} py-5 px-3 rounded`}
							>
								<p>
									<strong>{t.name}</strong>
								</p>
								<small>
									Created by {t.user} on {dateToString(t.createdat!)}
								</small>
							</Link>
						</div>
				  ))}
		</>
	);
};

export default Teams;
