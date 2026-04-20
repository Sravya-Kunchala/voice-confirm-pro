import { useEffect, useRef, useState } from "react";

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

const WhatsAppIcon = () => (
  <img src="/WhatsApp.svg" alt="WhatsApp" width="36" height="36" />
);

const TwilioIcon = () => (
  <img src="/t.svg" alt="Twilio SMS" width="36" height="36" />
);

const MSG91Icon = () => (
  <img src="/m.svg" alt="MSG91" width="36" height="36" />
);

const WooBadge = () => (
  <img src="/wooc.svg" alt="WooCommerce" width="48" height="48" />
);

const FunnelsIcon = () => (
  <img src="/image 8.svg" alt="Funnels" width="48" height="48" />
);


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
    badge: <WooBadge />,
    title: "WooCommerce Subscriptions",
    desc: "Trigger calls for renewals and activations separately.",
  },
  {
    badge: <FunnelsIcon />,
    title: "Funnels (WooFunnels / CartFlows)",
    desc: "Custom scripts based on specific funnel stages and upsell orders.",
  },
  {
    badge: <div style={{ display: "flex", gap: 8 }}><img src="/w1.svg" alt="w1" width="48" height="48" /><img src="/w2.svg" alt="w2" width="48" height="48" /></div>,
    title: "Multilingual Support",
    desc: "Language detected from site preference, not just geography.",
  },
  {
    badge: <div style={{ display: "flex", gap: 8 }}><img src="/a1.svg" alt="a1" width="32" height="32" /><img src="/a2.svg" alt="a2" width="32" height="32" /></div>,
    title: "Advanced Custom Fields",
    desc: "Pull custom order metadata into your call scripts dynamically.",
  },
];

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

        .fi-s1 {
          padding: 80px 0px 72px;
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
          gap: 8px;
        }

        .fi-card {
          background: #F7F5F0;
          border: 1px solid rgba(26,23,48,0.08);
          border-radius: 16px;
          padding: 28px 24px;
          opacity: 0;
          text-align: left;
          transition: box-shadow 0.25s ease, transform 0.22s ease, background 0.2s ease;
        }
        .fi-card:hover {
          background: #ffffff;
          box-shadow: 0 10px 36px rgba(0,0,0,0.09);
          transform: translateY(-4px);
        }
        .fi-card.in { animation: fi-cardPop 0.55s cubic-bezier(0.34,1.4,0.64,1) forwards; }

        .fi-card-icon { margin-bottom: 18px; display: inline-block; }
        .fi-card:hover .fi-card-icon { animation: fi-iconBounce 0.6s ease; }

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

        .fi-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(26,23,48,0.1), transparent);
          max-width: 900px;
          margin: 0 auto;
        }

        .fi-s2 {
          padding: 72px 0px 88px;
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 40px;
          align-items: start;
        }

        .fi-s2-left { opacity: 0; }
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
          gap: 8px;
        }

        .fi-int-card {
          background: #F2F3FF;
          border-radius: 24px;
          padding: 24px;
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
          font-size: 14px;
          font-weight: 700;
          color: #1A1730;
          margin-bottom: 6px;
          line-height: 1.35;
        }
        .fi-int-desc {
          font-size: 13px;
          color: #7A788A;
          line-height: 1.6;
        }

        @media (max-width: 700px) {
          .fi-s1 { padding: 60px 16px 56px; }
          .fi-cards { grid-template-columns: 1fr; gap: 8px; }
          .fi-s2 { grid-template-columns: 1fr; gap: 32px; padding: 56px 16px 72px; }
          .fi-s2-grid { grid-template-columns: 1fr; gap: 8px; }
        }

        @media (min-width: 701px) and (max-width: 860px) {
          .fi-s2 { grid-template-columns: 280px 1fr; gap: 28px; }
        }
      `}</style>

      <div className="fi-wrap">

        <div className="fi-s1" ref={section1.ref}>
          <div className="fi-s1-head">
            <h2 className={`fi-s1-title${section1.inView ? " in" : ""}`}>Fallback Messaging</h2>
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

        <div className="fi-s2" ref={section2.ref}>
          <div className={`fi-s2-left${section2.inView ? " in" : ""}`}>
            <h2 className="fi-s2-title">Deep WooCommerce<br />Integration</h2>
            <p className="fi-s2-sub">
              We don't just "connect" to WooCommerce; we live inside your data stack to trigger
              complex logic effortlessly.
            </p>
          </div>
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