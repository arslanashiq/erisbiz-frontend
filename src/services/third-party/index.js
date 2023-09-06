import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const thirdPartyApi = createApi({
  reducerPath: 'thirdPartyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
});
export const test = '';
