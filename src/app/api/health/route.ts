import { NextResponse } from "next/server";
export async function GET(request: Request) {
    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => (headers[key] = value));
    return NextResponse.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        message: "Keep-alive ping successful",
        echo_headers: headers,
        env: process.env.NODE_ENV
    }, { status: 200 });
}
