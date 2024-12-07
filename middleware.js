import { NextResponse } from "next/server";

const redirectAuthenticatedUser = (req) => {
  const restrictedForLoggedIn = ["/", "/login", "/register"]; // Restricted routes for authenticated users
  const currentPath = req.nextUrl.pathname; // Current path
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN); // Get token from cookies

  // Redirect logged-in users from restricted routes
  if (token && restrictedForLoggedIn.includes(currentPath)) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard"; // Redirect to dashboard
    return NextResponse.redirect(url);
  }

  return null; // No redirection required
};

const redirectNonAuthenticatedUser = (req) => {
  const authenticatedRoutes = ["/dashboard", "/events", "/my-progress"]; // Protected routes for authenticated users
  const currentPath = req.nextUrl.pathname; // Current path
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN); // Get token from cookies

  // Redirect non-logged-in users trying to access authenticated routes
  if (!token && authenticatedRoutes.includes(currentPath)) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // Redirect to login
    return NextResponse.redirect(url);
  }

  return null; // No redirection required
};

export function middleware(req) {
  // Redirect authenticated users first
  const authRedirect = redirectAuthenticatedUser(req);
  if (authRedirect) return authRedirect;

  // Redirect non-authenticated users
  const nonAuthRedirect = redirectNonAuthenticatedUser(req);
  if (nonAuthRedirect) return nonAuthRedirect;

  // Allow access if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/events",
    "/my-progress",
  ], // Routes handled by this middleware
};
