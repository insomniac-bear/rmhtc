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
    }),
    getAddressesTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/types',
      }),
    }),
    getAllCountries: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/countries',
      }),
    }),
    getAllCities: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/cities',
      }),
    }),
    getAllMessengers: build.query<any, any>({
      query: () => ({
        url: '/api/v1/messengers/types',
      }),
    }),
    getAllContacts: build.query<any, any>({
      query: () => ({
        url: '/api/v1/contacts/types',
      }),
    }),
    getCompaniesLegalForms: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/legal-forms',
      }),
    }),
    getCompaniesBusinessTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/business-types',
      }),
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
