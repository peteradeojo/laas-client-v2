import { useState } from 'react';
import styles from './Login.module.scss';
import { useLoginMutation } from '../services/api';
import { setAuthToken } from '../services/util';
import { useNavigate } from 'react-router-dom';

const Login = (): JSX.Element => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [login, { isLoading, isError, error }] = useLoginMutation({});

	const submitLogin = async () => {
		try {
			const r = await login({
				email: form.email,
				password: form.password,
			}).unwrap();

			setAuthToken(r.data.token);
			navigate('/dashboard');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className={styles.LoginContainer}>
				<div className="container">
					<div className="row center">
						<div className="col-5 py-5 px-5 rounded bg-white">
							<div className="py-1"></div>
							<img src="/zoom.svg" style={{ width: '10%' }} alt="" />
							<h1>Login</h1>
							<div className="py-2"></div>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									submitLogin();
								}}
								className={styles.LoginForm}
							>
								<input
									type="email"
									name="email"
									id="email"
									value={form.email}
									required
									onChange={(e) => {
										setForm({ ...form, email: e.target.value });
									}}
									placeholder="E-mail Address"
								/>
								<div className="py-1"></div>
								<input
									type="password"
									name="password"
									id="password"
									value={form.password}
									onChange={(e) => {
										setForm({ ...form, password: e.target.value });
									}}
									required
									placeholder="Password"
								/>
								<div className="py-1"></div>
								<button type="submit" className="bg-teal" disabled={isLoading}>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white center bottom py-3 px-5">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
					deserunt autem sint.
				</p>
			</div>
		</>
	);
};

export default Login;
