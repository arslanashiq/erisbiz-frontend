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

// eslint-disable-next-line import/prefer-default-export
export const { useLoadUserQuery, useGetRecentActivityQuery } = userApi;
