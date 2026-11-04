
export default function Logo({
  size = 48,
  className = "",
  variant = "default",
}) {
  const navy = variant === "light" ? "#FFFFFF" : "#172B4D";
  const green = "#16A34A";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Admission Saathi logo"
    >
      {/* Graduation cap */}
      <path
        d="M10 27L60 7L110 27L60 48L10 27Z"
        fill={navy}
      />
      <path
        d="M27 35V52C45 65 75 65 93 52V35"
        stroke={navy}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M110 27V49"
        stroke={navy}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="110" cy="53" r="4" fill={green} />

      {/* A + S monogram */}
      <text
        x="7"
        y="105"
        fontFamily="Arial, sans-serif"
        fontSize="72"
        fontWeight="900"
        letterSpacing="-7"
        fill={navy}
      >
        A
      </text>
      <text
        x="56"
        y="105"
        fontFamily="Arial, sans-serif"
        fontSize="72"
        fontWeight="900"
        letterSpacing="-7"
        fill={green}
      >
        S
      </text>

      {/* Green growth swoosh */}
      <path
        d="M5 108C35 72 70 72 111 87C82 80 53 89 25 119L5 108Z"
        fill={green}
      />
    </svg>
  );
}
