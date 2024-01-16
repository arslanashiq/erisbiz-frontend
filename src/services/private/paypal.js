import { privateApi } from './index';

const brandsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    sendPaymentStatus: builder.mutation({
      query: payload => ({
        url: 'api/payments/handle-paypal-payment/',
        method: 'POST',
        body: payload,
      }),
      providesTags: ['sendPaymentStatus'],
    }),
    getPaypalPlansList: builder.query({
      query: () => ({
        url: '/api/payments/subscription-plans/',
        method: 'GET',
      }),
      providesTags: ['getPaypalPlansList'],
    }),
  }),
});

export const { useSendPaymentStatusMutation, useGetPaypalPlansListQuery } = brandsApi;
export const test = '';
