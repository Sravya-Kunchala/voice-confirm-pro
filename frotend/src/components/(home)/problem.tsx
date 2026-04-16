import { useEffect, useRef, useState } from "react";

const INJECTED_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

@keyframes ps-fade-up {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ps-slide-left {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes ps-slide-right {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes ps-count-pop {
  0%   { transform: scale(0.7); opacity: 0; }
  60%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes ps-line-grow {
  from { width: 0; }
  to   { width: 24px; }
}
@keyframes ps-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Card panels */
.ps-left-panel {
  opacity: 0;
  transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
              transform 0.65s cubic-bezier(0.22,1,0.36,1);
  transform: translateX(-32px);
}
.ps-right-panel {
  opacity: 0;
  transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1) 0.14s,
              transform 0.65s cubic-bezier(0.22,1,0.36,1) 0.14s;
  transform: translateX(32px);
}
.ps-left-panel.ps-visible  { opacity: 1; transform: translateX(0); }
.ps-right-panel.ps-visible { opacity: 1; transform: translateX(0); }

/* Label line */
.ps-label-line {
  width: 0;
  height: 2px;
  transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
}
.ps-visible .ps-label-line { width: 24px; }
.ps-left-panel.ps-visible  .ps-label-line { transition-delay: 0.3s; }
.ps-right-panel.ps-visible .ps-label-line { transition-delay: 0.44s; }

/* Heading */
.ps-heading {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.ps-left-panel.ps-visible  .ps-heading { opacity: 1; transform: translateY(0); transition-delay: 0.35s; }
.ps-right-panel.ps-visible .ps-heading { opacity: 1; transform: translateY(0); transition-delay: 0.49s; }

/* Body text */
.ps-body {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.ps-left-panel.ps-visible  .ps-body { opacity: 1; transform: translateY(0); transition-delay: 0.44s; }
.ps-right-panel.ps-visible .ps-body { opacity: 1; transform: translateY(0); transition-delay: 0.58s; }

/* Big stat */
.ps-stat {
  opacity: 0;
  transform: scale(0.72);
  transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
              transform 0.5s cubic-bezier(0.22,1,0.36,1);
}
.ps-left-panel.ps-visible  .ps-stat { opacity: 1; transform: scale(1); transition-delay: 0.55s; }
.ps-right-panel.ps-visible .ps-stat { opacity: 1; transform: scale(1); transition-delay: 0.69s; }

/* Stat sub-label */
.ps-stat-label {
  opacity: 0;
  transition: opacity 0.4s ease;
}
.ps-left-panel.ps-visible  .ps-stat-label { opacity: 1; transition-delay: 0.72s; }
.ps-right-panel.ps-visible .ps-stat-label { opacity: 1; transition-delay: 0.86s; }

/* Hover lift on panels */
.ps-left-panel, .ps-right-panel {
  transition-property: opacity, transform, box-shadow;
}

/* Divider line between panels on mobile */
.ps-mobile-divider {
  display: none;
  height: 1px;
  background: rgba(255,255,255,0.08);
  width: 100%;
}

/* ── Mobile ≤ 640px ── */
@media (max-width: 640px) {
  .ps-grid {
    grid-template-columns: 1fr !important;
  }
  .ps-left-panel {
    border-right: none !important;
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 16px 16px 0 0 !important;
    transform: translateY(28px) !important;
  }
  .ps-right-panel {
    border-radius: 0 0 16px 16px !important;
    transform: translateY(28px) !important;
  }
  .ps-left-panel.ps-visible,
  .ps-right-panel.ps-visible {
    transform: translateY(0) !important;
  }
  .ps-left-panel  { padding: 32px 24px !important; }
  .ps-right-panel { padding: 32px 24px !important; }
  .ps-stat-num { font-size: 36px !important; }
  .ps-heading-text { font-size: 19px !important; }
  .ps-section { padding: 32px 16px !important; }
}

/* ── Tablet 641–900px ── */
@media (min-width: 641px) and (max-width: 900px) {
  .ps-grid {
    grid-template-columns: 1fr !important;
  }
  .ps-left-panel {
    border-right: none !important;
    border-bottom: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 16px 16px 0 0 !important;
    transform: translateY(28px) !important;
  }
  .ps-right-panel {
    border-radius: 0 0 16px 16px !important;
    transform: translateY(28px) !important;
  }
  .ps-left-panel.ps-visible,
  .ps-right-panel.ps-visible {
    transform: translateY(0) !important;
  }
  .ps-section { padding: 40px 32px !important; }
}

@media (prefers-reduced-motion: reduce) {
  .ps-left-panel, .ps-right-panel,
  .ps-label-line, .ps-heading, .ps-body, .ps-stat, .ps-stat-label {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    width: 24px !important;
  }
}
`;

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = INJECTED_CSS;
    style.setAttribute("data-ps-styles", "1");
    document.head.appendChild(style);
    return () => {
      document.head.querySelector("[data-ps-styles]")?.remove();
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const vis = visible ? " ps-visible" : "";

  return (
    <section
      className="ps-section"
      style={{
        background: "#ffffff",
        width: "100%",
        padding: "64px 24px",
        boxSizing: "border-box",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        ref={sectionRef}
        className="ps-grid"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* ── LEFT — The Problem ── */}
        <div
          className={`ps-left-panel${vis}`}
          style={{
            background: "#0d0d14",
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="ps-label-line"
              style={{ background: "rgba(255,255,255,0.3)" }}
            />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
            }}>
              The Problem
            </span>
          </div>

          {/* Heading */}
          <h2
            className="ps-heading ps-heading-text"
            style={{
              fontSize: 22, fontWeight: 800, color: "#fff",
              lineHeight: 1.35, margin: 0,
            }}
          >
            28–35% of your COD orders are walking out the door.
          </h2>

          {/* Body */}
          <p
            className="ps-body"
            style={{
              fontSize: 13.5, color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8, margin: 0,
            }}
          >
            The average Indian WooCommerce store loses 28–35% of COD orders to failed
            deliveries, wrong addresses, and unconfirmed orders. Your delivery team shows
            up. Nobody answers. The order is returned. You pay shipping both ways. The
            customer never reorders.
          </p>

          {/* Stat */}
          <div style={{ marginTop: "auto", paddingTop: 28 }}>
            <div
              className="ps-stat ps-stat-num"
              style={{
                fontSize: 48, fontWeight: 900, color: "#fff",
                lineHeight: 1, marginBottom: 10,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ₹2L+
            </div>
            <div
              className="ps-stat-label"
              style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
              }}
            >
              Lost per month — average store
            </div>
          </div>
        </div>

        {/* ── RIGHT — The Solution ── */}
        <div
          className={`ps-right-panel${vis}`}
          style={{
            background: "#5b21b6",
            padding: "44px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="ps-label-line"
              style={{ background: "rgba(255,255,255,0.45)" }}
            />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.6)", textTransform: "uppercase",
            }}>
              The Solution
            </span>
          </div>

          {/* Heading */}
          <h2
            className="ps-heading ps-heading-text"
            style={{
              fontSize: 22, fontWeight: 800, color: "#fff",
              lineHeight: 1.35, margin: 0,
            }}
          >
            Automated confirmation before the label is even printed.
          </h2>

          {/* Body */}
          <p
            className="ps-body"
            style={{
              fontSize: 13.5, color: "rgba(255,255,255,0.72)",
              lineHeight: 1.8, margin: 0,
            }}
          >
            VoiceConfirm Pro calls your customer automatically within 60 seconds of order
            placement, plays a personalised voice message in their language, collects a
            keypress confirmation, and marks the order as verified — before your packing
            team even prints the label.
          </p>

          {/* Stat */}
          <div style={{ marginTop: "auto", paddingTop: 28 }}>
            <div
              className="ps-stat ps-stat-num"
              style={{
                fontSize: 48, fontWeight: 900, color: "#fff",
                lineHeight: 1, marginBottom: 10,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              60s
            </div>
            <div
              className="ps-stat-label"
              style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
              }}
            >
              Time to first confirmation call
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}