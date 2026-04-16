"use client";
import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Order placed",
    desc: "A customer places a COD order on your WooCommerce store at any time of day or night. VoiceConfirm Pro detects it instantly through a native WooCommerce webhook.",
  },
  {
    number: "02",
    title: "Smart call triggered",
    desc: "Within 60 seconds, our system places a call to the customer's phone number through Twilio's enterprise-grade telephony network. The call uses a natural, human-sounding AI voice in the customer's preferred language — detected automatically from their location and phone number.",
  },
  {
    number: "03",
    title: "Customer responds",
    desc: "The customer hears a personalised message: their name, order details, total amount, and expected delivery date. They press 1 to confirm, press 2 to modify their address, press 3 to cancel, or press 9 to be connected to your support team.",
  },
  {
    number: "04",
    title: "WooCommerce updates",
    desc: "Their response is recorded and processed in real time. VoiceConfirm Pro updates the order status in WooCommerce automatically, adds a note to the order, logs the call, and — if configured — sends a WhatsApp or SMS summary to the customer. Your dashboard shows everything.",
  },
];

const DELAYS = ["0.15s", "0.27s", "0.39s", "0.51s"];

export default function HowItWorks() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
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

    [
      eyebrowRef.current,
      headingRef.current,
      subRef.current,
      connectorRef.current,
      ...cardRefs.current,
    ]
      .filter(Boolean)
      .forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .hiw-eyebrow,
        .hiw-heading,
        .hiw-sub,
        .hiw-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .hiw-eyebrow.visible,
        .hiw-heading.visible,
        .hiw-sub.visible,
        .hiw-card.visible {
          opacity: 1;
          transform: none;
        }
        .hiw-heading.visible { transition-delay: 0.1s; }
        .hiw-sub.visible     { transition-delay: 0.18s; }

        .hiw-connector {
          position: absolute;
          top: 36px;
          left: calc(25% - 8px);
          right: calc(25% - 8px);
          height: 1px;
          background: linear-gradient(90deg, #6d28d9, rgba(109,40,217,0.25));
          opacity: 0;
          transition: opacity 0.6s ease 0.6s;
          pointer-events: none;
          z-index: 0;
        }
        .hiw-connector.visible { opacity: 1; }

        .hiw-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 24px;
          transition: opacity 0.5s ease, transform 0.5s ease,
                      border-color 0.2s, background 0.2s;
        }
        .hiw-card:hover {
          background: rgba(109,40,217,0.12);
          border-color: rgba(109,40,217,0.4);
        }
        .hiw-num {
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .hiw-card:hover .hiw-num {
          transform: scale(1.1);
          background: #7c3aed !important;
        }

        @media (max-width: 960px) {
          .hiw-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hiw-connector { display: none; }
          .hiw-section { padding: 56px 40px !important; }
        }
        @media (max-width: 540px) {
          .hiw-section { padding: 40px 20px !important; }
          .hiw-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        className="hiw-section"
        style={{
          padding: "64px 80px",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          background: "#0f0a1e",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="hiw-eyebrow"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div style={{ height: "1px", width: "28px", background: "#7c3aed", flexShrink: 0 }} />
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1.8px", color: "#7c3aed", textTransform: "uppercase" }}>
            How it works
          </span>
          <div style={{ height: "1px", width: "28px", background: "#7c3aed", flexShrink: 0 }} />
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="hiw-heading"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            color: "#ffffff",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: "-1px",
            margin: "0 0 16px",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          From order placed to confirmed<br />— in 60 seconds
        </h2>

        {/* Subtext */}
        <p
          ref={subRef}
          className="hiw-sub"
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            margin: "0 0 48px",
            lineHeight: 1.7,
          }}
        >
          Four steps. Fully automated. Zero manual effort required from your team.
        </p>

        {/* Grid */}
        <div
          className="hiw-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            position: "relative",
          }}
        >
          {/* Connector line between cards */}
          <div ref={connectorRef} className="hiw-connector" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="hiw-card"
              style={{ transitionDelay: DELAYS[i] }}
            >
              <div
                className="hiw-num"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "#6d28d9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                {step.number}
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "10px",
                }}
              >
                {step.title}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}