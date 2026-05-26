export function GolferSwingSVG() {
  return (
    <div className="relative h-[200px] w-[200px]">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Animated golfer swing"
      >
        <defs>
          <radialGradient id="ball-glow" cx="40%" cy="40%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Ground */}
        <line x1="40" y1="172" x2="170" y2="172" stroke="rgba(201,160,84,0.1)" strokeWidth="1" />

        {/* === GOLFER — articulated joints === */}
        {/* Everything pivots from the hips at (105, 100) */}
        <g className="g-torso" opacity="0.8">

          {/* Legs — planted, subtle weight shift */}
          <g className="g-legs">
            {/* Left leg */}
            <path d="M98 100 L92 122 L88 142 L84 160 L80 170" stroke="#c9a054" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M74 170 Q72 174 76 176 L88 176 Q90 174 88 172 L80 170Z" fill="#c9a054" />
            {/* Right leg */}
            <g className="g-right-leg">
              <path d="M112 100 L118 120 L126 140 L132 156" stroke="#c9a054" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M130 156 Q128 160 132 162 L140 158 Q142 156 138 154Z" fill="#c9a054" />
            </g>
          </g>

          {/* Torso + head — rotates during swing */}
          <g className="g-upper">
            {/* Torso */}
            <path d="M96 62 C92 72 90 84 92 98 L98 102 L112 102 L118 98 C120 84 118 72 114 62Z" fill="#c9a054" />
            {/* Neck */}
            <rect x="102" y="54" width="7" height="8" rx="3" fill="#c9a054" />
            {/* Head */}
            <ellipse cx="106" cy="44" rx="11" ry="12" fill="#c9a054" />
            {/* Cap */}
            <path d="M94 41 Q106 33 118 41 L116 43 Q106 37 96 43Z" fill="#b8903e" />

            {/* Right arm — tucks during follow-through */}
            <g className="g-right-arm">
              <path d="M114 66 L118 78 L112 86" stroke="#c9a054" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="110" cy="87" r="3.5" fill="#c9a054" />
            </g>

            {/* Left arm + club — THE SWING */}
            <g className="g-swing-arm">
              {/* Upper arm */}
              <path d="M96 66 L84 62" stroke="#c9a054" strokeWidth="7" strokeLinecap="round" fill="none" />
              {/* Forearm */}
              <path d="M84 62 L72 54" stroke="#c9a054" strokeWidth="6" strokeLinecap="round" fill="none" />
              {/* Hands */}
              <circle cx="72" cy="54" r="4" fill="#c9a054" />
              {/* Club shaft */}
              <line x1="72" y1="54" x2="52" y2="34" stroke="#c9a054" strokeWidth="2.5" strokeLinecap="round" />
              {/* Club head */}
              <rect x="46" y="28" width="10" height="5" rx="2" fill="#c9a054" transform="rotate(-40 51 30)" />
            </g>
          </g>
        </g>

        {/* Ball — sits at address, flies on impact */}
        <circle r="4" fill="url(#ball-glow)" className="g-ball">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M92 170 Q92 170 92 170 Q130 120 170 60"
            keyPoints="0;0;0;0.05;1"
            keyTimes="0;0.42;0.48;0.52;1"
          />
          <animate attributeName="opacity" values="0.6;0.6;0.6;1;1;0" keyTimes="0;0.42;0.48;0.52;0.8;1" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="r" values="4;4;4;4;2" keyTimes="0;0.48;0.52;0.7;1" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      <style>{`
        /* Torso rotation — coil and uncoil */
        .g-upper {
          transform-origin: 105px 100px;
          animation: torso-rotate 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes torso-rotate {
          0%, 10%  { transform: rotate(15deg); }
          35%      { transform: rotate(25deg); }
          50%, 55% { transform: rotate(-8deg); }
          70%      { transform: rotate(-15deg); }
          90%, 100% { transform: rotate(15deg); }
        }

        /* Swing arm — the big motion */
        .g-swing-arm {
          transform-origin: 96px 66px;
          animation: arm-swing 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes arm-swing {
          0%, 10%  { transform: rotate(0deg); }
          30%      { transform: rotate(-70deg); }
          35%      { transform: rotate(-80deg); }
          50%      { transform: rotate(20deg); }
          55%      { transform: rotate(45deg); }
          70%      { transform: rotate(60deg); }
          90%, 100% { transform: rotate(0deg); }
        }

        /* Right arm tucks */
        .g-right-arm {
          transform-origin: 114px 66px;
          animation: right-arm 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes right-arm {
          0%, 10%  { transform: rotate(0deg); }
          35%      { transform: rotate(20deg); }
          55%      { transform: rotate(-15deg); }
          70%      { transform: rotate(-10deg); }
          90%, 100% { transform: rotate(0deg); }
        }

        /* Right leg — heel lift on follow-through */
        .g-right-leg {
          transform-origin: 112px 100px;
          animation: right-leg 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes right-leg {
          0%, 35%  { transform: rotate(0deg); }
          55%      { transform: rotate(-8deg); }
          70%      { transform: rotate(-12deg); }
          90%, 100% { transform: rotate(0deg); }
        }

        /* Head follows the ball */
        .g-upper ellipse:first-of-type {
          transform-origin: 106px 44px;
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
