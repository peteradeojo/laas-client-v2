import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl, getAuthToken } from './util';

export const globalApi = createApi({
	reducerPath: 'global',
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${getAuthToken()}`);
			return headers;
		},
	}),
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		auth: builder.query({
			query: () => 'auth',
			providesTags: ['Auth'],
		}),
		login: builder.mutation({
			query: (data) => ({
				url: 'auth/login',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Auth'],
		}),
	}),
});

export const { useLoginMutation, useAuthQuery } = globalApi;
