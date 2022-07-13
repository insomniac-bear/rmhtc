import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  endpoints: (build) => ({
    signupUser: build.mutation<{email: string}, any>({
      query: (email) => ({
        url: 'api/v1/registration',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    confirmUserInfo: build.mutation<any, any>({
      query: ({
        uuid, password, role, company,
      }) => ({
        url: 'api/v1/finish-registration',
        method: 'POST',
        credentials: 'include',
        body: {
          userData: {
            uuid,
            password,
            role,
          },
          companyData: {
            name: company,
          },
        },
      }),
    }),
    loginUser: build.mutation<{email: string, password: string}, any>({
      query: ({
        email, password,
      }) => ({
        url: 'api/v1/login',
        method: 'POST',
        credentials: 'include',
        body: { email, password },
      }),
    }),
    logOut: build.mutation<any, any>({
      query: () => ({
        url: 'api/v1/logout',
        method: 'GET',
        credentials: 'include',
      }),
    }),
    updateUser: build.mutation<any, any>({
      query: (data) => ({
        url: 'api/v1/users',
        method: 'PATCH',
        credentials: 'include',
        body: data,
      }),
    }),
    updateAvatar: build.mutation<any, any>({
      async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await fetchWithBQ({
          url: '/api/v1/users/avatar',
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        return response;
      },
    }),
    checkAuth: build.mutation({
      query: () => ({
        url: '/api/v1/check-auth',
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});
