export function GolferSwingSVG() {
  const fill = "#c9a054";

  const frames = [
    // Frame 1: Address — standing over ball, club down
    "M56 18a7 7 0 1 1 14 0a7 7 0 1 1-14 0 M60 26l-2 22-8 24-4 16 8 2 6-15 6 15 8-2-4-16-8-24z M52 32l-10 8-8 14 3 2 8-12 7-6z M74 32l10 8 8 14-3 2-8-12-7-6z M44 56l-6 18 4 1 5-17z M80 56l6 18-4 1-5-17z",
    // Frame 2: Backswing — club going up behind
    "M58 18a7 7 0 1 1 14 0a7 7 0 1 1-14 0 M62 26l-4 22-6 24-4 16 8 2 4-15 8 14 8-3-6-15-6-24z M54 32l-8 6-2-4 8-8z M72 32l6-2 8-18 10-10 2 3-9 12-8 16z M80 4l4-2 3 3-3 3z",
    // Frame 3: Top of backswing — club behind head
    "M58 18a7 7 0 1 1 14 0a7 7 0 1 1-14 0 M62 26l-4 22-6 24-4 16 8 2 4-15 8 14 8-3-6-15-6-24z M54 34l-6 4 2 6 6-4z M72 30l4-6 2-14-6-10 3-2 7 10 0 16-4 8z M72 0l-8-2 0 4 8 2z",
    // Frame 4: Downswing / Impact — club striking
    "M58 18a7 7 0 1 1 14 0a7 7 0 1 1-14 0 M60 26l-2 22-8 24-4 16 8 2 6-15 6 15 8-2-4-16-8-24z M52 34l-10 6-4 12 3 2 4-10 9-4z M74 34l8 4 4 12 4 18 3-1-3-18-4-12-6-4z M90 68l2 8-3 1-2-8z",
    // Frame 5: Follow-through — classic finish
    "M60 18a7 7 0 1 1 14 0a7 7 0 1 1-14 0 M64 26l-6 22-4 24-6 16 8 2 4-14 10 12 7-4-8-13-3-24z M56 34l-12 2-12-8-6-14 3-2 6 12 10 8 9-2z M76 34l4-2 2-4-2 4z M34 14l-8-6 2-3 8 6z",
  ];

  return (
    <div className="golfer-anim relative h-[140px] w-[140px]">
      {frames.map((d, i) => (
        <svg
          key={i}
          width="140"
          height="140"
          viewBox="-10 -10 120 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          style={{
            animation: `golfer-frame-${i} 2.5s ease-in-out infinite`,
          }}
          aria-hidden={i > 0}
          aria-label={i === 0 ? "Animated golfer swing silhouette" : undefined}
        >
          <path d={d} fill={fill} fillRule="evenodd" />
        </svg>
      ))}
      <style>{`
        @keyframes golfer-frame-0 {
          0%, 5% { opacity: 0.8; } 15%, 100% { opacity: 0; }
        }
        @keyframes golfer-frame-1 {
          0%, 15% { opacity: 0; } 20%, 30% { opacity: 0.8; } 40%, 100% { opacity: 0; }
        }
        @keyframes golfer-frame-2 {
          0%, 35% { opacity: 0; } 40%, 50% { opacity: 0.8; } 55%, 100% { opacity: 0; }
        }
        @keyframes golfer-frame-3 {
          0%, 50% { opacity: 0; } 55%, 65% { opacity: 0.8; } 70%, 100% { opacity: 0; }
        }
        @keyframes golfer-frame-4 {
          0%, 65% { opacity: 0; } 75%, 90% { opacity: 0.8; } 100% { opacity: 0; }
        }
      `}</style>
    </div>
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
