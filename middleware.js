import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN);

  // Define routes that should not be accessed by logged-in users
  const restrictedForLoggedIn = ["/", "/login", "/register"]; // Add your restricted routes here

  // Get the current path
  const currentPath = req.nextUrl.pathname;

  // Redirect logged-in users trying to access restricted routes
  if (token && restrictedForLoggedIn.includes(currentPath)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard"; // Redirect to dashboard or any appropriate page
    return NextResponse.redirect(url);
  }

  // Redirect non-logged-in users trying to access protected routes
  if (!token && currentPath.startsWith("/dashboard")) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow access to other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/", "/login", "/register"], // Add all routes to be handled by this middleware
};
