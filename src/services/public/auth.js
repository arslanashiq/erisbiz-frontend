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
    registerCompany: builder.mutation({
      query: ({ values, token }) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          if (key === 'security_question') {
            values.security_question.forEach((question, index) => {
              formData.append(`security_question[${index}]question`, question.question);
              formData.append(`security_question[${index}]answer`, question.answer);
            });
          } else {
            formData.append(key, values[key]);
          }
        });

        return {
          headers: {
            Authorization: `Token ${token}`,
          },
          url: '/register/company/',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminSignUpMutation,
  useVerifyAdminTokenQuery,
  useRegisterCompanyMutation,
} = authApi;
