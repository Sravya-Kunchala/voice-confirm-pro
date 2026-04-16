"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

// ── Icons ──────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckCircle = () => (
  <svg viewBox="0 0 24 24" width={52} height={52} fill="none" stroke="#7c3aed" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ── Password strength ──────────────────────────────────────────────────────
function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "#e8e8e8" },
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f59e0b" },
    { label: "Good", color: "#3b82f6" },
    { label: "Strong", color: "#22c55e" },
  ];
  return { score, ...map[score] };
}

// ── Input component ────────────────────────────────────────────────────────
function Field({
  id, label, type = "text", placeholder, value, onChange, error, children,
}: {
  id: string; label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; error?: string; children?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={id} style={{
        display: "block", fontSize: "0.7rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 7,
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", padding: "13px 16px",
            paddingRight: children ? 44 : 16,
            fontSize: "0.93rem", fontFamily: "'DM Sans', sans-serif",
            background: "#f5f5f7",
            border: `1.5px solid ${error ? "#ef4444" : focused ? "#7c3aed" : "#e8e8e8"}`,
            borderRadius: 11,
            color: "#181818", outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(124,58,237,0.10)" : "none",
          }}
        />
        {children && (
          <div style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)" }}>
            {children}
          </div>
        )}
      </div>
      {error && (
        <p style={{ color: "#ef4444", fontSize: "0.76rem", marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
          <svg viewBox="0 0 24 24" width={12} height={12} fill="none" stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Success screen ─────────────────────────────────────────────────────────
function SuccessView({ name, onLogin }: { name: string; onLogin: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ textAlign: "center", padding: "12px 0", animation: "fadeUp 0.5s both" }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "rgba(124,58,237,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 20px",
        animation: "popIn 0.55s cubic-bezier(.22,.68,0,1.4) both",
      }}>
        <CheckCircle />
      </div>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.7rem", marginBottom: 8, color: "#181818" }}>
        You're in, {name.split(" ")[0]}!
      </h2>
      <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: 28, fontWeight: 300 }}>
        Your account has been created.<br />Welcome to VoiceConfirm Pro.
      </p>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onLogin}
        style={{
          width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
          background: hover ? "#6d28d9" : "#7c3aed",
          color: "#fff", fontSize: "1rem", fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
          transition: "background 0.2s, transform 0.18s, box-shadow 0.2s",
          transform: hover ? "translateY(-1px)" : "translateY(0)",
          boxShadow: hover ? "0 6px 20px rgba(124,58,237,0.35)" : "0 2px 8px rgba(124,58,237,0.2)",
        }}
      >
        Go to Login →
      </button>
    </div>
  );
}

// ── Signup Form ────────────────────────────────────────────────────────────
function SignupForm({ onSuccess }: { onSuccess: (name: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState(false);

  const strength = password ? getStrength(password) : null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Minimum 8 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (!agreed) { setAgreeError(true); return; }
    setErrors({}); setAgreeError(false);
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(name); }, 1600);
  };

  return (
    <div style={{ animation: "fadeUp 0.45s cubic-bezier(.22,.68,0,1.2) both" }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginBottom: 26 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img src="/voice-confirm.svg" alt="VoiceConfirm Pro" width={34} height={34} />
        </div>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.97rem", color: "#181818" }}>
          VoiceConfirm Pro
        </span>
      </div>

      {/* Heading */}
      <h1 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "clamp(1.8rem,4vw,2.2rem)",
        textAlign: "center", marginBottom: 6, color: "#181818",
      }}>
        Hello&nbsp;;&#x202F;)
      </h1>
      <p style={{ textAlign: "center", color: "#999", fontSize: "0.9rem", marginBottom: 28, fontWeight: 300 }}>
        Start your journey with us
      </p>

      {/* Fields */}
      <Field id="name" label="Full Name" placeholder="John Doe" value={name}
        onChange={v => { setName(v); setErrors(p => ({ ...p, name: "" })); }} error={errors.name} />

      <Field id="email" label="Email" type="email" placeholder="hello@example.com" value={email}
        onChange={v => { setEmail(v); setErrors(p => ({ ...p, email: "" })); }} error={errors.email} />

      <div style={{ marginBottom: 18 }}>
        <Field id="password" label="Password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password}
          onChange={v => { setPassword(v); setErrors(p => ({ ...p, password: "" })); }} error={errors.password}>
          <button
            onClick={() => setShowPw(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center", padding: 0, transition: "color 0.2s" }}
            tabIndex={-1}
          >
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </Field>

        {/* Strength bar */}
        {strength && strength.score > 0 && (
          <div style={{ marginTop: -8 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 99,
                  background: i <= strength.score ? strength.color : "#e8e8e8",
                  transition: "background 0.3s",
                }} />
              ))}
            </div>
            <p style={{ fontSize: "0.73rem", color: strength.color, fontWeight: 600, transition: "color 0.3s" }}>
              {strength.label}
            </p>
          </div>
        )}
      </div>

      {/* Terms */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
          <div
            onClick={() => { setAgreed(v => !v); setAgreeError(false); }}
            style={{
              width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
              border: `2px solid ${agreeError ? "#ef4444" : agreed ? "#7c3aed" : "#ccc"}`,
              background: agreed ? "#7c3aed" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s, border-color 0.2s",
              cursor: "pointer",
            }}
          >
            {agreed && (
              <svg viewBox="0 0 24 24" width={11} height={11} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: "0.83rem", color: "#666", lineHeight: 1.55 }}>
            By joining, you agree to our{" "}
            <a href="#" style={{ color: "#7c3aed", fontWeight: 600, textDecoration: "none" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" style={{ color: "#7c3aed", fontWeight: 600, textDecoration: "none" }}>Privacy Policy</a>.
          </span>
        </label>
        {agreeError && <p style={{ color: "#ef4444", fontSize: "0.76rem", marginTop: 5 }}>Please accept the terms to continue</p>}
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        disabled={loading}
        style={{
          width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
          background: loading ? "#a78bfa" : btnHover ? "#6d28d9" : "#7c3aed",
          color: "#fff", fontSize: "1rem", fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.2s, transform 0.18s, box-shadow 0.2s",
          transform: btnHover && !loading ? "translateY(-1px)" : "translateY(0)",
          boxShadow: btnHover && !loading ? "0 6px 20px rgba(124,58,237,0.35)" : "0 2px 8px rgba(124,58,237,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          marginBottom: 18,
        }}
      >
        {loading ? (
          <>
            <span style={{
              width: 16, height: 16,
              border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff",
              borderRadius: "50%", display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }} />
            Creating account…
          </>
        ) : "Create account"}
      </button>

      {/* Login link */}
      <p style={{ textAlign: "center", fontSize: "0.87rem", color: "#999" }}>
        Already have an account?{" "}
        <a
          href="/signin"
          onMouseEnter={() => setLoginHover(true)}
          onMouseLeave={() => setLoginHover(false)}
          style={{ color: "#7c3aed", fontWeight: 700, textDecoration: loginHover ? "underline" : "none", transition: "color 0.2s" }}
        >
          Log in
        </a>
      </p>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function SignupPage() {
  const [done, setDone] = useState(false);
  const [createdName, setCreatedName] = useState("");

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        input::placeholder { color: #bbb; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,25px) scale(1.08); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-25px,-20px) scale(1.1); }
        }
        @keyframes blob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(20px,-30px) scale(1.06); }
        }
      `}</style>

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

        {/* Background blobs — matching the screenshot */}
        <div style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,140,0.5), rgba(253,220,190,0.25) 60%, transparent)",
          top: -120, left: -120, pointerEvents: "none",
          animation: "blob1 13s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(253,186,140,0.4), rgba(252,210,180,0.2) 60%, transparent)",
          bottom: -80, right: -80, pointerEvents: "none",
          animation: "blob2 15s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: 220, height: 220, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,181,253,0.25), transparent 70%)",
          bottom: 60, left: "20%", pointerEvents: "none",
          animation: "blob3 11s ease-in-out infinite",
        }} />

        {/* Card */}
        <div style={{
          background: "#fff",
          borderRadius: 22,
          padding: "clamp(28px,6vw,44px) clamp(24px,6vw,44px)",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 4px 6px rgba(0,0,0,0.03), 0 20px 50px rgba(0,0,0,0.09)",
          position: "relative",
          zIndex: 1,
        }}>
          {done
            ? <SuccessView name={createdName} onLogin={() => { setDone(false); }} />
            : <SignupForm onSuccess={(n) => { setCreatedName(n); setDone(true); }} />
          }
        </div>
      </div>
    </>
  );
}
