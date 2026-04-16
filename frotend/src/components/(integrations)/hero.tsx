import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function ConnectsSection() {
  const { ref, inView } = useInView(0.08);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,800;1,9..144,800&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes cs-fadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cs-badgeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cs-orbFloat1 {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50%       { transform: translateX(-50%) scale(1.1) translateY(-16px); }
        }
        @keyframes cs-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .cs-section {
          position: relative;
          width: 100%;
          background: #EDEAE5;
          overflow: hidden;
          padding: 110px 24px 110px;
          font-family: 'DM Sans', sans-serif;
          text-align: center;
        }

        /* Soft purple bloom in center-top */
        .cs-orb {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 420px;
          background: radial-gradient(ellipse at center, rgba(160,140,255,0.22) 0%, rgba(200,180,255,0.08) 45%, transparent 70%);
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
          animation: cs-orbFloat1 10s ease-in-out infinite;
        }

        .cs-inner {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin: 0 auto;
        }

        /* Eyebrow */
        .cs-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6C5CE7;
          margin-bottom: 20px;
          opacity: 0;
        }
        .cs-eyebrow.in { animation: cs-badgeIn 0.5s ease 0.05s forwards; }

        /* Heading */
        .cs-heading {
          font-family: 'Fraunces', serif;
          font-size: clamp(38px, 7.5vw, 68px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -1.5px;
          color: #1A1730;
          margin-bottom: 22px;
          opacity: 0;
        }
        .cs-heading.in { animation: cs-fadeUp 0.7s ease 0.18s forwards; }

        .cs-heading em {
          font-style: italic;
          background: linear-gradient(90deg, #5B48E0 0%, #9B8BF8 40%, #7C6CF0 70%, #5B48E0 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cs-shimmer 4s linear 1.2s infinite;
        }

        /* Subtext */
        .cs-sub {
          font-size: clamp(14px, 2vw, 15.5px);
          color: #7A788A;
          line-height: 1.75;
          max-width: 440px;
          margin: 0 auto 38px;
          font-weight: 400;
          opacity: 0;
        }
        .cs-sub.in { animation: cs-fadeUp 0.7s ease 0.32s forwards; }

        /* Buttons */
        .cs-btns {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
        }
        .cs-btns.in { animation: cs-fadeUp 0.65s ease 0.46s forwards; }

        .cs-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #1A1730;
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 13px 26px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
          white-space: nowrap;
        }
        .cs-btn-primary:hover {
          background: #2d2a50;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26,23,48,0.22);
        }
        .cs-btn-primary:active { transform: scale(0.97); }

        .cs-btn-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: #1A1730;
          border: 1.5px solid rgba(26,23,48,0.22);
          border-radius: 50px;
          padding: 12px 26px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.22s, color 0.22s, background 0.22s, transform 0.18s;
          white-space: nowrap;
          background: rgba(255,255,255,0.45);
        }
        .cs-btn-secondary:hover {
          border-color: #6C5CE7;
          color: #6C5CE7;
          background: rgba(108,92,231,0.07);
          transform: translateY(-2px);
        }
        .cs-btn-secondary:active { transform: scale(0.97); }

        /* Mobile */
        @media (max-width: 600px) {
          .cs-section { padding: 80px 20px 80px; }
          .cs-heading { letter-spacing: -0.8px; }
          .cs-btns { gap: 10px; }
          .cs-btn-primary,
          .cs-btn-secondary { padding: 11px 22px; font-size: 13px; }
          .cs-orb { width: 340px; height: 280px; top: -60px; }
        }

        @media (max-width: 380px) {
          .cs-btns { flex-direction: column; align-items: stretch; }
          .cs-btn-primary,
          .cs-btn-secondary { justify-content: center; }
        }
      `}</style>

      <section className="cs-section">
        <div className="cs-orb" />

        <div ref={ref} className="cs-inner">
          {/* Eyebrow */}
          <div className={`cs-eyebrow${inView ? " in" : ""}`}>
            Ecosystem &amp; Connectivity
          </div>

          {/* Heading */}
          <h2 className={`cs-heading${inView ? " in" : ""}`}>
            Connects With<br />
            <em>Everything You</em><br />
            Already Use
          </h2>

          {/* Subtext */}
          <p className={`cs-sub${inView ? " in" : ""}`}>
            VoiceConfirm Pro plugs directly into your existing WooCommerce stack.
            No rebuilding. No switching. Just activate and confirm.
          </p>

          {/* Buttons */}
          <div className={`cs-btns${inView ? " in" : ""}`}>
            <button className="cs-btn-primary">
              Explore Marketplace →
            </button>
            <button className="cs-btn-secondary">
              Developer API
            </button>
          </div>
        </div>
      </section>
    </>
  );
}