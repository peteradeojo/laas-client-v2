import { Link } from 'react-router-dom';

import styles from '../App.module.scss';

const GuestNav = ({ showHome = true }) => {
	return (
		<nav className={styles.nav + ' container'}>
			<Link to={'/signup'}>Get Started</Link>
			<div className="px-2"></div>
			<Link to={'/login'}>Login</Link>
			{showHome && (
				<>
					<div className="px-2"></div>
					<Link to={'/'}>Home</Link>
				</>
			)}
		</nav>
	);
};

export default GuestNav;
