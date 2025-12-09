// example: app/layout.tsx
import "./globals.css";
import Logo from "./components/Logo";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, Arial, sans-serif", background: "var(--site-bg)", color: "var(--site-fg)" }}>
        <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 28px" }}>
          <Logo width={170} />
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
