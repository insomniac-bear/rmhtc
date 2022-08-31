import { apiService } from './apiService';

export const adminAPI = apiService.injectEndpoints({
  endpoints: (build) => ({
    getModerateCompanies: build.query<any, any>({
      query: (page) => ({
        url: `/api/v1/companies/moderate${page ? `?page=${page}` : ''}`,
        credentials: 'include',
      }),
    }),
    getCurrentCompany: build.query<any, any>({
      query: (uuid: string) => ({
        url: `/api/v1/companies/moderate/${uuid}`,
        credentials: 'include',
      }),
    }),
    patchDirectoryItem: build.mutation<any, any>({
      query: ({
        route, type, uuid, value,
      }) => ({
        url: `/api/v1/${route}/${type}`,
        method: 'PATCH',
        credentials: 'include',
        body: {
          uuid,
          value,
        },
      }),
      invalidatesTags: ['directory'],
    }),
    postNewDirectoryItem: build.mutation<any, any>({
      query: ({
        route, type, value,
      }) => ({
        url: `/api/v1/${route}/${type}`,
        method: 'POST',
        credentials: 'include',
        body: {
          value,
        },
      }),
      invalidatesTags: ['directory'],
    }),
    getAddressesTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/types',
      }),
      providesTags: ['directory'],
    }),
    getAllCountries: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/countries',
      }),
      providesTags: ['directory'],
    }),
    getAllCities: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/cities',
      }),
      providesTags: ['directory'],
    }),
    getAllMessengers: build.query<any, any>({
      query: () => ({
        url: '/api/v1/messengers/types',
      }),
      providesTags: ['directory'],
    }),
    getAllContacts: build.query<any, any>({
      query: () => ({
        url: '/api/v1/contacts/types',
      }),
      providesTags: ['directory'],
    }),
    getCompaniesLegalForms: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/legal-forms',
      }),
      providesTags: ['directory'],
    }),
    getCompaniesBusinessTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/business-types',
      }),
      providesTags: ['directory'],
    }),
    rejectCompany: build.mutation<any, any>({
      query: ({ uuid, reason }) => ({
        url: `/api/v1/companies/moderate/change?uuid=${uuid}`,
        method: 'PATCH',
        credentials: 'include',
        body: {
          status: 'failed',
          reason,
        },
      }),
    }),
    approveCompany: build.mutation<any, any>({
      query: ({ uuid }) => ({
        url: `/api/v1/companies/moderate/change?uuid=${uuid}`,
        method: 'PATCH',
        credentials: 'include',
        body: {
          status: 'success',
          reason: '',
        },
      }),
    }),

  }),
});
