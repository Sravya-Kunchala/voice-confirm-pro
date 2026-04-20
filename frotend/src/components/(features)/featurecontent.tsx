import { useEffect, ReactNode } from "react";

interface Feature {
  number: number;
  tag: string;
  headline: string;
  body: string;
  bullets: string[];
  icon: ReactNode;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.0 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <rect x={9} y={2} width={6} height={11} rx={3}/>
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3M8 22h8"/>
  </svg>
);

const KeypadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <rect x={2} y={3} width={20} height={18} rx={2}/>
    <circle cx={8}  cy={10} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={12} cy={10} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={16} cy={10} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={8}  cy={14} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={12} cy={14} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={16} cy={14} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={8}  cy={18} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={12} cy={18} r={0.8} fill="currentColor" stroke="none"/>
    <circle cx={16} cy={18} r={0.8} fill="currentColor" stroke="none"/>
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <line x1={12} y1={20} x2={12} y2={10}/>
    <line x1={18} y1={20} x2={18} y2={4}/>
    <line x1={6}  y1={20} x2={6}  y2={16}/>
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1={16} y1={13} x2={8} y2={13}/>
    <line x1={16} y1={17} x2={8} y2={17}/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <circle cx={12} cy={12} r={3}/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const features: Feature[] = [
  {
    number: 1,
    tag: "Smart Call Queue Engine",
    headline: "The right call at the right time, every time.",
    body: "VoiceConfirm Pro doesn't just call — it calls intelligently. High-value orders are prioritised and called first. Orders placed at 2am are queued for your customer's morning wake-up window. Time zones are detected automatically. Business hours per region are fully configurable.",
    bullets: [
      "Automatic retry up to 3 times at configurable intervals — 5 min, 30 min, and 2 hours",
      "Falls back to WhatsApp or SMS after 3 missed calls",
      "Not a single order slips through",
    ],
    icon: <PhoneIcon />,
  },
  {
    number: 2,
    tag: "AI-Powered Dynamic Scripts",
    headline: "Every call feels like a personal call from your store.",
    body: "Customers hear their own name, exact products, total amount, and specific delivery date. The script adapts based on order type, value, and customer history. First-time customers get a warm welcome; returning customers get loyalty acknowledgment.",
    bullets: [
      "Natural, human voice — not robotic text-to-speech",
      "Available in Hindi, English, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Urdu, Arabic, Bahasa, and Thai",
    ],
    icon: <MicIcon />,
  },
  {
    number: 3,
    tag: "IVR Response Handling",
    headline: "Your customers talk back. VoiceConfirm listens.",
    body: "When a customer presses a key, VoiceConfirm Pro takes action immediately. Every keypress is logged with timestamp. Every response updates WooCommerce in real time. Your team sees the full picture.",
    bullets: [
      "Press 1 = order confirmed, packing begins",
      "Press 2 = address correction flow triggered",
      "Press 3 = order cancelled, stock returned automatically",
      "Press 9 = call transferred to support instantly",
    ],
    icon: <KeypadIcon />,
  },
  {
    number: 4,
    tag: "Multi-Channel Fallback",
    headline: "If the call doesn't land, the message still reaches them.",
    body: "Not every customer answers unknown numbers. VoiceConfirm Pro never gives up. Unanswered after 3 attempts? WhatsApp message sent automatically. WhatsApp undelivered? SMS sent.",
    bullets: [
      "Every fallback uses personalised message — name, order details, confirmation link",
      "You set the sequence, the system executes it",
      "Confirmation rates above 94% regardless of channel",
    ],
    icon: <ChatIcon />,
  },
  {
    number: 5,
    tag: "Admin Dashboard & Analytics",
    headline: "See everything. Miss nothing.",
    body: "Your VoiceConfirm Pro dashboard inside WordPress shows every call in real time. Status badges — Answered, Confirmed, Unanswered, Failed. One-click playback of recorded calls. Complete call timeline for every order.",
    bullets: [
      "Re-trigger any call manually",
      "Filter by date, status, provider, language, and order value",
      "Export full call logs as CSV",
      "Weekly email reports with confirmation rates, revenue recovered, and cost per confirmed order",
    ],
    icon: <BarChartIcon />,
  },
  {
    number: 6,
    tag: "Template Builder",
    headline: "Your words, your voice, your brand.",
    body: "Build custom call scripts without touching a line of code. Use shortcode blocks — {{customer_name}}, {{order_total}}, {{product_list}}, {{delivery_date}}, {{store_name}}.",
    bullets: [
      "Different templates for COD, prepaid, high-value, subscription orders",
      "8 AI voice personalities across male and female options",
      "Preview any script as audio before going live",
      "Multilingual templates auto-set per shipping zone",
    ],
    icon: <FileIcon />,
  },
  {
    number: 7,
    tag: "Conditional Trigger Rules",
    headline: "Complete control over when and why calls happen.",
    body: "VoiceConfirm Pro calls the customers you choose, not every customer blindly. Every rule is toggleable from your dashboard. No developer needed.",
    bullets: [
      "Call only COD orders or orders above ₹2,000",
      "Call only first-time buyers or specific product categories",
      "Call only specific shipping zones",
      "Exclude prepaid orders or frequent confirmers automatically",
    ],
    icon: <GearIcon />,
  },
  {
    number: 8,
    tag: "GDPR & Compliance Ready",
    headline: "Built for legal compliance from day one.",
    body: "Customers can opt out by pressing 9 — permanently recorded and honoured on all future orders. Full audit trail for every call, response, and system action.",
    bullets: [
      "Call recordings auto-delete after 30, 60, or 90 days",
      "Consent management built in",
      "Data stored on Indian AWS servers for Indian stores",
      "GDPR mode available for EU stores",
    ],
    icon: <ShieldIcon />,
  },
];

function FeatureRow({ feature, flipped }: { feature: Feature; flipped: boolean }) {
  const textDelay = flipped ? "0.1s" : "0s";
  const imgDelay  = flipped ? "0s"   : "0.1s";

  return (
    <div
      className={`feature-row reveal ${flipped ? "flipped" : ""}`}
      style={{ "--text-delay": textDelay, "--img-delay": imgDelay } as React.CSSProperties}
    >
      <div className="feature-text">
        <div className="feature-tag-row">
          <span className="feature-number">{feature.number}</span>
          <span className="feature-tag">{feature.tag}</span>
        </div>
        <h2 className="feature-headline">{feature.headline}</h2>
        <p className="feature-body">{feature.body}</p>
        <ul className="feature-bullets">
          {feature.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="feature-card">
        <div className="feature-icon-wrap">{feature.icon}</div>
        <div className="feature-card-lines">
          <div className="card-line" />
          <div className="card-line" />
          <div className="card-line short" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .fp-page {
          background: #f0ede6;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          padding: 80px 24px 120px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.revealed { opacity: 1; transform: translateY(0); }

        .feature-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          max-width: 880px;
          margin: 0 auto 96px;
        }
        .feature-row.flipped .feature-text { order: 2; }
        .feature-row.flipped .feature-card { order: 1; }

        .feature-row .feature-text { transition-delay: var(--text-delay, 0s); }
        .feature-row .feature-card { transition-delay: var(--img-delay, 0.1s); }

        /* Tag row */
        .feature-tag-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .feature-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #8935E9;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .feature-tag {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          color: #8935E9;
          line-height: 1;
        }

        .feature-headline {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
          font-style: normal;
          font-size: 28px;
          line-height: 36.4px;
          color: #131320;
          margin-bottom: 16px;
          letter-spacing: 0;
        }

        .feature-body {
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          line-height: 1.72;
          color: #4a4560;
          margin-bottom: 20px;
        }

        .feature-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .feature-bullets li {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #4a4560;
          padding-left: 18px;
          position: relative;
          line-height: 1.55;
        }
        .feature-bullets li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 7px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #8935E9;
          opacity: 0.7;
        }

        /* Icon card */
        .feature-card {
          background: #e8e4f0;
          border-radius: 20px;
          aspect-ratio: 4/3;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s;
        }
        .feature-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 48px rgba(137,53,233,0.12);
        }

        .feature-card-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .card-line {
          position: absolute;
          background: rgba(137,53,233,0.07);
          border-radius: 2px;
        }
        .card-line:nth-child(1) { left: 18%; top: 28%; width: 64%; height: 1px; }
        .card-line:nth-child(2) { left: 18%; top: 64%; width: 64%; height: 1px; }
        .card-line:nth-child(3) { left: 18%; bottom: 20%; width: 36%; height: 1px; opacity: 0.5; }

        .feature-icon-wrap {
          width: 68px;
          height: 68px;
          border-radius: 18px;
          background: #8935E9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          position: relative;
          z-index: 1;
          box-shadow: 0 8px 24px rgba(137,53,233,0.35);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover .feature-icon-wrap {
          transform: scale(1.08) rotate(-3deg);
          box-shadow: 0 12px 32px rgba(137,53,233,0.45);
        }

        .section-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, #8935E9, transparent);
          border-radius: 1px;
          margin: 0 auto 96px;
          opacity: 0.35;
        }

        @media (max-width: 680px) {
          .fp-page { padding: 48px 16px 80px; }
          .feature-row {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 72px;
          }
          .feature-row.flipped .feature-text { order: 1; }
          .feature-row.flipped .feature-card { order: 2; }
          .feature-card { aspect-ratio: 16/9; }
          .feature-headline { font-size: 24px; line-height: 31px; }
          .section-divider { margin-bottom: 72px; }
        }

        @media (min-width: 681px) and (max-width: 960px) {
          .feature-row { gap: 32px; max-width: 720px; }
        }
      `}</style>

      <div className="fp-page">
        {features.map((f, i) => (
          <div key={f.number}>
            <FeatureRow feature={f} flipped={i % 2 !== 0} />
            {i < features.length - 1 && <div className="section-divider" />}
          </div>
        ))}
      </div>
    </>
  );
}