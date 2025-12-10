// app/components/Header.tsx
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="header">
      <Logo />
      <div className="site-title">SEEKYNC</div>
    </header>
  );
}
