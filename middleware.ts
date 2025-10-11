
// import { jwtVerify } from "jose";
// import { MiddlewareConfig, NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export async function middleware (request: NextRequest) {
// 	const token = request.cookies.get('token')?.value;

// 	if (!token) {
// 		return NextResponse.redirect(new URL('/login', request.url))
// 	}

// 	// const payload = jwt.verify(token, process.env.JWT_SECRET!);

// 	const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!)
// 	try {
// 		const { payload } = await jwtVerify(token, encodedSecret, {
// 			algorithms: ["HS256"]
// 		})


// 		if (!payload) {
// 			return NextResponse.redirect(new URL('/login', request.url))
// 		} else {
// 			return NextResponse.next();
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		return NextResponse.redirect(new URL('/login', request.url))
// 	}

// }


// export const config: MiddlewareConfig = {
// 	matcher: ["/admin-room/:path*", "/profile"]
// }


import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // public routes accessible without auth
  const PUBLIC_PATHS = ["/", "/login", "/register", "/rooms"];

  // Skip auth check for public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  //Get JWT token from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!);

    const { payload } = await jwtVerify(token, encodedSecret, {
      algorithms: ["HS256"],
    });

    if (!payload?.id) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    //Auth successful, allow request
    return NextResponse.next();
  } catch (error) {
    console.error("❌ JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Only run middleware on protected routes
export const config = {
  matcher: ["/admin-room/:path*", "/profile", "/booking/:path*"], 
};
