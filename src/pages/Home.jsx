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
        i.slug.toLowerCase().includes(q) ||
        (i.keywords && i.keywords.some((k) => k.toLowerCase().includes(q)))
    ).slice(0, 8);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (matches.length === 1) {
      navigate(`/example?industry=${matches[0].slug}`);
    } else if (query.trim()) {
      navigate(`/example?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-void text-white flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
          PromptPages
        </h1>
        <p className="text-lg md:text-xl text-steel max-w-xl mb-8">
          High-converting landing pages for any industry. Built in minutes.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search industries..."
            className="w-full bg-charcoal border border-border rounded-full py-3 pl-12 pr-4 text-white placeholder:text-steel focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </form>

        {matches.length > 0 && (
          <div className="mt-4 w-full max-w-md bg-charcoal border border-border rounded-xl overflow-hidden text-left">
            {matches.map((i) => (
              <Link
                key={i.slug}
                to={`/example?industry=${i.slug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-void/50 transition-colors"
              >
                <span>{i.label}</span>
                <ArrowRight className="w-4 h-4 text-steel" />
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="py-8 text-center border-t border-border">
        <div className="space-y-1">
          <p className="font-mono text-[10px] tracking-widest text-steel">
            PROMPTPAGES.APP
          </p>
          <p className="font-mono text-[10px] tracking-widest text-steel">
            BUILT ON THE $5/PAGE SYSTEM
          </p>
        </div>
      </footer>
    </div>
  );
}
