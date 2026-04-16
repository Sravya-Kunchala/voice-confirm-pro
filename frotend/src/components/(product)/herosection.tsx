"use client";

import React from "react";

const stats = [
  { label: "CALL TRIGGERED", value: "<60S" },
  { label: "CONFIRMATION RATE", value: "98.2%" },
  { label: "LANGUAGES", value: "14" },
  { label: "SETUP TIME", value: "10 MIN" },
  { label: "MANUAL EFFORT", value: "ZERO" },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="product-hero" style={s.section}>
      <div style={s.dotGrid} aria-hidden="true" />

      <img
        src="/Frame%20188.svg"
        alt=""
        aria-hidden="true"
        className="product-hero__frame"
        style={s.frameArt}
      />

      <div className="product-hero__inner" style={s.inner}>
        <div className="product-hero__left" style={s.left}>
          <div className="product-hero__breadcrumb" style={s.breadcrumb}>
            <span style={s.breadcrumbLine} />
            <span style={s.breadcrumbText}>PRODUCT - HOW IT WORKS</span>
          </div>

          <h1 className="product-hero__heading" style={s.heading}>
            How
            <br />
            Voice
            <em style={s.headingEm}>Confirm</em>
            <br />
            Pro Works
          </h1>

          <p className="product-hero__subtext" style={s.subtext}>
            Set it up once in 10 minutes. Let it run forever. Your customers get
            a call. Your orders get confirmed. Your WooCommerce updates
            automatically.
          </p>

          <a
            href="#"
            className="product-hero__cta"
            style={s.cta}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#6d28d9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#7c3aed";
            }}
          >
            Start Your Free 14-Day Trial {"\u2192"}
          </a>

          <div className="product-hero__badges" style={s.badges}>
            <span className="product-hero__badge" style={s.badge}>
              {"\u2713"} No credit card required
            </span>
            <span className="product-hero__badge" style={s.badge}>
              {"\u2713"} Works in 10 minutes
            </span>
          </div>
        </div>

        <div className="product-hero__stats" style={s.statsCard}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="product-hero__stat-row"
              style={{
                ...s.statRow,
                borderBottom:
                  i < stats.length - 1 ? "0.5px solid #2a2a3a" : "none",
              }}
            >
              <span className="product-hero__stat-label" style={s.statLabel}>
                {stat.label}
              </span>
              <span className="product-hero__stat-value" style={s.statValue}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .product-hero {
            min-height: auto !important;
            padding: 32px 18px 40px !important;
            align-items: flex-start !important;
          }

          .product-hero__frame {
            opacity: 0.16 !important;
            object-position: center top !important;
          }

          .product-hero__inner {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 22px !important;
            max-width: 100% !important;
          }

          .product-hero__left {
            flex: 1 1 auto !important;
            width: 100% !important;
          }

          .product-hero__breadcrumb {
            gap: 8px !important;
            margin-bottom: 18px !important;
          }

          .product-hero__breadcrumb span:last-child {
            font-size: 9.5px !important;
            letter-spacing: 0.16em !important;
          }

          .product-hero__heading {
            font-size: clamp(40px, 15vw, 58px) !important;
            margin: 0 0 18px !important;
            line-height: 0.96 !important;
          }

          .product-hero__subtext {
            max-width: 100% !important;
            font-size: 14px !important;
            line-height: 1.65 !important;
            margin: 0 0 22px !important;
          }

          .product-hero__cta {
            width: 100% !important;
            text-align: center !important;
            padding: 15px 18px !important;
            box-sizing: border-box !important;
            margin-bottom: 16px !important;
          }

          .product-hero__badges {
            flex-direction: column !important;
            gap: 8px !important;
          }

          .product-hero__badge {
            font-size: 11px !important;
            line-height: 1.4 !important;
          }

          .product-hero__stats {
            flex: 1 1 auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }

          .product-hero__stat-row {
            padding: 16px 18px !important;
          }

          .product-hero__stat-label {
            font-size: 10px !important;
            line-height: 1.3 !important;
          }

          .product-hero__stat-value {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  );
};

const s: Record<string, React.CSSProperties> = {
  section: {
    position: "relative",
    backgroundColor: "#0d0d1a",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    padding: "80px 48px",
    boxSizing: "border-box",
  },
  dotGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle, #3b2d6e 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    opacity: 0.45,
    pointerEvents: "none",
    zIndex: 1,
  },
  frameArt: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.38,
    pointerEvents: "none",
    userSelect: "none",
    mixBlendMode: "screen",
    filter: "drop-shadow(0 18px 60px rgba(124, 58, 237, 0.22))",
    zIndex: 0,
  },
  inner: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "60px",
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 420px",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "28px",
  },
  breadcrumbLine: {
    display: "inline-block",
    width: "28px",
    height: "1.5px",
    backgroundColor: "#7c3aed",
  },
  breadcrumbText: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.12em",
    color: "#888aaa",
  },
  heading: {
    fontSize: "clamp(64px, 9vw, 100px)",
    fontFamily: "'Georgia', serif",
    fontWeight: 900,
    lineHeight: 1.0,
    color: "#ffffff",
    margin: "0 0 24px",
    letterSpacing: "-0.02em",
  },
  headingEm: {
    fontStyle: "italic",
    color: "#9b6dff",
    fontWeight: 400,
  },
  subtext: {
    fontSize: "15px",
    color: "#8888aa",
    lineHeight: 1.7,
    maxWidth: "440px",
    margin: "0 0 32px",
  },
  cta: {
    display: "inline-block",
    backgroundColor: "#7c3aed",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 500,
    padding: "14px 28px",
    borderRadius: "6px",
    textDecoration: "none",
    transition: "background-color 0.15s ease",
    marginBottom: "20px",
    width: "fit-content",
  },
  badges: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  badge: {
    fontSize: "12px",
    color: "#666888",
  },
  statsCard: {
    flex: "0 0 300px",
    border: "0.5px solid #2a2a3a",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "rgba(20, 18, 40, 0.7)",
    backdropFilter: "blur(8px)",
  },
  statRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 24px",
  },
  statLabel: {
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.1em",
    color: "#666888",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: 700,
    fontFamily: "'Courier New', monospace",
    color: "#9b6dff",
    letterSpacing: "0.04em",
  },
};

export default HowItWorks;
