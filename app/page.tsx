// app/page.tsx
import SubscribeForm from "./components/SubscribeForm";


export default function Page() {
  return (
    <main className="container">
      <header className="header">
        <img src="/logo.png" alt="Seekync" className="logo" />
        <div className="site-title">Seekync</div>
      </header>

      <section className="hero">
        <div>
          <h1 className="h1">Coming soon</h1>
          <p className="lead">
            A community marketplace for AI creators — prompts, packs, and subscriptions. Subscribe for early access and updates.
          </p>
        </div>

        <aside className="card">
          <h3 style={{marginBottom:8}}>Get early access</h3>
          <SubscribeForm />
          <div className="note">Privacy first — emails stored securely. No spam. Unsubscribe anytime.</div>
        </aside>
      </section>
    </main>
  );
}
