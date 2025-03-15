import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
	const session = auth.api.getSession(request)
		// Debugging Logs
		console.log("Middleware triggered on:", request.url);
		console.log("Session Cookie:", session);
		console.log("Request Headers:", request);

	// Check if session exists
	if (!session) {
		const response = NextResponse.redirect(new URL("/login", request.url));

		// Prevent caching issues
		//response.headers.set("Cache-Control", "no-store");

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};