// app/components/Logo.tsx
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg
      className="logo"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* small 3D triangle mark */}
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.92" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* triangle */}
      <path d="M6 40 L24 8 L42 40 Z" fill="url(#g)" opacity="1" />

      {/* thin brand text rendered outside so we can show text in header separately */}
    </svg>
  );
}
