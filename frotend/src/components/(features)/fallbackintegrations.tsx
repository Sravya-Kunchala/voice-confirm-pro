import { useEffect, useRef, useState } from "react";
import { ACFIcon, FunnelsIcon, MultilingualBadge, WooIcon } from "./integration-symbols";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Icons ────────────────────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#25D366"/>
    <path d="M25.5 10.5A10.45 10.45 0 0018 7.5C12.2 7.5 7.5 12.2 7.5 18c0 1.84.48 3.63 1.4 5.22L7.5 28.5l5.4-1.42A10.46 10.46 0 0018 28.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.43-3-7.5zm-7.5 16.13a8.67 8.67 0 01-4.42-1.21l-.32-.19-3.2.84.85-3.12-.2-.32A8.69 8.69 0 019.32 18c0-4.79 3.9-8.69 8.69-8.69a8.69 8.69 0 016.14 14.83 8.63 8.63 0 01-6.15 2.49zm4.77-6.5c-.26-.13-1.54-.76-1.78-.84-.24-.09-.41-.13-.58.13-.17.26-.65.84-.8 1.01-.15.17-.29.19-.55.06-.26-.13-1.1-.4-2.1-1.29-.78-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.47.13-.16.17-.27.26-.45.09-.17.04-.33-.02-.46-.06-.13-.58-1.4-.8-1.91-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.06-.69.33-.24.26-.9.88-.9 2.14s.92 2.48 1.05 2.65c.13.17 1.81 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.19 1.17.16 1.6.1.49-.07 1.5-.61 1.72-1.2.21-.59.21-1.1.15-1.2-.07-.1-.24-.16-.5-.29z" fill="white"/>
  </svg>
);

const TwilioIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#F22F46"/>
    <circle cx="18" cy="18" r="6" fill="none" stroke="white" strokeWidth="2.5"/>
    <circle cx="13.5" cy="13.5" r="2" fill="white"/>
    <circle cx="22.5" cy="13.5" r="2" fill="white"/>
    <circle cx="13.5" cy="22.5" r="2" fill="white"/>
    <circle cx="22.5" cy="22.5" r="2" fill="white"/>
  </svg>
);

const MSG91Icon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#3B5BDB"/>
    <path d="M9 13.5C9 12.67 9.67 12 10.5 12h15c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-15C9.67 24 9 23.33 9 22.5v-9z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5"/>
    <path d="M9 13.5l9 6 9-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────

const channels = [
  {
    icon: <WhatsAppIcon />,
    title: "WhatsApp Business",
    desc: "Send rich WhatsApp messages with order summary cards when calls go unanswered. 90%+ open rate.",
  },
  {
    icon: <TwilioIcon />,
    title: "Twilio SMS",
    desc: "Plain text fallback for customers without WhatsApp. Works on all mobile numbers globally.",
  },
  {
    icon: <MSG91Icon />,
    title: "MSG91",
    desc: "Indian SMS gateway alternative with competitive pricing for domestic stores.",
  },
];

const integrationItems = [
  {
    badge: <WooIcon />,
    title: "WooCommerce Subscriptions",
    desc: "Trigger calls for renewals and activations separately.",
  },
  {
    badge: <FunnelsIcon />,
    title: "Funnels (WooFunnels / CartFlows)",
    desc: "Custom scripts based on specific funnel stages and upsell orders.",
  },
  {
    badge: <MultilingualBadge />,
    title: "Multilingual Support",
    desc: "Language detected from site preference, not just geography.",
  },
  {
    badge: <ACFIcon />,
    title: "Advanced Custom Fields",
    desc: "Pull custom order metadata into your call scripts dynamically.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function FallbackAndIntegration() {
  const section1 = useInView(0.08);
  const section2 = useInView(0.08);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;1,9..144,700&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fi-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fi-cardPop {
          0%   { opacity: 0; transform: translateY(20px) scale(0.97); }
          70%  { transform: translateY(-3px) scale(1.01); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fi-iconBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }

        .fi-wrap {
          background: #EDEAE5;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
        }

        /* ── Section 1: Fallback Messaging ── */
        .fi-s1 {
          padding: 80px 24px 72px;
          max-width: 900px;
          margin: 0 auto;
        }

        .fi-s1-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .fi-s1-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          color: #1A1730;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
          opacity: 0;
        }
        .fi-s1-title.in { animation: fi-fadeUp 0.6s ease 0.05s forwards; }

        .fi-s1-sub {
          font-size: 14.5px;
          color: #7A788A;
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto;
          opacity: 0;
        }
        .fi-s1-sub.in { animation: fi-fadeUp 0.6s ease 0.18s forwards; }

        .fi-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .fi-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px 24px;
          opacity: 0;
          transition: box-shadow 0.25s ease, transform 0.22s ease;
        }
        .fi-card:hover {
          box-shadow: 0 10px 36px rgba(0,0,0,0.09);
          transform: translateY(-4px);
        }
        .fi-card.in { animation: fi-cardPop 0.55s cubic-bezier(0.34,1.4,0.64,1) forwards; }

        .fi-card-icon {
          margin-bottom: 18px;
          display: inline-block;
        }
        .fi-card:hover .fi-card-icon {
          animation: fi-iconBounce 0.6s ease;
        }
        .fi-card-title {
          font-family: 'Fraunces', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1A1730;
          margin-bottom: 10px;
          letter-spacing: -0.2px;
        }
        .fi-card-desc {
          font-size: 13.5px;
          color: #6B6880;
          line-height: 1.68;
        }

        /* ── Divider ── */
        .fi-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(26,23,48,0.1), transparent);
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── Section 2: Deep WooCommerce Integration ── */
        .fi-s2 {
          padding: 72px 24px 88px;
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 40px;
          align-items: start;
        }

        .fi-s2-left {
          opacity: 0;
        }
        .fi-s2-left.in { animation: fi-fadeUp 0.65s ease 0.05s forwards; }

        .fi-s2-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 800;
          color: #1A1730;
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-bottom: 16px;
        }
        .fi-s2-sub {
          font-size: 14px;
          color: #7A788A;
          line-height: 1.7;
        }

        .fi-s2-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .fi-int-card {
          background: #fff;
          border-radius: 14px;
          padding: 22px 20px;
          opacity: 0;
          transition: box-shadow 0.22s ease, transform 0.2s ease;
        }
        .fi-int-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .fi-int-card.in { animation: fi-cardPop 0.52s cubic-bezier(0.34,1.4,0.64,1) forwards; }

        .fi-int-badge { margin-bottom: 12px; display: flex; align-items: center; }
        .fi-int-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #1A1730;
          margin-bottom: 6px;
          line-height: 1.35;
        }
        .fi-int-desc {
          font-size: 12.5px;
          color: #7A788A;
          line-height: 1.6;
        }

        /* ── Mobile ── */
        @media (max-width: 700px) {
          .fi-s1 { padding: 60px 18px 56px; }
          .fi-cards { grid-template-columns: 1fr; gap: 12px; }
          .fi-s2 {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 56px 18px 72px;
          }
          .fi-s2-grid { grid-template-columns: 1fr; gap: 12px; }
          .fi-s2-left { text-align: left; }
        }

        @media (min-width: 701px) and (max-width: 860px) {
          .fi-s2 { grid-template-columns: 200px 1fr; gap: 28px; }
        }
      `}</style>

      <div className="fi-wrap">

        {/* ── Section 1: Fallback Messaging ─────────────────────────── */}
        <div className="fi-s1" ref={section1.ref}>
          <div className="fi-s1-head">
            <h2 className={`fi-s1-title${section1.inView ? " in" : ""}`}>
              Fallback Messaging
            </h2>
            <p className={`fi-s1-sub${section1.inView ? " in" : ""}`}>
              Never lose a confirmation. When voice calls fail, our intelligent fallback system
              kicks in across popular text channels.
            </p>
          </div>

          <div className="fi-cards">
            {channels.map((c, i) => (
              <div
                key={c.title}
                className={`fi-card${section1.inView ? " in" : ""}`}
                style={section1.inView ? { animationDelay: `${0.3 + i * 0.1}s` } : undefined}
              >
                <div className="fi-card-icon">{c.icon}</div>
                <div className="fi-card-title">{c.title}</div>
                <div className="fi-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="fi-divider" />

        {/* ── Section 2: Deep WooCommerce Integration ───────────────── */}
        <div className="fi-s2" ref={section2.ref}>
          {/* Left label */}
          <div className={`fi-s2-left${section2.inView ? " in" : ""}`}>
            <h2 className="fi-s2-title">Deep WooCommerce Integration</h2>
            <p className="fi-s2-sub">
              We don't just "connect" to WooCommerce; we live in side your data stack to trigger
              complex logic effortlessly.
            </p>
          </div>

          {/* Right grid */}
          <div className="fi-s2-grid">
            {integrationItems.map((item, i) => (
              <div
                key={item.title}
                className={`fi-int-card${section2.inView ? " in" : ""}`}
                style={section2.inView ? { animationDelay: `${0.2 + i * 0.1}s` } : undefined}
              >
                <div className="fi-int-badge">{item.badge}</div>
                <div className="fi-int-title">{item.title}</div>
                <div className="fi-int-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

