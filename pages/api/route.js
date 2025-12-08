// app/api/creator/route.js
import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.warn("Supabase env missing");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, creator_id, images = [], price = null } = body || {};

    if (!creator_id) return NextResponse.json({ error: "Missing creator_id" }, { status: 400 });

    // Insert to Supabase via REST (service_role)
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        creator_id,
        title,
        content,
        images,
        price,
        published: false,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("Supabase insert error", json);
      return NextResponse.json({ error: "Failed to insert post", details: json }, { status: 500 });
    }

    return NextResponse.json({ post: json[0] });
  } catch (err) {
    console.error("upload_post error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export function GET() {
  // simple sanity GET to verify route exists
  return NextResponse.json({ ok: true, route: "app/api/creator/route.js (GET)" });
}
