import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    // Redirect authenticated users away from auth pages
    if (pathname.startsWith('/auth') && token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Protect dashboard, settings, and protected API routes
    if (
      (pathname.startsWith('/dashboard') ||
        pathname.startsWith('/settings') ||
        pathname.startsWith('/api/protected')) &&
      !token
    ) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Add role-based access control if needed
    // if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
    //   return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/error', request.url));
  }
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/protected/:path*',
    // '/admin/:path*', // Uncomment if you have admin routes
  ],
};
