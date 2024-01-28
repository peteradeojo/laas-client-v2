import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Login from './pages/Login.tsx';
import './index.scss';

import {
	createBrowserRouter,
	createRoutesFromChildren,
	Route,
	RouterProvider,
} from 'react-router-dom';

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
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
