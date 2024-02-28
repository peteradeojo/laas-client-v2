// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import AuthContext from '../contexts/AuthContext';
import { setAuthToken } from '../services/util';

import styles from './Nav.module.scss';

export default function Nav() {
	// const userContext = useContext(AuthContext);
	const navigate = useNavigate();

	const logout = () =>  {
		setAuthToken(undefined);
		navigate('/');
	}

	const goBack = () => {
		history.back()
	}

	return (
		<>
			<nav className={`${styles.Nav} py-2 px-1 row between`}>
				<button onClick={goBack}>Back</button>
				<ul className='row' style={{justifyContent: 'end'}}>
					<li className='px-1'><Link to={'/dashboard'}>Home</Link></li>
					<li className='px-1'><button className='btn' onClick={logout}>Logout</button></li>
				</ul>
			</nav>
		</>
	);
}
