const beforeStats = [
  { label: "RTO (Return to Origin) rate", value: "31%" },
  { label: "Monthly calling team cost", value: "₹38,000" },
  { label: "Daily manual confirmation work", value: "4–6 hrs" },
  { label: "Confirmation rate (manual calls)", value: "62%" },
];

const afterStats = [
  { label: "RTO rate (↓ 77%)", value: "7%" },
  { label: "Monthly plugin cost (Pro plan)", value: "₹4,999" },
  { label: "Manual calling required", value: "0 hrs" },
  { label: "Confirmation rate (automated)", value: "96.4%" },
  { label: "Revenue recovered in 90 days", value: "₹6.2L" },
];

function StatRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="cs-stat-row"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "11px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#9090B8",
          fontWeight: 400,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          fontWeight: 700,
          color: "#EEEEFF",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function CaseStudy() {
  return (
    <div
      className="cs-section"
      style={{
        minHeight: "100vh",
        background: "#0E0E1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @media (max-width: 600px) {
          .cs-section {
            min-height: auto !important;
            padding: 34px 16px 40px !important;
            align-items: flex-start !important;
          }

          .cs-wrap {
            max-width: 100% !important;
          }

          .cs-label {
            gap: 8px !important;
            margin-bottom: 12px !important;
          }

          .cs-label span {
            font-size: 9.5px !important;
            letter-spacing: 0.16em !important;
          }

          .cs-heading {
            font-size: clamp(24px, 8vw, 32px) !important;
            margin: 0 0 22px !important;
          }

          .cs-card-header {
            padding: 22px 18px 20px !important;
          }

          .cs-client-meta {
            font-size: 10px !important;
            line-height: 1.5 !important;
          }

          .cs-client-name {
            font-size: clamp(20px, 7vw, 26px) !important;
          }

          .cs-stats-grid {
            grid-template-columns: 1fr !important;
          }

          .cs-before,
          .cs-after {
            padding: 20px 18px 16px !important;
          }

          .cs-before {
            border-right: 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.07) !important;
          }

          .cs-section-title {
            margin-bottom: 12px !important;
          }

          .cs-stat-row {
            padding: 10px 0 !important;
            gap: 10px !important;
          }

          .cs-stat-row span:first-child {
            font-size: 11.5px !important;
            line-height: 1.45 !important;
          }

          .cs-stat-row span:last-child {
            font-size: 13px !important;
          }

          .cs-divider {
            margin: 0 18px !important;
          }

          .cs-quote {
            padding: 20px 18px 22px !important;
            gap: 14px !important;
            flex-direction: row !important;
          }

          .cs-quote-mark {
            width: 2px !important;
          }

          .cs-quote-text {
            font-size: 12.5px !important;
            line-height: 1.65 !important;
            margin: 0 0 12px !important;
          }

          .cs-quote-author {
            font-size: 10.5px !important;
            letter-spacing: 0.04em !important;
          }
        }
      `}</style>

      <div className="cs-wrap" style={{ width: "100%", maxWidth: 720 }}>
        {/* Section label */}
        <div
          className="cs-label"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div style={{ height: 1, width: 24, background: "#8B7CF6" }} />
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#8B7CF6",
              textTransform: "uppercase",
            }}
          >
            Case Study
          </span>
        </div>

        {/* Heading */}
        <h2
          className="cs-heading"
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 400,
            color: "#FFFFFF",
            margin: "0 0 32px",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Real results. Real numbers.
        </h2>

        {/* Card */}
        <div
          className="cs-card"
          style={{
            background: "#16162A",
            border: "1px solid rgba(139,124,246,0.25)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 48px rgba(0,0,0,0.4)",
          }}
        >
          {/* Client header */}
          <div
            className="cs-card-header"
            style={{
              background: "linear-gradient(135deg, #4A3DB5 0%, #6C35C9 100%)",
              padding: "28px 32px 26px",
            }}
          >
            <div
              className="cs-client-meta"
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.6)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Client — Hyderabad, India
            </div>
            <div
              className="cs-client-name"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 400,
                color: "#FFFFFF",
                marginBottom: 6,
              }}
            >
              ElectroMart Hyderabad
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.01em",
              }}
            >
              Consumer electronics · WooCommerce COD store · 800–1,200 orders/month
            </div>
          </div>

          {/* Stats grid */}
          <div
            className="cs-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
            }}
          >
            {/* Before */}
            <div
              className="cs-before"
              style={{
                padding: "28px 28px 20px",
                borderRight: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="cs-section-title"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "#5A5A7A",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Before VoiceConfirm Pro
              </div>
              {beforeStats.map((s) => (
                <StatRow key={s.label} label={s.label} value={s.value} />
              ))}
            </div>

            {/* After */}
            <div className="cs-after" style={{ padding: "28px 28px 20px" }}>
              <div
                className="cs-section-title"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "#5A5A7A",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                After VoiceConfirm Pro — 90 Days
              </div>
              {afterStats.map((s) => (
                <StatRow key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="cs-divider"
            style={{
              height: 1,
              background: "rgba(255,255,255,0.07)",
              margin: "0 32px",
            }}
          />

          {/* Quote */}
          <div
            className="cs-quote"
            style={{
              padding: "28px 32px 32px",
              display: "flex",
              gap: 18,
            }}
          >
            <div
              className="cs-quote-mark"
              style={{
                width: 3,
                borderRadius: 4,
                background: "linear-gradient(180deg, #8B7CF6, #4A3DB5)",
                flexShrink: 0,
                alignSelf: "stretch",
              }}
            />
            <div>
              <p
                className="cs-quote-text"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(13px, 1.6vw, 15px)",
                  lineHeight: 1.75,
                  color: "#C8C8E8",
                  margin: "0 0 14px",
                }}
              >
                "We were losing close to ₹2 lakhs every month to failed deliveries and wrong
                addresses. VoiceConfirm Pro paid for itself in the first week. Our logistics
                partner noticed the change before we even reported it — our RTO rate dropped so
                fast they called to ask what we'd changed."
              </p>
              <div
                className="cs-quote-author"
                style={{
                  fontSize: 11.5,
                  color: "#6060A0",
                  letterSpacing: "0.06em",
                }}
              >
                {"— "}
                <span
                  style={{
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #A78BFA, #6C35C9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Suresh Kumar
                </span>
                {", Founder, ElectroMart Hyderabad"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}