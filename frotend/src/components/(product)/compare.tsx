import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
type CellStyle = "yes" | "no" | "highlight" | "muted" | "cost" | "warn";

interface Feature {
  label: string;
  vc: { text: string; style: CellStyle };
  manual: { text: string; style: CellStyle };
  sms: { text: string; style: CellStyle };
}

const features: Feature[] = [
  {
    label: "Calls within 60 seconds",
    vc: { text: "Yes", style: "yes" },
    manual: { text: "Depends on staff", style: "muted" },
    sms: { text: "No", style: "no" },
  },
  {
    label: "Natural voice (not robotic)",
    vc: { text: "Yes", style: "yes" },
    manual: { text: "Yes", style: "yes" },
    sms: { text: "No — text only", style: "no" },
  },
  {
    label: "Multi-language support",
    vc: { text: "14 languages", style: "highlight" },
    manual: { text: "Limited", style: "muted" },
    sms: { text: "English only", style: "no" },
  },
  {
    label: "Auto-updates WooCommerce",
    vc: { text: "Yes", style: "yes" },
    manual: { text: "Manual", style: "warn" },
    sms: { text: "Partial", style: "muted" },
  },
  {
    label: "Works at 2am",
    vc: { text: "Yes", style: "yes" },
    manual: { text: "No", style: "no" },
    sms: { text: "Yes", style: "yes" },
  },
  {
    label: "IVR response handling",
    vc: { text: "Yes", style: "yes" },
    manual: { text: "Yes", style: "yes" },
    sms: { text: "No", style: "no" },
  },
  {
    label: "Call recording",
    vc: { text: "Yes", style: "yes" },
    manual: { text: "No", style: "no" },
    sms: { text: "No", style: "no" },
  },
  {
    label: "Retry on no-answer",
    vc: { text: "3× automatic", style: "highlight" },
    manual: { text: "Rarely", style: "warn" },
    sms: { text: "N/A", style: "muted" },
  },
  {
    label: "WhatsApp fallback",
    vc: { text: "Yes", style: "yes" },
    manual: { text: "No", style: "no" },
    sms: { text: "No", style: "no" },
  },
  {
    label: "Cost per confirmation",
    vc: { text: "₹2–8", style: "cost" },
    manual: { text: "₹85–120 (staff cost)", style: "no" },
    sms: { text: "₹1–3", style: "muted" },
  },
];

const cellColors: Record<CellStyle, React.CSSProperties> = {
  yes:       { color: "#1e7a4a", fontWeight: 600 },
  no:        { color: "#c0392b", fontWeight: 500 },
  highlight: { color: "#1a4fa0", fontWeight: 600 },
  muted:     { color: "#888780" },
  cost:      { color: "#1a4fa0", fontWeight: 700, fontSize: 15 },
  warn:      { color: "#b05e10", fontWeight: 500 },
};

/* ─────────────────────────────────────────────
   Global CSS
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

  @keyframes vc-fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vc-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes vc-label-pop {
    0%   { opacity: 0; letter-spacing: 0.25em; }
    100% { opacity: 1; letter-spacing: 0.1em; }
  }
  @keyframes vc-underline-grow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .vc-row-animated {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.45s ease, transform 0.45s ease;
  }
  .vc-row-animated.vc-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .vc-row-hover:hover > td {
    background-color: #fdf9f0 !important;
    transition: background-color 0.2s ease;
  }
  .vc-row-hover:hover > td.vc-col-hl {
    background-color: #ede8d8 !important;
  }
  .vc-cell-val {
    display: inline-block;
    transition: transform 0.18s ease;
  }
  .vc-row-hover:hover .vc-cell-val {
    transform: scale(1.07);
  }

  .vc-card-animated {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.25s ease;
  }
  .vc-card-animated.vc-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .vc-card-animated:hover {
    box-shadow: 0 6px 28px rgba(0,0,0,0.09);
    transform: translateY(-3px) !important;
  }

  @media (max-width: 560px) {
    .vc-desktop { display: none !important; }
    .vc-mobile  { display: block !important; }
  }
  @media (min-width: 561px) {
    .vc-desktop { display: block !important; }
    .vc-mobile  { display: none !important; }
  }
`;

/* ─────────────────────────────────────────────
   Hook: IntersectionObserver
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Desktop animated row
───────────────────────────────────────────── */
function AnimatedRow({ feature, index }: { feature: Feature; index: number }) {
  const { ref, visible } = useInView();
  return (
    <tr
      ref={ref as React.RefObject<HTMLTableRowElement>}
      className={`vc-row-animated vc-row-hover${visible ? " vc-visible" : ""}`}
      style={{ transitionDelay: `${index * 55}ms` }}
    >
      <td style={{ padding: "13px 14px", fontSize: 13.5, color: "#2c2c2a", borderBottom: "1px solid #e8e4da" }}>
        {feature.label}
      </td>
      {([
        { data: feature.vc,     isVC: true },
        { data: feature.manual, isVC: false },
        { data: feature.sms,    isVC: false },
      ] as const).map(({ data, isVC }, ci) => (
        <td
          key={ci}
          className={isVC ? "vc-col-hl" : ""}
          style={{
            padding: "13px 14px",
            textAlign: "center",
            fontSize: 13.5,
            backgroundColor: isVC ? "#f5f0e6" : "transparent",
            borderBottom: "1px solid #e8e4da",
            verticalAlign: "middle",
            transition: "background-color 0.2s ease",
            ...cellColors[data.style],
          }}
        >
          <span className="vc-cell-val">{data.text}</span>
        </td>
      ))}
    </tr>
  );
}

/* ─────────────────────────────────────────────
   Mobile animated card
───────────────────────────────────────────── */
function MobileFeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { ref, visible } = useInView();
  const cols = [
    { label: "VC Pro",  data: feature.vc,     isVC: true },
    { label: "Manual",  data: feature.manual, isVC: false },
    { label: "SMS",     data: feature.sms,    isVC: false },
  ];
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`vc-card-animated${visible ? " vc-visible" : ""}`}
      style={{ border: "1px solid #e8e4da", borderRadius: 12, overflow: "hidden", marginBottom: 10, transitionDelay: `${index * 55}ms` }}
    >
      <div style={{ padding: "10px 14px", fontSize: 13, fontWeight: 500, color: "#2c2c2a", backgroundColor: "#faf8f3", borderBottom: "1px solid #e8e4da" }}>
        {feature.label}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #e8e4da" }}>
        {cols.map((col) => (
          <div key={col.label} style={{ padding: "5px 8px", fontSize: 10, letterSpacing: "0.05em", textTransform: "uppercase", textAlign: "center", color: "#888780", backgroundColor: col.isVC ? "#f5f0e6" : "transparent", fontWeight: 500 }}>
            {col.label}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {cols.map((col) => (
          <div key={col.label} style={{ padding: "10px 8px", fontSize: 12.5, textAlign: "center", backgroundColor: col.isVC ? "#f5f0e6" : "transparent", ...cellColors[col.data.style] }}>
            {col.data.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Word-by-word animated heading
───────────────────────────────────────────── */
function AnimatedHeading() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, []);
  const line1 = ["What", "makes"];
  const line2 = ["VoiceConfirm", "different"];
  return (
    <h1 style={{ fontSize: "clamp(28px, 6vw, 46px)", fontWeight: 700, lineHeight: 1.15, color: "#1a1a18", marginBottom: 28, letterSpacing: "-0.02em" }}>
      <span style={{ display: "block" }}>
        {line1.map((w, i) => (
          <span key={w} style={{ display: "inline-block", marginRight: 10, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(18px)", transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms` }}>{w}</span>
        ))}
      </span>
      <span style={{ display: "block" }}>
        {line2.map((w, i) => (
          <span key={w} style={{ display: "inline-block", marginRight: 10, opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(18px)", transition: `opacity 0.55s ease ${150 + i * 90}ms, transform 0.55s ease ${150 + i * 90}ms` }}>{w}</span>
        ))}
      </span>
    </h1>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function CompetitiveAnalysis() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ fontFamily: "'Sora', -apple-system, BlinkMacSystemFont, sans-serif", backgroundColor: "#faf8f3", minHeight: "100vh", padding: "48px 24px", boxSizing: "border-box" }}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* Label */}
        <p style={{
          fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#c97a3a", fontWeight: 600, marginBottom: 14,
          opacity: mounted ? 1 : 0,
          animation: mounted ? "vc-label-pop 0.7s ease forwards" : "none",
        }}>
          Competitive Analysis
        </p>

        {/* Heading */}
        <AnimatedHeading />

        {/* Accent rule */}
        <div style={{
          height: 2, backgroundColor: "#c97a3a", marginBottom: 32,
          transformOrigin: "left center",
          animation: mounted ? "vc-underline-grow 0.75s ease 0.25s both" : "none",
        }} />

        {/* ══ DESKTOP TABLE ══ */}
        <div className="vc-desktop" style={{ opacity: mounted ? 1 : 0, animation: mounted ? "vc-fade-in 0.5s ease 0.15s both" : "none" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", border: "1px solid #e8e4da", borderRadius: 12, overflow: "hidden" }}>
            <colgroup>
              <col style={{ width: "36%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "22%" }} />
            </colgroup>
            <thead>
              <tr style={{ backgroundColor: "#f0ece0" }}>
                <th style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", color: "#888780", fontWeight: 600, borderBottom: "1px solid #e8e4da" }}>
                  Feature
                </th>
                {["VoiceConfirm Pro", "Manual Calling", "Generic SMS Plugin"].map((col, i) => (
                  <th key={col} style={{
                    padding: "12px 14px", textAlign: "center", fontSize: 11,
                    letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600,
                    borderBottom: "1px solid #e8e4da",
                    backgroundColor: i === 0 ? "#f5f0e6" : "#f0ece0",
                    color: i === 0 ? "#3d2e10" : "#888780",
                    opacity: mounted ? 1 : 0,
                    animation: mounted ? `vc-fade-up 0.5s ease ${0.3 + i * 0.08}s both` : "none",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => <AnimatedRow key={f.label} feature={f} index={i} />)}
            </tbody>
          </table>
        </div>

        {/* ══ MOBILE CARDS ══ */}
        <div className="vc-mobile">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 14 }}>
            {[
              { label: "VoiceConfirm Pro", bg: "#f5f0e6", color: "#7a6340" },
              { label: "Manual Calling",   bg: "#efefef", color: "#666" },
              { label: "Generic SMS",      bg: "#efefef", color: "#666" },
            ].map((leg, i) => (
              <div key={leg.label} style={{
                backgroundColor: leg.bg, borderRadius: 8, padding: "6px 4px",
                textAlign: "center", fontSize: 9.5, letterSpacing: "0.04em",
                textTransform: "uppercase", color: leg.color, fontWeight: 600,
                opacity: mounted ? 1 : 0,
                animation: mounted ? `vc-fade-up 0.45s ease ${i * 0.08}s both` : "none",
              }}>
                {leg.label}
              </div>
            ))}
          </div>
          {features.map((f, i) => <MobileFeatureCard key={f.label} feature={f} index={i} />)}
        </div>

      </div>
    </div>
  );
}