import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const apiService = createApi({
  reducerPath: 'mainAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('accessToken');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['directory'],
  endpoints: (build) => ({
    getAddressesTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/types',
      }),
      providesTags: ['directory'],
    }),
    getCountries: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/countries',
      }),
      providesTags: ['directory'],
    }),
    getCities: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/cities',
      }),
      providesTags: ['directory'],
    }),
    getMessengersTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/messengers/types',
      }),
      providesTags: ['directory'],
    }),
    getContactsTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/contacts/types',
      }),
      providesTags: ['directory'],
    }),
    getLegalForms: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/legal-forms',
      }),
      providesTags: ['directory'],
    }),
    getBusinessTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/business-types',
      }),
      providesTags: ['directory'],
    }),
  }),
});
