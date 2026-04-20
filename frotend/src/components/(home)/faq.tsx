import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "Do I need a developer to set up VoiceConfirm Pro?",
    a: "No. If you can install a WordPress plugin, you can set up VoiceConfirm Pro. The entire setup — installing the plugin, connecting your Twilio account, choosing your script template, and activating your first call flow — takes under 15 minutes. We provide a step-by-step video guide and a written setup guide. Pro and Agency customers also get a free onboarding call with our team.",
  },
  {
    q: "Do I need a Twilio account?",
    a: "Yes. VoiceConfirm Pro uses your Twilio or Vonage account to make calls. Creating a Twilio account is free. You add credit as you need it (minimum ₹1,000 to start). Twilio charges you directly for calls — we never touch your telephony billing. If you don't have a Twilio account, we'll walk you through the 5-minute signup during your onboarding call.",
  },
  {
    q: "What WooCommerce version does it work with?",
    a: "VoiceConfirm Pro requires WooCommerce 6.0 or higher and WordPress 5.8 or higher. It works with WooCommerce HPOS (High Performance Order Storage) and the legacy orders table. PHP 7.4 minimum, PHP 8.1 recommended.",
  },
  {
    q: "Does it work with my existing theme?",
    a: "Yes. VoiceConfirm Pro operates entirely in the WordPress admin and backend — it has no frontend impact on your theme. It will work with any WooCommerce-compatible theme.",
  },
  {
    q: "What languages does the voice bot speak?",
    a: "Hindi, English (Indian accent), Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Urdu, Arabic, Bahasa Indonesia, and Thai. More languages are added quarterly based on customer requests.",
  },
  {
    q: "Can I customise what the bot says?",
    a: "Completely. The Template Builder lets you write the exact script using plain text plus shortcode variables. You control the intro, the order summary block, the IVR menu options, and the closing message. You can have different scripts for different product categories, different order values, or different shipping zones.",
  },
  {
    q: "What happens if the customer doesn't answer?",
    a: "The system retries up to 3 times at configurable intervals — you set the gaps (default: 5 minutes, 30 minutes, 2 hours). After 3 missed calls, VoiceConfirm Pro automatically sends a WhatsApp message (if connected) followed by an SMS. Every attempt is logged in your dashboard. You can also manually re-trigger a call for any order with one click.",
  },
  {
    q: "Can customers cancel or modify their order through the call?",
    a: "Yes. When a customer presses 2 (modify), the system can trigger an automated address correction flow, add an order note for your team, and send a WhatsApp follow-up. When a customer presses 3 (cancel), the order status is updated to Cancelled in WooCommerce automatically and stock is restored. All responses are logged with timestamps.",
  },
  {
    q: "Will my customers be annoyed by the calls?",
    a: "Most store owners are surprised by how well customers respond — especially when the call comes within 60 seconds of ordering (customers are still engaged), uses their name, speaks in their language, and is brief (under 90 seconds). A robotic English voice calling 4 hours after an order annoys people. A natural Hindi voice saying their name within a minute of ordering gets a 94% answer rate.",
  },
  {
    q: "Is call recording legal in India?",
    a: 'In India, recording business calls is legal when the purpose is quality assurance and the party is informed. VoiceConfirm Pro includes an optional disclosure in the call script ("This call may be recorded for quality purposes"). For B2C COD confirmation calls, this is standard practice. For EU stores, we have a full GDPR mode with consent management.',
  },
  {
    q: "What data does VoiceConfirm Pro store?",
    a: "Customer name, phone number, order ID, call timestamp, call duration, keypress response, and (if enabled) call recording. All data is stored on your own WordPress database plus our secure cloud infrastructure. You can export or delete any customer's call data at any time from your dashboard.",
  },
  {
    q: "Can customers opt out permanently?",
    a: "Yes. Any customer who presses 9 is added to your opt-out list and will never be called again by VoiceConfirm Pro — for any future order. You can also manually add numbers to the opt-out list from your admin dashboard.",
  },
  {
    q: "Can I change plans mid-month?",
    a: "Yes. Upgrade immediately and pay the prorated difference. Downgrade at the next billing cycle.",
  },
  {
    q: "What happens if I exceed my call limit on Starter?",
    a: "You'll receive a warning email at 80% usage. If you hit 100%, calls queue and you're prompted to upgrade. No calls are silently dropped — we notify you before it becomes a problem.",
  },
  {
    q: "Is there an annual discount?",
    a: "Yes. Annual billing saves approximately 29–30% compared to monthly. Annual plans are eligible for the 30-day money-back guarantee and can be cancelled within 60 days for a prorated refund.",
  },
];

// Hook: fires callback when element enters viewport
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Animated answer panel using real height measurement
function AnswerPanel({ text, isOpen }: { text: string; isOpen: boolean }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) setHeight(innerRef.current.scrollHeight);
  }, [text]);

  return (
    <div
      style={{
        overflow: "hidden",
        maxHeight: isOpen ? `${height}px` : "0px",
        opacity: isOpen ? 1 : 0,
        transition: "max-height 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease",
      }}
    >
      <div ref={innerRef}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            color: "#555",
            lineHeight: 1.75,
            margin: 0,
            paddingTop: "14px",
            paddingRight: "52px",
            transform: isOpen ? "translateY(0)" : "translateY(-6px)",
            transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

// Single FAQ row
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  animDelay,
  sectionInView,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  animDelay: number;
  sectionInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: "1px solid #E8E8E8",
        borderTop: index === 0 ? "1px solid #E8E8E8" : undefined,
        padding: "28px 0",
        cursor: "pointer",
        opacity: sectionInView ? 1 : 0,
        transform: sectionInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${animDelay}ms, transform 0.5s ease ${animDelay}ms`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "17px",
            fontWeight: 600,
            color: isOpen ? "#1A1A2E" : hovered ? "#3d3d5c" : "#0F0F0F",
            lineHeight: 1.4,
            margin: 0,
            flex: 1,
            transition: "color 0.2s ease",
          }}
        >
          {faq.q}
        </p>

        {/* Icon */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `1.5px solid ${isOpen ? "#1A1A2E" : hovered ? "#888" : "#D0D0D0"}`,
            background: isOpen ? "#1A1A2E" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "2px",
            transition: "border-color 0.25s ease, background 0.25s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            color: isOpen ? "#fff" : "#888",
            fontSize: "18px",
            fontWeight: 300,
            lineHeight: 1,
            userSelect: "none",
            transform: isOpen ? "rotate(45deg) scale(1.1)" : "rotate(0deg) scale(1)",
          }}
        >
          +
        </div>
      </div>

      <AnswerPanel text={faq.a} isOpen={isOpen} />
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);
  const { ref: sectionRef, inView } = useInView(0.08);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const visibleFaqs = faqs.slice(0, 5);
  const remainingFaqs = faqs.slice(5);

  return (
    <section
      style={{ background: "#fff", width: "100%", padding: "80px 24px 100px" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        @keyframes badgeSlide {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 28px; }
        }

        .faq-badge-line-anim {
          height: 1.5px;
          background: #6C5CE7;
          width: 0;
        }

        @media (max-width: 600px) {
          .faq-outer { padding: 52px 20px 72px !important; }
          .faq-heading { margin-bottom: 36px !important; font-size: 28px !important; }
        }
      `}</style>

      <div
        ref={sectionRef}
        className="faq-outer"
        style={{ maxWidth: 760, margin: "0 auto" }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
            opacity: inView ? 1 : 0,
            animation: inView ? "badgeSlide 0.55s ease 0.05s both" : undefined,
          }}
        >
          <div
            className="faq-badge-line-anim"
            style={{
              animation: inView ? "lineGrow 0.5s ease 0.2s both" : undefined,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6C5CE7",
            }}
          >
            FAQ
          </span>
        </div>

        {/* Heading */}
        <h2
          className="faq-heading"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#0F0F0F",
            margin: "0 0 56px",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            opacity: inView ? 1 : 0,
            animation: inView ? "headingReveal 0.6s ease 0.15s both" : undefined,
          }}
        >
          Frequently asked questions
        </h2>

        {/* Items */}
        <div>
          {visibleFaqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
              animDelay={Math.min(i * 40, 400)}
              sectionInView={inView}
            />
          ))}

          {showMore &&
            remainingFaqs.map((faq, i) => {
              const index = i + visibleFaqs.length;
              return (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => toggle(index)}
                  animDelay={Math.min(index * 40, 400)}
                  sectionInView={inView}
                />
              );
            })}

          {remainingFaqs.length > 0 && (
            <button
              type="button"
              onClick={() => setShowMore((prev) => !prev)}
              style={{
                marginTop: "18px",
                border: "none",
                background: "transparent",
                color: "#6C5CE7",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              {showMore ? "Show less" : "Click here to view more"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
