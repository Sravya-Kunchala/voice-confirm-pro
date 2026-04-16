import React from "react";

type NavColumn = {
  heading: string;
  links: string[];
};

const NAV_COLUMNS: NavColumn[] = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Affiliate Program", "Contact"],
  },
  {
    heading: "Support",
    links: ["FAQ", "Documentation", "Integrations", "API Reference", "Status"],
  },
  {
    heading: "Legal",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Refund Policy",
      "Data Processing",
      "Cookie Policy",
    ],
  },
];

const MicIcon: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
    <path
      d="M5 10a7 7 0 0 0 14 0"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <line
      x1="12"
      y1="17"
      x2="12"
      y2="21"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="9"
      y1="21"
      x2="15"
      y2="21"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const VoiceConfirmFooter: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.topSection}>
        {/* Brand */}
        <div style={styles.brandCol}>
          <div style={styles.brandRow}>
            <div style={styles.brandIcon}>
              <MicIcon />
            </div>
            <span style={styles.brandName}>VoiceConfirm Pro</span>
          </div>
          <p style={styles.brandDesc}>
            Automated COD voice confirmation for WooCommerce stores across
            India, Middle East, and Southeast Asia.
          </p>
        </div>

        {/* Nav Columns */}
        <div style={styles.navGrid}>
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} style={styles.navCol}>
              <h4 style={styles.navHeading}>{col.heading}</h4>
              <nav>
                {col.links.map((link) => (
                  <a key={link} href="#" style={styles.navLink}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color = "#999999")
                    }
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={styles.bottomBar}>
        <p style={styles.bottomText}>
          © 2026 VoiceConfirm Pro. All rights reserved. Made with purpose in
          Hyderabad, India.
        </p>
        <p style={styles.disclaimerText}>
          WooCommerce is a trademark of Automattic Inc. VoiceConfirm Pro is not
          affiliated with or endorsed by Automattic.
        </p>
      </div>
    </footer>
  );
};

/** Inline styles — swap for Tailwind or CSS Modules as needed */
const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: "#0f0f0f",
    color: "#cccccc",
    fontFamily: "'Geist', 'Inter', sans-serif",
    padding: "60px 48px 32px",
    boxSizing: "border-box",
    width: "100%",
  },
  topSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    paddingBottom: "48px",
    borderBottom: "0.5px solid #2a2a2a",
  },
  brandCol: {
    flex: "0 0 220px",
    minWidth: "180px",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  brandIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#7c3aed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  brandName: {
    fontSize: "18px",
    fontWeight: 500,
    color: "#ffffff",
  },
  brandDesc: {
    fontSize: "13px",
    lineHeight: 1.7,
    color: "#888888",
  },
  navGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "32px",
  },
  navCol: {
    display: "flex",
    flexDirection: "column",
  },
  navHeading: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#555555",
    marginBottom: "16px",
  },
  navLink: {
    display: "block",
    fontSize: "13px",
    color: "#999999",
    textDecoration: "none",
    marginBottom: "10px",
    transition: "color 0.15s ease",
  },
  bottomBar: {
    paddingTop: "28px",
    textAlign: "center" as const,
  },
  bottomText: {
    fontSize: "12px",
    color: "#555555",
    lineHeight: 1.8,
  },
  disclaimerText: {
    fontSize: "12px",
    color: "#4ade80",
    lineHeight: 1.8,
  },
};

export default VoiceConfirmFooter;