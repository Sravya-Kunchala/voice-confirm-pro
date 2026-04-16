import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Features", href: "/feature" },
  { label: "Integrations", href: "/integration" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/casestudy" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "#ffffff",
    borderBottom: "1px solid #f0ebfa",
    boxShadow: "0 1px 8px rgba(91, 33, 182, 0.06)",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  inner: {
    margin: "0 auto",
    padding: "0 24px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    gap: "32px",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoIcon: {
    width: "34px",
    height: "34px",
    background: "#5b21b6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  logoText: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#111827",
    letterSpacing: "-0.3px",
    whiteSpace: "nowrap",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    color: "#4b5563",
    padding: "6px 10px",
    borderRadius: "6px",
    whiteSpace: "nowrap" as const,
  },
  linkActive: {
    fontWeight: 700,
    color: "#5b21b6",
    background: "#f5f0ff",
    boxShadow: "inset 0 0 0 1px rgba(91, 33, 182, 0.08)",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },
  signIn: {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    color: "#111827",
    padding: "7px 14px",
    borderRadius: "7px",
    border: "1px solid #e5e7eb",
  },
  cta: {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
    color: "#fff",
    background: "#6d28d9",
    padding: "7px 16px",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (href: string) => {
    if (href.startsWith("#")) return false;
    return location.pathname === href || (href === "/" && location.pathname === "");
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .nav-desktop-links { display: flex; }
        .nav-desktop-actions { display: flex; }
        .nav-hamburger { display: none !important; }

        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-actions { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={styles.navbar}>
        <div style={styles.inner}>
          {/* Logo */}
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>
              <img src="/voice-confirm.svg" alt="VoiceConfirm Pro" width={20} height={20} />
            </span>
            <span style={styles.logoText}>VoiceConfirm Pro</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-desktop-links" style={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    ...styles.link,
                    ...(isActiveLink(link.href) ? styles.linkActive : {}),
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Buttons */}
          <div className="nav-desktop-actions" style={styles.actions}>
            <a href="/signin" style={styles.signIn}>Sign In</a>
            <a href="/contact" style={styles.cta}>Free Trial <span>→</span></a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              marginLeft: "auto",
            }}
          >
            <span style={{ display: "block", width: "22px", height: "2px", background: "#111827", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "#111827", borderRadius: "2px" }} />
            <span style={{ display: "block", width: "22px", height: "2px", background: "#111827", borderRadius: "2px" }} />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0, 0, 0, 0.4)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Right Slide-in Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 300,
          width: "280px",
          background: "#ffffff",
          boxShadow: "-4px 0 24px rgba(91, 33, 182, 0.12)",
          display: "flex",
          flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: "60px",
            borderBottom: "1px solid #f0ebfa",
            flexShrink: 0,
          }}
        >
          <Link to="/" style={styles.logo} onClick={() => setMenuOpen(false)}>
            <span style={styles.logoIcon}>
              <img src="/voice-confirm.svg" alt="VoiceConfirm Pro" width={20} height={20} />
            </span>
            <span style={styles.logoText}>VoiceConfirm Pro</span>
          </Link>

          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              color: "#6b7280",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: isActiveLink(link.href) ? 600 : 500,
                color: isActiveLink(link.href) ? "#5b21b6" : "#374151",
                padding: "11px 12px",
                borderRadius: "8px",
                background: isActiveLink(link.href) ? "#f5f0ff" : "transparent",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "background 0.15s",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Drawer Footer CTA */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid #f0ebfa",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <a
            href="/signin"
            style={{
              ...styles.signIn,
              display: "block",
              textAlign: "center",
              padding: "10px 14px",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </a>
          <a
            href="/contact"
            style={{
              ...styles.cta,
              justifyContent: "center",
              padding: "10px 16px",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Free Trial →
          </a>
        </div>
      </div>
    </>
  );
}
