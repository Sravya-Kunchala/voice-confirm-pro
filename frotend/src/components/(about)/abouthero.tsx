import { useEffect, useRef, CSSProperties, useState } from "react";

const values = [
  {
    title: "Store owners first, always",
    body: "Every feature decision starts with one question: does this solve a real problem for a store owner doing 100–1,000 COD orders per month? If the answer is no, we don't build it.",
  },
  {
    title: "Honest pricing",
    body: `We don't hide telephony fees inside our subscription and call it "all-inclusive." We tell you exactly what you'll pay Twilio, exactly what you'll pay us, and exactly what you'll get. No surprises on your credit card statement.`,
  },
  {
    title: "Support that actually responds",
    body: "Our support team is based in India. We work IST hours. Pro plan customers get WhatsApp support. We respond to real questions with real answers — not chatbot scripts. Average response time for Pro customers is under 4 hours.",
  },
  {
    title: "Build in public",
    body: "We share our product roadmap publicly. We share feature request voting. We share our changelog with reasons behind every decision. You know what we're building and why.",
  },
];

const storyParagraphs = [
  "In 2023, our founder was running a WooCommerce dropshipping operation in Hyderabad with 200–300 COD orders per month. Three staff members spent every morning calling customers to confirm deliveries. Some customers never answered. Some gave wrong addresses. Some cancelled after the product had already shipped. Return rates were at 28%. Margins were being destroyed.",
  "Every WooCommerce plugin we tried was built for Western markets where COD isn't the dominant payment method. None of them understood the Indian customer, the Indian phone number, the Indian language, or the Indian delivery system.",
  "So we built VoiceConfirm Pro. First for our own store. Then after other store owners in our network saw it working, we turned it into a product.",
  "Today VoiceConfirm Pro handles over 1,84,000 confirmation calls per month across stores in India, UAE, Saudi Arabia, Indonesia, and Thailand. Every feature in the product exists because a real store owner ran into a real problem and we solved it.",
];

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedBlock({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: CSSProperties }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ${delay}ms cubic-bezier(0.4,0,0.2,1), transform 0.65s ${delay}ms cubic-bezier(0.4,0,0.2,1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: "0.5px solid #e5e7eb", margin: "2rem 0" }} />;
}

function ValueCard({ title, body, delay }: { title: string; body: string; delay: number }) {
  const { ref, visible } = useScrollReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `0.5px solid ${hovered ? "rgba(127,119,221,0.4)" : "#e5e7eb"}`,
        borderRadius: 12,
        padding: "1.15rem 1.25rem 1.1rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.55s ${delay}ms ease, transform 0.55s ${delay}ms ease, border-color 0.2s ease`,
        cursor: "default",
        position: "relative",
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7F77DD", flexShrink: 0, position: "absolute", left: 18, top: 20 }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: "100%" }}>
          <p style={{
            fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#111827",
            margin: "0 0 5px",
            textAlign: "center",
          }}>{title}</p>
          <p style={{
            fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            color: "#6b7280",
            lineHeight: 1.7,
            margin: 0,
            textAlign: "center",
          }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

        .about-shell {
          width: 100%;
          max-width: none;
          margin: 0 auto;
          padding: 36px 24px 68px;
          background: #ffffff;
          overflow-x: clip;
          box-sizing: border-box;
        }
        .about-hero {
          max-width: 720px;
          margin: 0 auto 18px;
          text-align: center;
        }
        .about-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 5vw, 58px);
          font-weight: 700;
          line-height: 1.02;
          color: #111827;
          margin: 0 0 10px;
          letter-spacing: -0.02em;
        }
        .about-subtitle {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: clamp(14px, 1.7vw, 16px);
          font-weight: 400;
          line-height: 1.6;
          color: #4b5563;
          max-width: 620px;
          margin: 0 auto;
        }
        .about-brand-row {
          display: flex;
          align-items: center;
          gap: 18px;
          margin: 22px 0 30px;
          justify-content: center;
          width: 100%;
          text-align: center;
          flex-wrap: wrap;
        }
        .about-brand-mark {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          background: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .about-brand-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(46px, 7vw, 86px);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: rgba(17, 24, 39, 0.14);
          text-align: center;
          max-width: 100%;
          word-break: break-word;
        }
        .about-two-col {
          display: grid;
          grid-template-columns: max-content minmax(0, 1fr);
          gap: 4px 16px;
          align-items: start;
          margin-top: 6px;
        }
        .about-col-label {
          min-width: 0;
          position: relative;
          padding-top: 4px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          text-align: right;
          align-self: start;
          padding-right: 4px;
        }
        .about-col-label::after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          background: #7F77DD;
          margin-top: 6px;
        }
        .about-col-content { flex: 1; }
        .about-story {
          text-align: center;
          justify-self: center;
          align-items: center;
        }
        .about-values {
          align-items: center;
        }
        .about-values > * {
          width: min(100%, 760px);
        }
        .about-story p,
        .about-values p {
          max-width: 760px;
        }

        @media (max-width: 600px) {
          .about-shell { padding: 28px 18px 56px; }
          .about-hero { max-width: 100%; text-align: left; }
          .about-brand-row { gap: 10px; }
          .about-brand-mark { width: 48px; height: 48px; }
          .about-brand-text { font-size: clamp(34px, 12vw, 52px); }
          .about-two-col {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .about-col-label {
            align-items: flex-start;
            text-align: left;
          }
          .about-col-label::after { width: 44px; }
        }
      `}</style>

      <div className="about-shell">

        {/* Hero */}
        <AnimatedBlock delay={0} style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1 className="about-title">
            Built by People Who've Run{" "}
            <span style={{ color: "#7F77DD" }}>WooCommerce Stores</span>
          </h1>
          <p className="about-subtitle">
            VoiceConfirm Pro was not built by engineers in a lab who read about COD return rates in a report. It was built by a team that lived the problem.
          </p>
        </AnimatedBlock>

        {/* Logo row */}
        <AnimatedBlock delay={150} style={{ margin: "8px 0 30px" }}>
          <div className="about-brand-row">
            <div className="about-brand-mark">
              <img src="/SVG.svg" alt="VoiceConfirm Pro logo" width={44} height={44} style={{ display: "block" }} />
            </div>
            <span className="about-brand-text">
              VoiceConfirm Pro
            </span>
          </div>
        </AnimatedBlock>

        {/* Story */}
        <div className="about-two-col">
          <div className="about-col-label">
            <AnimatedBlock delay={0}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 26,
                fontWeight: 700,
                lineHeight: 1,
                color: "#000000",
                margin: 0,
                whiteSpace: "nowrap",
                textAlign: "right",
                width: "100%",
              }}>
                Our story
              </p>
            </AnimatedBlock>
          </div>
          <div className="about-col-content about-story" style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {storyParagraphs.map((para, i) => (
              <AnimatedBlock key={i} delay={i * 80}>
                <p style={{
                  fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: "#111827",
                  margin: 0,
                }}>{para}</p>
              </AnimatedBlock>
            ))}
          </div>
        </div>

        <Divider />

        {/* Values */}
        <div className="about-two-col">
          <div className="about-col-label">
            <AnimatedBlock delay={0}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 26,
                fontWeight: 700,
                lineHeight: 1,
                color: "#000000",
                margin: 0,
                whiteSpace: "nowrap",
                textAlign: "right",
                width: "100%",
              }}>
                Our values
              </p>
            </AnimatedBlock>
          </div>
          <div className="about-col-content about-values" style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {values.map((v, i) => (
              <ValueCard key={v.title} title={v.title} body={v.body} delay={i * 90} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
