import { Link } from 'react-router-dom';
import DashboardTeams from '../Dashboard/Teams';

const Teams = () => {
	return (
		<>
			<h1>Your Teams</h1>
			<button>
				<Link to={'/teams/new'} className="link">
					Create A Team
				</Link>
			</button>
			<DashboardTeams />
		</>
	);
};

export default Teams;
