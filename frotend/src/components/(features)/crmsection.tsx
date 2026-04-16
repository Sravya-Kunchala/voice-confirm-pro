import React, { useEffect, useRef, useState } from "react";

// ── Brand Icons ──────────────────────────────────────────────
const ZohoIcon = () => (
  <img src="/Zoho.svg" alt="" aria-hidden="true" width={28} height={28} style={{ display: "block" }} />
);

const FreshdeskIcon = () => (
  <img src="/Freshdesk.svg" alt="" aria-hidden="true" width={28} height={28} style={{ display: "block" }} />
);

const HubSpotIcon = () => (
  <img src="/HubSpot.svg" alt="" aria-hidden="true" width={28} height={28} style={{ display: "block" }} />
);

const WebhookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="rgba(255,255,255,0.15)" />
    <circle cx="13" cy="27" r="3.5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="27" cy="27" r="3.5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="20" cy="13" r="3.5" stroke="white" strokeWidth="2" fill="none" />
    <path d="M16.5 25l3-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M23.5 25l-3-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16.5 27h7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────
const integrations = [
  {
    name: "Zoho CRM",
    desc: "Auto-sync call logs and status.",
    icon: <ZohoIcon />,
    highlighted: false,
  },
  {
    name: "Freshdesk",
    desc: "Support tickets from IVR input.",
    icon: <FreshdeskIcon />,
    highlighted: false,
  },
  {
    name: "HubSpot",
    desc: "Complete journey visibility.",
    icon: <HubSpotIcon />,
    highlighted: false,
  },
  {
    name: "Webhooks & Zapier",
    desc: "Connect to 5,000+ apps, instantly.",
    icon: <WebhookIcon />,
    highlighted: true,
  },
];

const features = [
  "Automatic log synchronization to contact records.",
  "Automated ticket creation for follow-ups or cancellations.",
  "Full compatibility with Make, Pabbly, and Zapier.",
];

// ── InView hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Component ─────────────────────────────────────────────────
const CRMSection: React.FC = () => {
  const { ref, visible } = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
      <section style={s.section} ref={ref}>
      <div style={s.inner}>
        {/* LEFT: Integration cards grid */}
        <div style={s.cardsGrid}>
          {integrations.map((item, i) => (
            <div
              key={item.name}
              style={{
                ...s.card,
                ...(item.highlighted ? s.cardHighlighted : {}),
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div style={s.cardIcon}>{item.icon}</div>
              <p style={{ ...s.cardName, ...(item.highlighted ? s.cardNameLight : {}) }}>
                {item.name}
              </p>
              <p style={{ ...s.cardDesc, ...(item.highlighted ? s.cardDescLight : {}) }}>
                {item.desc}
              </p>
              {item.highlighted && (
                <span style={s.sparkle} aria-hidden="true">✳︎</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: Text content */}
        <div style={s.right}>
          <h2
            style={{
              ...s.heading,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            CRM &amp; Helpdesk<br />Connectivity
          </h2>
          <p
            style={{
              ...s.subtext,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
            }}
          >
            Keep your support and sales teams in the loop. VoiceConfirm Pro
            pushes real-time data to your customer relationship management tools
            the second a call finishes.
          </p>
          <ul style={s.featureList}>
            {features.map((f, i) => (
              <li
                key={f}
                style={{
                  ...s.featureItem,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 0.5s ease ${0.45 + i * 0.12}s, transform 0.5s ease ${0.45 + i * 0.12}s`,
                }}
              >
                <span style={s.checkIcon}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#1a56db" />
                    <path
                      d="M6 10.5l3 3 5-5.5"
                      stroke="white" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span style={s.featureText}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </section>
    </>
  );
};

// ── Styles ────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  section: {
    backgroundColor: "#f5f3ee",
    padding: "80px 48px",
    boxSizing: "border-box",
    width: "100%",
  },
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "64px",
    flexWrap: "wrap",
  },
  cardsGrid: {
    flex: "0 0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    width: "100%",
    maxWidth: "420px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "22px 20px",
    position: "relative",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    cursor: "default",
    overflow: "hidden",
  },
  cardHighlighted: {
    backgroundColor: "#1a56db",
  },
  cardIcon: {
    marginBottom: "14px",
  },
  cardName: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 5px",
    fontFamily: "'DM Sans', sans-serif",
  },
  cardNameLight: {
    color: "#ffffff",
  },
  cardDesc: {
    fontSize: "12px",
    color: "#6b7280",
    margin: 0,
    lineHeight: 1.5,
    fontFamily: "'DM Sans', sans-serif",
  },
  cardDescLight: {
    color: "rgba(255,255,255,0.75)",
  },
  sparkle: {
    position: "absolute",
    top: "16px",
    right: "16px",
    fontSize: "18px",
    color: "#f87316",
    lineHeight: "1",
  },
  right: {
    flex: "1 1 320px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    maxWidth: "608px",
    fontSize: "36px",
    fontWeight: 900,
    color: "#131B2E",
    lineHeight: "40px",
    margin: "0 0 20px",
    fontFamily: "'Playfair Display', serif",
    letterSpacing: "0",
  },
  subtext: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.75,
    margin: "0 0 28px",
    fontFamily: "'DM Sans', sans-serif",
  },
  featureList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  checkIcon: {
    flexShrink: 0,
    marginTop: "1px",
  },
  featureText: {
    fontSize: "14px",
    color: "#374151",
    lineHeight: 1.6,
    fontFamily: "'DM Sans', sans-serif",
  },
};

export default CRMSection;
