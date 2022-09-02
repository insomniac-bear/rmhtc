import { apiService } from './apiService';

export const adminAPI = apiService.injectEndpoints({
  endpoints: (build) => ({
    getModerateCompanies: build.query<any, any>({
      query: (page) => ({
        url: `/api/v1/companies/moderate${page ? `?page=${page}` : ''}`,
        credentials: 'include',
      }),
    }),
    getCurrentModerateCompany: build.query<any, any>({
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
