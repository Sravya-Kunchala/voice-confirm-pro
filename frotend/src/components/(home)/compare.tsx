import { useState, useEffect, useRef } from "react";

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#6C5CE7" fillOpacity="0.12" />
    <path d="M5 9.5L7.5 12L13 6.5" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#FF4D4D" fillOpacity="0.08" />
    <path d="M6 6L12 12M12 6L6 12" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

type CellValue =
  | { type: "check" }
  | { type: "cross" }
  | { type: "text"; value: string; highlight?: boolean }
  | { type: "check-text"; value: string; highlight?: boolean };

interface Row {
  feature: string;
  voiceconfirm: CellValue;
  manual: CellValue;
  sms: CellValue;
}

const rows: Row[] = [
  { feature: "Calls within 60 seconds", voiceconfirm: { type: "check" }, manual: { type: "cross" }, sms: { type: "cross" } },
  { feature: "Natural voice", voiceconfirm: { type: "check" }, manual: { type: "text", value: "Sometimes" }, sms: { type: "cross" } },
  { feature: "Multi-language support", voiceconfirm: { type: "check-text", value: "14 languages", highlight: true }, manual: { type: "text", value: "Agent-dependent" }, sms: { type: "cross" } },
  { feature: "Auto-updates WooCommerce", voiceconfirm: { type: "check" }, manual: { type: "cross" }, sms: { type: "text", value: "Partial" } },
  { feature: "Works at 2am", voiceconfirm: { type: "check" }, manual: { type: "cross" }, sms: { type: "check" } },
  { feature: "IVR response handling", voiceconfirm: { type: "check" }, manual: { type: "cross" }, sms: { type: "cross" } },
  { feature: "Call recording", voiceconfirm: { type: "check" }, manual: { type: "text", value: "Maybe" }, sms: { type: "cross" } },
  { feature: "Retry on no-answer", voiceconfirm: { type: "check-text", value: "Auto-retry", highlight: true }, manual: { type: "text", value: "Manual" }, sms: { type: "cross" } },
  { feature: "WhatsApp fallback", voiceconfirm: { type: "check" }, manual: { type: "cross" }, sms: { type: "cross" } },
  { feature: "Cost per confirmation", voiceconfirm: { type: "text", value: "₹1–3", highlight: true }, manual: { type: "text", value: "₹40–80 (agent cost)", highlight: true }, sms: { type: "text", value: "₹0.5 (SMS only)" } },
];

function Cell({ value, isVoice, visible }: { value: CellValue; isVoice?: boolean; visible?: boolean }) {
  const baseStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13.5,
    fontWeight: 500,
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.6)",
    transition: "opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
  };

  if (value.type === "check") return <div className="ca-cell-inner" style={baseStyle}><CheckIcon /></div>;
  if (value.type === "cross") return <div className="ca-cell-inner" style={baseStyle}><CrossIcon /></div>;
  if (value.type === "check-text") {
    return (
      <div className="ca-cell-inner" style={{ ...baseStyle, color: value.highlight && isVoice ? "#6C5CE7" : "#333", fontWeight: 600 }}>
        <CheckIcon />{value.value}
      </div>
    );
  }
  const color = value.highlight ? (isVoice ? "#6C5CE7" : "#E53935") : "#888";
  return (
    <div className="ca-cell-inner" style={{ ...baseStyle, color, fontWeight: value.highlight ? 700 : 400 }}>
      {value.value}
    </div>
  );
}

export default function CompetitiveAnalysis() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [visibleRows, setVisibleRows] = useState<boolean[]>(rows.map(() => false));
  const [headerVisible, setHeaderVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Header fades in first
          setTimeout(() => setHeaderVisible(true), 0);

          // Table card slides in
          setTimeout(() => setTableVisible(true), 200);

          // Rows stagger in
          rows.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 350 + i * 60);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const colWidths = ["36%", "22%", "22%", "20%"];

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        background: "#F4F3F0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: "48px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes ca-badge-slide {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ca-title-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ca-table-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ca-col-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(108,92,231,0.25); }
          60%  { box-shadow: 0 0 0 8px rgba(108,92,231,0); }
          100% { box-shadow: 0 0 0 0 rgba(108,92,231,0); }
        }
        @keyframes ca-footer-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ca-line-grow {
          from { width: 0; }
          to   { width: 28px; }
        }

        .ca-badge {
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .ca-badge.visible {
          animation: ca-badge-slide 0.5s ease 0s forwards;
        }
        .ca-badge-line {
          height: 1px;
          background: #6C5CE7;
          width: 0;
          animation-fill-mode: forwards;
        }
        .ca-badge-line.visible {
          animation: ca-line-grow 0.4s ease 0.1s forwards;
        }

        .ca-title {
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .ca-title.visible {
          animation: ca-title-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s forwards;
        }

        .ca-table-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .ca-table-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .ca-voice-col {
          animation: ca-col-pulse 1.8s ease 1.2s forwards;
        }

        .ca-row {
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.4s ease, transform 0.4s ease, background 0.15s ease;
        }
        .ca-row.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .ca-row:hover {
          background: #F0EEFF !important;
        }

        .ca-footer {
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .ca-footer.visible {
          animation: ca-footer-fade 0.6s ease 1.4s forwards;
        }

        /* Mobile */
        @media (max-width: 600px) {
          .ca-header-cols {
            display: none !important;
          }

          .ca-table-card {
            border-radius: 18px;
          }

          .ca-row {
            display: block !important;
            padding: 14px 14px 12px !important;
            margin: 0 0 12px !important;
            border: 1px solid #ececec !important;
            border-radius: 14px;
            background: #fff !important;
            transform: translateX(0) !important;
            border-bottom: 0 !important;
          }

          .ca-row:hover {
            background: #fff !important;
          }

          .ca-feature-label {
            padding: 0 0 10px !important;
            font-size: 13px !important;
            border-right: 0 !important;
            border-bottom: 1px solid #f0f0f0;
            margin-bottom: 10px;
          }

          .ca-comparison-cell {
            display: flex !important;
            align-items: center;
            justify-content: space-between !important;
            gap: 12px;
            padding: 10px 0 !important;
            border-right: 0 !important;
            border-left: 0 !important;
            border-top: 1px solid #f0f0f0;
          }

          .ca-comparison-cell::before {
            content: attr(data-label);
            font-family: 'DM Sans', sans-serif;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #6b7280;
            flex: 0 0 auto;
          }

          .ca-cell-inner {
            width: 100%;
            justify-content: flex-end !important;
            font-size: 11px !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .ca-voice-cell {
            background: rgba(108, 92, 231, 0.05) !important;
          }

          .ca-voice-cell .ca-cell-inner {
            color: #6C5CE7 !important;
          }

          .ca-comparison-cell svg {
            flex-shrink: 0;
          }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 780 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            className={`ca-badge${headerVisible ? " visible" : ""}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}
          >
            <div className={`ca-badge-line${headerVisible ? " visible" : ""}`} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700, fontSize: 11,
              letterSpacing: "0.2em", color: "#6C5CE7",
              textTransform: "uppercase",
            }}>
              Competitive Analysis
            </span>
            <div className={`ca-badge-line${headerVisible ? " visible" : ""}`} />
          </div>
          <h1
            className={`ca-title${headerVisible ? " visible" : ""}`}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(32px, 5vw, 46px)",
              fontWeight: 400, color: "#1A1A2E",
              margin: 0, lineHeight: 1.15,
            }}
          >
            How we compare
          </h1>
        </div>

        {/* Table Card */}
        <div
          className={`ca-table-card${tableVisible ? " visible" : ""}`}
          style={{
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {/* Table Header */}
          <div
            className="ca-header-cols"
            style={{
              display: "grid",
              gridTemplateColumns: colWidths.join(" "),
              background: "#12122A",
              padding: "16px 24px",
            }}
          >
            {["FEATURE", "VOICECONFIRM PRO", "MANUAL CALLING", "GENERIC SMS PLUGIN"].map((col, i) => (
              <div
                key={col}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10.5, fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: i === 1 ? "#A78BFA" : "#9090A8",
                  textAlign: i === 0 ? "left" : "center",
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => {
            const isHovered = hoveredRow === i;
            const isEven = i % 2 === 0;
            const isVisible = visibleRows[i];

            return (
              <div
                key={row.feature}
                className={`ca-row${isVisible ? " visible" : ""}`}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: colWidths.join(" "),
                  padding: "0 24px",
                  background: isHovered ? "#F0EEFF" : isEven ? "#FAFAFA" : "#fff",
                  cursor: "default",
                  borderBottom: i < rows.length - 1 ? "1px solid #F0F0F0" : "none",
                  transitionDelay: `${i * 0.04}s`,
                }}
              >
                {/* Feature label */}
                <div
                  className="ca-feature-label"
                  style={{
                    padding: "15px 16px 15px 0",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13.5, fontWeight: 500, color: "#2D2D2D",
                    borderRight: "1px solid #ECECEC",
                  }}
                >
                  {row.feature}
                </div>

                {/* VoiceConfirm Pro — highlighted */}
                <div
                  className={`ca-comparison-cell ca-voice-cell${i === 0 && tableVisible ? " ca-voice-col" : ""}`}
                  data-label="VoiceConfirm Pro"
                  style={{
                    padding: "15px 0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isHovered ? "rgba(108,92,231,0.08)" : "rgba(108,92,231,0.04)",
                    borderRight: "1px solid rgba(108,92,231,0.12)",
                    borderLeft: "1px solid rgba(108,92,231,0.12)",
                    transition: "background 0.15s ease",
                  }}
                >
                  <Cell value={row.voiceconfirm} isVoice visible={isVisible} />
                </div>

                {/* Manual Calling */}
                <div
                  className="ca-comparison-cell"
                  data-label="Manual Calling"
                  style={{
                    padding: "15px 0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderRight: "1px solid #ECECEC",
                  }}
                >
                  <Cell value={row.manual} visible={isVisible} />
                </div>

                {/* Generic SMS */}
                <div
                  className="ca-comparison-cell"
                  data-label="Generic SMS Plugin"
                  style={{
                    padding: "15px 0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Cell value={row.sms} visible={isVisible} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p
          className={`ca-footer${tableVisible ? " visible" : ""}`}
          style={{
            textAlign: "center", marginTop: 20,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, color: "#AAAAAA",
            letterSpacing: "0.02em",
          }}
        >
          All costs in INR. Pricing based on typical agent rates and plugin plans.
        </p>

      </div>
    </div>
  );
}
