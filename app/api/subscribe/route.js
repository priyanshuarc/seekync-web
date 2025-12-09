// app/api/subscribe/route.js
import { NextResponse } from "next/server";
import { getSupabaseRestConfig } from "../../../lib/supabaseServer";

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const { restUrl, headers } = getSupabaseRestConfig();

    const payload = { email, created_at: new Date().toISOString() };
    const res = await fetch(`${restUrl}/subscribers`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ message: "Supabase insert error", detail: text }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ message: "saved", data }, { status: 200 });
  } catch (err) {
    console.error("subscribe route error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
