// app/site/layout.tsx
import React from "react";
import "../../globals.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* top-level nav (simple for now) */}
        <nav style={{ padding: 20, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="logo-triangle" />
            <div className="site-title">SEEKYNC</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <a href="/profile" style={{ color: "#fff", marginRight: 16 }}>Profile</a>
            <a href="/site/home" style={{ color: "#fff" }}>Home</a>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
