import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl, getAuthToken } from './util';
import { App } from '../pages/Dashboard';

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
			transformResponse: (value: { data: App[] }, _meta) => value,
		}),
		app: builder.query({
			query: (id) => id,
			providesTags: ['App'],
		}),
		createToken: builder.mutation({
			query: ({ id }) => ({
				url: `${id}/token`,
				method: 'POST',
			}),
			invalidatesTags: ['App'],
		}),
		editApp: builder.mutation({
			query: ({ id, title }) => ({
				url: `${id}/update`,
				method: 'PATCH',
				body: {
					title,
				},
			}),
			invalidatesTags: ['App'],
		}),
		newApp: builder.mutation({
			query: ({ name }) => ({
				url: '/',
				method: 'POST',
				body: {
					title: name,
				},
			}),
		}),
	}),
});

export const {
	useAppsQuery,
	useAppQuery,
	useCreateTokenMutation,
	useEditAppMutation,
	useNewAppMutation
} = appsApi;
