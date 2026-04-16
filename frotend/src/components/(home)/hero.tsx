import React, { useEffect, useRef, useState } from "react";

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(160deg, #e8f4f8 0%, #dbeafe 30%, #ede9fe 60%, #f5f3ff 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "64px",
    paddingBottom: "0",
    overflow: "hidden",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },
  content: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.7)",
    border: "1px solid #c4b5fd",
    borderRadius: "999px",
    padding: "5px 14px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#6d28d9",
    marginBottom: "28px",
    letterSpacing: "0.3px",
    backdropFilter: "blur(8px)",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#7c3aed",
    display: "inline-block",
  },
  headingWrap: {
    textAlign: "center",
    maxWidth: "620px",
    marginBottom: "20px",
    padding: "0 16px",
  },
  heading: {
    fontSize: "clamp(36px, 5vw, 58px)",
    fontWeight: 800,
    lineHeight: 1.12,
    color: "#0f0a1e",
    margin: 0,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    letterSpacing: "-1.5px",
  },
  headingAccent: {
    color: "#7c3aed",
    fontStyle: "italic",
  },
  subtext: {
    fontSize: "15px",
    lineHeight: 1.7,
    color: "#4b5563",
    maxWidth: "520px",
    textAlign: "center",
    marginBottom: "32px",
    padding: "0 16px",
  },
  ctaRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  ctaPrimary: {
    textDecoration: "none",
    background: "#6d28d9",
    color: "#fff",
    fontWeight: 600,
    fontSize: "14px",
    padding: "12px 24px",
    borderRadius: "8px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 20px rgba(109,40,217,0.35)",
  },
  ctaSecondary: {
    textDecoration: "none",
    background: "rgba(255,255,255,0.8)",
    color: "#111827",
    fontWeight: 500,
    fontSize: "14px",
    padding: "11px 20px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backdropFilter: "blur(8px)",
  },
  playIcon: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    border: "1.5px solid #6d28d9",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "8px",
    color: "#6d28d9",
  },
  trustRow: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "48px",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    padding: "0 16px",
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12.5px",
    color: "#374151",
    fontWeight: 500,
  },
  checkIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#6d28d9",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "9px",
    flexShrink: 0,
  },
  dashboardImg: {
    width: "100%",
    borderRadius: "16px 16px 0 0",
    boxShadow: "0 -4px 60px rgba(109,40,217,0.15), 0 0 0 1px rgba(109,40,217,0.08)",
    display: "block",
  },
};

const trustItems = [
  "No credit card required",
  "Works in 10 minutes",
  "Hindi, English, Tamil, Telugu & 17 more",
  "500+ stores trust VoiceConfirm",
];

interface StatConfig {
  target: number;
  prefix: string;
  suffix: string;
  format: "comma" | "decimal1" | "integer";
  label: string;
}

const statConfigs: StatConfig[] = [
  { target: 184000, prefix: "",  suffix: "+",    format: "comma",    label: "Calls made this month" },
  { target: 98.2,   prefix: "",  suffix: "%",    format: "decimal1", label: "Confirmation rate" },
  { target: 4.2,    prefix: "₹", suffix: " Cr",  format: "decimal1", label: "Revenue recovered for stores" },
  { target: 14,     prefix: "",  suffix: "",      format: "integer",  label: "Languages supported" },
];

const BAR_COUNT = 20;
const MAX_H = 95;
const MIN_H = 30;

function getBarHeight(index: number): string {
  const t = index / (BAR_COUNT - 1);
  const factor = Math.abs(t - 0.5) * 2;
  const eased = Math.pow(factor, 1.5);
  return `${MIN_H + (MAX_H - MIN_H) * eased}%`;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatStat(config: StatConfig, progress: number): string {
  const val = config.target * progress;
  let display: string;
  if (config.format === "comma") {
    display = Math.round(val).toLocaleString("en-IN");
  } else if (config.format === "decimal1") {
    display = val.toFixed(1);
  } else {
    display = Math.round(val).toString();
  }
  return config.prefix + display + config.suffix;
}

const barDelays = Array.from({ length: BAR_COUNT })
  .map((_, i) => `.vc-bg-bars > div:nth-child(${i + 1}) { animation-delay: ${(i * 0.025).toFixed(3)}s; }`)
  .join("\n");

const INJECTED_CSS = `
@keyframes vc-fade-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes vc-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes vc-bar-grow {
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
}
@keyframes vc-dot-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.6); opacity: 0.5; }
}
@keyframes vc-dashboard-rise {
  from { opacity: 0; transform: translateY(32px) scale(0.985); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.vc-badge { animation: vc-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
.vc-badge-dot-anim { animation: vc-dot-pulse 2.4s ease-in-out infinite; }
.vc-heading-wrap-anim { animation: vc-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
.vc-subtext { animation: vc-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
.vc-cta-row { animation: vc-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.42s both; }

.vc-cta-primary {
  background: #6d28d9;
  transition: box-shadow 0.25s ease, transform 0.18s ease, background 0.25s ease;
}
.vc-cta-primary:hover {
  background: #7c3aed;
  box-shadow: 0 8px 32px rgba(109,40,217,0.52);
  transform: translateY(-2px);
}
.vc-cta-primary:active { transform: translateY(0) scale(0.97); }

.vc-cta-secondary {
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.18s ease;
}
.vc-cta-secondary:hover {
  background: rgba(255,255,255,0.97) !important;
  border-color: #c4b5fd !important;
  transform: translateY(-2px);
}
.vc-cta-secondary:active { transform: translateY(0) scale(0.97); }

.vc-trust-item-0 { animation: vc-fade-in 0.4s ease 0.56s both; }
.vc-trust-item-1 { animation: vc-fade-in 0.4s ease 0.66s both; }
.vc-trust-item-2 { animation: vc-fade-in 0.4s ease 0.76s both; }
.vc-trust-item-3 { animation: vc-fade-in 0.4s ease 0.86s both; }

.vc-dashboard-wrap { animation: vc-dashboard-rise 0.8s cubic-bezier(0.22,1,0.36,1) 0.72s both; }

.vc-bg-bars > div {
  transform-origin: bottom center;
  animation: vc-bar-grow 0.65s cubic-bezier(0.22,1,0.36,1) both;
}
${barDelays}

/* Stat slide-in — driven by JS adding .vc-stat-visible */
.vc-stat-item {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.vc-stat-item.vc-stat-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .vc-badge, .vc-heading-wrap-anim, .vc-subtext, .vc-cta-row,
  .vc-trust-item-0, .vc-trust-item-1, .vc-trust-item-2, .vc-trust-item-3,
  .vc-dashboard-wrap, .vc-bg-bars > div { animation: none !important; opacity: 1 !important; transform: none !important; }
  .vc-badge-dot-anim { animation: none !important; }
  .vc-stat-item { opacity: 1 !important; transform: none !important; }
}

@media (max-width: 640px) {
  .vc-section { padding-top: 40px !important; }
  .vc-badge { font-size: 10px !important; padding: 4px 12px !important; text-align: center !important; max-width: calc(100vw - 48px) !important; line-height: 1.5 !important; }
  .vc-heading { font-size: 30px !important; letter-spacing: -0.8px !important; line-height: 1.18 !important; }
  .vc-subtext { font-size: 13.5px !important; margin-bottom: 24px !important; }
  .vc-cta-row { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; padding: 0 20px !important; width: 100% !important; box-sizing: border-box !important; }
  .vc-cta-primary { justify-content: center !important; padding: 13px 20px !important; }
  .vc-cta-secondary { justify-content: center !important; font-size: 13px !important; padding: 11px 20px !important; }
  .vc-trust-row { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; padding: 0 24px !important; margin-bottom: 32px !important; }
  .vc-trust-item { font-size: 12px !important; }
  .vc-dashboard-wrap { padding: 0 16px !important; }
  .vc-dashboard-img { border-radius: 12px 12px 0 0 !important; }
  .vc-stats-bar { grid-template-columns: repeat(2, 1fr) !important; padding: 28px 24px !important; gap: 0 !important; }
  .vc-stat-item { padding: 16px !important; border-right: none !important; border-bottom: 0.5px solid rgba(255,255,255,0.1) !important; }
  .vc-stat-item:nth-child(odd) { border-right: 0.5px solid rgba(255,255,255,0.1) !important; }
  .vc-stat-item:nth-child(3), .vc-stat-item:nth-child(4) { border-bottom: none !important; }
  .vc-stat-value { font-size: 24px !important; letter-spacing: -0.5px !important; }
  .vc-stat-label { font-size: 11.5px !important; }
  .vc-bg-bars { opacity: 0.15 !important; }
}

@media (min-width: 641px) and (max-width: 900px) {
  .vc-section { padding-top: 52px !important; }
  .vc-heading { font-size: clamp(28px, 4.5vw, 42px) !important; }
  .vc-badge { font-size: 11px !important; text-align: center !important; max-width: calc(100vw - 64px) !important; line-height: 1.5 !important; }
  .vc-stats-bar { grid-template-columns: repeat(2, 1fr) !important; padding: 32px 40px !important; }
  .vc-stat-item { padding: 20px !important; border-right: none !important; border-bottom: 0.5px solid rgba(255,255,255,0.1) !important; }
  .vc-stat-item:nth-child(odd) { border-right: 0.5px solid rgba(255,255,255,0.1) !important; }
  .vc-stat-item:nth-child(3), .vc-stat-item:nth-child(4) { border-bottom: none !important; }
}
`;

const ANIM_DURATION = 1800;

export default function HeroSection() {
  const statsBarRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Display values — initialised to "0" (with prefix/suffix shells)
  const [displayValues, setDisplayValues] = useState<string[]>(
    statConfigs.map((c) => c.prefix + "0" + c.suffix)
  );
  const [statVisible, setStatVisible] = useState<boolean[]>([false, false, false, false]);

  // Inject CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = INJECTED_CSS;
    style.setAttribute("data-vc-styles", "1");
    document.head.appendChild(style);
    return () => {
      const el = document.head.querySelector("[data-vc-styles]");
      if (el) document.head.removeChild(el);
    };
  }, []);

  // IntersectionObserver — trigger count-up when stats bar enters viewport
  useEffect(() => {
    const el = statsBarRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function startAnimation() {
    const startTime = performance.now();

    // Stagger the slide-in visibility per item
    statConfigs.forEach((_, i) => {
      setTimeout(() => {
        setStatVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * 130);
    });

    function tick(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / ANIM_DURATION, 1);
      const eased = easeOutExpo(t);

      setDisplayValues(statConfigs.map((c) => formatStat(c, eased)));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section style={styles.section} className="vc-section">

      {/* Background bars */}
      <div
        className="vc-bg-bars"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          display: "flex",
          alignItems: "flex-start",
          overflow: "hidden",
          opacity: 0.3,
        }}
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div key={i} style={{ width: "103px", flexShrink: 0, height: getBarHeight(i) }}>
            <svg
              width="103"
              height="100%"
              viewBox="0 0 103 1321"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="102.33" height="1320.14" fill={`url(#grad${i})`} />
              <defs>
                <linearGradient
                  id={`grad${i}`}
                  x1="51.1652" y1="0" x2="51.1652" y2="1320.14"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.355769" stopColor="#0891B2" />
                  <stop offset="0.711538" stopColor="#4E00FF" />
                  <stop offset="1" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={styles.content}>

        {/* Badge */}
        <div style={styles.badge} className="vc-badge">
          <span style={styles.badgeDot} className="vc-badge-dot-anim" />
          THE #1 WOOCOMMERCE VOICE CONFIRMATION PLUGIN FOR COD STORES
        </div>

        {/* Heading */}
        <div style={styles.headingWrap} className="vc-heading-wrap-anim">
          <h1 style={styles.heading} className="vc-heading">
            Your COD Orders Are{" "}
            <span style={styles.headingAccent}>Bleeding Revenue.</span>{" "}
            Every Missed Call Is a Lost Sale.
          </h1>
        </div>

        {/* Subtext */}
        <p style={styles.subtext} className="vc-subtext">
          VoiceConfirm Pro automatically calls your customers the moment they place a Cash on
          Delivery order — confirms delivery, collects responses, and updates WooCommerce.
          Zero human effort. Zero missed confirmations.
        </p>

        {/* CTA Buttons */}
        <div style={styles.ctaRow} className="vc-cta-row">
          <a href="#free-trial" style={styles.ctaPrimary} className="vc-cta-primary">
            Start Your Free 14-Day Trial →
          </a>
          <a href="#demo" style={styles.ctaSecondary} className="vc-cta-secondary">
            <span style={styles.playIcon}>▶</span>
            Watch 5-Min Demo
          </a>
        </div>

        {/* Trust badges */}
        <div style={styles.trustRow} className="vc-trust-row">
          {trustItems.map((item, idx) => (
            <span
              key={item}
              style={styles.trustItem}
              className={`vc-trust-item vc-trust-item-${idx}`}
            >
              <span style={styles.checkIcon}>✓</span>
              {item}
            </span>
          ))}
        </div>

        {/* Dashboard image */}
        <div
          className="vc-dashboard-wrap"
          style={{ width: "100%", maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}
        >
          <img
            src="/d1.svg"
            alt="VoiceConfirm Pro Dashboard"
            style={styles.dashboardImg}
            className="vc-dashboard-img"
          />
        </div>

        <div style={{ height: "40px", width: "100%" }} />

        {/* Stats bar — animated count-up */}
        <div
          ref={statsBarRef}
          className="vc-stats-bar"
          style={{
            background: "#111118",
            padding: "40px 80px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            width: "100%",
          }}
        >
          {statConfigs.map((stat, i) => (
            <div
              key={i}
              className={`vc-stat-item${statVisible[i] ? " vc-stat-visible" : ""}`}
              style={{
                padding: i === 0
                  ? "0 32px 0 0"
                  : i === statConfigs.length - 1
                  ? "0 0 0 32px"
                  : "0 32px",
                borderRight:
                  i < statConfigs.length - 1
                    ? "0.5px solid rgba(255,255,255,0.1)"
                    : "none",
                transitionDelay: `${i * 0.13}s`,
              }}
            >
              <div
                className="vc-stat-value"
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-1px",
                  marginBottom: "6px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {displayValues[i]}
              </div>
              <div
                className="vc-stat-label"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 400,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}