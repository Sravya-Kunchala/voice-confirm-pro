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
        { value: "24/7", label: "ALWAYS MONITORING" },
        { value: "0MS", label: "DETECTION DELAY" },
        { value: "NATIVE", label: "WOOCOMMERCE WEBHOOK" },
      ],
    },
  },
  {
    number: "02",
    tag: "SMART CALL TRIGGERED",
    title: "A call goes out within 60 seconds",
    description:
      "Within 60 seconds, our system places a call to the customer's phone number through Twilio's enterprise-grade telephony network. The call uses a natural, human-sounding AI voice in the customer's preferred language.",
    card: {
      type: "specs",
      heading: "CALL SPECS",
      items: [
        { value: "<60S", label: "TIME TO FIRST CALL" },
        { value: "14", label: "LANGUAGES AUTO-DETECTED" },
        { value: "AI", label: "NATURAL HUMAN-SOUNDING VOICE" },
      ],
    },
  },
  {
    number: "03",
    tag: "CUSTOMER RESPONSE",
    title: "A personalised message. A simple keypress.",
    description:
      "The customer hears a personalized message: their name, order details, total amount, and expected delivery date. They press 1 to confirm, 2 to modify address, 3 to cancel, or 9 for support.",
    card: {
      type: "keys",
      options: [
        { key: "1", label: "Confirm order", sub: "ORDER MARKED VERIFIED → PROCEEDS TO FULFILMENT" },
        { key: "2", label: "Modify address", sub: "CORRECTION LOGGED → YOUR TEAM NOTIFIED" },
        { key: "3", label: "Cancel order", sub: "FLAGGED FOR CANCELLATION REVIEW" },
        { key: "9", label: "Connect to support", sub: "LIVE TRANSFER → ORDER SHARED TO YOUR TEAM" },
      ],
    },
  },
  {
    number: "04",
    tag: "WOOCOMMERCE UPDATES",
    title: "Everything syncs back automatically",
    description:
      "Their response is recorded and processed in real time. VoiceConfirm Pro updates the order status in WooCommerce automatically, adds a note to the order, logs the call, and sends summaries if configured.",
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
const DARK_BG = "#1a1814";
const ACCENT = "#7b6fba";
const TEXT_DARK = "#1a1814";
const TEXT_MID = "#5a5447";
const TEXT_LIGHT = "#e8e1d4";
const TEXT_DIM = "#6b6459";
const TEXT_MED = "#a09688";
const BORDER = "#d6d0c4";
const CARD_BORDER = "#2e2a26";

// ─── Specs Card ────────────────────────────────────────────────────────────────
function SpecsCard({
  heading,
  items,
  visible,
}: {
  heading: string;
  items: { value: string; label: string }[];
  visible: boolean;
}) {
  return (
    <div
      className="product-steps__specs"
      style={{
        background: DARK_BG,
        borderRadius: 6,
        padding: "18px 20px",
        transform: visible ? "scale(1)" : "scale(0.97)",
        transition: "transform 0.35s ease",
      }}
    >
      <p
        style={{
          fontFamily: MONO,
          fontSize: 9,
          letterSpacing: "0.16em",
          color: TEXT_DIM,
          margin: "0 0 14px 0",
        }}
      >
        {heading}
      </p>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: i < items.length - 1 ? 14 : 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-8px)",
            transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 26,
              fontWeight: 700,
              color: TEXT_LIGHT,
              lineHeight: 1.1,
            }}
          >
            {item.value}
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 8,
              letterSpacing: "0.12em",
              color: TEXT_DIM,
              marginTop: 2,
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Key Options Card ──────────────────────────────────────────────────────────
function KeyOptionsCard({
  options,
  visible,
}: {
  options: { key: string; label: string; sub: string }[];
  visible: boolean;
}) {
  return (
    <div
      className="product-steps__keys"
      style={{
        background: DARK_BG,
        borderRadius: 6,
        padding: "14px 16px",
        transform: visible ? "scale(1)" : "scale(0.97)",
        transition: "transform 0.35s ease",
      }}
    >
      {options.map((opt, i) => (
        <KeyRow key={i} opt={opt} isLast={i === options.length - 1} visible={visible} delay={i * 0.07} />
      ))}
    </div>
  );
}

function KeyRow({
  opt,
  isLast,
  visible,
  delay,
}: {
  opt: { key: string; label: string; sub: string };
  isLast: boolean;
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="product-steps__key-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "8px 0",
        borderBottom: !isLast ? `1px solid ${CARD_BORDER}` : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-8px)",
        transition: `opacity 0.5s ease ${0.3 + delay}s, transform 0.5s ease ${0.3 + delay}s`,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: hovered ? ACCENT : CARD_BORDER,
          border: `1px solid ${hovered ? ACCENT : "#3e3a36"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: MONO,
          fontSize: 10,
          color: TEXT_LIGHT,
          flexShrink: 0,
          marginTop: 2,
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        {opt.key}
      </div>
      <div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 12,
            fontWeight: 600,
            color: TEXT_LIGHT,
            marginBottom: 3,
          }}
        >
          {opt.label}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 8,
            letterSpacing: "0.1em",
            color: TEXT_DIM,
            lineHeight: 1.5,
          }}
        >
          {opt.sub}
        </div>
      </div>
    </div>
  );
}

// ─── Updates Card ──────────────────────────────────────────────────────────────
function UpdatesCard({
  items,
  visible,
}: {
  items: string[];
  visible: boolean;
}) {
  return (
    <div
      className="product-steps__updates"
      style={{
        background: DARK_BG,
        borderRadius: 6,
        padding: "18px 20px",
        transform: visible ? "scale(1)" : "scale(0.97)",
        transition: "transform 0.35s ease",
      }}
    >
      <p
        style={{
          fontFamily: MONO,
          fontSize: 9,
          letterSpacing: "0.16em",
          color: TEXT_DIM,
          margin: "0 0 14px 0",
        }}
      >
        WHAT GETS UPDATED:
      </p>
      {items.map((u, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "flex-start",
            marginBottom: i < items.length - 1 ? 8 : 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-8px)",
            transition: `opacity 0.5s ease ${0.3 + i * 0.08}s, transform 0.5s ease ${0.3 + i * 0.08}s`,
          }}
        >
          <span
            style={{
              color: ACCENT,
              flexShrink: 0,
              fontFamily: MONO,
              fontSize: 10,
              lineHeight: 1.6,
            }}
          >
            ▸
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: "0.1em",
              color: TEXT_MED,
              lineHeight: 1.6,
            }}
          >
            {u}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Connector Line ────────────────────────────────────────────────────────────
function ConnectorLine({ visible }: { visible: boolean }) {
  return (
    <div
      className="product-steps__connector"
      style={{ display: "flex", paddingLeft: 8, height: 32, alignItems: "center" }}
    >
      <div
        style={{
          width: 2,
          height: visible ? 32 : 0,
          background: `linear-gradient(to bottom, ${ACCENT}44, ${ACCENT}22)`,
          marginLeft: 28,
          transition: "height 0.4s ease 0.2s",
        }}
      />
    </div>
  );
}

// ─── Step Row ──────────────────────────────────────────────────────────────────
function StepRow({
  step,
  isLast,
}: {
  step: (typeof steps)[number];
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.12);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="product-steps__step"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `1px solid ${BORDER}`,
        borderBottom: isLast ? `1px solid ${BORDER}` : "none",
        padding: "40px 8px",
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
        flexWrap: "wrap",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Step number */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 700,
          color: hovered ? ACCENT : "#c8c2b4",
          lineHeight: 1,
          minWidth: 56,
          flexShrink: 0,
          paddingTop: 4,
          transition: "color 0.3s ease",
        }}
      >
        {step.number}
      </div>

      {/* Text body */}
      <div
        style={{
          flex: "1 1 200px",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.14em",
            color: ACCENT,
          }}
        >
          {step.tag}
        </span>
        <h2
          style={{
            fontFamily: SANS,
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: 700,
            color: TEXT_DARK,
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {step.title}
        </h2>
        <p
          style={{
            fontFamily: SANS,
            fontSize: 14,
            lineHeight: 1.75,
            color: TEXT_MID,
            margin: 0,
            maxWidth: 420,
            fontWeight: 400,
          }}
        >
          {step.description}
        </p>
      </div>

      {/* Visual card */}
      <div style={{ flex: "0 1 220px", minWidth: 180, width: "100%" }}>
        {step.card.type === "specs" && (
          <SpecsCard
            heading={(step.card as any).heading}
            items={(step.card as any).items}
            visible={visible}
          />
        )}
        {step.card.type === "keys" && (
          <KeyOptionsCard
            options={(step.card as any).options}
            visible={visible}
          />
        )}
        {step.card.type === "updates" && (
          <UpdatesCard
            items={(step.card as any).items}
            visible={visible}
          />
        )}
      </div>
    </div>
  );
}

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  threshold = 0.1
): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function OrderConfirmProcess() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [connVisible, setConnVisible] = useState<boolean[]>(
    Array(steps.length - 1).fill(false)
  );

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  // Badge + heading: animate on load
  useEffect(() => {
    const t1 = setTimeout(() => setBadgeVisible(true), 100);
    const t2 = setTimeout(() => setHeadingVisible(true), 220);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Connector lines: trigger after corresponding step becomes visible
  // We handle this via a simple timed approach keyed to scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(
              (entry.target as HTMLElement).dataset.stepIndex ?? "-1"
            );
            if (idx > 0) {
              setTimeout(() => {
                setConnVisible((prev) => {
                  const next = [...prev];
                  next[idx - 1] = true;
                  return next;
                });
              }, 200);
            }
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll("[data-step-index]")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="product-steps"
      style={{
        fontFamily: SANS,
        background: "#f5f2eb",
        minHeight: "100vh",
        padding: "48px 24px",
        boxSizing: "border-box",
      }}
    >
      <div className="product-steps__wrap" style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Badge */}
        <div
          ref={badgeRef}
          className="product-steps__badge"
          style={{
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.18em",
            color: ACCENT,
            border: `1px dashed ${ACCENT}`,
            display: "inline-block",
            padding: "4px 12px",
            marginBottom: 28,
            borderRadius: 2,
            opacity: badgeVisible ? 1 : 0,
            transform: badgeVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          4-STEP PROCESS
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="product-steps__heading"
          style={{
            fontFamily: SANS,
            fontSize: "clamp(32px, 6vw, 54px)",
            fontWeight: 800,
            lineHeight: 1.05,
            color: TEXT_DARK,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: 56,
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          From Order Placed
          <br />
          To Confirmed
        </h1>

        {/* Steps */}
        <div className="product-steps__list">
          {steps.map((step, i) => (
            <div key={i} data-step-index={i}>
              {i > 0 && <ConnectorLine visible={connVisible[i - 1]} />}
              <StepRow step={step} isLast={i === steps.length - 1} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .product-steps {
            min-height: auto !important;
            padding: 28px 14px 36px !important;
          }

          .product-steps__wrap {
            max-width: 100% !important;
          }

          .product-steps__badge {
            margin-bottom: 18px !important;
            font-size: 9.5px !important;
            letter-spacing: 0.16em !important;
            padding: 4px 10px !important;
          }

          .product-steps__heading {
            font-size: clamp(28px, 10vw, 38px) !important;
            margin-bottom: 30px !important;
            line-height: 1.08 !important;
          }

          .product-steps__list {
            display: flex;
            flex-direction: column;
            gap: 0;
          }

          .product-steps__connector {
            padding-left: 4px !important;
            height: 22px !important;
          }

          .product-steps__connector > div {
            margin-left: 18px !important;
            width: 1.5px !important;
          }

          .product-steps__step {
            padding: 24px 4px 22px !important;
            gap: 14px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .product-steps__step > div:first-child {
            min-width: 0 !important;
            padding-top: 0 !important;
            font-size: clamp(22px, 9vw, 30px) !important;
          }

          .product-steps__step > div:nth-child(2) {
            gap: 8px !important;
            flex: 1 1 auto !important;
          }

          .product-steps__step > div:nth-child(2) h2 {
            font-size: clamp(18px, 5.6vw, 22px) !important;
          }

          .product-steps__step > div:nth-child(2) p {
            font-size: 13px !important;
            line-height: 1.65 !important;
            max-width: 100% !important;
          }

          .product-steps__step > div:nth-child(3) {
            flex: 1 1 auto !important;
            min-width: 0 !important;
          }

          .product-steps__specs,
          .product-steps__keys,
          .product-steps__updates {
            padding: 14px 14px !important;
          }

          .product-steps__specs p,
          .product-steps__keys p,
          .product-steps__updates p {
            font-size: 8px !important;
            margin-bottom: 10px !important;
          }

          .product-steps__specs div > div:first-child {
            font-size: 22px !important;
          }

          .product-steps__specs div > div:last-child {
            font-size: 7px !important;
          }

          .product-steps__key-row {
            gap: 10px !important;
            padding: 7px 0 !important;
          }

          .product-steps__key-row > div:first-child {
            width: 22px !important;
            height: 22px !important;
            font-size: 9px !important;
          }

          .product-steps__key-row > div:last-child > div:first-child {
            font-size: 11px !important;
          }

          .product-steps__key-row > div:last-child > div:last-child {
            font-size: 7px !important;
            line-height: 1.45 !important;
          }

          .product-steps__updates span:last-child {
            font-size: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
