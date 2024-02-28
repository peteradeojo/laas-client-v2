import { Outlet } from 'react-router-dom';
import { useAuthQuery } from '../services/api';
import { Navigate, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

import AuthContext from '../contexts/AuthContext';
import { getAuthToken } from '../services/util';

const AuthLayout = () => {
	const navigate = useNavigate();
	if (getAuthToken() == null) {
		navigate('/login');
	}

	const { isLoading, isSuccess, isError, data } = useAuthQuery(null);

	return (
		<>
			{isLoading && <>...loading...</>}
			{isError && (
				<>
					<Navigate to={'/login'} replace />
				</>
			)}
			{isSuccess && (
				<AuthContext.Provider value={data.data.user}>
					<Nav />
					<div className='container'>
					<Outlet></Outlet>
					</div>
				</AuthContext.Provider>
			)}
		</>
	);
};

export default AuthLayout;
