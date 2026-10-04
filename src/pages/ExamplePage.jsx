import { useSearchParams, Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowRight, ArrowLeft, Star } from "lucide-react";
import { getIndustry, industries } from "@/data/industries";

function ExampleNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <span className="font-mono text-[11px] tracking-widest text-steel">404 — NO EXAMPLE</span>
      <h1 className="mt-3 font-heading text-3xl font-bold text-carbon">Example not found</h1>
      <p className="mt-2 text-steel max-w-md">
        We don&apos;t have an example for that industry yet.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-carbon text-white font-mono text-[11px] tracking-widest px-5 py-3 hover:bg-mint hover:text-carbon transition-colors"
      >
        <ArrowLeft size={14} /> BACK HOME
      </Link>
    </div>
  );
}

export default function ExamplePage() {
  const [searchParams] = useSearchParams();
  const industrySlug = searchParams.get("industry") || searchParams.get("type");
  const industry = industrySlug ? getIndustry(industrySlug) : null;

  if (!industry) {
    return <ExampleNotFound />;
  }

  return (
    <div className="min-h-screen bg-white text-carbon">
      {/* Hero */}
      <section className="px-5 md:px-10 pt-24 pb-16 md:pt-32 md:pb-24 max-w-[1400px] mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-steel hover:text-carbon mb-8"
        >
          <ArrowLeft size={14} /> ALL EXAMPLES
        </Link>
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] tracking-widest text-mint">{industry.label?.toUpperCase()}</span>
          <h1 className="mt-3 font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {industry.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-steel leading-relaxed">
            {industry.tagline || industry.hero}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {industry.phone && (
              <a
                href={`tel:${industry.phone}`}
                className="inline-flex items-center gap-2 bg-carbon text-white font-mono text-[11px] tracking-widest px-5 py-3 hover:bg-mint hover:text-carbon transition-colors"
              >
                <Phone size={14} /> {industry.phone}
              </a>
            )}
            {industry.email && (
              <a
                href={`mailto:${industry.email}`}
                className="inline-flex items-center gap-2 border border-line font-mono text-[11px] tracking-widest px-5 py-3 hover:border-carbon transition-colors"
              >
                <Mail size={14} /> EMAIL
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      {industry.services && industry.services.length > 0 && (
        <section className="px-5 md:px-10 py-16 border-t border-line max-w-[1400px] mx-auto">
          <span className="font-mono text-[11px] tracking-widest text-steel">SERVICES</span>
          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold">What we offer</h2>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industry.services.map((s) => (
              <li
                key={s}
                className="border border-line p-5 font-mono text-[13px] tracking-wide"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Testimonials */}
      {industry.testimonials && industry.testimonials.length > 0 && (
        <section className="px-5 md:px-10 py-16 border-t border-line max-w-[1400px] mx-auto">
          <span className="font-mono text-[11px] tracking-widest text-steel">REVIEWS</span>
          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold">What clients say</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {industry.testimonials.map((t, i) => (
              <blockquote key={i} className="border border-line p-6">
                <div className="flex gap-1 text-mint mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-carbon">"{t.text}"</p>
                <footer className="mt-4 font-mono text-[11px] tracking-widest text-steel">
                  {t.name}{t.role ? ` · ${t.role}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Contact bar */}
      <section className="px-5 md:px-10 py-12 border-t border-line bg-carbon text-white">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold">Ready to get started?</h3>
            <p className="mt-1 text-white/70 text-sm">Contact us today for a free quote.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {industry.phone && (
              <a
                href={`tel:${industry.phone}`}
                className="inline-flex items-center gap-2 bg-mint text-carbon font-mono text-[11px] tracking-widest px-5 py-3 hover:bg-white transition-colors"
              >
                <Phone size={14} /> CALL NOW
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
