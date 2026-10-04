import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { industries } from "@/data/industries";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return industries.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.type.includes(q) ||
        i.name.toLowerCase().includes(q)
    );
  }, [query]);

  const exact = matches.length > 0 ? matches[0] : null;
  const onSubmit = (e) => {
    e.preventDefault();
    if (exact) navigate(`/ex/${exact.type}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-mono text-[15px] font-bold tracking-tight">
            promtpages<span className="text-mint">.app</span>
          </Link>
          <span className="font-mono text-[10px] tracking-widest text-steel">
            $5 / PAGE
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-5 md:px-10 py-16">
        <div className="w-full max-w-2xl">
          <h1 className="font-heading font-bold tracking-tight text-carbon leading-[0.95] text-5xl md:text-6xl text-center">
            SEE AN <span className="text-mint">EXAMPLE</span>.
          </h1>
          <p className="mt-4 text-steel text-[15px] md:text-lg text-center leading-relaxed">
            Type your industry to preview a finished one-page site — built on the same $5/page system.
          </p>

          <form onSubmit={onSubmit} className="mt-10 relative">
            <div className="flex items-center gap-3 border-b-2 border-carbon pb-3">
              <Search size={22} className="text-carbon shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="lawn, bakery, plumber…"
                autoFocus
                className="min-w-0 flex-1 bg-transparent outline-none font-heading text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-carbon placeholder:text-steel/40"
                autoComplete="off"
              />
              {exact && (
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-1.5 bg-mint text-carbon font-mono text-[11px] tracking-widest px-4 py-2.5"
                >
                  LAUNCH PREVIEW <ArrowRight size={14} />
                </button>
              )}
            </div>
          </form>

          {query && (
            <div className="mt-4">
              {matches.length > 0 ? (
                <ul className="grid sm:grid-cols-2 gap-2">
                  {matches.slice(0, 6).map((m) => (
                    <li key={m.type}>
                      <Link
                        to={`/ex/${m.type}`}
                        className="w-full text-left flex items-center justify-between border border-line px-4 py-3 hover:border-carbon hover:bg-carbon hover:text-white transition-colors group"
                      >
                        <span className="font-mono text-[12px] tracking-wide">{m.label}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-mono text-[12px] text-steel">
                  No exact match — try one of the industries below.
                </p>
              )}
            </div>
          )}

          <div className="mt-12 border-t border-line pt-6">
            <p className="font-mono text-[10px] tracking-widest text-steel mb-3">
              ALL EXAMPLES
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {industries.map((ind) => (
                <li key={ind.type}>
                  <Link
                    to={`/ex/${ind.type}`}
                    className="font-mono text-[11px] tracking-wide text-steel hover:text-mint transition-colors"
                  >
                    {ind.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] tracking-widest text-steel/70">
              More examples coming soon.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-[10px] tracking-widest text-steel">
            © {new Date().getFullYear()} PROMTPAGES.APP
          </p>
          <p className="font-mono text-[10px] tracking-widest text-steel">
            BUILT ON THE $5/PAGE SYSTEM
          </p>
        </div>
      </footer>
    </div>
  );
}
