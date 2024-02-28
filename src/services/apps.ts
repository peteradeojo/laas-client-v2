import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl, getAuthToken } from './util';

export const appsApi = createApi({
	reducerPath: 'apps',
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseUrl}/apps`,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${getAuthToken()}`);
			return headers;
		},
	}),
	tagTypes: ['Apps', 'App'],
	endpoints: (builder) => ({
		apps: builder.query({
			query: () => '',
			providesTags: ['Apps'],
		}),
		app: builder.query({
			query: (id) => id,
			providesTags: ['App'],
		}),
	}),
});

export const { useAppsQuery, useAppQuery } = appsApi;