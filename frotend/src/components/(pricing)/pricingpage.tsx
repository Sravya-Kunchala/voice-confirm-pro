import { useEffect, useRef, useState } from "react";

type Feature = { text: string; included: boolean };

type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  ctaLabel: string;
  features: Feature[];
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "New stores with up to 200 COD orders per month",
    monthlyPrice: 1999,
    yearlyPrice: 1399,
    ctaLabel: "Start Free Trial",
    features: [
      { text: "Call limit: 500 calls/month", included: true },
      { text: "Sites: 1 WordPress site", included: true },
      { text: "Languages: English + 1 regional", included: true },
      { text: "Voice engine: AWS Polly", included: true },
      { text: "Telephony: Twilio only", included: true },
      { text: "IVR: Basic (1 confirm, 2 cancel)", included: true },
      { text: "Call recordings: 7-day retention", included: true },
      { text: "Dashboard: Standard", included: true },
      { text: "Analytics: Basic (30 days)", included: true },
      { text: "Templates: 1 template", included: true },
      { text: "Support: Email, 48hr response", included: true },
      { text: "Affiliate: 20% one-time", included: true },
      { text: "WhatsApp fallback: Not included", included: false },
      { text: "AI dynamic scripts: Not included", included: false },
      { text: "CRM integrations: Not included", included: false },
      { text: "Webhook output: Not included", included: false },
      { text: "White-label: Not included", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Growing stores with 200–2,000 COD orders per month",
    monthlyPrice: 4999,
    yearlyPrice: 3499,
    popular: true,
    ctaLabel: "Start Free Trial",
    features: [
      { text: "Call limit: Unlimited", included: true },
      { text: "Sites: 1 WordPress site", included: true },
      { text: "Languages: All 14 languages", included: true },
      { text: "Voice engine: AWS Polly + ElevenLabs", included: true },
      { text: "Telephony: Twilio + Vonage", included: true },
      { text: "IVR: Full custom (up to 9 options)", included: true },
      { text: "WhatsApp fallback: Included", included: true },
      { text: "SMS fallback: Included", included: true },
      { text: "Analytics: 90-day with download", included: true },
      { text: "Dashboard: Full + real-time", included: true },
      { text: "Analytics: Full, weekly email", included: true },
      { text: "Templates: Unlimited, per-product rules", included: true },
      { text: "AI dynamic scripts: Included", included: true },
      { text: "CRM integrations: Zoho, Freshdesk, HubSpot", included: true },
      { text: "Webhook output: Included", included: true },
      { text: "Support: Priority email + WhatsApp, 12hr", included: true },
      { text: "Affiliate: 30% recurring", included: true },
      { text: "Setup: 1 free onboarding call (45 min)", included: true },
      { text: "White-label: Not included", included: false },
      { text: "Multi-site: Not included", included: false },
    ],
  },
  {
    id: "agency",
    name: "Agency",
    tagline: "Agencies or enterprise stores with 2,000+ orders/month",
    monthlyPrice: 12999,
    yearlyPrice: 9099,
    ctaLabel: "Start Free Trial",
    features: [
      { text: "Call limit: Unlimited", included: true },
      { text: "Sites: Up to 10 WordPress sites", included: true },
      { text: "Languages: All 14 languages", included: true },
      { text: "Voice engine: AWS Polly + ElevenLabs", included: true },
      { text: "Telephony: Twilio + Vonage + custom BYO", included: true },
      { text: "IVR: Full custom, multi-level", included: true },
      { text: "WhatsApp fallback: Included", included: true },
      { text: "SMS fallback: Included", included: true },
      { text: "Call recordings: 365-day retention", included: true },
      { text: "Dashboard: Multi-site, per-site reporting", included: true },
      { text: "Analytics: Advanced + attribution", included: true },
      { text: "Templates: Unlimited, per-site", included: true },
      { text: "AI dynamic scripts: Included", included: true },
      { text: "CRM integrations: All included", included: true },
      { text: "Webhook output: Included", included: true },
      { text: "White-label: Included", included: true },
      { text: "Reseller dashboard: Included", included: true },
      { text: "Dedicated account manager: Included", included: true },
      { text: "Setup: 2-hour session included", included: true },
      { text: "Support: 4-hour SLA", included: true },
      { text: "Affiliate: 40% recurring", included: true },
    ],
  },
];

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function CheckIcon({ included }: { included: boolean }) {
  return included ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(37,99,235,0.12)" />
      <path d="M5 8l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill="rgba(148,163,184,0.14)" />
      <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlanCard({ plan, yearly, delay }: { plan: Plan; yearly: boolean; delay: number }) {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        flex: "1 1 280px",
        minWidth: 0,
        background: "#fff",
        borderRadius: 20,
        border: plan.popular ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
        boxShadow: plan.popular
          ? "0 20px 50px rgba(37,99,235,0.18)"
          : "0 8px 24px rgba(15,23,42,0.06)",
        padding: "28px 24px 30px",
        transform: visible ? "translateY(0)" : "translateY(28px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.55s ease ${delay}s, opacity 0.55s ease ${delay}s`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {plan.popular && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg,#3b82f6,#2563eb)",
            color: "#fff",
            padding: "4px 16px",
            borderRadius: 999,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}
        >
          MOST POPULAR
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{plan.name}</div>
        <div style={{ marginTop: 5, fontSize: 11.5, lineHeight: 1.55, color: "#64748b" }}>{plan.tagline}</div>
      </div>

      <div style={{ margin: "18px 0 20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
          <span style={{ fontSize: 36, fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
            {formatINR(price)}
          </span>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>/month</span>
        </div>
        {yearly ? (
          <div style={{ marginTop: 5, color: "#16a34a", fontSize: 11 }}>
            Billed annually · Save 30%
          </div>
        ) : (
          <div style={{ marginTop: 5, color: "#94a3b8", fontSize: 11 }}>Billed monthly</div>
        )}
      </div>

      <button
        style={{
          width: "100%",
          borderRadius: 10,
          padding: "12px 14px",
          border: plan.popular ? "none" : "1.5px solid #2563eb",
          background: plan.popular ? "linear-gradient(90deg,#3b82f6,#2563eb)" : "transparent",
          color: plan.popular ? "#fff" : "#2563eb",
          fontSize: 13.5,
          fontWeight: 700,
          marginBottom: 20,
          cursor: "pointer",
          letterSpacing: "0.01em",
        }}
      >
        {plan.ctaLabel}
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 9,
          borderTop: "1px solid #f1f5f9",
          paddingTop: 16,
          flex: 1,
        }}
      >
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <CheckIcon included={f.included} />
            <span
              style={{
                fontSize: 12,
                lineHeight: 1.5,
                color: f.included ? "#334155" : "#b0bec5",
              }}
            >
              {f.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: "center",
        marginTop: 24,
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: yearly ? 400 : 600,
          color: yearly ? "rgba(255,255,255,0.6)" : "#fff",
          cursor: "pointer",
          transition: "color 0.2s",
        }}
        onClick={() => onChange(false)}
      >
        Monthly
      </span>
      <button
        onClick={() => onChange(!yearly)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 999,
          border: "none",
          background: yearly ? "#fff" : "rgba(255,255,255,0.3)",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.25s",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            left: yearly ? 23 : 3,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: yearly ? "#2563eb" : "#fff",
            transition: "left 0.25s, background 0.25s",
            display: "block",
          }}
        />
      </button>
      <span
        style={{
          fontSize: 13,
          fontWeight: yearly ? 600 : 400,
          color: yearly ? "#fff" : "rgba(255,255,255,0.6)",
          cursor: "pointer",
          transition: "color 0.2s",
        }}
        onClick={() => onChange(true)}
      >
        Yearly{" "}
        <span
          style={{
            background: "rgba(255,255,255,0.18)",
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.04em",
            marginLeft: 2,
          }}
        >
          Save up to 30%
        </span>
      </span>
    </div>
  );
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const ltdRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [ltdVisible, setLtdVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap";
    document.head.appendChild(link);

    const t = setTimeout(() => setHeroVisible(true), 80);

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLtdVisible(true); },
      { threshold: 0.15 }
    );
    if (ltdRef.current) io.observe(ltdRef.current);

    return () => {
      clearTimeout(t);
      io.disconnect();
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  return (
    <div
      style={{
        background: "#f0f4fa",
        minHeight: "100vh",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section
        style={{
          background: "linear-gradient(160deg, #3b82f6 0%, #2563eb 55%, #1d4ed8 100%)",
          padding: "56px 24px 100px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <div
          style={{
            position: "absolute", top: -80, right: -80,
            width: 320, height: 320, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)", pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: -60, left: -60,
            width: 260, height: 260, borderRadius: "50%",
            background: "rgba(255,255,255,0.05)", pointerEvents: "none",
          }}
        />

        <div
          ref={heroRef}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* pill badge */}
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              padding: "5px 16px",
              borderRadius: 999,
              marginBottom: 20,
            }}
          >
            PRICING
          </div>

          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 46px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            Simple, Transparent Pricing
          </h1>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.78)",
              maxWidth: 460,
              margin: "0 auto 6px",
            }}
          >
            No per-call surprises. No hidden platform fees. Pay for the plan that fits your
            order volume and we handle the rest.
          </p>

          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Your telephony costs (Twilio/Vonage) are separate and typically range from ₹2–8 per
            call depending on your provider plan.{" "}
            <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 700 }}>
              VoiceConfirm Pro
            </strong>{" "}
            does not mark up your telephony costs.
          </p>

          <Toggle yearly={yearly} onChange={setYearly} />
        </div>
      </section>

      {/* ── Cards ── */}
      <section
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 20px",
          transform: "translateY(-60px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            alignItems: "stretch",
          }}
        >
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} yearly={yearly} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── Lifetime Deal ── */}
      <section
        style={{
          maxWidth: 800,
          margin: "-24px auto 60px",
          padding: "0 20px",
        }}
      >
        <div
          ref={ltdRef}
          style={{
            width: "100%",
            maxWidth: 800,
            background: "linear-gradient(180deg, #0C1220 0%, #161F33 100%)",
            borderRadius: 20,
            padding: "64px 48px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            transform: ltdVisible ? "translateY(0)" : "translateY(28px)",
            opacity: ltdVisible ? 1 : 0,
            transition: "transform 0.6s ease, opacity 0.6s ease",
          }}
        >
          {/* shimmer line */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, transparent 0%, #3b82f6 30%, #93c5fd 50%, #3b82f6 70%, transparent 100%)",
              backgroundSize: "600px 2px",
              animation: "shimmer 2.5s linear infinite",
            }}
          />

          <div
            style={{
              display: "inline-block",
              minWidth: 175,
              fontSize: 26,
              lineHeight: 1,
              fontWeight: 800,
              color: "#fff",
              textAlign: "center",
              whiteSpace: "nowrap",
              margin: "0 auto",
            }}
          >
            Lifetime Deal
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              justifyContent: "center",
              marginBottom: 0,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "clamp(28px, 3.6vw, 44px)",
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              ₹24,999
            </span>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>one-time payment</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 0,
            }}
          >
            <span
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "4px 12px",
                borderRadius: 999,
                animation: "pulse 2s ease infinite",
              }}
            >
              LIMITED
            </span>
            <span style={{ color: "#64748b", fontSize: 11 }}>
              — 41 of 100 seats left
            </span>
          </div>

          <p
            style={{
              color: "#94a3b8",
              fontSize: 12.5,
              lineHeight: 1.6,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Everything in Pro plan, forever. No monthly fees. Unlimited calls. Single site.
            <br />
            All future updates included as long as VoiceConfirm Pro exists.
          </p>

          <button
            style={{
              display: "inline-flex",
              alignSelf: "center",
              background: "linear-gradient(90deg,#3b82f6,#2563eb)",
              border: "none",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "8px 20px",
              borderRadius: 10,
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Grab Lifetime Deal →
          </button>
        </div>
      </section>
    </div>
  );
}
