import { useEffect, useRef } from "react";

const DOT_SIZE = 24;

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / DOT_SIZE) + 1;
      const rows = Math.ceil(canvas.height / DOT_SIZE) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SIZE;
          const y = r * DOT_SIZE;
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
          const alpha = 0.08 + 0.22 * (dist / maxDist);
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 140, 220, ${alpha})`;
          ctx.fill();
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

export default function FeaturesHero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500&display=swap');

        .features-hero-section {
          position: relative;
          width: 100%;
          min-height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0d0c1d;
        }

        .features-hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 70% 60% at 50% 50%,
            rgba(80, 40, 130, 0.38) 0%,
            transparent 75%
          );
          pointer-events: none;
          z-index: 1;
        }

        .features-hero-inner {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 64px 24px 72px;
          max-width: 780px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .features-badge {
          display: inline-block;
          padding: 5px 18px;
          border: 1px solid rgba(200, 180, 255, 0.35);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          color: rgba(220, 210, 255, 0.85);
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          margin-bottom: 28px;
        }

        .features-heading {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
          font-size: 52px;
          line-height: 1.15;
          color: #ffffff;
          margin: 0;
          letter-spacing: 0;
        }

        .features-heading-accent {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-weight: 400;
          color: #a855f7;
        }

        .features-subtext {
          margin-top: 24px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          line-height: 32px;
          max-width: 520px;
          text-align: center;
        }

        @media (max-width: 640px) {
          .features-heading { font-size: 32px; }
          .features-subtext { font-size: 16px; line-height: 26px; margin-top: 18px; }
          .features-hero-inner { padding: 52px 20px 60px; }
        }
      `}</style>

      <section className="features-hero-section">
        <DotGrid />

        <div className="features-hero-inner">
          <span className="features-badge">Features</span>

          <h1 className="features-heading">
            Everything You Need to{" "}
            <span className="features-heading-accent">Confirm Every Order</span>
          </h1>

          <p className="features-subtext">
            VoiceConfirm Pro is built specifically for high-volume COD stores.
            Every feature exists because real store owners asked for it.
          </p>
        </div>
      </section>
    </>
  );
}