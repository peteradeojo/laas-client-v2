import { useEffect } from 'react';
import { useGetTeamsQuery } from '../../services/teams';
import { notification } from 'antd';
import { Link } from 'react-router-dom';

import { dateToString } from '../../functions';
import Card from '../../components/Card';

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
			{isLoading ? (
				'Loading...'
			) : isError ? null : (
				<div className="row">
					{data?.map((t: TeamT) => (
						<Link to={'/teams/' + t.id} className="link pr-3 w-33">
							<Card className="py-5">
								<p>
									<strong>{t.name}</strong>
								</p>
								<small>
									Created by {t.user} on {dateToString(t.createdat!)}
								</small>
							</Card>
							<div className="py-1"></div>
						</Link>
					))}
				</div>
			)}
		</>
	);
};

export default Teams;
