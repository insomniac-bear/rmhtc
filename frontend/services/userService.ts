import { apiService } from './apiService';

export const userAPI = apiService.injectEndpoints({
  endpoints: (build) => ({
    signupUser: build.mutation<{email: string}, any>({
      query: (email) => ({
        url: 'api/v1/auth/registration',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    confirmEmail: build.mutation<{token: string}, any>({
      query: (token) => ({
        url: `api/v1/auth/email-verify?emailToken=${token}`,
        method: 'GET',
      }),
    }),
    confirmUserInfo: build.mutation<any, any>({
      query: ({
        uuid, password, businessRole, company,
      }) => ({
        url: 'api/v1/auth/finish-registration',
        method: 'POST',
        credentials: 'include',
        body: {
          userData: {
            uuid,
            password,
            businessRole,
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
        url: 'api/v1/auth/login',
        method: 'POST',
        credentials: 'include',
        body: { email, password },
      }),
    }),
    logOut: build.mutation<any, any>({
      query: () => ({
        url: 'api/v1/auth/logout',
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
        formData.append('image', file);

        const response = await fetchWithBQ({
          url: '/api/v1/users/avatar',
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        return response;
      },
    }),
    checkAuth: build.mutation<any, any>({
      query: () => ({
        url: '/api/v1/auth/check',
        credentials: 'include',
      }),
    }),
    refreshToken: build.mutation<any, any>({
      query: () => ({
        url: '/api/v1/auth/refresh',
        credentials: 'include',
      }),
    }),
    getUserCompanies: build.mutation<any, any>({
      query: () => ({
        url: '/api/v1/companies/user',
        credentials: 'include',
      }),
    }),
    editCompany: build.mutation<any, any>({
      query: (data) => ({
        method: 'PATCH',
        url: '/api/v1/companies/user',
        credentials: 'include',
        body: data,
      }),
    }),
    getLegalForms: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/legal-forms',
      }),
    }),
    getBusinessTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/companies/business-types',
      }),
    }),
    getAddressesTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/types',
      }),
    }),
    getCountries: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/countries',
      }),
    }),
    getCities: build.query<any, any>({
      query: () => ({
        url: '/api/v1/address/cities',
      }),
    }),
    getMessengersTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/messengers/types',
      }),
    }),
    getContactsTypes: build.query<any, any>({
      query: () => ({
        url: '/api/v1/contacts/types',
      }),
    }),
  }),
});
