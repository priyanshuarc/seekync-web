// app/components/Logo.tsx
// Inline SVG logo: 3D-like black triangle + thin uppercase SEEKYNC text.
// Uses currentColor so CSS controls color (easy dark/light switching).

import React from "react";

type Props = {
  className?: string;
  width?: number; // px
};

export default function Logo({ className = "", width = 200 }: Props) {
  return (
    <svg
      className={className + " seekync-logo"}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 460 120"
      width={width}
      height="auto"
      role="img"
      aria-label="Seekync"
      preserveAspectRatio="xMinYMid meet"
    >
      <title>Seekync</title>

      {/* Define a subtle gradient for the triangle to give a 3D feel.
          Colors are currently black variants but use currentColor for stroke/fill control */}
      <defs>
        <linearGradient id="triGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#111" />
          <stop offset="50%" stopColor="#000" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>

        {/* Make the text use a light weight — but SVG fonts fallback to system. */}
        <style>{`
          .seekync-word { font-family: "Inter", "Segoe UI", Roboto, Arial, Helvetica, sans-serif; font-weight: 300; letter-spacing: 6px; }
        `}</style>
      </defs>

      {/* Triangle mark on the left: small, slightly rotated */}
      <g transform="translate(18,18)">
        <path
          d="M0 80 L38 6 L76 80 Z"
          fill="url(#triGrad)"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1"
        />
        {/* Thin highlight edge */}
        <path
          d="M6 72 L38 12 L70 72"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Wordmark — to the right of the triangle */}
      <text
        x="120"
        y="78"
        className="seekync-word"
        fontSize="44"
        fill="currentColor"
        style={{ textTransform: "uppercase" }}
      >
        SEEKYNC
      </text>
    </svg>
  );
}
