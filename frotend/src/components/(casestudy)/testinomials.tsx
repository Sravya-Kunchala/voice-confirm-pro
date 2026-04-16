import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  meta: string[];
  avatar: string; // initials fallback
  avatarBg: string;
  wide?: boolean; // spans full width on last odd item
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      '"I was spending ₹40,000 a month paying two people to just call customers all day. With VoiceConfirm Pro, my confirmation rate actually went up from 71% to 94% because the bot calls within 60 seconds of the order. No more customers forgetting they ordered. My return rate dropped from 29% to 11% in the first month."',
    name: "Karthik Rajan",
    role: "Founder, FashionHub Chennai",
    meta: ["Order volume: 380 COD orders/month", "Industry: Apparel"],
    avatar: "KR",
    avatarBg: "#e8d5f5",
  },
  {
    id: 2,
    quote:
      '"My customers kept ignoring calls from unknown numbers. VoiceConfirm Pro uses a local Indian number and plays the customer\'s name in the first second. Answer rates went from 55% to 88%. I\'ve not had a single failed delivery due to unconfirmed address in 6 weeks."',
    name: "Priya Nambiar",
    role: "Owner, NaturalGlow Skincare",
    meta: ["Order volume: 220 COD orders/month", "Industry: Beauty & Wellness"],
    avatar: "PN",
    avatarBg: "#fde8d8",
  },
  {
    id: 3,
    quote:
      '"The WhatsApp fallback alone is worth the price. When customers don\'t pick up, they get a WhatsApp with their order details and a one-tap confirm button. I\'m capturing confirmations at 2am that I\'d never have gotten before. Phenomenal product."',
    name: "Mohammed Rashid",
    role: "Director, GulfTech Electronics Dubai",
    meta: ["Order volume: 560 COD orders/month", "Industry: Electronics"],
    avatar: "MR",
    avatarBg: "#d5eaf5",
  },
  {
    id: 4,
    quote:
      '"I manage WooCommerce stores for 6 clients. The Agency plan is insane value. I set it up for every client as a standard part of my package and charge ₹3,000/month per client for the feature. VoiceConfirm Pro costs me ₹12,999 and I\'m billing ₹18,000 from it. Pure margin."',
    name: "Ankit Sharma",
    role: "Founder, WP Studio Delhi Agency",
    meta: ["managing 6 stores", "Industry: WordPress Development"],
    avatar: "AS",
    avatarBg: "#d5f5e3",
  },
  {
    id: 5,
    quote:
      '"Setup took 8 minutes. I timed it. Connected my Twilio account, set the script in Hindi, configured the IVR, and was live. First call went out 4 minutes later. It just works."',
    name: "Sunita Patil",
    role: "Owner, OrganicBasket Pune",
    meta: ["Order volume: 140 COD orders/month", "Industry: Food & Grocery"],
    avatar: "SP",
    avatarBg: "#f5f0d5",
    wide: true,
  },
];

/* ─────────────────────────────────────────────
   Global CSS
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Lora:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes t-title-word {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes t-star-pop {
    0%   { opacity: 0; transform: scale(0.4) rotate(-15deg); }
    70%  { transform: scale(1.15) rotate(4deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes t-quote-fade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes t-author-slide {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes t-blob-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(8px, -12px) scale(1.04); }
    66%       { transform: translate(-6px, 6px) scale(0.97); }
  }

  .t-card-animated {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .t-card-animated.t-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .t-card {
    background: #ffffff;
    border: 1px solid #e8e2d9;
    border-radius: 14px;
    padding: 26px 24px 22px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
    transition: box-shadow 0.28s ease, transform 0.28s ease, border-color 0.28s ease;
    overflow: hidden;
  }
  .t-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(124,92,191,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .t-card:hover {
    box-shadow: 0 8px 32px rgba(124, 92, 191, 0.13);
    transform: translateY(-4px);
    border-color: #c4b3e8;
  }
  .t-card:hover::before {
    opacity: 1;
  }
  .t-stars span {
    display: inline-block;
    opacity: 0;
  }
  .t-card.t-visible .t-stars span {
    animation: t-star-pop 0.4s ease both;
  }

  .t-quote {
    font-family: 'Sora', sans-serif;
    font-size: 13.5px;
    line-height: 1.75;
    color: #3a3834;
    opacity: 0;
  }
  .t-card.t-visible .t-quote {
    animation: t-quote-fade 0.5s ease 0.25s both;
  }

  .t-author-row {
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0;
  }
  .t-card.t-visible .t-author-row {
    animation: t-author-slide 0.45s ease 0.35s both;
  }

  .t-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 13px;
    font-weight: 600;
    flex-shrink: 0;
    color: #3a2a5e;
    border: 2px solid rgba(124,92,191,0.15);
  }

  .t-name {
    font-family: 'Sora', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a18;
    margin-bottom: 2px;
  }
  .t-role {
    font-size: 12px;
    color: #7a7570;
    line-height: 1.5;
  }
  .t-meta {
    font-size: 11.5px;
    color: #9a9590;
    line-height: 1.6;
    margin-top: 1px;
  }

  /* Decorative blob behind certain cards */
  .t-blob {
    position: absolute;
    border-radius: 50%;
    background: rgba(124, 92, 191, 0.08);
    pointer-events: none;
    animation: t-blob-float 7s ease-in-out infinite;
    z-index: 0;
  }

  .t-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .t-wide {
    grid-column: 1 / -1;
  }

  @media (max-width: 600px) {
    .t-grid { grid-template-columns: 1fr; }
    .t-wide { grid-column: auto; }
  }
`;

/* ─────────────────────────────────────────────
   Stars component
───────────────────────────────────────────── */
function Stars({ delay = 0 }: { delay?: number }) {
  return (
    <div className="t-stars" style={{ display: "flex", gap: 3 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          style={{
            fontSize: 18,
            color: "#f0b429",
            animationDelay: `${delay + i * 60}ms`,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Single testimonial card
───────────────────────────────────────────── */
function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = Math.min(index * 80, 320);

  return (
    <div
      ref={ref}
      className={`t-card-animated${visible ? " t-visible" : ""}${item.wide ? " t-wide" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`t-card${visible ? " t-visible" : ""}`}>
        {/* Decorative blob on first card */}
        {item.id === 1 && (
          <div className="t-blob" style={{ width: 120, height: 120, top: -40, left: -40 }} />
        )}

        {/* Stars */}
        <Stars delay={delay + 100} />

        {/* Quote */}
        <p className="t-quote">{item.quote}</p>

        {/* Author */}
        <div className="t-author-row">
          <div className="t-avatar" style={{ backgroundColor: item.avatarBg }}>
            {item.avatar}
          </div>
          <div>
            <p className="t-name">{item.name}</p>
            <p className="t-role">{item.role}</p>
            <p className="t-meta">{item.meta.join(" | ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animated title
───────────────────────────────────────────── */
function AnimatedTitle() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, []);
  const words = ["What", "Our", "Customers", "Says"];
  return (
    <h1
      style={{
        fontFamily: "'Lora', Georgia, serif",
        fontSize: "clamp(26px, 5vw, 40px)",
        fontWeight: 600,
        color: "#1a1a18",
        textAlign: "center",
        marginBottom: 36,
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
      }}
    >
      {words.map((word, i) => (
        <span
          key={word}
          style={{
            display: "inline-block",
            marginRight: i < words.length - 1 ? "0.28em" : 0,
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        backgroundColor: "#f5f2ed",
        minHeight: "100vh",
        padding: "64px 24px 80px",
        boxSizing: "border-box",
      }}
    >
      <style>{GLOBAL_CSS}</style>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Title */}
        <AnimatedTitle />

        <div style={{ position: "relative" }}>
          <svg
            viewBox="0 0 1069 1044"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "50% auto auto 50%",
              width: "min(82vw, 980px)",
              height: "auto",
              transform: "translate(-50%, -48%)",
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.16,
            }}
          >
            <path
              d="M105.501 262.911C195.035 166.897 319.043 110.384 450.245 105.802C581.447 101.22 709.096 148.946 805.11 238.48C901.123 328.014 957.637 452.023 962.219 583.225C966.8 714.427 919.075 842.076 829.54 938.089M612.328 735.536C537.75 815.511 412.46 819.886 332.485 745.308C252.51 670.73 248.134 545.44 322.712 465.465C397.291 385.489 522.581 381.114 602.556 455.692C682.531 530.27 686.907 655.561 612.328 735.536Z"
              stroke="#8935E9"
              strokeWidth="211"
              strokeLinecap="round"
            />
          </svg>

          {/* Grid */}
          <div className="t-grid" style={{ position: "relative", zIndex: 1 }}>
            {testimonials.map((item, i) => (
              <TestimonialCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
