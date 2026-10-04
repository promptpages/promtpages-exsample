import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export default function AdminStats() {
  const [state, setState] = useState("loading"); // loading | denied | ready
  const [record, setRecord] = useState(null);
  const [deployed, setDeployed] = useState("");
  const [today, setToday] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      let user = null;
      try {
        user = await base44.auth.me();
      } catch {
        user = null;
      }
      if (!user || user.role !== "admin") {
        setState("denied");
        return;
      }
      try {
        const p = await base44.entities.SiteStat.list("-updated_date", 1);
        let rec = Array.isArray(p) ? p[0] : p.items?.[0];
        if (!rec) {
          rec = await base44.entities.SiteStat.create({ pages_deployed: 3649, built_today: 2 });
        }
        setRecord(rec);
        setDeployed(String(rec.pages_deployed ?? ""));
        setToday(String(rec.built_today ?? ""));
        setState("ready");
      } catch {
        setState("denied");
      }
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    const d = Number(deployed);
    const t = Number(today);
    if (!Number.isFinite(d) || !Number.isFinite(t) || d < 0 || t < 0) {
      setError("Enter valid numbers.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const data = { pages_deployed: d, built_today: t };
      if (record?.id) {
        await base44.entities.SiteStat.update(record.id, data);
      } else {
        await base44.entities.SiteStat.create(data);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Could not save — try again.");
    }
    setSaving(false);
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-line border-t-carbon rounded-full animate-spin" />
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5">
        <div className="text-center">
          <span className="font-mono text-[11px] tracking-widest text-steel">404</span>
          <h1 className="mt-3 font-heading text-2xl font-bold text-carbon">Nothing here.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-5 py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <span className="font-mono text-[11px] tracking-widest text-steel">ADMIN</span>
        <h1 className="mt-2 font-heading text-3xl md:text-4xl font-bold tracking-tight text-carbon">
          Site stats
        </h1>
        <p className="mt-2 text-steel text-[14px] leading-relaxed">
          These two numbers show on the homepage counter card.
        </p>

        <form onSubmit={save} className="mt-8 border border-line p-6 space-y-6">
          <div>
            <label className="font-mono text-[11px] tracking-widest text-carbon block">
              PAGES DEPLOYED (TOTAL)
            </label>
            <input
              type="number"
              min="0"
              value={deployed}
              onChange={(e) => setDeployed(e.target.value)}
              className="mt-2 w-full border border-line px-4 py-3 font-mono text-lg text-carbon outline-none focus:border-carbon bg-white"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] tracking-widest text-carbon block">
              PAGES BUILT TODAY
            </label>
            <input
              type="number"
              min="0"
              value={today}
              onChange={(e) => setToday(e.target.value)}
              className="mt-2 w-full border border-line px-4 py-3 font-mono text-lg text-carbon outline-none focus:border-carbon bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-carbon text-white font-mono text-[11px] tracking-widest px-4 py-3.5 hover:bg-mint hover:text-carbon transition-colors disabled:opacity-50"
          >
            {saving ? "SAVING…" : saved ? "SAVED ✓" : "SAVE"}
          </button>
          {error && (
            <p className="font-mono text-[11px] tracking-wide text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
