export async function POST(req) {
  try {
    const body = await req.json();

    // TEMP TEST RESPONSE — to verify POST works
    return new Response(JSON.stringify({
      ok: true,
      received: body,
      debug: "POST /api/r2-presign working"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      ok: false,
      error: String(err)
    }), { status: 500 });
  }
}
