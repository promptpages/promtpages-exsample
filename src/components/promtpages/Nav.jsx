import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "HOW IT WORKS", href: "#how-it-works" },
  { label: "PRICING", href: "#pricing" },
  { label: "WHY US", href: "#why-us" },
  { label: "EXAMPLES", href: "#examples" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-white border-b border-line" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="font-mono text-[13px] tracking-tight text-carbon font-bold">
              promtpages<span className="text-mint">.app</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] tracking-widest text-steel hover:text-carbon transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex font-mono text-[11px] tracking-widest text-carbon border border-line px-2.5 py-1">
              $5<span className="text-steel">/PAGE</span>
            </span>
            <a
              href="#pricing"
              className="hidden md:inline-flex bg-carbon text-white font-mono text-[11px] tracking-widest px-4 py-2.5 hover:bg-mint hover:text-carbon transition-colors"
            >
              GET STARTED
            </a>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-1 text-carbon"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-carbon/40" onClick={() => setOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-[78%] max-w-[320px] bg-white border-l border-line transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-line">
            <span className="font-mono text-[13px] font-bold text-carbon">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[12px] tracking-widest text-steel hover:text-carbon"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="mt-4 bg-carbon text-white font-mono text-[11px] tracking-widest px-4 py-3 text-center"
            >
              GET STARTED
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
}
