import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'utilities/constants';

export const privateApi = createApi({
  reducerPath: 'privateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');

      // If token exists, set the Authorization header
      if (token) headers.set('Authorization', `Token ${token}`);

      return headers;
    },
  }),

  endpoints: () => ({}),
});
export const test = '';
