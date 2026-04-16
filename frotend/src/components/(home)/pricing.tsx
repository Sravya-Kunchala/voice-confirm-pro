import { useEffect, useRef } from "react";

const plans = [
  {
    name: "STARTER",
    price: "₹1,999",
    period: "per month",
    description: "Best for: New stores with up to 200 COD orders per month",
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "PRO",
    price: "₹4,999",
    period: "per month",
    description: "Best for: Growing stores with 200–2,000 COD orders per month",
    cta: "Start Free Trial",
    featured: true,
    badge: "MOST POPULAR",
  },
  {
    name: "AGENCY",
    price: "₹12,999",
    period: "per month",
    description: "Best for: Agencies managing WooCommerce stores",
    cta: "Start Free Trial",
    featured: false,
  },
];

function PricingCard({
  name,
  price,
  period,
  description,
  cta,
  featured,
  badge,
  animDelay,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  featured: boolean;
  badge?: string;
  animDelay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = featured
      ? "scale(1.04) translateY(32px)"
      : "scale(1) translateY(32px)";
    el.style.transition = `opacity 0.65s ease ${animDelay}s, transform 0.65s ease ${animDelay}s`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = featured ? "scale(1.04) translateY(0)" : "scale(1) translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animDelay, featured]);

  return (
    <div
      ref={ref}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        background: featured ? "#1A1A2E" : "#fff",
        border: featured ? "none" : "1px solid #E8E8E8",
        borderRadius: 16,
        padding: featured ? "36px 28px 32px" : "32px 28px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        position: "relative",
        boxShadow: featured
          ? "0 20px 60px rgba(108,92,231,0.25), 0 4px 16px rgba(0,0,0,0.2)"
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: featured ? "scale(1.04)" : "scale(1)",
        zIndex: featured ? 2 : 1,
        cursor: "default",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = featured
          ? "0 28px 72px rgba(108,92,231,0.38), 0 6px 20px rgba(0,0,0,0.25)"
          : "0 8px 32px rgba(0,0,0,0.12)";
        el.style.transform = featured ? "scale(1.07)" : "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = featured
          ? "0 20px 60px rgba(108,92,231,0.25), 0 4px 16px rgba(0,0,0,0.2)"
          : "0 2px 12px rgba(0,0,0,0.05)";
        el.style.transform = featured ? "scale(1.04)" : "scale(1)";
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#6C5CE7",
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            padding: "4px 14px",
            borderRadius: 20,
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </div>
      )}

      {/* Plan name */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: featured ? "#8B7CF6" : "#AAAAAA",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {name}
      </div>

      {/* Price */}
      <div
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(34px, 4vw, 44px)",
          fontWeight: 400,
          color: featured ? "#FFFFFF" : "#1A1A2E",
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {price}
      </div>

      {/* Period */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12.5,
          color: featured ? "#6060A0" : "#AAAAAA",
          marginBottom: 20,
        }}
      >
        {period}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          lineHeight: 1.65,
          color: featured ? "#9090C0" : "#777",
          margin: "0 0 32px",
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* CTA */}
      <button
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 8,
          border: featured ? "none" : "1.5px solid #D0D0D0",
          background: featured ? "#6C5CE7" : "transparent",
          color: featured ? "#fff" : "#1A1A2E",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          transition: "opacity 0.15s, transform 0.15s",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        {cta}
      </button>
    </div>
  );
}

export default function Pricing() {
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate label
    const label = labelRef.current;
    if (label) {
      label.style.opacity = "0";
      label.style.transform = "translateY(12px)";
      label.style.transition = "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s";
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          label.style.opacity = "1";
          label.style.transform = "translateY(0)";
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      obs.observe(label);
    }

    // Animate header
    const header = headerRef.current;
    if (header) {
      const children = header.querySelectorAll<HTMLElement>("[data-h]");
      children.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`;
      });
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          children.forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      obs.observe(header);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F6F3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .pricing-badge-shimmer {
          background: linear-gradient(90deg, #6C5CE7 0%, #a29bfe 40%, #6C5CE7 80%);
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 680px) {
          .pricing-cards {
            flex-direction: column !important;
            align-items: center !important;
          }
          .pricing-cards > * {
            width: 100% !important;
            max-width: 360px !important;
            transform: scale(1) !important;
          }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 860 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }} ref={headerRef}>

          {/* Label */}
          <div
            ref={labelRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div style={{ height: 1, width: 24, background: "#6C5CE7" }} />
            <span
              className="pricing-badge-shimmer"
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Pricing
            </span>
            <div style={{ height: 1, width: 24, background: "#6C5CE7" }} />
          </div>

          <h2
            data-h
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 400,
              color: "#1A1A2E",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            Simple, transparent pricing
          </h2>

          <p
            data-h
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14.5,
              color: "#888",
              margin: 0,
            }}
          >
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div
          className="pricing-cards"
          style={{
            display: "flex",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              {...plan}
              animDelay={0.15 + i * 0.13}
            />
          ))}
        </div>

      </div>
    </div>
  );
}