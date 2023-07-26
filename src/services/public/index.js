import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'utilities/constants';

// eslint-disable-next-line import/prefer-default-export
export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
});
