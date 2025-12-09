// app/components/SubscribeForm.tsx
"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const txt = await res.text();
        setStatus("error");
        setMessage("Server error: " + (txt || res.statusText));
        return;
      }

      setStatus("success");
      setMessage("Thanks — we saved your email!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
      <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: "white" }}>
        Get early access
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #444",
            background: "#000",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            border: "none",
            background: "#fff",
            color: "#000",
            cursor: "pointer",
          }}
        >
          {status === "loading" ? "Saving…" : "Notify me"}
        </button>
      </div>

      <div style={{ marginTop: 8, color: status === "error" ? "#ff6b6b" : "#9b9b9b" }}>
        {message || "Privacy first — emails stored securely. No spam."}
      </div>
    </form>
  );
}
