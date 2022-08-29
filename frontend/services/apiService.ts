import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const apiService = createApi({
  reducerPath: 'mainAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.SERVER_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
