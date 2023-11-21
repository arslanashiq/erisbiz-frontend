import { privateApi } from './index';

const dashboardApis = privateApi.injectEndpoints({
  endpoints: builder => ({
    getDashboardDetail: builder.query({
      query: () => ({
        url: '/api/dashboard/',
      }),
      providesTags: ['getDashboardDetail'],
    }),

    getDashboardSaleByMonth: builder.query({
      query: () => ({
        url: '/api/dashboard/monthly/sale/',
      }),
      providesTags: ['getDashboardSaleByMonth'],
    }),
    getDashboardCurrentMonthSale: builder.query({
      query: () => ({
        url: '/api/dashboard/current/month/sale/',
      }),
      providesTags: ['getDashboardSaleOfMonth'],
    }),
    getDashboardProductCategoryDetail: builder.query({
      query: () => ({
        url: '/api/dashboard/product/category/',
      }),
      providesTags: ['getDashboardProductCategoryDetail'],
    }),
    getDashboardTotalReceivables: builder.query({
      query: () => ({
        url: '/api/dashboard/receivables/',
      }),
      providesTags: ['getDashboardTotalReceivables'],
    }),
  }),
});

export const {
  useGetDashboardDetailQuery,
  useGetDashboardSaleByMonthQuery,
  useGetDashboardCurrentMonthSaleQuery,
  useGetDashboardProductCategoryDetailQuery,
  useGetDashboardTotalReceivablesQuery,
} = dashboardApis;
