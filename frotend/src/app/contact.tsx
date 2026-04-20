"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import VoiceConfirmFooter from "../components/footer";

interface ContactItem { label: string; value: string; icon: React.ReactNode; }
interface SupportCard { title: string; description: string; linkLabel: string; href: string; icon: React.ReactNode; }

const IconEmail = () => (<svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4 12 13 2 4" /></svg>);
const IconPhone = () => (<svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12 19.79 19.79 0 011.13 3.27 2 2 0 013.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>);
const IconPin = () => (<svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const IconClock = () => (<svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>);
const IconLinkedIn = () => (<svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>);
const IconX = () => (<svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 4l16 16M20 4L4 20" /></svg>);
const IconYoutube = () => (<svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>);
const IconInstagram = () => (<svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>);
const IconMonitor = () => (<svg viewBox="0 0 24 24" width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>);
const IconChat = () => (<svg viewBox="0 0 24 24" width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>);
const IconUsers = () => (<svg viewBox="0 0 24 24" width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>);
const IconNews = () => (<svg viewBox="0 0 24 24" width={19} height={19} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2" /><path d="M2 12h10M2 17h10M2 7h5" /></svg>);
const IconCheck = () => (<svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#22c9a6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>);
const IconBolt = () => (<svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#22c9a6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>);
const IconCard = () => (<svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#22c9a6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>);
const IconGlobe = () => (<svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#22c9a6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>);
const IconGroup = () => (<svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="#22c9a6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>);

const contactItems: ContactItem[] = [
  { label: "Email Us", value: "support@voiceconfirm.in", icon: <IconEmail /> },
  { label: "Call Us", value: "+91-XXXXX-XXXXX", icon: <IconPhone /> },
  { label: "Office Address", value: "Banjara Hills, Hyderabad, Telangana – 500034, India", icon: <IconPin /> },
  { label: "Response Time", value: "12 hours email · 4 hours phone", icon: <IconClock /> },
];
const socials = [{ label: "LinkedIn", icon: <IconLinkedIn /> }, { label: "X", icon: <IconX /> }, { label: "YouTube", icon: <IconYoutube /> }, { label: "Instagram", icon: <IconInstagram /> }];
const supportCards: SupportCard[] = [
  { title: "Sales Enquiry", description: "Interested in enterprise plans or bulk store integrations? Our sales team will craft a custom solution for your needs.", linkLabel: "Talk to Sales", href: "#", icon: <IconMonitor /> },
  { title: "Technical Support", description: "Facing a technical glitch? Our engineers are available 24/7 to ensure your voice confirmations never stop flowing.", linkLabel: "Open Support Ticket", href: "#", icon: <IconChat /> },
  { title: "Partnership & Affiliates", description: "Join our partner ecosystem. We work with the world's leading e-commerce agencies and platform providers.", linkLabel: "Partner with Us", href: "#", icon: <IconUsers /> },
  { title: "Press & Media", description: "Looking for brand assets, expert commentary on voice security, or media kits? We're happy to help.", linkLabel: "Media Inquiries", href: "#", icon: <IconNews /> },
];
const footerItems = [
  { icon: <IconCheck />, text: "30-day money-back guarantee" },
  { icon: <IconBolt />, text: "99.9% uptime SLA" },
  { icon: <IconCard />, text: "No credit card for trial" },
  { icon: <IconGlobe />, text: "Indian servers" },
  { icon: <IconGroup />, text: "500+ stores trust VoiceConfirm Pro" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const inputBase: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", padding: "9px 12px", border: "1.5px solid #e5e5e2", borderRadius: "10px", background: "#f2f2f0", color: "#181818", outline: "none", width: "100%", transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s" };
  const focusStyle: React.CSSProperties = { borderColor: "#7c3aed", background: "#fff", boxShadow: "0 0 0 3px rgba(124,58,237,0.10)" };
  const getS = (n: string): React.CSSProperties => focused === n ? { ...inputBase, ...focusStyle } : inputBase;

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(13,92,78,0.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", animation: "popIn 0.5s cubic-bezier(.22,.68,0,1.4) both" }}>
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="#0d5c4e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.2rem", marginBottom: 8 }}>You're booked!</h3>
      <p style={{ color: "#666", fontSize: "0.78rem" }}>We'll reach out within 4 hours to confirm your demo.</p>
    </div>
  );

  return (
    <>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.15rem,2vw,1.55rem)", marginBottom: "1.3rem", color: "#181818" }}>Book a live demo</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
        {[{ id: "fullname", label: "Full Name", type: "text", placeholder: "John Doe" }, { id: "email", label: "Email", type: "email", placeholder: "john@store.com" }, { id: "phone", label: "Phone", type: "tel", placeholder: "+91 ..." }, { id: "storeurl", label: "Store URL", type: "url", placeholder: "mystore.com" }].map(({ id, label, type, placeholder }) => (
          <div key={id} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label htmlFor={id} style={{ fontSize: "0.7rem", fontWeight: 500, color: "#181818" }}>{label}</label>
            <input id={id} type={type} placeholder={placeholder} style={getS(id)} onFocus={() => setFocused(id)} onBlur={() => setFocused(null)} />
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="codvol" style={{ fontSize: "0.7rem", fontWeight: 500 }}>COD Volume</label>
          <select id="codvol" style={{ ...getS("codvol"), appearance: "none", cursor: "pointer", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 32 }} onFocus={() => setFocused("codvol")} onBlur={() => setFocused(null)}>
            <option value="" disabled>Select volume</option>
            <option>Under 100 orders/month</option><option>100–500 orders/month</option><option>500–2000 orders/month</option><option>2000+ orders/month</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="preftime" style={{ fontSize: "0.7rem", fontWeight: 500 }}>Preferred Time</label>
          <input id="preftime" type="datetime-local" style={getS("preftime")} onFocus={() => setFocused("preftime")} onBlur={() => setFocused(null)} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, gridColumn: "1 / -1" }}>
          <label htmlFor="interests" style={{ fontSize: "0.7rem", fontWeight: 500 }}>Demo Interests</label>
          <textarea id="interests" placeholder="Tell us what you're looking for..." rows={3} style={{ ...getS("interests"), resize: "vertical", fontFamily: "'DM Sans', sans-serif" }} onFocus={() => setFocused("interests")} onBlur={() => setFocused(null)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}><SubmitButton onClick={() => setSubmitted(true)} /></div>
      </div>
    </>
  );
}

function SubmitButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: "100%", background: hovered ? "#6d28d9" : "#7c3aed", color: "#fff", border: "none", borderRadius: 12, padding: "12px 24px", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s, transform 0.18s, box-shadow 0.2s", transform: hovered ? "translateY(-2px)" : "translateY(0)", boxShadow: hovered ? "0 8px 24px rgba(124,58,237,0.3)" : "none" }}>
      Book My Free Demo
      <span style={{ fontSize: "0.95rem", transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.2s", display: "inline-block" }}>→</span>
    </button>
  );
}

function SupportCard({ card, delay }: { card: SupportCard; delay: number }) {
  const { ref, inView } = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: "#f2f2f0", borderRadius: 16, padding: "22px 20px", border: hovered ? "1.5px solid #22c9a6" : "1.5px solid #e5e5e2", transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s, opacity 0.6s, translate 0.6s", opacity: inView ? 1 : 0, translate: inView ? "0 0" : "0 20px", transitionDelay: `${delay}ms`, transform: hovered ? "translateY(-4px)" : "translateY(0)", boxShadow: hovered ? "0 12px 32px rgba(13,92,78,0.10)" : "none", cursor: "default" }}>
      <div style={{ width: 36, height: 36, borderRadius: 9, background: hovered ? "rgba(13,92,78,0.18)" : "rgba(13,92,78,0.10)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: "#0d5c4e", transition: "background 0.25s, transform 0.25s", transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1)" }}>{card.icon}</div>
      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.45rem", color: "#181818" }}>{card.title}</h3>
      <p style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.6, marginBottom: "0.8rem", fontWeight: 300 }}>{card.description}</p>
      <a href={card.href} style={{ fontSize: "0.75rem", fontWeight: 600, color: hovered ? "#22c9a6" : "#0d5c4e", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: hovered ? 9 : 5, transition: "gap 0.2s, color 0.2s" }}>{card.linkLabel} →</a>
    </div>
  );
}

function ContactItemRow({ item, delay }: { item: ContactItem; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: "flex", alignItems: "center", gap: 11, opacity: 0, transform: "translateX(-24px)", animation: `slideIn 0.6s ${delay}ms forwards` }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: hovered ? "rgba(13,92,78,0.22)" : "rgba(13,92,78,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#0d5c4e", transition: "background 0.25s, transform 0.25s", transform: hovered ? "scale(1.12)" : "scale(1)" }}>{item.icon}</div>
      <div style={{ textAlign: "left" }}>
        <span style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#666", fontWeight: 500, textAlign: "left" }}>{item.label}</span>
        <strong style={{ fontSize: "0.8rem", fontWeight: 600, color: "#181818" }}>{item.value}</strong>
      </div>
    </div>
  );
}

function SocialBtn({ label, icon }: { label: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href="#" aria-label={label} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ width: 32, height: 32, borderRadius: 7, background: hovered ? "#131c1a" : "#f2f2f0", border: `1px solid ${hovered ? "#131c1a" : "#e5e5e2"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s, border-color 0.2s, transform 0.2s", transform: hovered ? "translateY(-2px)" : "translateY(0)", color: hovered ? "#fff" : "#181818", textDecoration: "none" }}>{icon}</a>
  );
}

export default function ContactPage() {
  const { ref: footerRef, inView: footerVisible } = useInView(0.3);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const check = () => setIsMobile(window.innerWidth <= 768); check(); window.addEventListener("resize", check); return () => window.removeEventListener("resize", check); }, []);

  const hPad = isMobile ? "28px" : "clamp(100px, 12vw, 160px)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,20px) scale(1.08); } }
        @keyframes slideIn { to { opacity: 1; transform: translateX(0); } }
        @keyframes riseUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(200%); } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        input[type='datetime-local']::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
        select option { background: #fff; color: #181818; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f8f6", color: "#181818", minHeight: "100vh", overflowX: "hidden" }}>
        <Navbar />

        {/* HERO */}
        <section style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "100vh", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "#7c3aed", filter: "blur(80px)", opacity: 0.16, top: -80, left: -100, pointerEvents: "none", animation: "drift 10s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "#22c9a6", filter: "blur(80px)", opacity: 0.14, bottom: -60, right: "40%", pointerEvents: "none", animation: "drift 10s ease-in-out infinite alternate-reverse", animationDelay: "-4s" }} />

          {/* Left */}
          <div style={{ padding: isMobile ? `48px 28px 32px` : `clamp(40px,6vw,80px) ${hPad}`, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? "1.9rem" : "clamp(2rem,3.8vw,3.2rem)", lineHeight: 1.05, marginBottom: "0.9rem" }}>
              <span style={{ color: "#7c3aed" }}>Let's</span>{" "}<em style={{ color: "#0d5c4e", fontStyle: "italic" }}>Talk</em>
            </h1>
            <p style={{ fontSize: "0.87rem", color: "#666", lineHeight: 1.7, maxWidth: 400, marginBottom: "1.8rem", fontWeight: 300 }}>
              Have a question before buying? Want a live demo for your store? Need a custom quote for your agency? We're real people and we respond fast.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.6rem" }}>
              {contactItems.map((item, i) => <ContactItemRow key={item.label} item={item} delay={300 + i * 150} />)}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map((s) => <SocialBtn key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>

          {/* Right / Form */}
          <div style={{ padding: isMobile ? `32px 28px 48px` : `clamp(40px,6vw,70px) ${hPad}`, display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff", position: "relative", zIndex: 1, boxShadow: isMobile ? "0 -2px 20px rgba(0,0,0,0.06)" : "-2px 0 40px rgba(0,0,0,0.04)" }}>
            <div style={{ animation: "riseUp 0.7s 0.2s cubic-bezier(.22,.68,0,1.2) both" }}><BookingForm /></div>
          </div>
        </section>

        {/* CARDS */}
        <section style={{ padding: isMobile ? "40px 28px" : `clamp(44px,5.5vw,76px) ${hPad}`, background: "#f8f8f6", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 300, height: 300, background: "radial-gradient(circle, rgba(34,201,166,0.12), transparent 70%)", top: -60, right: -60, pointerEvents: "none" }} />
          <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#0d5c4e", fontWeight: 600, marginBottom: "0.45rem" }}>How can we help?</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: isMobile ? "1.4rem" : "clamp(1.4rem,2.3vw,2rem)", marginBottom: "1.8rem" }}>Get in touch the right way</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            {supportCards.map((card, i) => <SupportCard key={card.title} card={card} delay={i * 100} />)}
          </div>
        </section>

        {/* FOOTER BAR */}
        <footer ref={footerRef} style={{ background: "#131c1a", color: "#fff", padding: `14px ${hPad}`, display: "flex", alignItems: "center", gap: "clamp(12px,2vw,26px)", overflowX: isMobile ? "auto" : "visible", position: "relative", opacity: footerVisible ? 1 : 0, transition: "opacity 0.6s" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(34,201,166,0.04), transparent)", animation: "shimmer 4s linear infinite", pointerEvents: "none" }} />
          {footerItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, zIndex: 1 }}>
              {i > 0 && <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.12)", flexShrink: 0, marginRight: 6, display: isMobile ? "none" : "block" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.68rem", fontWeight: 500, whiteSpace: "nowrap", opacity: 0.9 }}>{item.icon}{item.text}</div>
            </div>
          ))}
        </footer>

        <VoiceConfirmFooter />
      </div>
    </>
  );
}