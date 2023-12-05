import { privateApi } from './index';

const userApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    loadUser: builder.query({
      query: () => 'api/auth/user',
      providesTags: ['loadUser'],
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
    updateCompany: builder.mutation({
      query: values => ({ url: 'api/update/company', method: 'PATCH', body: values }),
      providesTags: ['updateCompany'],
      invalidatesTags: ['loadUser'],
    }),
    updatePassword: builder.mutation({
      query: values => ({ url: 'api/auth/changePassword/', method: 'PATCH', body: values }),
      providesTags: ['updatePassword'],
      invalidatesTags: ['loadUser'],
    }),
  }),
});

export const {
  useLoadUserQuery,
  useGetRecentActivityQuery,
  useRegisterCompanyMutation,
  useUpdateCompanyMutation,
  useUpdatePasswordMutation,
} = userApi;
