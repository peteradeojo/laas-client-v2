import { Outlet } from 'react-router-dom';
import { useAuthQuery } from '../services/api';
import { Navigate } from 'react-router-dom';

const AuthLayout = () => {
	const { isLoading, isSuccess, isError } = useAuthQuery(null);

	return (
		<>
			{isLoading && <>...loading...</>}
			{isError && (
				<>
					<Navigate to={'/login'} replace />
				</>
			)}
			{isSuccess && <Outlet></Outlet>}
		</>
	);
};

export default AuthLayout;
