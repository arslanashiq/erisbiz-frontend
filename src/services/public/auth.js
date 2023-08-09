import { publicApi } from './index';

const authApi = publicApi.injectEndpoints({
  endpoints: builder => ({
    adminLogin: builder.mutation({
      query: payload => ({
        url: '/api/auth/login/',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

// eslint-disable-next-line import/prefer-default-export
export const { useAdminLoginMutation } = authApi;
