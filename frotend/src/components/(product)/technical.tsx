import { useEffect, useRef, useState } from "react";

const cards = [
  {
    title: "WooCommerce 6.0+",
    desc: "Works with WooCommerce 6.0 and above. Native webhook integration — no third-party bridge. Tested across all major WooCommerce releases.",
    tags: ["WC 6.0+", "WC 7.x", "WC 8.x"],
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
  },
  {
    title: "WordPress 5.8+",
    desc: "Compatible with WordPress 5.8 and all subsequent releases. Follows WordPress coding standards. Fully tested in multisite environments.",
    tags: ["WP 5.8+", "WP 6.x", "Multisite"],
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </>
    ),
  },
  {
    title: "PHP 7.4+",
    desc: "PHP 7.4 or higher required. Supports PHP 8.0, 8.1, and 8.2. Memory-efficient architecture with no deprecated functions.",
    tags: ["PHP 7.4", "PHP 8.0", "PHP 8.1", "PHP 8.2"],
    icon: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    title: "Theme Compatibility",
    desc: "Works with all major WooCommerce themes. Tested and confirmed with the most popular themes in the ecosystem.",
    tags: ["Flatsome", "Astra", "OceanWP", "Divi", "Avada", "Storefront"],
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
  },
  {
    title: "Plugin Compatibility",
    desc: "Compatible with popular plugins across checkout, subscriptions, multilingual, and funnel builders.",
    tags: ["WC Subscriptions", "WPML", "Polylang", "WooFunnels", "CartFlows"],
    icon: (
      <>
        <polyline points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
  },
  {
    title: "Cloud-Hosted Voice Infrastructure",
    desc: "No server load on your hosting. Voice infrastructure entirely cloud-hosted via Twilio's enterprise-grade global telephony network with 99.95% uptime SLA.",
    tags: ["Twilio", "99.95% Uptime", "Zero server load"],
    icon: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    ),
  },
];

function Icon({ children, hovered }: { children: React.ReactNode; hovered: boolean }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: hovered ? "#2a2b50" : "#1e1f3a",
        border: `1px solid ${hovered ? "#7b6fba88" : "#2e2f52"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 0.25s, background 0.25s",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="none"
        stroke={hovered ? "#a99ef5" : "#7b6fba"}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: "stroke 0.25s" }}
      >
        {children}
      </svg>
    </div>
  );
}

function SpecCard({
  card,
  visible,
  delay,
}: {
  card: (typeof cards)[number];
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#181930" : "#13142a",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s, background 0.25s`,
        borderRight: "1px solid #1e1f35",
        borderBottom: "1px solid #1e1f35",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Icon hovered={hovered}>{card.icon}</Icon>

      <div style={{ fontSize: 16, fontWeight: 600, color: "#ffffff", lineHeight: 1.3 }}>
        {card.title}
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.7, color: "#8a8baa", flex: 1 }}>
        {card.desc}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {card.tags.map((tag, i) => (
          <span
            key={i}
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.04em",
              padding: "3px 9px",
              borderRadius: 5,
              background: hovered ? "#26274a" : "#1e1f3a",
              color: hovered ? "#a99ef5" : "#8a8baa",
              border: `1px solid ${hovered ? "#534ab788" : "#2e2f52"}`,
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechnicalSpecs() {
  const [eyeVisible, setEyeVisible] = useState(false);
  const [headVisible, setHeadVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState<boolean[]>(Array(cards.length).fill(false));
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setEyeVisible(true), 80);
    const t2 = setTimeout(() => setHeadVisible(true), 180);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const els = gridRef.current?.querySelectorAll<HTMLDivElement>("[data-card-idx]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.cardIdx ?? "-1");
            if (idx >= 0) {
              setCardVisible((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#0d0e1a",
        padding: "72px 32px",
        fontFamily: "'Space Grotesk', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#7b6fba",
            fontWeight: 600,
            marginBottom: 20,
            opacity: eyeVisible ? 1 : 0,
            transform: eyeVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          TECHNICAL SPECIFICATIONS
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: 52,
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          Built to run on
          <br />
          your existing stack
        </h2>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 0,
            background: "#1a1b2e",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {cards.map((card, i) => (
            <div key={i} data-card-idx={i} style={{ display: "flex" }}>
              <SpecCard card={card} visible={cardVisible[i]} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}