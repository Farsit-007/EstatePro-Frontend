import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  tenant: [
    /^\/tenant/,
    /^\/profile/,
    /^\/change-password/,
    /^\/edit-profile/,
  ],
  landlord: [
    /^\/landlord/,
    /^\/profile/,
    /^\/change-password/,
    /^\/edit-profile/,
    /^\/house-list/,
  ],
  admin: [
    /^\/admin/,
    /^\/profile/,
    /^\/change-password/,
    /^\/edit-profile/,
    /^\/house-list/,
  ],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/admin",
    "/admin/:page",
    "/tenant",
    "/tenant/:page",
    "/landlord",
    "/landlord/:page",
    "/profile",
    "/edit-profile",
    "/change-password",
    "/house-list/:page",
  ],
};
