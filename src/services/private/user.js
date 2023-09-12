import { privateApi } from './index';

const userApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    loadUser: builder.mutation({
      query: () => 'api/auth/user',
    }),
    getRecentActivity: builder.query({
      query: () => 'api/user/recent/activity/',
    }),
    registerCompany: builder.mutation({
      query: values => {
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
          url: '/api/register/company/',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useLoadUserMutation, useGetRecentActivityQuery, useRegisterCompanyMutation } = userApi;
