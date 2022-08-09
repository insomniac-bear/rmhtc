import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const { cookies } = req;

  const url = req.nextUrl.clone();

  const jwt = cookies.refreshToken || cookies.accessToken;

  if (url?.pathname.includes('/profile') && !jwt) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // if (cookies.accessToken) {
  //   const user = await fetch('http://localhost:8000/api/v1/auth/check', {
  //     credentials: 'include',
  //     headers: {
  //       Authorization: `Bearer ${cookies.accessToken}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         return Promise.reject(new Error(`Ошибка: ${res.status}`));
  //       }
  //       return res.json();
  //     });
  // }

  if (jwt && (
    url?.pathname.includes('/signup')
    || url?.pathname.includes('/login')
    || url?.pathname.includes('/signup-success')
    || url?.pathname.includes('/verify-email-success')
  )) {
    url.pathname = '/profile/summary';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
