import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { API_URL } from 'utilities/constants';

// eslint-disable-next-line import/prefer-default-export
export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: () => ({}),
});
