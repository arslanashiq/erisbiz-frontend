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
  }),
});

export const { useSendPaymentStatusMutation } = brandsApi;
export const test = '';
