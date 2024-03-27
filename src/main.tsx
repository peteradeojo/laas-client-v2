import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import Apps from './pages/Apps.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import './index.scss';

import { store } from './store.ts';

import {
	createBrowserRouter,
	createRoutesFromChildren,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from './pages/Dashboard/index.tsx';
import AuthLayout from './pages/AuthLayout.tsx';
import Teams from './pages/Teams/index.tsx';
import Team from './pages/Teams/Show.tsx';
import NewTeam from './pages/Teams/NewTeam.tsx';

const router = createBrowserRouter(
	createRoutesFromChildren(
		<Route
			path="/"
			errorElement={
				<>
					<p>An error occured</p>
				</>
			}
		>
			<Route index element={<App />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route element={<AuthLayout />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/apps/:id" element={<Apps />} />
				<Route path="/teams">
					<Route index element={<Teams />} />
					<Route path=":id" element={<Team />} />
					<Route path="new" element={<NewTeam />} />
				</Route>
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
