// app/api/subscribe/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  // for safety: throw so deploy will show error in logs
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE env variables.");
}

const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  auth: { persistSession: false },
  global: { headers: { "x-my-app": "seekync" } },
});

export async function POST(req) {
  try {
    const body = await req.json();
    const email = (body?.email || "").toLowerCase().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "invalid email" }, { status: 400 });
    }

    // insert into table 'subscribers' (adjust table/column names to your schema)
    const { data, error } = await sb.from("subscribers").insert([{ email }], { returning: "minimal" });

    if (error) {
      // unique violation on email in Postgres => code 23505
      // supabase-js provides `error` object with `code` and `message`
      // but sometimes it returns as text; check error.code or error.message
      if (error?.code === "23505" || (error?.message && error.message.includes("duplicate key value"))) {
        return NextResponse.json({ message: "already exists" }, { status: 409 });
      }
      console.error("Supabase insert error", error);
      return NextResponse.json({ message: "db error" }, { status: 500 });
    }

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (err) {
    console.error("subscribe route error", err);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
