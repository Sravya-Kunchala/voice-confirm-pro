import { useEffect, useRef, useState } from "react";

const TwilioIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="18" fill="#F22F46" fillOpacity="0.1" />
    <circle cx="18" cy="18" r="11" stroke="#F22F46" strokeWidth="2.5" fill="none" />
    <circle cx="13.5" cy="13.5" r="2.5" fill="#F22F46" />
    <circle cx="22.5" cy="13.5" r="2.5" fill="#F22F46" />
    <circle cx="13.5" cy="22.5" r="2.5" fill="#F22F46" />
    <circle cx="22.5" cy="22.5" r="2.5" fill="#F22F46" />
  </svg>
);

const VonageIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="6" fill="#1A1A2E" fillOpacity="0.06" />
    <path d="M10 10 L18 26 L26 10" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const AWSPollyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="8" fill="#FF9900" fillOpacity="0.1" />
    <ellipse cx="20" cy="20" rx="10" ry="13" stroke="#FF9900" strokeWidth="2" fill="none" />
    <line x1="20" y1="7" x2="20" y2="33" stroke="#FF9900" strokeWidth="2" />
    <path d="M10 20 Q15 17 20 20 Q25 23 30 20" stroke="#FF9900" strokeWidth="1.5" fill="none" />
  </svg>
);

const ElevenLabsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="6" fill="#1A1A2E" fillOpacity="0.06" />
    <rect x="13" y="10" width="5" height="20" rx="2" fill="#1A1A2E" />
    <rect x="22" y="10" width="5" height="20" rx="2" fill="#1A1A2E" />
  </svg>
);

type TagStyle = "outline" | "filled";

type IntegrationItem = {
  icon: React.ReactNode;
  name: string;
  desc: string;
  tags: string[];
  tagStyle?: TagStyle;
  accent: string;
};

const telephonyProviders: IntegrationItem[] = [
  {
    icon: <TwilioIcon />,
    name: "Twilio",
    desc: "The global standard for enterprise telephony. Supports calls to 180+ countries. Indian local numbers available for higher answer rates. Pay-as-you-go — no monthly minimum.",
    tags: [],
    accent: "#F22F46",
  },
  {
    icon: <VonageIcon />,
    name: "Vonage (Nexmo)",
    desc: "Alternative provider for stores wanting redundancy or lower rates in specific regions. Full feature parity with Twilio integration.",
    tags: [],
    accent: "#1A1A2E",
  },
];

const ttsEngines: IntegrationItem[] = [
  {
    icon: <AWSPollyIcon />,
    name: "AWS Polly",
    desc: "Reliable, cost-effective text-to-speech with 60+ voices across all supported languages. Best for high-volume stores focused on cost efficiency.",
    tags: ["60+ VOICES", "COST EFFECTIVE"],
    tagStyle: "outline",
    accent: "#FF9900",
  },
  {
    icon: <ElevenLabsIcon />,
    name: "ElevenLabs",
    desc: "Ultra-realistic AI voices indistinguishable from human callers. Premium option for high-value order stores where voice quality directly impacts confirmation rate.",
    tags: ["PREMIUM AI", "HD AUDIO"],
    tagStyle: "filled",
    accent: "#6C5CE7",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Card({
  icon, name, desc, tags, tagStyle, accent, delay = 0, visible,
}: {
  icon: React.ReactNode;
  name: string;
  desc: string;
  tags: string[];
  tagStyle?: TagStyle;
  accent: string;
  delay?: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "28px 28px 24px",
        border: `1.5px solid ${hovered ? accent + "44" : "#E8E4DC"}`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s, border-color 0.25s ease, box-shadow 0.25s ease`,
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.10), 0 0 0 0px ${accent}22`
          : "0 1px 4px rgba(0,0,0,0.04)",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Icon */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
        transition: `opacity 0.4s ease ${delay + 0.15}s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay + 0.15}s`,
      }}>
        {icon}
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 20,
        fontWeight: 700,
        color: "#0F0F0F",
        letterSpacing: "-0.2px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.4s ease ${delay + 0.2}s, transform 0.4s ease ${delay + 0.2}s`,
      }}>
        {name}
      </div>

      {/* Desc */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 400,
        color: "#666",
        lineHeight: 1.7,
        opacity: visible ? 1 : 0,
        transition: `opacity 0.4s ease ${delay + 0.28}s`,
        flex: 1,
      }}>
        {desc}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 4,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(6px)",
          transition: `opacity 0.4s ease ${delay + 0.35}s, transform 0.4s ease ${delay + 0.35}s`,
        }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 12px",
                borderRadius: 9999,
                ...(tagStyle === "filled"
                  ? { background: "#6C5CE7", color: "#fff", border: "none" }
                  : { background: "transparent", color: "#555", border: "1.5px solid #D0D0D0" }),
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({
  title, subtitle, items, baseDelay = 0,
}: {
  title: string;
  subtitle: string;
  items: IntegrationItem[];
  baseDelay?: number;
}) {
  const { ref, visible } = useInView();

  return (
    <div ref={ref} style={{ marginBottom: 64 }}>
      {/* Section header */}
      <div style={{
        marginBottom: 28,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease 0s, transform 0.5s ease 0s",
      }}>
        <h2 style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "clamp(22px, 4vw, 28px)",
          fontWeight: 700,
          color: "#0F0F0F",
          margin: "0 0 6px",
          letterSpacing: "-0.3px",
        }}>
          {title}
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#888",
          margin: 0,
          fontWeight: 400,
        }}>
          {subtitle}
        </p>
      </div>

      {/* Cards grid */}
      <div className="int-grid">
        {items.map((item, i) => (
          <Card
            key={item.name}
            icon={item.icon}
            name={item.name}
            desc={item.desc}
            tags={item.tags}
            tagStyle={item.tagStyle ?? "outline"}
            accent={item.accent}
            delay={baseDelay + i * 0.12}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}

export default function Integrationsection() {
  return (
    <div style={{ background: "#F0EDE6", minHeight: "100vh", padding: "72px 24px 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .int-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 640px) {
          .int-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Section
          title="Telephony Providers"
          subtitle="Choose your preferred global carrier for voice delivery."
          items={telephonyProviders}
          baseDelay={0.05}
        />
        <Section
          title="Voice / TTS Engines"
          subtitle="The soul of your automated confirmation calls."
          items={ttsEngines}
          baseDelay={0.05}
        />
      </div>
    </div>
  );
}
