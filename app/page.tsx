// app/page.tsx
import React from "react";
import dynamic from "next/dynamic";

// small server-side landing import (server component can import directly)
import LandingPage from "./landing/page";

// dynamic import for the heavy main site (client/server as needed)
const MainSite = dynamic(() => import("./site/home/page").then(m => m.default), {
  ssr: true, // set true if main site needs SSR; false to client-only
  loading: () => <div style={{padding:40,color:'#fff'}}>Loading site...</div>,
});

export default function Page() {
  // read environment switch
  const mode = process.env.NEXT_PUBLIC_SITE_MODE || "landing";

  if (mode === "main") {
    // render the main site root (this will render /app/site/home/page)
    return <MainSite />;
  }

  // default: landing
  return <LandingPage />;
}
