// app/components/SubscribeForm.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "exists" | "error";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  function resetMessages() {
    setMessage("");
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetMessages();

    // basic client-side validation
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.status === 200) {
        setStatus("success");
        setMessage("Thanks — you’re on the list. We’ll email you updates.");
        setEmail("");
        return;
      }

      if (res.status === 409) {
        // duplicate email
        setStatus("exists");
        setMessage("You’re already subscribed. Thanks!");
        return;
      }

      // try to parse a JSON message if present
      let txt = await res.text();
      try {
        const j = JSON.parse(txt || "{}");
        if (j?.message) txt = j.message;
      } catch (err) {
        // keep raw text
      }

      setStatus("error");
      setMessage(txt || `Server error (${res.status}). Try again later.`);
    } catch (err) {
      console.error("subscribe error:", err);
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
      <label htmlFor="email" style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>
        Get early access
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          id="email"
          type="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={status === "error"}
          aria-describedby="sub-msg"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "transparent",
            color: "inherit",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          aria-disabled={status === "loading" || status === "success"}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            border: "none",
            background: "white",
            color: "black",
            cursor: status === "loading" || status === "success" ? "default" : "pointer",
            fontWeight: 700,
          }}
        >
          {status === "loading" ? "Saving…" : status === "success" ? "Saved" : "Notify me"}
        </button>
      </div>

      <div id="sub-msg" style={{ marginTop: 8, color: status === "error" ? "#ff6b6b" : status === "exists" ? "#ffd966" : "#9b9b9b" }}>
        {message || "Privacy first — emails stored securely. No spam."}
      </div>
    </form>
  );
}
