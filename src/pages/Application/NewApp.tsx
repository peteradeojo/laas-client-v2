import { useState } from 'react';
import { useNewAppMutation } from '../../services/apps';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

type User = {
	id: number;
};

type App = {
	title: string;
	user: User;
	token: string;
	createdAt: string;
	updatedAt: string;
	id: number;
};

type Data = {
	app: App;
};

type H = {
	message: string;
	data: Data;
};

const NewApp = () => {
	const [name, setName] = useState('');
	const navigate = useNavigate();

	const [newapp, _result] = useNewAppMutation();

	const createNewApp = async () => {
		try {
			const app: H = await newapp({ name }).unwrap();
			notification.success({
				message: 'Your new integration is ready.',
				duration: 3,
				placement: 'topRight',
			});
			navigate(`/apps/${app.data.app.id}`);
		} catch (err) {
			console.error(err);
			notification.error({
				message: 'An error occurred',
				duration: 3,
				placement: 'topRight',
			});
		}
	};

	return (
		<>
			<h1 className="py-3">Create An App</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quas
				illo, enim, repudiandae voluptatibus est magnam eum aut mollitia, optio
				tenetur eius. Ex eius aut repudiandae enim? Sunt, totam dicta!
			</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createNewApp();
				}}
			>
				<div className="form-group">
					<input
						type="text"
						name="name"
						id="name"
						required
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</div>
				<div className="py-2"></div>
				<div className="form-group">
					<button>Save</button>
				</div>
			</form>
		</>
	);
};

export default NewApp;
