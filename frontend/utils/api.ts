const API_URL = 'http://localhost:8000';

const checkResponce = (res: Response) => {
  if (!res.ok) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const registerUser = (email: string) => fetch(`${API_URL}/api/v1/registration`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
})
  .then(checkResponce)
  .then((res) => {
    if (res.status === 'success') return res;
    return Promise.reject(res);
  });

export const verifyEmailToken = (token: string) => fetch(`${API_URL}/api/v1/tokens/email-verify`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    emailToken: token,
  }),
})
  .then(checkResponce)
  .then((res) => {
    if (res.status === 'success') return res;
    return Promise.reject(res);
  })
  .catch((error) => {
    throw new Error(error);
  });

export const setPrimaryPassword = (uuid: string, password: string, role: string, company: string) => fetch(`${API_URL}/api/v1/finish-registration`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    userData: {
      uuid,
      password,
      role,
    },
    companyData: {
      name: company,
    },
  }),
})
  .then(checkResponce)
  .then((res) => {
    if (res.status === 'success') return res;
    return Promise.reject(res);
  });

// export const login = (email: string, password: string) => fetch(`${API_URL}/api/v1/users/authorization`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   credentials: 'include',
//   body: JSON.stringify({ email, password }),
// })
//   .then(checkResponce)
//   .then((res) => {
//     if (res.service_data.status === 'success' && res.service_data.message === 'redirect') return res;
//     return Promise.reject(res);
//   });

// export const authUser = () => fetch(`${API_URL}/api/v1/users/authentication`, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   credentials: 'include',
// })
//   .then(checkResponce)
//   .then((res) => {
//     if (res.service_data.status === 'success' && res.service_data.message === 'redirect') return res;
//     return Promise.reject(res);
//   })
//   .catch((error) => {
//     throw new Error(error);
//   });

// export const updateUser = (newUserData: any, accessToken: string) => fetch(`${API_URL}/api/v1/users/personal-data`, {
//   method: 'PATCH',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${accessToken}`,
//   },
//   credentials: 'include',
//   body: JSON.stringify(newUserData),
// })
//   .then(checkResponce)
//   .then((res) => {
//     if (res.service_data.status === 'success' && res.service_data.message === 'redirect') return res;
//     return Promise.reject(res);
//   })
//   .catch((error) => {
//     throw new Error(error);
//   });

// export const logoutUser = () => fetch(`${API_URL}/api/v1/users/logout`, {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   credentials: 'include',
// })
//   .then(checkResponce)
//   .then((res) => {
//     if (res.service_data.status === 'success' && res.service_data.message === 'redirect') return res;
//     return Promise.reject(res);
//   });
