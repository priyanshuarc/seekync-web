// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://seekync.in"),

  title: {
    default: "Seekync — AI Creator Marketplace",
    template: "%s | Seekync",
  },

  description:
    "Seekync is the next-generation AI creator marketplace — discover prompts, tools, packs, workflows, and exclusive creator subscriptions. Join early to unlock premium AI creativity.",

  keywords: [
    "AI marketplace",
    "AI prompts",
    "creator tools",
    "prompt packs",
    "AI workflows",
    "Seekync",
    "AI subscriptions",
    "AI creator community",
    "AI tools India",
    "prompt marketplace",
  ],

  authors: [{ name: "Seekync Team" }],
  creator: "Seekync",

  alternates: {
    canonical: "https://seekync.in",
  },

  openGraph: {
    type: "website",
    url: "https://seekync.in",
    title: "Seekync — AI Creator Marketplace",
    description:
      "A community marketplace for AI creators — discover prompts, packs, subscriptions, and creative tools.",
    siteName: "Seekync",
    images: [
      {
        url: "https://seekync.in/og-image.png", // Add later (optional)
        width: 1200,
        height: 630,
        alt: "Seekync — AI Creator Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Seekync — AI Creator Marketplace",
    description:
      "Premium marketplace for AI creators — prompts, packs, workflows, and tools.",
    images: ["https://seekync.in/og-image.png"], // Optional
    creator: "@seekync",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
