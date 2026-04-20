import { useEffect } from "react";

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
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const WalletIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M16 12h2" />
  </svg>
);

export default function TestimonialsSection() {
  useReveal();

  const beforeRows = [
    { metric: "Manual Team",  value: "3 Staff",   bold: false },
    { metric: "Confirmation", value: "68%",        bold: false },
    { metric: "Return Rate",  value: "32%",        bold: false },
    { metric: "Monthly Cost", value: "₹54,000",   bold: true  },
  ];

  const afterRows = [
    { metric: "Confirmation", value: "96%",      bold: false },
    { metric: "Return Rate",  value: "7%",       bold: false },
    { metric: "System Cost",  value: "₹10,199",  bold: false },
    { metric: "Total Saving", value: "₹43,801",  bold: true  },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&family=Lora:ital,wght@0,700;1,700&family=Epilogue:wght@400;500;600;700&family=Outfit:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ts-section {
          background: #f5f2eb;
          font-family: 'Epilogue', sans-serif;
          padding: 80px 24px 100px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .reveal.revealed { opacity: 1; transform: none; }

        .ts-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 56px;
          position: relative;
          overflow: hidden;
        }

        .ts-quote-bg {
          position: absolute;
          top: 10%;
          left: -40px;
          font-family: 'Playfair Display', serif;
          font-size: 320px;
          font-weight: 700;
          line-height: 1;
          color: #b8b4cc;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          opacity: 0.25;
          white-space: nowrap;
        }
        .ts-header h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 500;
          font-size: 50px;
          line-height: 61px;
          letter-spacing: 0.5px;
          color: #1a1530;
          margin-bottom: 16px;
          text-align: center;
        }
        .ts-header h2 em { font-style: italic; color: #6b3fd4; }
        .ts-header p {
          font-size: 15px;
          color: #5a5570;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        .ts-watermark-wrap {
          text-align: center;
          position: relative;
          margin-bottom: -18px;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          overflow: hidden;
          height: 56px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .ts-watermark {
          font-family: 'Outfit', sans-serif;
          font-size: 88px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.04em;
          background: linear-gradient(180deg, rgba(160,155,150,0.55) 0%, #f5f2eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          transform: translateY(18px);
        }

        .cs-wrapper {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Outer card: dark left + white right */
        .cs-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 40px rgba(26,21,48,0.12);
        }

        /* ── Left dark panel ── */
        .cs-left {
          background: #1a1530;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cs-badge {
          display: inline-block;
          background: rgba(107,63,212,0.35);
          color: #c4b5fd;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 6px;
          width: fit-content;
        }
        .cs-store-name {
          font-family: 'Lora', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-top: 10px;
        }
        .cs-store-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.42);
          line-height: 1.6;
          margin-top: 6px;
        }
        .cs-meta {
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 16px;
        }
        .cs-meta-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .cs-meta-icon {
          width: 20px; height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
          opacity: 1;
        }
        .cs-meta-label {
          font-size: 9.5px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 3px;
          display: block;
        }
        .cs-meta-value {
          font-size: 13.5px;
          color: rgba(255,255,255,0.9);
          font-weight: 500;
          display: block;
        }
        .cs-quote {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 16px;
          margin-top: auto;
        }
        .cs-quote p {
          font-size: 12.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.65;
          font-style: italic;
        }
        .cs-quote p strong { color: #a78bfa; font-style: normal; font-weight: 600; }
        .cs-quote cite {
          display: block;
          margin-top: 10px;
          font-size: 11.5px;
          color: rgba(255,255,255,0.85);
          font-style: normal;
          font-weight: 600;
        }

        /* ── Right white panel ── */
        .cs-right {
          background: #fff;
          display: flex;
          flex-direction: column;
        }

        /* Two sub-panels side by side */
        .cs-panels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          flex: 1;
          gap: 0;
        }

        /* Before panel — light red tint */
        .cs-panel-before {
          padding: 20px 20px 20px 24px;
          border-right: 1px solid #f0ede6;
        }

        /* After panel — light blue/lavender tint */
        .cs-panel-after {
          padding: 20px 24px 20px 20px;
          background: #f4f4fd;
          border-radius: 0 0 0 0;
        }

        /* Panel header */
        .cs-panel-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 18px;
        }
        .cs-panel-header-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .cs-panel-header-label.before { color: #e05c3a; }
        .cs-panel-header-label.after  { color: #3b3fd4; }

        /* Metric rows inside each panel */
        .cs-panel-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 9px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          gap: 8px;
        }
        .cs-panel-row:last-child { border-bottom: none; }

        .cs-panel-metric {
          font-size: 12.5px;
          color: #7a7590;
          font-weight: 400;
          white-space: nowrap;
        }
        .cs-panel-row.bold-row .cs-panel-metric {
          color: #1a1530;
          font-weight: 700;
          font-size: 13px;
        }

        .cs-panel-value-before {
          font-size: 13px;
          font-weight: 600;
          color: #c0392b;
          text-align: right;
        }
        .cs-panel-row.bold-row .cs-panel-value-before {
          font-size: 14px;
          font-weight: 700;
        }

        .cs-panel-value-after {
          font-size: 13px;
          font-weight: 600;
          color: #3b3fd4;
          text-align: right;
        }
        .cs-panel-row.bold-row .cs-panel-value-after {
          font-size: 14px;
          font-weight: 700;
        }

        /* Revenue box */
        .cs-revenue {
          margin: 12px 20px 20px;
          border: 1px solid #e8e4f0;
          border-radius: 14px;
          padding: 16px 20px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .cs-rev-label {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9880d0;
          text-align: center;
        }
        .cs-rev-main {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cs-rev-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cs-rev-amount {
          font-family: 'Lora', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a1530;
          line-height: 1;
        }
        .cs-rev-amount span {
          font-size: 1rem;
          color: #888;
          font-family: 'Epilogue', sans-serif;
          font-weight: 400;
          margin-left: 4px;
        }
        .cs-rev-note {
          font-size: 11.5px;
          color: #9880d0;
          text-align: center;
        }

        @media (max-width: 720px) {
          .cs-grid { grid-template-columns: 1fr; }
          .cs-left { text-align: center; align-items: center; }
          .cs-meta-row { justify-content: center; }
          .cs-quote { text-align: center; }
          .ts-section { padding: 56px 16px 72px; }
          .ts-watermark { font-size: 52px; }
          .ts-watermark-wrap { height: 40px; }
        }

        @media (max-width: 480px) {
          .cs-panels { grid-template-columns: 1fr; }
          .cs-panel-before { border-right: none; border-bottom: 1px solid #f0ede6; }
        }
      `}</style>

      <section className="ts-section">
        <div className="ts-header reveal">
          <div className="ts-quote-bg">66</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2>
              What Store <em>Owners Say</em>
              <br />
              <em>After</em> Their First Week
            </h2>
            <p>
              These aren't cherry-picked quotes. These are the first replies we got from real store owners
              who went from manual calls to fully automated confirmation in under an hour.
            </p>
          </div>
        </div>

        <div className="ts-watermark-wrap">
          <span className="ts-watermark">CASE STUDY</span>
        </div>

        <div className="cs-wrapper reveal" style={{ transitionDelay: "0.1s" }}>
          <div className="cs-grid">

            {/* ── Left dark panel ── */}
            <div className="cs-left">
              <div>
                <span className="cs-badge">Deep Dive Analysis</span>
                <div className="cs-store-name" style={{ marginTop: 14 }}>ElectroMart Hyderabad</div>
                <div className="cs-store-desc">A high-volume consumer electronics retailer scaling through the festive season.</div>
              </div>

              <div className="cs-meta">
                <div className="cs-meta-row">
                  {/* Archive / box icon — matches Figma Industry icon */}
                  <svg className="cs-meta-icon" viewBox="0 0 24 24" fill="none" stroke="#4ecba0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="5" rx="1"/>
                    <path d="M4 8v11a2 2 0 002 2h12a2 2 0 002-2V8"/>
                    <path d="M10 12h4"/>
                  </svg>
                  <div>
                    <div className="cs-meta-label">Industry</div>
                    <div className="cs-meta-value">Consumer Electronics</div>
                  </div>
                </div>
                <div className="cs-meta-row">
                  {/* Trending up icon — matches Figma Volume icon */}
                  <svg className="cs-meta-icon" viewBox="0 0 24 24" fill="none" stroke="#4ecba0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    <polyline points="16 7 22 7 22 13"/>
                  </svg>
                  <div>
                    <div className="cs-meta-label">Volume</div>
                    <div className="cs-meta-value">820 COD orders/month</div>
                  </div>
                </div>
              </div>

              <div className="cs-quote">
                <p>
                  "The ROI calculator took me a minute. We were paying more in one week of staff salaries than{" "}
                  <strong>VoiceConfirm</strong> costs for the entire year."
                </p>
                <cite>— Suresh Menon, Owner</cite>
              </div>
            </div>

            {/* ── Right white panel ── */}
            <div className="cs-right">
              <div className="cs-panels">

                {/* BEFORE */}
                <div className="cs-panel-before">
                  <div className="cs-panel-header">
                    {/* X icon */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.25" stroke="#e05c3a" strokeWidth="1.5"/>
                      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#e05c3a" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="cs-panel-header-label before">Before</span>
                  </div>
                  {beforeRows.map((row) => (
                    <div key={row.metric} className={`cs-panel-row${row.bold ? " bold-row" : ""}`}>
                      <span className="cs-panel-metric">{row.metric}</span>
                      <span className="cs-panel-value-before">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* AFTER */}
                <div className="cs-panel-after">
                  <div className="cs-panel-header">
                    {/* Circle check icon */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.25" stroke="#3b3fd4" strokeWidth="1.5"/>
                      <path d="M4 7l2.2 2.2 3.8-4.4" stroke="#3b3fd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="cs-panel-header-label after">After (60 Days)</span>
                  </div>
                  {afterRows.map((row) => (
                    <div key={row.metric} className={`cs-panel-row${row.bold ? " bold-row" : ""}`}>
                      <span className="cs-panel-metric">{row.metric}</span>
                      <span className="cs-panel-value-after">{row.value}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Revenue box */}
              <div className="cs-revenue">
                <div className="cs-rev-label">Revenue Recovered</div>
                <div className="cs-rev-main">
                  <div className="cs-rev-icon">
                    <WalletIcon />
                  </div>
                  <div className="cs-rev-amount">
                    ₹2,14,000<span>/month</span>
                  </div>
                </div>
                <div className="cs-rev-note">Prevented RTO and increased successful deliveries.</div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}