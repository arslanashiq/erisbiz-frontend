import { privateApi } from './index';

const userApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    loadUser: builder.mutation({
      query: () => 'api/auth/user',
    }),
    getRecentActivity: builder.query({
      query: () => 'api/user/recent/activity/',
    }),
  }),
});

export const { useLoadUserMutation, useGetRecentActivityQuery } = userApi;
