import { privateApi } from './index';

const userApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    loadUser: builder.query({
      query: () => 'api/auth/user',
    }),
    getRecentActivity: builder.query({
      query: () => 'api/user/recent/activity/',
    }),
  }),
});

export const { useLoadUserQuery, useGetRecentActivityQuery } = userApi;
