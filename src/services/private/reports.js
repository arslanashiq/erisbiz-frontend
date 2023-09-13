import { privateApi } from './index';

const reportsApi = privateApi.injectEndpoints({
  endpoints: builder => ({
    getSupplierPayableBalance: builder.query({
      query: (params = {}) => ({
        url: 'api/report/vendor/payable/balance',
        params: {
          duration: params.duration,
        },
      }),
      providesTags: ['getSupplierPayableBalance'],
    }),
  }),
});

export const { useGetSupplierPayableBalanceQuery } = reportsApi;
export const test = '';
