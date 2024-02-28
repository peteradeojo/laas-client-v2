import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl, getAuthToken } from './util';

export const logsApi = createApi({
	reducerPath: 'logs',
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseUrl}/logs/`,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${getAuthToken()}`);
			return headers;
		},
	}),
	tagTypes: ['Logs'],
	endpoints: (builder) => ({
		logs: builder.query({
			query: ({id, page}) => `${id}?page=${page}&count=20`,
			providesTags: ['Logs'],
		}),
	}),
});

export const { useLogsQuery } = logsApi;
