import { useEffect } from "react";

/* ─── Scroll reveal ─────────────────────────────────────── */
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

/* ─── Icons ─────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#16a34a" />
    <path d="M3.5 6l1.8 1.8 3.2-3.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b3fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M16 12h2" />
  </svg>
);

/* ─── Types ─────────────────────────────────────────────── */


/* ─── Main Component ─────────────────────────────────────── */
export default function TestimonialsSection() {
  useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,700;1,700&family=Epilogue:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ts-section {
          background: #f5f2eb;
          font-family: 'Epilogue', sans-serif;
          padding: 80px 24px 100px;
        }

        /* Reveal */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .reveal.revealed { opacity: 1; transform: none; }

        /* ── Section header ── */
        .ts-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 64px;
        }
        .ts-header h2 {
          font-family: 'Lora', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          line-height: 1.18;
          color: #1a1530;
          margin-bottom: 16px;
        }
        .ts-header h2 em {
          font-style: italic;
          color: #6b3fd4;
        }
        .ts-header p {
          font-size: 15px;
          color: #5a5570;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── Watermark ── */
        .ts-watermark-wrap {
          text-align: center;
          position: relative;
          margin-bottom: -28px;
          z-index: 0;
          pointer-events: none;
          user-select: none;
        }
        .ts-watermark {
          font-family: 'Lora', serif;
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 700;
          font-style: italic;
          color: rgba(107,63,212,0.07);
          letter-spacing: -0.02em;
        }

        /* ── Case study card ── */
        .cs-wrapper {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .cs-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 40px rgba(26,21,48,0.10);
        }

        /* Left dark panel */
        .cs-left {
          background: #1a1530;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .cs-badge {
          display: inline-block;
          background: rgba(107,63,212,0.3);
          color: #c4b5fd;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 6px;
          width: fit-content;
        }
        .cs-store-name {
          font-family: 'Lora', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }
        .cs-store-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.45);
          margin-top: 4px;
        }
        .cs-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cs-meta-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .cs-meta-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          margin-top: 1px;
          opacity: 0.7;
        }
        .cs-meta-label {
          font-size: 10.5px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 2px;
        }
        .cs-meta-value {
          font-size: 13px;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }
        .cs-quote {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 20px;
          margin-top: auto;
        }
        .cs-quote p {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.65;
          font-style: italic;
        }
        .cs-quote p strong {
          color: #a78bfa;
          font-style: normal;
        }
        .cs-quote cite {
          display: block;
          margin-top: 10px;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          font-style: normal;
        }

        /* Right panel */
        .cs-right {
          background: #fff;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Before/After table */
        .cs-table-wrap {
          padding: 28px 28px 20px;
        }
        .cs-ba-labels {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          margin-bottom: 10px;
        }
        .cs-ba-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0 0 6px;
        }
        .cs-ba-label.before { color: #e05c3a; }
        .cs-ba-label.after  { color: #16a34a; text-align: right; }
        .cs-ba-label.metric { color: #888; }

        .cs-ba-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          padding: 10px 0;
          border-top: 0.5px solid #f0ede6;
          align-items: center;
        }
        .cs-ba-row.highlight {
          background: #faf7ff;
          border-radius: 8px;
          padding: 10px 8px;
          margin: 0 -8px;
        }
        .cs-ba-row .metric-col {
          font-size: 12.5px;
          color: #888;
        }
        .cs-ba-row .before-col {
          font-size: 13.5px;
          color: #c0392b;
          font-weight: 500;
        }
        .cs-ba-row .after-col {
          text-align: right;
          font-size: 13.5px;
          color: #16a34a;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
        }
        .cs-ba-row.highlight .after-col {
          color: #6b3fd4;
          font-size: 15px;
        }

        /* Revenue recovered */
        .cs-revenue {
          margin: 0 28px 28px;
          border: 1.5px solid #ede9f8;
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: #faf8ff;
        }
        .cs-rev-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #ede9f8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cs-rev-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9880d0;
          margin-bottom: 4px;
        }
        .cs-rev-amount {
          font-family: 'Lora', serif;
          font-size: 1.7rem;
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
          font-size: 12px;
          color: #9880d0;
          margin-top: 4px;
        }

        /* Mobile */
        @media (max-width: 680px) {
          .cs-grid { grid-template-columns: 1fr; }
          .cs-right { order: -1; }
          .ts-section { padding: 56px 16px 72px; }
        }
      `}</style>

      <section className="ts-section">
        {/* Header */}
        <div className="ts-header reveal">
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

        {/* Watermark */}
        <div className="ts-watermark-wrap">
          <span className="ts-watermark">Case Study</span>
        </div>

        {/* Case Study Card */}
        <div className="cs-wrapper reveal" style={{ transitionDelay: "0.1s" }}>
          <div className="cs-grid">

            {/* Left dark panel */}
            <div className="cs-left">
              <div>
                <span className="cs-badge">Deep Dive Analysis</span>
                <div style={{ marginTop: 14 }}>
                  <div className="cs-store-name">ElectroMart Hyderabad</div>
                  <div className="cs-store-desc">A high-volume consumer electronics retailer scaling through the festive season.</div>
                </div>
              </div>

              <div className="cs-meta">
                <div className="cs-meta-row">
                  <svg className="cs-meta-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                  <div>
                    <div className="cs-meta-label">Industry</div>
                    <div className="cs-meta-value">Consumer Electronics</div>
                  </div>
                </div>
                <div className="cs-meta-row">
                  <svg className="cs-meta-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  <div>
                    <div className="cs-meta-label">Volume</div>
                    <div className="cs-meta-value">620 COD orders/month</div>
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

            {/* Right panel */}
            <div className="cs-right">
              <div className="cs-table-wrap">
                {/* Column headers */}
                <div className="cs-ba-labels">
                  <div className="cs-ba-label before">⊘ Before</div>
                  <div className="cs-ba-label metric" style={{ textAlign: "center" }}></div>
                  <div className="cs-ba-label after">✓ After 60 days</div>
                </div>

                {/* Rows */}
                {[
                  { metric: "Manual Team",   before: "3 Staff",   after: "96%",     afterNote: "Confirmation" },
                  { metric: "Confirmation",  before: "68%",        after: "7%",      afterNote: "Return Rate" },
                  { metric: "Return Rate",   before: "32%",        after: "₹10,199", afterNote: "System Cost" },
                  { metric: "Monthly Cost",  before: "₹54,000",   after: "₹43,801", afterNote: "Total Saving", highlight: true },
                ].map((row) => (
                  <div key={row.metric} className={`cs-ba-row${row.highlight ? " highlight" : ""}`}>
                    <div className="metric-col">{row.metric}</div>
                    <div className="before-col">{row.before}</div>
                    <div className="after-col">
                      <CheckIcon />
                      {row.after}
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue card */}
              <div className="cs-revenue">
                <div className="cs-rev-icon">
                  <WalletIcon />
                </div>
                <div>
                  <div className="cs-rev-label">Revenue Recovered</div>
                  <div className="cs-rev-amount">
                    ₹2,14,000<span>/month</span>
                  </div>
                  <div className="cs-rev-note">Prevented RTO and increased successful deliveries.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

