import { useEffect, useState } from "react";

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

export default function HeroBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=IBM+Plex+Sans:wght@500&display=swap');

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
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {/* Background image */}
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
            opacity: 0.001,
            animation: mounted ? "fadeIn 1.4s ease 0.1s forwards" : undefined,
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
          {/* Heading — Playfair Display, 700, 41.6px, lh 45.76px, ls -0.42px */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "41.6px",
              fontWeight: 700,
              lineHeight: "45.76px",
              letterSpacing: "-0.42px",
              textAlign: "center",
              margin: "0 0 14px",
              color: "#FFFFFF",
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
            <svg viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", verticalAlign: "middle", width: "0.75em", height: "0.38em", marginLeft: "4px" }}>
              <path d="M1 8 H28 M20 1 L29 8 L20 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </h1>

          {/* Subheading — IBM Plex Sans, 500, 16px, lh 27.52px, ls 0% */}
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "27.52px",
              letterSpacing: "0%",
              textAlign: "center",
              color: "#FFFFFF",
              opacity: 0,
              margin: "0 0 34px",
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
                    fontFamily: "'IBM Plex Sans', sans-serif",
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