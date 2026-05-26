export function GolferSwingSVG() {
  return (
    <div className="relative h-[180px] w-[180px]">
      <svg
        width="180"
        height="180"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Animated golfer swing"
      >
        {/* Swing arc — draws itself in */}
        <path
          d="M60 30 Q20 60 30 110 Q40 140 80 160"
          stroke="rgba(201,160,84,0.15)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="220"
          className="swing-arc"
        />

        {/* Golfer body — proper proportions, follow-through pose */}
        <g className="golfer-body" opacity="0.75">
          {/* Head */}
          <circle cx="108" cy="42" r="12" fill="#c9a054" />
          {/* Cap brim */}
          <path d="M96 39 Q108 33 120 39 L118 41 Q108 36 98 41Z" fill="#b8903e" />

          {/* Neck */}
          <rect x="104" y="53" width="8" height="6" rx="2" fill="#c9a054" />

          {/* Torso — rotated for follow-through */}
          <path d="M94 59 C90 70 88 82 90 94 L92 98 L120 96 C122 84 122 72 118 59Z" fill="#c9a054" />

          {/* Left arm — extended high (follow-through, club behind) */}
          <path d="M96 64 L86 60 L74 50 L64 36 L60 28" stroke="#c9a054" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Club from left hand going behind */}
          <line x1="60" y1="28" x2="42" y2="16" stroke="#c9a054" strokeWidth="3" strokeLinecap="round" className="club-shaft" />
          {/* Club head */}
          <rect x="36" y="10" width="10" height="5" rx="2" fill="#c9a054" transform="rotate(-30 41 12)" />

          {/* Right arm — tucked across chest */}
          <path d="M118 64 L114 72 L108 76" stroke="#c9a054" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Right hand/glove */}
          <circle cx="106" cy="77" r="4" fill="#c9a054" />

          {/* Left leg — weight forward, bent knee */}
          <path d="M96 96 L90 118 L86 132 L82 148 L78 160" stroke="#c9a054" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Left shoe */}
          <path d="M72 160 Q70 164 74 166 L86 166 Q88 164 86 162 L78 160Z" fill="#c9a054" />

          {/* Right leg — back, toe pivoted */}
          <path d="M114 96 L120 116 L128 134 L134 148" stroke="#c9a054" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Right shoe — toe down */}
          <path d="M132 148 Q130 154 134 156 L142 152 Q144 150 140 148Z" fill="#c9a054" />
        </g>

        {/* Ball flying away — animated */}
        <circle r="4" fill="rgba(255,255,255,0.7)" className="golf-ball-fly">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M90 158 Q120 120 160 80 Q180 60 190 40"
            begin="0s"
            keyPoints="0;0;0.1;1"
            keyTimes="0;0.4;0.5;1"
          />
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.45;0.7;1" dur="3s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;4;4;2" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Ground line */}
        <line x1="50" y1="168" x2="160" y2="168" stroke="rgba(201,160,84,0.12)" strokeWidth="1" />
      </svg>

      <style>{`
        .swing-arc {
          animation: draw-arc 3s ease-in-out infinite;
        }
        @keyframes draw-arc {
          0% { stroke-dashoffset: 220; opacity: 0; }
          20% { opacity: 0.5; }
          50% { stroke-dashoffset: 0; opacity: 0.3; }
          80% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 220; opacity: 0; }
        }
        .golfer-body {
          animation: golfer-breathe 4s ease-in-out infinite;
        }
        @keyframes golfer-breathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
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
