import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET); // Convert secret to Uint8Array

// Helper function to decode the JWT and extract user role
const decodeToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // Extract the role from the decoded payload
  } catch (err) {
    return null; // Invalid token or decoding error
  }
};

const isAdmin = async (req) => {
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN)?.value; // Get token from cookies
  const decodedToken = await decodeToken(token);
  const restrictedPaths = ["/my-progress", "/register", "/"]; // Restricted routes for admin users

  if (
    decodedToken?.role === 1 &&
    restrictedPaths.includes(req.nextUrl.pathname)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard"; // Redirect to dashboard
    return NextResponse.redirect(url);
  }
  return null; // No redirection required
};

const isMember = async (req) => {
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN)?.value; // Get token from cookies
  const decodedToken = await decodeToken(token);
  const restrictedPaths = [
    "/statistics",
    "/population",
    "/puroks",
    "/",
    "/users",
    "/users/:id",
    "/purok/:id",
  ]; // Restricted routes for admin users

  if (
    decodedToken?.role === 2 &&
    restrictedPaths.includes(req.nextUrl.pathname)
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard"; // Redirect to dashboard
    return NextResponse.redirect(url);
  }
  return null; // No redirection required
};

const isAnonymous = async (req) => {
  const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN)?.value; // Get token from cookies
  const decodedToken = await decodeToken(token);
  const restrictedPaths = [
    "/dashboard",
    "/events",
    "/my-progress",
    "/statistics",
    "/puroks",
    "/population",
    "/users",
    "/users/:id",
    "/purok/:id",
  ]; // Restricted routes for anonymous users

  if (!decodedToken && restrictedPaths.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; // Redirect to homepage
    return NextResponse.redirect(url);
  }
  return null; // No redirection required
};

export async function middleware(req) {
  // Evaluate redirection logic for both roles
  const adminResponse = await isAdmin(req);
  if (adminResponse) return adminResponse;

  const memberResponse = await isMember(req);
  if (memberResponse) return memberResponse;

  const isAnonymousResponse = await isAnonymous(req);
  if (isAnonymousResponse) return isAnonymousResponse;

  // If no redirection is needed, continue the request
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
    "/statistics", // Include statistics route for the isMember check
    "/population",
    "/puroks",
    "/users",
    "/users/:id",
    "/purok/:id",
  ],
};
