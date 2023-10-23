import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// // This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublic = path === "/auth/login" || path == "/auth/signup"

    const refreshToken = request.cookies.get('refreshToken')
    console.log('refreshToken: ', refreshToken)
    if (isPublic && refreshToken)
		return NextResponse.redirect(new URL('/profile', request.nextUrl))

    if (!isPublic && !refreshToken) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
        "/profile/:path",
        "/auth/login",
        "/auth/signup",
    ],
}
