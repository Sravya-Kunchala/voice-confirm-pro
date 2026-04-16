import type { ReactNode } from "react";

export function WooIcon() {
  return (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-hidden="true">
      <rect width="32" height="20" rx="4" fill="#96588A" />
      <text x="4" y="14" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="white">
        WOO
      </text>
    </svg>
  );
}

export function FunnelsIcon() {
  return (
    <img
      src="/image%208.svg"
      alt=""
      aria-hidden="true"
      width={36}
      height={36}
      style={{ display: "block" }}
    />
  );
}

export function ACFIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect width="20" height="20" rx="4" fill="#0073AA" />
      <text x="2" y="14" fontFamily="sans-serif" fontSize="8" fontWeight="700" fill="white">
        ACF
      </text>
    </svg>
  );
}

export function MultilingualBadge() {
  return (
    <div style={{ display: "flex", gap: 5 }} aria-hidden="true">
      <span
        style={{
          background: "#0073AA",
          color: "#fff",
          fontSize: 10,
          fontWeight: 700,
          borderRadius: 4,
          padding: "2px 7px",
        }}
      >
        WPML
      </span>
      <span
        style={{
          background: "#7C3AED",
          color: "#fff",
          fontSize: 10,
          fontWeight: 700,
          borderRadius: 4,
          padding: "2px 7px",
        }}
      >
        POLYLANG
      </span>
    </div>
  );
}

export type { ReactNode };
