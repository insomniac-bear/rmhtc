/* eslint-disable react-hooks/rules-of-hooks */
import { NextRequest, NextResponse } from 'next/server';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function middleware(req: NextRequest) {
  const { cookies } = req;

  const url = req.nextUrl.clone();

  // fetch(`${API_URL}/api/v1/users/authentication`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'include',
  // })
  //   .catch(() => {
  //     console.log(cookies);
  //     return NextResponse.redirect('/login');
  //   });

  const jwt = cookies.refreshToken || cookies.accessToken;

  if (url?.pathname.includes('/profile') && !jwt) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

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
