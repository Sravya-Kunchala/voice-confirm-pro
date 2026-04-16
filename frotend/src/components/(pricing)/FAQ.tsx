import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   FAQ Data
───────────────────────────────────────────── */
interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do I need a developer to set up VoiceConfirm Pro?",
    answer:
      "No. If you can install a WordPress plugin, you can set up VoiceConfirm Pro. The entire setup — installing the plugin, connecting your Twilio account, choosing your script template, and activating your first call flow — takes under 15 minutes. We provide a step-by-step video guide and a written setup guide. Pro and Agency customers also get a free onboarding call with our team.",
  },
  {
    question: "Do I need a Twilio account?",
    answer:
      "Yes. VoiceConfirm Pro uses your Twilio or Vonage account to make calls. Creating a Twilio account is free. You add credit as you need it (minimum ₹1,000 to start). Twilio charges you directly for calls — we never touch your telephony billing. If you don't have a Twilio account, we'll walk you through the 5-minute signup during your onboarding call.",
  },
  {
    question: "What WooCommerce version does it work with?",
    answer:
      "VoiceConfirm Pro requires WooCommerce 6.0 or higher and WordPress 5.8 or higher. It works with WooCommerce HPOS (High Performance Order Storage) and the legacy orders table. PHP 7.4 minimum, PHP 8.1 recommended.",
  },
  {
    question: "Does it work with my existing theme?",
    answer:
      "Yes. VoiceConfirm Pro operates entirely in the WordPress admin and backend — it has no frontend impact on your theme. It will work with any WooCommerce-compatible theme.",
  },
  {
    question: "What languages does the voice bot speak?",
    answer:
      "Hindi, English (Indian accent), Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Urdu, Arabic, Bahasa Indonesia, and Thai. More languages are added quarterly based on customer requests.",
  },
  {
    question: "Can I customise what the bot says?",
    answer:
      "Completely. The Template Builder lets you write the exact script using plain text plus shortcode variables. You control the intro, the order summary block, the IVR menu options, and the closing message. You can have different scripts for different product categories, different order values, or different shipping zones.",
  },
  {
    question: "What happens if the customer doesn't answer?",
    answer:
      "The system retries up to 3 times at configurable intervals — you set the gaps (default: 5 minutes, 30 minutes, 2 hours). After 3 missed calls, VoiceConfirm Pro automatically sends a WhatsApp message (if connected) followed by an SMS. Every attempt is logged in your dashboard. You can also manually re-trigger a call for any order with one click.",
  },
  {
    question: "Can customers cancel or modify their order through the call?",
    answer:
      "Yes. When a customer presses 2 (modify), the system can trigger an automated address correction flow, add an order note for your team, and send a WhatsApp follow-up. When a customer presses 3 (cancel), the order status is updated to Cancelled in WooCommerce automatically and stock is restored. All responses are logged with timestamps.",
  },
  {
    question: "Will my customers be annoyed by the calls?",
    answer:
      "Most store owners are surprised by how well customers respond — especially when the call comes within 60 seconds of ordering (customers are still engaged), uses their name, speaks in their language, and is brief (under 90 seconds). A robotic English voice calling 4 hours after an order annoys people. A natural Hindi voice saying their name within a minute of ordering gets a 94% answer rate.",
  },
  {
    question: "Is call recording legal in India?",
    answer:
      'In India, recording business calls is legal when the purpose is quality assurance and the party is informed. VoiceConfirm Pro includes an optional disclosure in the call script ("This call may be recorded for quality purposes"). For B2C COD confirmation calls, this is standard practice. For EU stores, we have a full GDPR mode with consent management.',
  },
  {
    question: "What data does VoiceConfirm Pro store?",
    answer:
      "Customer name, phone number, order ID, call timestamp, call duration, keypress response, and (if enabled) call recording. All data is stored on your own WordPress database plus our secure cloud infrastructure. You can export or delete any customer's call data at any time from your dashboard.",
  },
  {
    question: "Can customers opt out permanently?",
    answer:
      "Yes. Any customer who presses 9 is added to your opt-out list and will never be called again by VoiceConfirm Pro — for any future order. You can also manually add numbers to the opt-out list from your admin dashboard.",
  },
  {
    question: "Can I change plans mid-month?",
    answer:
      "Yes. Upgrade immediately and pay the prorated difference. Downgrade at the next billing cycle.",
  },
  {
    question: "What happens if I exceed my call limit on Starter?",
    answer:
      "You'll receive a warning email at 80% usage. If you hit 100%, calls queue and you're prompted to upgrade. No calls are silently dropped — we notify you before it becomes a problem.",
  },
  {
    question: "Is there an annual discount?",
    answer:
      "Yes. Annual billing saves approximately 29–30% compared to monthly. Annual plans are eligible for the 30-day money-back guarantee and can be cancelled within 60 days for a prorated refund.",
  },
];

/* ─────────────────────────────────────────────
   Global CSS
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes faq-label-in {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes faq-title-in {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes faq-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes faq-line-grow {
    from { width: 0; }
    to   { width: 28px; }
  }
  @keyframes faq-answer-open {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .faq-item-animated {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.42s ease, transform 0.42s ease;
  }
  .faq-item-animated.faq-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .faq-item-box {
    border: 1px solid #e2ddd6;
    border-radius: 6px;
    background: #ffffff;
    overflow: hidden;
    transition: box-shadow 0.25s ease, border-color 0.25s ease;
    cursor: pointer;
  }
  .faq-item-box:hover {
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    border-color: #c9c2b8;
  }
  .faq-item-box.faq-open {
    border-color: #7c5cbf;
    box-shadow: 0 4px 24px rgba(124,92,191,0.10);
  }

  .faq-question-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    user-select: none;
  }
  .faq-question-text {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #1a1a18;
    line-height: 1.4;
  }
  .faq-item-box.faq-open .faq-question-text {
    color: #5b3fa8;
  }

  .faq-icon {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1.5px solid #d0cbc3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.3s ease;
  }
  .faq-item-box.faq-open .faq-icon {
    background: #7c5cbf;
    border-color: #7c5cbf;
    transform: rotate(45deg);
  }
  .faq-icon svg {
    transition: stroke 0.2s ease;
  }
  .faq-item-box.faq-open .faq-icon svg {
    stroke: #ffffff;
  }

  .faq-answer-wrap {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .faq-answer-wrap.faq-open {
    grid-template-rows: 1fr;
  }
  .faq-answer-inner {
    overflow: hidden;
  }
  .faq-answer-text {
    padding: 0 24px 20px;
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    line-height: 1.75;
    color: #4a4845;
    animation: faq-answer-open 0.35s ease both;
  }
  .faq-divider {
    height: 1px;
    background: #ede9e2;
    margin: 0 24px 16px;
  }
`;

/* ─────────────────────────────────────────────
   Hook: IntersectionObserver
───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Single FAQ Item
───────────────────────────────────────────── */
function FAQItemCard({ item, index, defaultOpen = false }: { item: FAQItem; index: number; defaultOpen?: boolean }) {
  const { ref, visible } = useInView();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`faq-item-animated${visible ? " faq-visible" : ""}`}
      style={{ transitionDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      <div
        className={`faq-item-box${open ? " faq-open" : ""}`}
        onClick={() => setOpen((p) => !p)}
        role="button"
        aria-expanded={open}
      >
        {/* Question row */}
        <div className="faq-question-row">
          <span className="faq-question-text">{item.question}</span>
          <span className="faq-icon">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#7a7570" strokeWidth="1.8" strokeLinecap="round">
              <line x1="5" y1="1" x2="5" y2="9" />
              <line x1="1" y1="5" x2="9" y2="5" />
            </svg>
          </span>
        </div>

        {/* Answer */}
        <div className={`faq-answer-wrap${open ? " faq-open" : ""}`}>
          <div className="faq-answer-inner">
            <div className="faq-divider" />
            <p className="faq-answer-text">{item.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animated heading words
───────────────────────────────────────────── */
function AnimatedTitle() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 120); return () => clearTimeout(t); }, []);
  const words = ["Frequently", "asked", "questions"];
  return (
    <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(30px, 5.5vw, 50px)", fontWeight: 600, color: "#1a1a18", lineHeight: 1.15, marginBottom: 48, letterSpacing: "-0.01em" }}>
      {words.map((word, i) => (
        <span
          key={word}
          style={{
            display: "inline-block",
            marginRight: i < words.length - 1 ? "0.28em" : 0,
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(22px)",
            transition: `opacity 0.55s ease ${100 + i * 90}ms, transform 0.55s ease ${100 + i * 90}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export default function FAQ() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", backgroundColor: "#f5f3ef", minHeight: "100vh", padding: "64px 24px 80px", boxSizing: "border-box" }}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* ── FAQ label ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 18,
            opacity: mounted ? 1 : 0,
            animation: mounted ? "faq-label-in 0.55s ease 0.05s both" : "none",
          }}
        >
          <div style={{
            height: 1.5,
            backgroundColor: "#7c5cbf",
            animationName: mounted ? "faq-line-grow" : "none",
            animationDuration: "0.5s",
            animationDelay: "0.1s",
            animationFillMode: "both",
            animationTimingFunction: "ease",
            width: mounted ? undefined : 0,
            minWidth: 0,
          }} />
          <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7c5cbf", fontWeight: 600 }}>
            FAQ
          </span>
        </div>

        {/* ── Heading ── */}
        <AnimatedTitle />

        {/* ── FAQ list ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((item, i) => (
            <FAQItemCard
              key={item.question}
              item={item}
              index={i}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}