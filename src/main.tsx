import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import Login from './pages/Login.tsx';
import './index.scss';

import { store } from './store.ts';

import {
	createBrowserRouter,
	createRoutesFromChildren,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from './pages/Dashboard.tsx';
import AuthLayout from './pages/AuthLayout.tsx';

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
			<Route element={<AuthLayout />}>
				<Route path="/dashboard" element={<Dashboard />} />
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
