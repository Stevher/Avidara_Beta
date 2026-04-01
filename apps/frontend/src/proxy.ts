import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Generate a nonce for inline scripts (CSP)
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64");
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const nonce = generateNonce();

  // Content Security Policy
  const isDev = process.env.NODE_ENV !== "production";
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.amazonaws.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    ...(process.env.NODE_ENV === "production"
      ? ["upgrade-insecure-requests"]
      : []),
  ];

  const csp = cspDirectives.join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);

  // Additional security for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("X-Content-Type-Options", "nosniff");
  }

  return response;
}

// Configure which paths the proxy runs on
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
