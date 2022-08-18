import { apiService } from './apiService';

export const adminAPI = apiService.injectEndpoints({
  endpoints: (build) => ({
    getModerateCompanies: build.mutation<any, any>({
      query: () => ({
        url: '/api/v1/companies/moderate',
        credentials: 'include',
      }),
    }),
    getCurrentCompany: build.query<any, any>({
      query: (uuid: string) => ({
        url: `/api/v1/companies/moderate/${uuid}`,
        credentials: 'include',
      }),
    }),
    rejectCompany: build.mutation<any, any>({
      query: ({ uuid, reason }) => ({
        url: '/api/v1/companies/moderate/decline',
        method: 'PATCH',
        credentials: 'include',
        body: {
          reason,
        },
        params: {
          uuid,
        },
      }),
    }),
  }),
});
