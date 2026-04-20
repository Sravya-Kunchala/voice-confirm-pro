"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const steps = [
  {
    number: "01",
    tag: "ORDER PLACED",
    title: "A customer places a COD order",
    description:
      "A customer places a COD order on your WooCommerce store at any time of day or night. VoiceConfirm Pro detects it instantly through a native WooCommerce webhook.",
    card: {
      type: "specs",
      heading: "TRIGGER SPECS",
      items: [
        { accent: "24", rest: "/7", label: "ALWAYS MONITORING" },
        { accent: "0", rest: "MS", label: "DETECTION DELAY" },
        { accent: "NATIVE", rest: "", label: "WOOCOMMERCE WEBHOOK" },
      ],
    },
  },
  {
    number: "02",
    tag: "SMART CALL TRIGGERED",
    title: "A call goes out within 60 seconds",
    description:
      "Within 60 seconds, our system places a call to the customer's phone number through Twilio's enterprise-grade telephony network. The call uses a natural, human sounding AI voice in the customer's preferred language detected automatically from their location and phone number.",
    card: {
      type: "specs",
      heading: "CALL SPECS",
      items: [
        { accent: "<60", rest: "S", label: "TIME TO FIRST CALL" },
        { accent: "14", rest: "", label: "LANGUAGES AUTO-DETECTED" },
        { accent: "AI", rest: "", label: "NATURAL HUMAN-SOUNDING VOICE" },
      ],
    },
  },
  {
    number: "03",
    tag: "CUSTOMER RESPONDS",
    title: "A personalised message. A simple keypress.",
    description:
      "The customer hears a personalized message: their name, order details, total amount, and expected delivery date. They press 1 to confirm, press 2 to modify their address, press 3 to cancel, or press 9 to be connected to your support team.",
    card: {
      type: "keys",
      options: [
        { key: "1", label: "Confirm order", sub: "ORDER MARKED VERIFIED → PROCEEDS TO FULFILMENT" },
        { key: "2", label: "Modify address", sub: "MODIFICATION LOGGED → YOUR TEAM NOTIFIED" },
        { key: "3", label: "Cancel order", sub: "FLAGGED FOR CANCELLATION REVIEW" },
        { key: "9", label: "Connect to support", sub: "LIVE TRANSFER → ORDER NUMBER TO YOUR TEAM" },
      ],
    },
  },
  {
    number: "04",
    tag: "WOOCOMMERCE UPDATES",
    title: "Everything syncs back automatically",
    description:
      "Their response is recorded and processed in real time. VoiceConfirm Pro updates the order status in WooCommerce automatically, adds a note to the order, logs the call, and if configured sends a WhatsApp or SMS summary to the customer. Your dashboard shows everything.",
    card: {
      type: "updates",
      items: [
        "ORDER STATUS UPDATED AUTOMATICALLY",
        "CALL NOTE ADDED TO ORDER",
        "FULL CALL LOG RECORDED",
        "WHATSAPP SUMMARY (IF ENABLED)",
        "SMS FALLBACK (IF CONFIGURED)",
        "DASHBOARD UPDATED LIVE",
      ],
    },
  },
];

const MONO = "'Space Mono', monospace";
const SANS = "'Syne', sans-serif";
const ACCENT = "#7b6fba";
const TEXT_DARK = "#1a1814";
const TEXT_MID = "#5a5447";
const TEXT_DIM = "#6b6459";
const TEXT_LIGHT = "#e8e1d4";
const CARD_BG = "#1a1814";
const CARD_BORDER = "#2e2a26";
const BORDER = "#d6d0c4";
const BG = "#f5f2eb";

function useInView<T extends HTMLElement>(ref: RefObject<T | null>, threshold = 0.1): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); io.unobserve(el); }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return visible;
}

function SpecsCard({
  heading,
  items,
  visible,
}: {
  heading: string;
  items: { accent: string; rest: string; label: string }[];
  visible: boolean;
}) {
  return (
    <div style={{ background: CARD_BG, borderRadius: 8, padding: "22px 24px" }}>
      <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.16em", color: TEXT_DIM, margin: "0 0 18px" }}>
        {heading}
      </p>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: i < items.length - 1 ? 18 : 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-8px)",
            transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
          }}
        >
          <div style={{
            fontFamily: MONO,
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.1,
            display: "flex",
            alignItems: "baseline",
          }}>
            <span style={{ color: ACCENT }}>{item.accent}</span>
            {item.rest && <span style={{ color: "#ffffff" }}>{item.rest}</span>}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.12em", color: TEXT_DIM, marginTop: 3 }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function KeyOptionsCard({ options, visible }: { options: { key: string; label: string; sub: string }[]; visible: boolean }) {
  return (
    <div style={{ background: CARD_BG, borderRadius: 8, padding: "14px 18px" }}>
      {options.map((opt, i) => {
        const [hovered, setHovered] = useState(false);
        return (
          <div
            key={i}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "10px 0",
              borderBottom: i < options.length - 1 ? `1px solid ${CARD_BORDER}` : "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-8px)",
              transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, transform 0.5s ease ${0.3 + i * 0.07}s`,
            }}
          >
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              background: hovered ? ACCENT : CARD_BORDER,
              border: `1px solid ${hovered ? ACCENT : "#3e3a36"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: MONO, fontSize: 10, color: TEXT_LIGHT,
              flexShrink: 0, marginTop: 1,
              transition: "background 0.25s, border-color 0.25s",
            }}>
              {opt.key}
            </div>
            <div>
              <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: TEXT_LIGHT, marginBottom: 3 }}>
                {opt.label}
              </div>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#4ecba0", lineHeight: 1.5 }}>
                {opt.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function UpdatesCard({ items, visible }: { items: string[]; visible: boolean }) {
  return (
    <div style={{ background: CARD_BG, borderRadius: 8, padding: "22px 24px" }}>
      <p style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.16em", color: TEXT_DIM, margin: "0 0 16px" }}>
        WHAT GETS UPDATED:
      </p>
      {items.map((u, i) => (
        <div key={i} style={{
          display: "flex", gap: 8, alignItems: "flex-start",
          marginBottom: i < items.length - 1 ? 10 : 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-8px)",
          transition: `opacity 0.5s ease ${0.3 + i * 0.08}s, transform 0.5s ease ${0.3 + i * 0.08}s`,
        }}>
          <span style={{ color: ACCENT, flexShrink: 0, fontFamily: MONO, fontSize: 10, lineHeight: 1.6 }}>▸</span>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: "#4ecba0", lineHeight: 1.6 }}>
            {u}
          </span>
        </div>
      ))}
    </div>
  );
}

function StepRow({ step, isLast }: { step: typeof steps[number]; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="step-row"
      style={{
        borderTop: `1px solid ${BORDER}`,
        borderBottom: isLast ? `1px solid ${BORDER}` : "none",
        padding: "44px 0",
        display: "grid",
        gridTemplateColumns: "72px 1fr 280px",
        gap: "0 32px",
        alignItems: "start",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Step number */}
      <div style={{
        fontFamily: MONO,
        fontSize: 48,
        fontWeight: 700,
        color: hovered ? ACCENT : "#c8c2b4",
        lineHeight: 1,
        paddingTop: 4,
        transition: "color 0.3s ease",
        userSelect: "none",
      }}>
        {step.number}
      </div>

      {/* Text content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.16em", color: ACCENT, textTransform: "uppercase" }}>
          {step.tag}
        </span>
        <h2 style={{
          fontFamily: SANS,
          fontSize: "clamp(18px, 2vw, 24px)",
          fontWeight: 700,
          color: TEXT_DARK,
          lineHeight: 1.2,
          margin: 0,
        }}>
          {step.title}
        </h2>
        <p style={{
          fontFamily: SANS,
          fontSize: 13,
          lineHeight: 1.75,
          color: TEXT_MID,
          margin: 0,
          fontWeight: 400,
        }}>
          {step.description}
        </p>
      </div>

      {/* Card */}
      <div style={{ width: "100%", minWidth: 0 }}>
        {step.card.type === "specs" && (
          <SpecsCard heading={(step.card as any).heading} items={(step.card as any).items} visible={visible} />
        )}
        {step.card.type === "keys" && (
          <KeyOptionsCard options={(step.card as any).options} visible={visible} />
        )}
        {step.card.type === "updates" && (
          <UpdatesCard items={(step.card as any).items} visible={visible} />
        )}
      </div>
    </div>
  );
}

export default function OrderConfirmProcess() {
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setBadgeVisible(true), 100);
    const t2 = setTimeout(() => setHeadingVisible(true), 220);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        .step-row {
          grid-template-columns: 72px 1fr 280px !important;
        }

        /* Tablet */
        @media (max-width: 860px) {
          .step-row {
            grid-template-columns: 56px 1fr !important;
            gap: 0 20px !important;
          }
          .step-row > div:last-child {
            grid-column: 1 / -1 !important;
            margin-top: 20px !important;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .step-row {
            grid-template-columns: 1fr !important;
            gap: 12px 0 !important;
            padding: 28px 0 !important;
          }
          .step-row > div:first-child {
            font-size: 36px !important;
          }
        }
      `}</style>

      <div style={{
        fontFamily: SANS,
        background: BG,
        minHeight: "100vh",
        padding: "56px 32px 80px",
        boxSizing: "border-box",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Badge — left aligned like image 1 */}
          <div style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.18em",
            color: ACCENT,
            border: `1px dashed ${ACCENT}`,
            display: "inline-block",
            padding: "4px 12px",
            marginBottom: 20,
            borderRadius: 2,
            opacity: badgeVisible ? 1 : 0,
            transform: badgeVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            4-STEP PROCESS
          </div>

          {/* Rule */}
          <div style={{
            borderTop: `1px solid ${BORDER}`,
            marginBottom: 28,
            opacity: badgeVisible ? 1 : 0,
            transition: "opacity 0.5s ease 0.1s",
          }} />

          {/* Heading — left aligned, large, uppercase like image 1 */}
          <h1 style={{
            fontFamily: SANS,
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.08,
            color: TEXT_DARK,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: 60,
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
            textAlign: "left",
          }}>
            From Order Placed<br />To Confirmed
          </h1>

          <div>
            {steps.map((step, i) => (
              <StepRow key={i} step={step} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}