import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line import/prefer-default-export
export const thirdPartyApi = createApi({
  reducerPath: 'thirdPartyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: () => ({}),
});
