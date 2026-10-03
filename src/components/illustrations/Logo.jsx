export default function Logo({ size = 42, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m7 13 17-8 17 8-17 8-17-8Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M14 17v8c5.7 4.6 14.3 4.6 20 0v-8M41 13v12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="24" y="42" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800">AS</text>
    </svg>
  );
}