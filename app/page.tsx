// app/page.tsx
import SubscribeForm from "./components/SubscribeForm";

export default function Page() {
  return (
    <main className="container">
      {/* HEADER */}
     <header className="header fade-in">
  {/* TRIANGLE LOGO (PURE CSS) */}
  <div className="logo-triangle"></div>

  {/* BRAND TEXT */}
  <div className="site-title">SEEKYNC</div>
</header>



      {/* HERO */}
      <section className="hero-wrapper">
        <h1 className="h1-main fade-in delay-1">
          BUILD THE FUTURE.<br />
          PROMPT THE WORLD.
        </h1>
        
        <p className="lead fade-in delay-2">
          The premium community marketplace for AI creators.
        </p>

        {/* B&W CARD */}
        <div className="bw-card fade-in delay-2">
          <h3 className="card-title">Request Access</h3>
          <SubscribeForm />
          <div className="note">Secure. No Spam.</div>
        </div>
      </section>
    </main>
  );
}