// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // Check if the request is for an admin page
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('token')?.value;

    // If there's no token, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply this middleware only to paths under /admin
};
