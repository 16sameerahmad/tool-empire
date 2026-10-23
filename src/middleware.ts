import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Permanent host consolidation: the legacy *.vercel.app domain redirects
// everything (308) to the canonical domain tulyro.online, preserving path
// and query. Keeps all search equity on one brand domain.
export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  if (host === "tulyrotools.vercel.app") {
    const url = new URL(req.url);
    url.protocol = "https:";
    url.host = "tulyro.online";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
