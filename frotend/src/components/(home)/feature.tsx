"use client";
import { useEffect, useRef } from "react";

const features = [
  {
    number: "01",
    category: "Call Intelligence",
    title: "Smart Call Queue Engine",
    subtitle: "The right call at the right time, every time.",
    desc: "VoiceConfirm Pro doesn't just call — it calls intelligently. Our queue engine prioritises orders by value, retry status, time since placement, and customer location. High-value orders get immediate priority. Calls are never bunched or dropped. If your store gets 200 orders in 10 minutes, every single one joins the queue in the right order and gets called with zero overlap.",
  },
  {
    number: "02",
    category: "Personalisation",
    title: "AI-Powered Dynamic Scripts",
    subtitle: "Every call feels like a personal call from your store.",
    desc: "Customers hear their own name, their specific order details, the total amount they'll pay, and their expected delivery window — all generated dynamically from your WooCommerce order data. No robotic templates. No \"Dear Customer.\" The AI voice adapts tone and language based on the customer's region and phone prefix.",
  },
  {
    number: "03",
    category: "Response Handling",
    title: "IVR Response Handling",
    subtitle: "Your customers talk back. VoiceConfirm listens.",
    desc: "When a customer presses a key, VoiceConfirm Pro doesn't just log it — it acts on it. Press 1 and the order is confirmed and tagged. Press 2 and a modification request is logged, and you're notified. Press 3 and the order is flagged for cancellation review. Press 9 and your support team receives a live transfer request with the order number attached.",
  },
  {
    number: "04",
    category: "Multi-Channel",
    title: "Multi-Channel Fallback",
    subtitle: "If the call doesn't land, the message still reaches them.",
    desc: "Not every customer answers unknown numbers. That's why VoiceConfirm Pro automatically falls back to WhatsApp — with the same personalised message, a tap-to-confirm button, and your store branding. If WhatsApp fails, it falls back to SMS. You configure the sequence. The system executes it.",
  },
];

const DELAYS = ["0.18s", "0.30s", "0.42s", "0.54s"];

export default function FeatureHighlights() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );

    [eyebrowRef.current, headingRef.current, ...cardRefs.current]
      .filter(Boolean)
      .forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fh-eyebrow,
        .fh-heading,
        .fh-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fh-eyebrow.visible { opacity: 1; transform: none; }
        .fh-heading.visible { opacity: 1; transform: none; transition-delay: 0.1s; }
        .fh-card.visible    { opacity: 1; transform: none; }

        .fh-card {
          position: relative;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 32px 28px;
          transition: opacity 0.5s ease, transform 0.5s ease,
                      border-color 0.25s, box-shadow 0.25s;
        }
        .fh-card:hover {
          border-color: rgba(124,58,237,0.35);
          box-shadow: 0 6px 28px rgba(124,58,237,0.08);
        }
        .fh-card-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.04), transparent 55%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .fh-card:hover .fh-card-bg { opacity: 1; }

        .fh-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          width: 0;
          background: #7c3aed;
          transition: width 0.35s ease;
        }
        .fh-card:hover::after { width: 100%; }

        @media (max-width: 860px) {
          .fh-section { padding: 56px 40px !important; }
          .fh-grid    { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .fh-section  { padding: 40px 20px !important; }
          .fh-heading  { font-size: clamp(24px,7vw,34px) !important; margin-bottom: 32px !important; }
        }
      `}</style>

      <section
        className="fh-section"
        style={{
          padding: "64px 80px",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
          background: "#fff",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="fh-eyebrow"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div style={{ height: "1px", width: "28px", background: "#7c3aed", flexShrink: 0 }} />
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.8px", color: "#7c3aed", textTransform: "uppercase" }}>
            Feature Highlights
          </span>
          <div style={{ height: "1px", width: "28px", background: "#7c3aed", flexShrink: 0 }} />
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="fh-heading"
          style={{
            fontSize: "clamp(26px,4vw,42px)",
            fontWeight: 800,
            color: "#0f0a1e",
            fontFamily: "'Georgia',serif",
            letterSpacing: "-0.5px",
            margin: "0 0 48px",
            textAlign: "center",
          }}
        >
          Four capabilities that set us apart
        </h2>

        {/* 2×2 Grid */}
        <div
          className="fh-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.number}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="fh-card"
              style={{ transitionDelay: DELAYS[i] }}
            >
              {/* Hover bg wash */}
              <div className="fh-card-bg" />

              {/* Meta */}
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.4px",
                  color: "#7c3aed",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    background: "#7c3aed",
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "1px 6px",
                    fontSize: "10px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {f.number}
                </span>
                {f.category}
              </div>

              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#0f0a1e",
                  fontFamily: "'Georgia',serif",
                  marginBottom: "6px",
                  lineHeight: 1.25,
                }}
              >
                {f.title}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  fontStyle: "italic",
                  marginBottom: "16px",
                }}
              >
                {f.subtitle}
              </div>

              <div style={{ fontSize: "13.5px", lineHeight: 1.8, color: "#6b7280" }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}