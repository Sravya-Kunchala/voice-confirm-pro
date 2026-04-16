"use client";
import { useEffect, useRef } from "react";

const cards = [
  {
    number: "01",
    category: "Store Owners",
    title: "WooCommerce Store Owners",
    desc: "Running a COD-heavy store in India, Middle East or Southeast Asia? Stop manually calling customers. Automate every confirmation and focus on growing.",
  },
  {
    number: "02",
    category: "Agencies",
    title: "Agencies & Developers",
    desc: "Build it into your client's WooCommerce setup as a premium value-add. White-label available. 30% recurring affiliate commission on every referral.",
  },
  {
    number: "03",
    category: "D2C Brands",
    title: "Dropshippers & D2C Brands",
    desc: "High order volumes, thin margins. One failed COD delivery wipes your profit. Confirm every order automatically and protect your margins.",
  },
];

export default function WhoItIsFor() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = [
      eyebrowRef.current,
      headingRef.current,
      ...cardRefs.current,
    ].filter(Boolean);

    elements.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .wif-eyebrow,
        .wif-heading,
        .wif-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .wif-eyebrow.visible,
        .wif-heading.visible,
        .wif-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .wif-heading.visible {
          transition-delay: 0.1s;
        }
        .wif-card:nth-child(1) { transition-delay: 0.15s; }
        .wif-card:nth-child(2) { transition-delay: 0.28s; }
        .wif-card:nth-child(3) { transition-delay: 0.41s; }

        .wif-card {
          position: relative;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 28px 24px;
          transition: opacity 0.5s ease, transform 0.5s ease,
                      border-color 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .wif-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.04), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .wif-card:hover {
          border-color: rgba(124, 58, 237, 0.35);
          box-shadow: 0 4px 24px rgba(124, 58, 237, 0.08);
        }
        .wif-card:hover::before {
          opacity: 1;
        }
        .wif-card-accent {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 0;
          background: #7c3aed;
          transition: width 0.3s ease;
        }
        .wif-card:hover .wif-card-accent {
          width: 100%;
        }

        @media (max-width: 900px) {
          .wif-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .wif-section {
            padding: 40px 20px !important;
          }
          .wif-grid {
            grid-template-columns: 1fr !important;
          }
          .wif-heading {
            font-size: clamp(24px, 6vw, 32px) !important;
            margin-bottom: 28px !important;
          }
        }
      `}</style>

      <section
        className="wif-section"
        style={{
          padding: "64px 80px",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          background: "#fff",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="wif-eyebrow"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{ height: "1px", width: "28px", background: "#7c3aed", flexShrink: 0 }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1.8px",
              color: "#7c3aed",
              textTransform: "uppercase",
            }}
          >
            Who this is for
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="wif-heading"
          style={{
            fontSize: "clamp(28px, 4vw, 38px)",
            fontWeight: 800,
            color: "#0f0a1e",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            letterSpacing: "-0.5px",
            margin: "0 0 40px 0",
            maxWidth: "480px",
            lineHeight: 1.2,
          }}
        >
          Built for every kind of COD seller
        </h2>

        {/* Cards */}
        <div
          className="wif-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.number}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="wif-card"
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.4px",
                  color: "#7c3aed",
                  textTransform: "uppercase",
                  marginBottom: "16px",
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
                  {card.number}
                </span>
                {card.category}
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#0f0a1e",
                  marginBottom: "10px",
                  fontFamily: "'Georgia', serif",
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </div>

              <div
                style={{
                  fontSize: "13.5px",
                  lineHeight: 1.75,
                  color: "#6b7280",
                }}
              >
                {card.desc}
              </div>

              <div className="wif-card-accent" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}