"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

// ── Eye Icons ──────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="#7c3aed" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Shared styles ──────────────────────────────────────────────────────────
const inputStyle = (focused: boolean, error?: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "13px 16px",
  fontSize: "0.95rem",
  fontFamily: "'DM Sans', sans-serif",
  background: "#f5f5f7",
  border: `1.5px solid ${error ? "#ef4444" : focused ? "#7c3aed" : "#e8e8e8"}`,
  borderRadius: 12,
  color: "#181818",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.10)" : "none",
});

// ── Login View ─────────────────────────────────────────────────────────────
function LoginView({ onForgot }: { onForgot: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [btnHover, setBtnHover] = useState(false);
  const [signUpHover, setSignUpHover] = useState(false);
  const [forgotHover, setForgotHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";
    return e;
  };

  const handleSignIn = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div style={{ animation: "fadeSlideIn 0.45s cubic-bezier(.22,.68,0,1.2) both" }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginBottom: 28 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img src="/voice-confirm.svg" alt="VoiceConfirm Pro" width={36} height={36} />
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "1rem", color: "#181818" }}>
          VoiceConfirm Pro
        </span>
      </div>

      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.7rem,4vw,2.1rem)", textAlign: "center", marginBottom: 8, color: "#181818" }}>
        Welcome back
      </h1>
      <p style={{ textAlign: "center", color: "#888", fontSize: "0.92rem", marginBottom: 28, fontWeight: 300 }}>
        Please enter your details
      </p>

      {/* Email */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 7 }}>
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          style={inputStyle(focusedField === "email", !!errors.email)}
        />
        {errors.email && <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: 4 }}>{errors.email}</p>}
      </div>

      {/* Password */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
          <label style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555" }}>
            Password
          </label>
          <button
            onClick={onForgot}
            onMouseEnter={() => setForgotHover(true)}
            onMouseLeave={() => setForgotHover(false)}
            style={{ background: "none", border: "none", fontSize: "0.78rem", fontWeight: 600, color: forgotHover ? "#6d28d9" : "#7c3aed", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textDecoration: forgotHover ? "underline" : "none", transition: "color 0.2s" }}
          >
            Forgot Password?
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <input
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            style={{ ...inputStyle(focusedField === "password", !!errors.password), paddingRight: 46 }}
          />
          <button
            onClick={() => setShowPw(v => !v)}
            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#999", display: "flex", alignItems: "center", padding: 0 }}
            tabIndex={-1}
          >
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: 4 }}>{errors.password}</p>}
      </div>

      {/* Sign In Button */}
      <button
        onClick={handleSignIn}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 0",
          borderRadius: 12,
          border: "none",
          background: loading ? "#a78bfa" : btnHover ? "#6d28d9" : "#7c3aed",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s, transform 0.18s, box-shadow 0.2s",
          transform: btnHover && !loading ? "translateY(-1px)" : "translateY(0)",
          boxShadow: btnHover && !loading ? "0 6px 20px rgba(124,58,237,0.35)" : "0 2px 8px rgba(124,58,237,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
              borderRadius: "50%", display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }} />
            Signing in…
          </>
        ) : "Sign in"}
      </button>

      <p style={{ textAlign: "center", fontSize: "0.88rem", color: "#888" }}>
        Don't have an account?{" "}
        <a
          href="/signup"
          onMouseEnter={() => setSignUpHover(true)}
          onMouseLeave={() => setSignUpHover(false)}
          style={{ color: "#7c3aed", fontWeight: 600, textDecoration: signUpHover ? "underline" : "none", transition: "color 0.2s" }}
        >
          Sign up
        </a>
      </p>
    </div>
  );
}

// ── Reset Password View ────────────────────────────────────────────────────
function ResetView({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [backHover, setBackHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div style={{ animation: "fadeSlideIn 0.4s both", textAlign: "center", padding: "8px 0" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(124,58,237,0.10)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          animation: "popIn 0.5s cubic-bezier(.22,.68,0,1.4) both",
        }}>
          <CheckIcon />
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem", marginBottom: 10 }}>Check your inbox</h2>
        <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 28, fontWeight: 300 }}>
          We sent a reset link to <strong style={{ color: "#181818" }}>{email}</strong>.<br />It expires in 15 minutes.
        </p>
        <button
          onClick={onBack}
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
          style={{ background: "none", border: "none", color: backHover ? "#6d28d9" : "#7c3aed", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6, margin: "0 auto", transition: "color 0.2s" }}
        >
          <ArrowLeft /> Back to login
        </button>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeSlideIn 0.45s cubic-bezier(.22,.68,0,1.2) both" }}>
      <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.7rem,4vw,2.1rem)", textAlign: "center", marginBottom: 10, color: "#181818" }}>
        Reset password
      </h1>
      <p style={{ textAlign: "center", color: "#888", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 32, fontWeight: 300 }}>
        Enter your email to receive a reset link
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 7 }}>
          Email Address
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setError(""); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle(focused, !!error)}
        />
        {error && <p style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: 4 }}>{error}</p>}
      </div>

      <button
        onClick={handleSend}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 0",
          borderRadius: 12,
          border: "none",
          background: loading ? "#a78bfa" : btnHover ? "#6d28d9" : "#7c3aed",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s, transform 0.18s, box-shadow 0.2s",
          transform: btnHover && !loading ? "translateY(-1px)" : "translateY(0)",
          boxShadow: btnHover && !loading ? "0 6px 20px rgba(124,58,237,0.35)" : "0 2px 8px rgba(124,58,237,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {loading ? (
          <>
            <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
            Sending…
          </>
        ) : (
          <>Send reset link <ArrowRight /></>
        )}
      </button>

      <button
        onClick={onBack}
        onMouseEnter={() => setBackHover(true)}
        onMouseLeave={() => setBackHover(false)}
        style={{ background: "none", border: "none", color: backHover ? "#444" : "#888", fontWeight: 500, fontSize: "0.88rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6, margin: "0 auto", transition: "color 0.2s" }}
      >
        <ArrowLeft /> Back to login
      </button>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const [view, setView] = useState<"login" | "reset">("login");

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        input::placeholder { color: #bbb; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes blobDrift1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,30px) scale(1.1); }
        }
        @keyframes blobDrift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px,-20px) scale(1.08); }
        }
      `}</style>

      {/* Page wrapper */}
      <div style={{
        minHeight: "100vh",
        background: "#f7f6f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Background blobs */}
        <div style={{
          position: "absolute", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,140,0.55), rgba(253,220,190,0.3) 60%, transparent)",
          top: -80, left: -100, pointerEvents: "none",
          animation: "blobDrift1 12s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,181,253,0.35), rgba(221,214,254,0.2) 60%, transparent)",
          bottom: -60, right: -60, pointerEvents: "none",
          animation: "blobDrift2 14s ease-in-out infinite",
        }} />

        {/* Card */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          padding: "clamp(28px,6vw,44px) clamp(24px,6vw,44px)",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(0,0,0,0.08)",
          position: "relative",
          zIndex: 1,
          minHeight: 420,
        }}>
          {view === "login"
            ? <LoginView onForgot={() => setView("reset")} />
            : <ResetView onBack={() => setView("login")} />
          }
        </div>
      </div>
    </>
  );
}
