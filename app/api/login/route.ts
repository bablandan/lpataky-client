import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_PROD_URL;

export async function POST(req: Request) {
  const body = await req.text();

  const backendRes = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await backendRes.text();

  return new NextResponse(data, {
    status: backendRes.status,
    headers: {
      "Content-Type":
        backendRes.headers.get("Content-Type") ?? "application/json",
    },
  });
}