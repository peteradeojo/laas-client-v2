import { useState } from 'react';
import styles from './Login.module.scss';

const Login = (): JSX.Element => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

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
								<button type="submit" className="bg-teal">
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
