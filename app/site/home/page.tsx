// app/site/home/page.tsx
import React from "react";

export default function SiteHome() {
  return (
    <div style={{ padding: 60, color: "#fff" }}>
      <h1 style={{ fontSize: 40 }}>Seekync — Main App (Work in progress)</h1>
      <p style={{ marginTop: 12, opacity: 0.8 }}>
        This is the main website area. Build profiles, creators pages, marketplace, social features
        and more here under app/site/*.
      </p>

      {/* example links */}
      <div style={{ marginTop: 24 }}>
        <a href="/site/home" style={{ color: "#fff", marginRight: 18 }}>Home</a>
        <a href="/site/market" style={{ color: "#fff" }}>Market</a>
      </div>
    </div>
  );
}
