export function GolferSwingSVG() {
  return (
    <img
      src="/images/golf-swing.png"
      alt="Golfer swing animation"
      width={180}
      height={171}
      className="opacity-60"
    />
  );
}

export function FairwayDivider({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  return (
    <div className="relative h-16 w-full overflow-hidden" style={{ marginTop: -1 }}>
      <svg
        viewBox="0 0 1440 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {/* Rolling hills */}
        <path
          d="M0 32C180 48 280 16 480 24C680 32 780 48 960 40C1140 32 1260 16 1440 28V64H0V32Z"
          className={`fill-${to}`}
          fill="#faf8f4"
        />
        {/* Grass blade hints */}
        {[120, 300, 520, 700, 900, 1100, 1300].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1={32 + Math.sin(x / 100) * 8}
            x2={x + 2}
            y2={26 + Math.sin(x / 100) * 8}
            stroke="rgba(26,60,42,0.15)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

export function FlagPinSVG() {
  return (
    <svg
      width="24"
      height="32"
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pole */}
      <line x1="4" y1="2" x2="4" y2="30" stroke="rgba(201,160,84,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Flag cloth */}
      <path
        d="M4 2C4 2 10 4 16 3C16 3 16 10 16 12C10 13 4 11 4 11"
        fill="rgba(201,160,84,0.3)"
        stroke="rgba(201,160,84,0.5)"
        strokeWidth="0.8"
        className="flag-cloth"
      />
      {/* Hole */}
      <ellipse cx="4" cy="30" rx="4" ry="1.5" fill="rgba(201,160,84,0.3)" />
    </svg>
  );
}

export function GolfBallSVG({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Dimples */}
      <circle cx="8" cy="7" r="1" fill="currentColor" opacity="0.15" />
      <circle cx="12" cy="7" r="1" fill="currentColor" opacity="0.15" />
      <circle cx="10" cy="11" r="1" fill="currentColor" opacity="0.15" />
      <circle cx="7" cy="12" r="0.8" fill="currentColor" opacity="0.1" />
      <circle cx="13" cy="12" r="0.8" fill="currentColor" opacity="0.1" />
    </svg>
  );
}
