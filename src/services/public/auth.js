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
    adminSignUp: builder.mutation({
      query: payload => ({
        url: '/api/auth/signup/',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyAdminToken: builder.query({
      query: ({ id, token }) => ({
        url: `/api/verify/token/${id}/${token}/`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useAdminSignUpMutation, useVerifyAdminTokenQuery } = authApi;
