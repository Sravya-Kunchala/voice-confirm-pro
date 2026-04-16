"use client";

import { useEffect, useState } from "react";

export default function LifetimeDealBanner() {
  const [seats, setSeats] = useState(43);
  const [pop, setPop] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setSeats((s) => (s > 1 ? s - 1 : s));
        setPop(true);
        setTimeout(() => setPop(false), 600);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="life-banner"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        width: "100%",
        backgroundColor: "transparent",
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @media (max-width: 720px) {
          .life-banner {
            padding: 0 !important;
          }

          .life-banner__inner {
            height: auto !important;
            min-height: 48px;
            padding: 10px 12px !important;
            gap: 10px !important;
            flex-wrap: wrap !important;
          }

          .life-banner__inner p {
            font-size: 12px !important;
            white-space: normal !important;
            line-height: 1.45 !important;
          }

          .life-banner__inner > div:last-child {
            width: 100% !important;
            border-left: 0 !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
            justify-content: space-between !important;
          }

          .life-banner__inner > div:last-child span:first-child {
            font-size: 11px !important;
          }
        }
      `}</style>
      <div
        className="life-banner__inner"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "#C94E28",
          borderRadius: 0,
          padding: "0 20px",
          height: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
          overflow: "hidden",
        }}
      >
        {/* Icon */}
        <BadgeIcon />

        {/* Body text */}
        <p
          style={{
            flex: 1,
          fontSize: 13.5,
          color: "#FAECE7",
          margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Limited Lifetime Deal —{" "}
          <span
            style={{
              fontWeight: 600,
              color: "#fff",
              display: "inline-block",
              transform: pop ? "scale(1.3)" : "scale(1)",
              transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {seats} seats remaining
          </span>{" "}
          at{" "}
          <span style={{ fontWeight: 600, color: "#fff" }}>
            ₹24,999 one-time.
          </span>{" "}
          Price goes up when seats run out.
        </p>

        {/* CTA */}
        <CTAButton />
      </div>
    </div>
  );
}

function BadgeIcon() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "1.5px solid rgba(250,236,231,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FAECE7"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={12} cy={8} r={4} />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    </div>
  );
}

function CTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        flexShrink: 0,
        cursor: "pointer",
        borderLeft: "1px solid rgba(250,236,231,0.25)",
        paddingLeft: 20,
        marginLeft: 4,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        Grab yours before it&apos;s gone
      </span>
      <span
        style={{
          display: "inline-block",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.2s ease",
        }}
      >
        →
      </span>
    </div>
  );
}
