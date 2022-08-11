import { apiService } from './apiService';

export const adminAPI = apiService.injectEndpoints({
  endpoints: (build) => ({
    getUserCompanies: build.mutation<any, any>({
      query: () => ({
        url: '/api/v1/companies/user',
        credentials: 'include',
      }),
    }),
  }),
});
