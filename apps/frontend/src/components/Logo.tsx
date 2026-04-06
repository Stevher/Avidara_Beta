interface LogoProps {
  variant?: "icon" | "full";
  height?: number;
}

export default function Logo({ variant = "full", height = 32 }: LogoProps) {
  if (variant === "icon") {
    return (
      <svg
        height={height}
        width={height}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Avidara"
      >
        <rect width="44" height="44" rx="9" fill="#4f46e5" />
        {/* White left arm of V */}
        <polygon points="9,11 17,11 23,31 18,31" fill="white" />
        {/* Emerald right checkmark arm */}
        <polygon points="23,31 28,31 37,11 32,11" fill="#10b981" />
      </svg>
    );
  }

  return (
    <svg
      height={height}
      viewBox="0 0 160 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Avidara"
    >
      {/* Icon */}
      <rect width="36" height="36" rx="7" fill="#4f46e5" />
      <polygon points="7,9 14,9 19,26 15,26" fill="white" />
      <polygon points="19,26 23,26 30,9 26,9" fill="#10b981" />
      {/* Wordmark */}
      <text
        x="44"
        y="26"
        fontFamily="var(--font-jakarta), Plus Jakarta Sans, Arial, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="-0.5"
        fill="white"
      >
        Avidara
      </text>
    </svg>
  );
}
