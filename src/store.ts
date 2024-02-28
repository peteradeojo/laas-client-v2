import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { globalApi } from './services/api';
import { appsApi } from './services/apps';
import { logsApi } from './services/logs';

export const store = configureStore({
	reducer: {
		[globalApi.reducerPath]: globalApi.reducer,
		[appsApi.reducerPath]: appsApi.reducer,
		[logsApi.reducerPath]: logsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			globalApi.middleware,
			appsApi.middleware,
			logsApi.middleware
		),
});

setupListeners(store.dispatch);
