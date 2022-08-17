import { apiService } from './apiService';

export const adminAPI = apiService.injectEndpoints({
  endpoints: (build) => ({
    getModerateCompanies: build.mutation<any, any>({
      query: () => ({
        url: '/api/v1/companies/moderate',
        credentials: 'include',
      }),
    }),
  }),
});