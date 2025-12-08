import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("sb-access-token")?.value;
  const url = req.nextUrl;
  const pathname = url.pathname;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  // 🔴 1. Usuário tentando acessar páginas privadas SEM login
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🟢 2. Usuário já logado tentando acessar login/signup
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🟢 3. Caso contrário, libera o acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/", // protege a home
    "/login",
    "/signup",
  ],
};
