import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "I was spending ₹40,000 a month on a calling team just to confirm COD orders — and still losing 22% to RTOs. VoiceConfirm Pro cut that entire operation. Within 6 weeks my RTO rate was down to 8%. I wish I'd found this two years ago.",
    name: "Karthik Rajan",
    title: "Electronics Store, Chennai",
    initials: "KR",
  },
  {
    quote:
      "My customers kept ignoring calls from unknown numbers. With VoiceConfirm Pro, the WhatsApp fallback kicks in automatically and the confirmation rate jumped from 61% to 94%. The multi-channel approach changed everything.",
    name: "Priya Nambiar",
    title: "Fashion D2C Brand, Kochi",
    initials: "PN",
  },
  {
    quote:
      "The WhatsApp fallback alone is worth the price of the plugin. We sell across the UAE and Saudi Arabia and a large chunk of our customers just don't answer calls from India numbers. Now they confirm on WhatsApp in their own language. Game-changer.",
    name: "Mohammed Rashid",
    title: "Cross-border D2C, Dubai",
    initials: "MR",
  },
];

function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="t-avatar"
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#E8E5FF",
        color: "#6C5CE7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.04em",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  title,
  initials,
  delay,
}: {
  quote: string;
  name: string;
  title: string;
  initials: string;
  delay: number;
}) {
  const ref = useScrollReveal(delay);

  return (
    <div
      className="t-card"
      ref={ref}
      style={{
        background: "#fff",
        border: "1px solid #EBEBEB",
        borderRadius: 12,
        padding: "28px 28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        flex: "1 1 0",
        minWidth: 0,
        transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 12px 40px rgba(108,92,231,0.12)";
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "#C4BBFF";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
        el.style.borderColor = "#EBEBEB";
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 28,
          color: "#C4BBFF",
          lineHeight: 1,
          userSelect: "none",
          textAlign: "left",
          width: "100%",
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        className="t-quote"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          lineHeight: 1.75,
          color: "#3A3A4A",
          margin: 0,
          flex: 1,
        }}
      >
        {quote}
      </p>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar initials={initials} />
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 13.5,
              color: "#1A1A2E",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#9090A8",
              marginTop: 1,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const labelRef = useScrollReveal(0);
  const headingRef = useScrollReveal(0.1);

  return (
    <div
      className="t-section"
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        @media (max-width: 600px) {
          .t-section {
            min-height: auto !important;
            padding: 34px 16px 44px !important;
            align-items: flex-start !important;
          }

          .t-wrap {
            max-width: 100% !important;
          }

          .t-label {
            margin-bottom: 12px !important;
            gap: 8px !important;
          }

          .t-label span {
            font-size: 9.5px !important;
            letter-spacing: 0.16em !important;
          }

          .t-heading {
            font-size: clamp(26px, 10vw, 34px) !important;
            margin: 0 0 24px !important;
          }

          .t-cards {
            flex-direction: column !important;
            gap: 14px !important;
          }

          .t-card {
            width: 100% !important;
            padding: 22px 18px 18px !important;
            gap: 16px !important;
          }

          .t-quote {
            font-size: 13px !important;
            line-height: 1.7 !important;
          }

          .t-avatar {
            width: 32px !important;
            height: 32px !important;
            font-size: 11px !important;
          }
        }
      `}</style>

      <div className="t-wrap" style={{ width: "100%", maxWidth: 860 }}>

        {/* Section label */}
        <div ref={labelRef} className="t-label" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ height: 1, width: 28, background: "#6C5CE7" }} />
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#6C5CE7",
              textTransform: "uppercase",
            }}
          >
            Customer Testimonials
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="t-heading"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 400,
            color: "#1A1A2E",
            margin: "0 0 36px",
            lineHeight: 1.2,
          }}
        >
          Stores that stopped the bleeding
        </h2>

        {/* Cards */}
        <div
          className="t-cards"
          style={{
            display: "flex",
            gap: 20,
            alignItems: "stretch",
            flexWrap: "wrap",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} delay={0.2 + i * 0.12} />
          ))}
        </div>
      </div>
    </div>
  );
}
