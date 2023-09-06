import { publicApi } from './index';

const authApi = publicApi.injectEndpoints({
  endpoints: builder => ({
    adminLogin: builder.mutation({
      query: payload => ({
        url: '/api/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAdminLoginMutation } = authApi;
export const test = '';
