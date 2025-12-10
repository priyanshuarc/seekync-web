// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "SEEKYNC — Marketplace for AI creators",
  description:
    "SEEKYNC — Community marketplace for AI creators: prompts, packs, and subscriptions. Subscribe for early access and updates.",
  keywords:
    "AI marketplace, prompts, AI creators, digital packs, subscriptions, early access, Seekync",
  openGraph: {
    title: "SEEKYNC — Marketplace for AI creators",
    description:
      "Community marketplace for AI creators — prompts, packs, and subscriptions. Subscribe for early access.",
    url: "https://seekync.in",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
