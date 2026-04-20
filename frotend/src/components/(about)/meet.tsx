import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "FOUNDED",       target: 2024,  suffix: "",   prefix: "",  decimal: false, accent: false, raw: true },
  { label: "STORES SERVED", target: 500,   suffix: "+",  prefix: "",  decimal: false, accent: false },
  { label: "TOTAL CALLS",   target: 184,   suffix: "k+", prefix: "",  decimal: false, accent: false },
  { label: "UPTIME SLA",    target: 99.9,  suffix: "%",  prefix: "",  decimal: true,  accent: true  },
];

const badges = [
  { icon: "⚙️", text: "Certified WooCommerce Specialists" },
  { icon: "📡", text: "Telecom Infrastructure Experts" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function AnimatedStat({ label, target, suffix, prefix, decimal, accent, delay, raw }: {
  label: string; target: number; suffix: string; prefix: string;
  decimal: boolean; accent: boolean; delay: number; raw?: boolean;
}) {
  const { ref, inView } = useInView(0.3);
  const [display, setDisplay] = useState(prefix + "0" + suffix);
  const animatedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || animatedRef.current) return;
    animatedRef.current = true;
    const DURATION = 1600;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = easeOutExpo(t);
      const val = target * eased;
      const formatted = decimal ? val.toFixed(1) : raw ? Math.round(val).toString() : Math.round(val).toLocaleString("en-IN");
      setDisplay(prefix + formatted + suffix);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    const timer = setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, delay);
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        textAlign: "center",
      }}
    >
      <span style={{
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "24px",
        letterSpacing: "1.6px",
        textTransform: "uppercase",
        color: "#10B981",
        marginBottom: 8,
      }}>
        {label}
      </span>
      <span style={{
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: 28,
        fontWeight: 600,
        lineHeight: "24px",
        letterSpacing: "-0.8px",
        color: accent ? "#EAC32C" : "#FFFFFF",
        fontVariantNumeric: "tabular-nums",
      }}>
        {display}
      </span>
    </div>
  );
}

export default function MeetTheTeam() {
  const heroRef = useInView(0.1);
  const leftRef = useInView(0.1);
  const card1Ref = useInView(0.1);
  const card2Ref = useInView(0.1);
  const founderRef = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@800&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .meet-root {
          background: #0e0d12;
          color: #e8e4f0;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          padding: 72px 24px 60px;
          position: relative;
          overflow: hidden;
        }

        .meet-root::before {
          content: '';
          position: absolute;
          top: -120px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .meet-root::after {
          content: '';
          position: absolute;
          bottom: 0; right: -100px;
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(250, 204, 21, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .inner { max-width: 1060px; margin: 0 auto; position: relative; z-index: 1; }

        .section-header { text-align: center; margin-bottom: 56px; }
        .header-rule { display: flex; align-items: center; gap: 20px; justify-content: center; }
        .rule-line { flex: 1; max-width: 200px; height: 1px; background: linear-gradient(90deg, transparent, rgba(139,92,246,0.5)); }
        .rule-line.right { background: linear-gradient(270deg, transparent, rgba(139,92,246,0.5)); }
        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 58px;
          font-weight: 700;
          color: #8B5CF6;
          line-height: 34px;
          letter-spacing: 0;
        }

        .main-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 36px; align-items: start; }
        @media (max-width: 760px) { .main-grid { grid-template-columns: 1fr; gap: 28px; } }

        .tag-pill {
          display: inline-block; font-size: 10px; letter-spacing: 2px; font-weight: 600;
          color: #EAC32C; border: 1px solid rgba(234,195,44,0.35); padding: 4px 12px;
          border-radius: 999px; margin-bottom: 18px; text-transform: uppercase;
        }
        .left-heading { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 17.6px; letter-spacing: -0.4px; margin-bottom: 16px; }
        .left-body { font-size: 0.88rem; line-height: 1.75; color: #9e99b0; margin-bottom: 28px; }
        .badge-list { display: flex; flex-direction: column; gap: 12px; }
        .badge {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 12px 16px; font-size: 0.85rem; color: #c4bfda;
          transition: background 0.25s, border-color 0.25s, transform 0.25s; cursor: default;
        }
        .badge:hover { background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.3); transform: translateX(4px); }
        .badge-icon { width: 34px; height: 34px; background: rgba(167,139,250,0.12); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }

        .right-col { display: flex; flex-direction: column; gap: 16px; }

        .founder-card {
          border-radius: 20px; overflow: hidden; position: relative; min-height: 260px;
          background: linear-gradient(160deg, #1e1b2e 0%, #16131f 100%);
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.4s ease, box-shadow 0.4s ease; cursor: default;
        }
        .founder-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(139,92,246,0.2); }
        .founder-img { width: 100%; height: 260px; object-fit: cover; object-position: top center; display: block; filter: saturate(0.9) brightness(0.85); transition: filter 0.4s ease; }
        .founder-card:hover .founder-img { filter: saturate(1.05) brightness(0.95); }
        .founder-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(0deg, rgba(14,13,18,0.97) 0%, rgba(14,13,18,0.6) 60%, transparent 100%); padding: 20px 20px 18px; }
        .founder-name { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; color: #f0ecff; }
        .founder-title { font-size: 0.78rem; color: #9e99b0; margin: 2px 0 6px; }
        .founder-meta { font-size: 0.74rem; color: #7e7a8f; display: flex; align-items: center; gap: 6px; }
        .founder-dot { width: 5px; height: 5px; border-radius: 50%; background: #a78bfa; display: inline-block; }
        .verified-badge { position: absolute; top: 14px; right: 14px; width: 32px; height: 32px; background: rgba(250,204,21,0.15); border: 1px solid rgba(250,204,21,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; }

        .cards-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 460px) { .cards-row { grid-template-columns: 1fr; } }

        .team-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 18px; transition: background 0.3s, border-color 0.3s, transform 0.3s; cursor: default; position: relative; overflow: hidden; }
        .team-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(167,139,250,0.06) 0%, transparent 60%); opacity: 0; transition: opacity 0.3s; }
        .team-card:hover { transform: translateY(-3px); border-color: rgba(167,139,250,0.25); }
        .team-card:hover::before { opacity: 1; }

        .avatars { display: flex; margin-bottom: 14px; }
        .avatar { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #0e0d12; margin-right: -8px; overflow: hidden; background: #2a2540; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #a78bfa; font-weight: 600; }
        .avatar-count { background: rgba(167,139,250,0.2); color: #a78bfa; font-size: 0.6rem; font-weight: 700; }
        .card-title { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: #f0ecff; margin-bottom: 6px; }
        .card-desc { font-size: 0.77rem; color: #7e7a8f; line-height: 1.6; margin-bottom: 14px; }
        .card-tag { display: inline-flex; align-items: center; gap: 5px; font-size: 0.65rem; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #a78bfa; }
        .card-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

        /* Stats bar */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          margin-top: 52px;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 40px;
        }
        @media (max-width: 600px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 36px 0; }
        }

        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 100ms; }
        .fade-up.d2 { transition-delay: 220ms; }
        .fade-up.d3 { transition-delay: 340ms; }

        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(250,204,21,0.35); }
          50% { box-shadow: 0 0 0 6px rgba(250,204,21,0); }
        }
        .verified-badge { animation: pulse-ring 2.4s ease infinite; }

        @keyframes scan {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(400%) skewX(-20deg); }
        }
        .founder-card .scan { position: absolute; top: 0; left: 0; width: 30%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent); animation: scan 4s ease-in-out infinite; pointer-events: none; }
      `}</style>

      <div className="meet-root">
        <div className="inner">

          <div ref={heroRef.ref} className={`section-header fade-up${heroRef.inView ? " visible" : ""}`}>
            <div className="header-rule">
              <div className="rule-line" />
              <h2 className="section-title">Meet the Team</h2>
              <div className="rule-line right" />
            </div>
          </div>

          <div className="main-grid">
            <div ref={leftRef.ref} className={`fade-up${leftRef.inView ? " visible" : ""}`}>
              <span className="tag-pill">[ The Team ]</span>
              <h3 className="left-heading">Expertise in eCommerce &amp; Support</h3>
              <p className="left-body">
                Our foundation is built on deep technical proficiency and operational excellence.
                With a heritage rooted in WooCommerce development and enterprise-grade telephony,
                we bridge the gap between complex digital infrastructure and seamless customer experiences.
              </p>
              <div className="badge-list">
                {badges.map((b, i) => (
                  <div className="badge" key={i}>
                    <div className="badge-icon">{b.icon}</div>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="right-col">
              <div ref={founderRef.ref} className={`founder-card fade-up${founderRef.inView ? " visible" : ""}`}>
                <div className="scan" />
                <img src="/d.svg" alt="Dilip Reddy" className="founder-img" />
                <div className="verified-badge">🏆</div>
                <div className="founder-overlay">
                  <div className="founder-name">Dilip Reddy</div>
                  <div className="founder-title">Founder &amp; CEO</div>
                  <div className="founder-meta">
                    <span>WooCommerce Operator</span>
                    <span className="founder-dot" />
                    <span>Hyderabad</span>
                  </div>
                </div>
              </div>

              <div className="cards-row">
                <div ref={card1Ref.ref} className={`team-card fade-up d1${card1Ref.inView ? " visible" : ""}`}>
                  <div className="avatars">
                    {["DR","AM","KP"].map((init, i) => (
                      <div className="avatar" key={i}>{init}</div>
                    ))}
                    <div className="avatar avatar-count">+1</div>
                  </div>
                  <div className="card-title">Development Team</div>
                  <div className="card-desc">4 engineers across Hyderabad and Bangalore focused on platform stability and performance.</div>
                  <div className="card-tag"><span className="card-tag-dot" />Tech Stack Authority</div>
                </div>

                <div ref={card2Ref.ref} className={`team-card fade-up d2${card2Ref.inView ? " visible" : ""}`}>
                  <div className="avatars">
                    {["SN","PR"].map((init, i) => (
                      <div className="avatar" key={i}>{init}</div>
                    ))}
                  </div>
                  <div className="card-title">Support Specialists</div>
                  <div className="card-desc">2 former WooCommerce store managers who understand the merchant journey from the inside out.</div>
                  <div className="card-tag"><span className="card-tag-dot" />Merchant First</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="stats-bar">
            {stats.map((s, i) => (
              <AnimatedStat key={i} {...s} delay={i * 150} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}