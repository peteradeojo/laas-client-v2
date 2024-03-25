import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl, prepareHeaders } from './util';
import { TeamT } from '../pages/Teams/Show';

export const teamsApi = createApi({
	reducerPath: 'teams',
	baseQuery: fetchBaseQuery({
		baseUrl: `${baseUrl}/teams`,
		prepareHeaders: prepareHeaders,
	}),
	tagTypes: ['Teams', 'Team'],
	endpoints: (builder) => ({
		getTeams: builder.query({
			query: () => ({
				url: '',
			}),
			providesTags: ['Teams'],
		}),
		showTeam: builder.query({
			query: ({ id }) => ({
				url: `${id}/show`,
			}),
			transformResponse: (value: TeamT) => value,
			providesTags: (_result, _error, id) => [{ type: 'Team', id }],
		}),
		inviteMember: builder.mutation({
			query: ({ id, email }) => ({
				url: `add-member`,
				method: 'POST',
				body: {
					team: id,
					email,
				},
			}),
			invalidatesTags: (_result, _error, id) => [{ type: 'Team', id }],
		}),
	}),
});

export const { useGetTeamsQuery, useLazyGetTeamsQuery, useShowTeamQuery, useInviteMemberMutation } =
	teamsApi;
