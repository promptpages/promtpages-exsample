import { useParams, Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowLeft, Star } from "lucide-react";
import { getIndustry } from "@/data/industries";

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
  const { type } = useParams();
  const industry = type ? getIndustry(type) : null;

  if (!industry) {
    return <ExampleNotFound />;
  }

  const services = industry.services || [];
  const testimonials = industry.testimonials || [];

  return (
    <div className="min-h-screen bg-white text-carbon">
      {/* Top bar */}
      <header className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="font-mono text-[13px] font-bold tracking-tight">
            promtpages<span className="text-mint">.app</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-steel hover:text-carbon"
          >
            <ArrowLeft size={14} /> ALL EXAMPLES
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 md:px-10 pt-12 pb-16 md:pt-20 md:pb-24 max-w-[1400px] mx-auto">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] tracking-widest text-mint">
            {(industry.label || industry.type || "").toUpperCase()}
          </span>
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

        {/* Contact details */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-3xl">
          {industry.address && (
            <div className="border border-line p-4">
              <div className="flex items-center gap-2 text-steel font-mono text-[10px] tracking-widest">
                <MapPin size={12} /> ADDRESS
              </div>
              <p className="mt-2 text-sm font-medium">
                {industry.address}
                {industry.city ? <><br />{industry.city}</> : null}
              </p>
            </div>
          )}
          {industry.hours && (
            <div className="border border-line p-4">
              <div className="flex items-center gap-2 text-steel font-mono text-[10px] tracking-widest">
                <Clock size={12} /> HOURS
              </div>
              <p className="mt-2 text-sm font-medium">{industry.hours}</p>
            </div>
          )}
          {industry.phone && (
            <div className="border border-line p-4">
              <div className="flex items-center gap-2 text-steel font-mono text-[10px] tracking-widest">
                <Phone size={12} /> PHONE
              </div>
              <p className="mt-2 text-sm font-medium">{industry.phone}</p>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="px-5 md:px-10 py-16 border-t border-line max-w-[1400px] mx-auto">
          <span className="font-mono text-[11px] tracking-widest text-steel">SERVICES</span>
          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold">What we offer</h2>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => {
              const name = typeof s === "string" ? s : s.name;
              const price = typeof s === "object" ? s.price : null;
              const unit = typeof s === "object" ? s.unit : null;
              const desc = typeof s === "object" ? s.desc : null;
              return (
                <li key={i} className="border border-line p-5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[13px] tracking-wide font-medium">{name}</span>
                    {price && (
                      <span className="font-mono text-[12px] text-mint whitespace-nowrap">
                        {price}{unit ? ` ${unit}` : ""}
                      </span>
                    )}
                  </div>
                  {desc && <p className="mt-2 text-sm text-steel leading-relaxed">{desc}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Features */}
      {industry.features && industry.features.length > 0 && (
        <section className="px-5 md:px-10 py-12 border-t border-line max-w-[1400px] mx-auto">
          <ul className="flex flex-wrap gap-3">
            {industry.features.map((f) => (
              <li
                key={f}
                className="font-mono text-[11px] tracking-widest border border-line px-3 py-1.5 text-steel"
              >
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="px-5 md:px-10 py-16 border-t border-line max-w-[1400px] mx-auto">
          <span className="font-mono text-[11px] tracking-widest text-steel">REVIEWS</span>
          <h2 className="mt-2 font-heading text-2xl md:text-3xl font-bold">What clients say</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
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

      {/* CTA */}
      <section className="px-5 md:px-10 py-12 border-t border-line bg-carbon text-white">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold">Ready to get started?</h3>
            <p className="mt-1 text-white/70 text-sm">Contact us today for a free quote.</p>
          </div>
          {industry.phone && (
            <a
              href={`tel:${industry.phone}`}
              className="inline-flex items-center gap-2 bg-mint text-carbon font-mono text-[11px] tracking-widest px-5 py-3 hover:bg-white transition-colors"
            >
              <Phone size={14} /> CALL NOW
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
