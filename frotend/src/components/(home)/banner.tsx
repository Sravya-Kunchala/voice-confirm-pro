import { useEffect, useRef, useState } from "react";

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7" stroke="#a78bfa" strokeWidth="1" />
    <path
      d="M4.5 7.5L6.5 9.5L10.5 5.5"
      stroke="#a78bfa"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Dot = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  phase: number;
  speed: number;
};

export default function HeroBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // slight delay so CSS animations play on first paint
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const dots: Dot[] = Array.from({ length: 44 }, () => ({
      x: Math.random() * (canvas.offsetWidth || 900),
      y: Math.random() * (canvas.offsetHeight || 300),
      r: Math.random() * 20 + 7,
      alpha: Math.random() * 0.13 + 0.04,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.25,
    }));

    let t = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.016;

      dots.forEach((d) => {
        const pulse = (Math.sin(t * d.speed + d.phase) + 1) / 2;
        const outerR = d.r * (0.85 + pulse * 0.3);
        const alpha = d.alpha * (0.4 + pulse * 0.6);

        ctx.beginPath();
        ctx.arc(d.x, d.y, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 0.28 * (0.7 + pulse * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,92,246,${alpha * 0.55})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: translateY(8px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(5px); }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0px rgba(139,92,246,0.6); }
          70%  { box-shadow: 0 0 0 12px rgba(139,92,246,0); }
          100% { box-shadow: 0 0 0 0px rgba(139,92,246,0); }
        }

        .hero-cta-btn {
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px 30px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: sans-serif;
          letter-spacing: 0.1px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.25s;
          animation: pulseRing 2.5s ease-out 1.8s infinite;
        }
        .hero-cta-btn:hover {
          background: #6d28d9;
          transform: scale(1.05);
          box-shadow: 0 10px 36px rgba(124,58,237,0.5);
          animation: none;
        }
        .hero-cta-btn:active {
          transform: scale(0.97);
          box-shadow: none;
        }
        .hero-cta-btn:hover .btn-arrow {
          animation: arrowBounce 0.7s ease-in-out infinite;
        }
        .btn-arrow {
          display: inline-block;
          transition: transform 0.2s;
        }
      `}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "280px",
          background: "#0e0c1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* bg.svg — place your file at /public/bg.svg */}
        <img
          src="/bg.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.015,
            animation: mounted ? "fadeIn 1.4s ease 0.1s forwards" : undefined,
          }}
        />

        {/* Canvas: pulsing dots */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        {/* Foreground content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "64px 24px",
            maxWidth: "600px",
          }}
        >
          {/* Heading with shimmer gradient */}
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 40px)",
              fontWeight: 700,
              margin: "0 0 14px",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              background:
                "linear-gradient(90deg,#ddd6fe 0%,#ffffff 35%,#c4b5fd 65%,#ddd6fe 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0,
              animation: mounted
                ? "fadeUp 0.75s ease 0.15s forwards, shimmer 4s linear 1s infinite"
                : undefined,
            }}
          >
            Start Your Free 14-Day Trial{" "}
            <span style={{ fontSize: "0.72em", opacity: 0.7 }}>↝</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 34px",
              lineHeight: 1.7,
              fontFamily: "sans-serif",
              fontWeight: 400,
              opacity: 0,
              animation: mounted
                ? "fadeUp 0.75s ease 0.35s forwards"
                : undefined,
            }}
          >
            Join 500+ WooCommerce stores already recovering
            <br />
            revenue with automated COD confirmation.
          </p>

          {/* CTA Button */}
          <div
            style={{
              display: "inline-block",
              opacity: 0,
              animation: mounted
                ? "fadeUp 0.75s ease 0.55s forwards"
                : undefined,
            }}
          >
            <button className="hero-cta-btn">
              Start Your Free 14-Day Trial
              <span className="btn-arrow">→</span>
            </button>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "22px",
              marginTop: "20px",
            }}
          >
            {["No credit card required", "Works in 10 minutes"].map(
              (label, i) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "sans-serif",
                    opacity: 0,
                    animation: mounted
                      ? `badgePop 0.55s ease ${0.8 + i * 0.15}s forwards`
                      : undefined,
                  }}
                >
                  <CheckIcon />
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
