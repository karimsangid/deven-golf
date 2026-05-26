export function GolferSwingSVG() {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Golfer swing silhouette"
    >
      {/* Solid filled golfer silhouette — follow-through pose */}
      <g opacity="0.7">
        {/* Head + cap */}
        <ellipse cx="100" cy="32" rx="10" ry="11" fill="#c9a054" />
        <path d="M90 28 Q100 22 112 28 L110 30 Q100 26 92 30Z" fill="#c9a054" />

        {/* Neck */}
        <path d="M96 42 L104 42 L103 46 L97 46Z" fill="#c9a054" />

        {/* Torso — slightly rotated for follow-through */}
        <path
          d="M88 46 Q84 60 82 78 Q81 85 86 90 L114 88 Q118 82 116 72 Q114 58 110 46Z"
          fill="#c9a054"
        />

        {/* Left arm (extended forward in follow-through) + club */}
        <path
          d="M88 52 Q78 56 68 50 Q60 46 54 38 L56 36 Q62 44 70 48 Q78 52 86 50Z"
          fill="#c9a054"
        />
        {/* Club shaft */}
        <line x1="54" y1="38" x2="32" y2="12" stroke="#c9a054" strokeWidth="2.5" strokeLinecap="round" />
        {/* Club head */}
        <path d="M28 10 Q30 6 36 8 L34 14 Q30 14 28 10Z" fill="#c9a054" />

        {/* Right arm (tucked in follow-through) */}
        <path
          d="M110 52 Q114 58 112 66 Q110 70 106 68 Q108 60 108 54Z"
          fill="#c9a054"
        />

        {/* Left leg (front, weight-bearing) */}
        <path
          d="M90 88 Q86 108 84 128 Q83 136 80 142 L76 156 Q74 162 78 164 L86 164 Q88 162 86 158 L86 144 Q88 136 90 128 Q92 112 96 90Z"
          fill="#c9a054"
        />

        {/* Right leg (back, toe pivoted) */}
        <path
          d="M106 88 Q112 108 118 124 Q122 132 126 138 L130 148 Q132 152 130 154 L124 156 Q122 154 124 150 L120 138 Q116 128 112 118 Q108 106 104 90Z"
          fill="#c9a054"
        />

        {/* Left shoe */}
        <path d="M74 162 Q72 166 76 168 L88 168 Q90 166 88 164 L78 164Z" fill="#c9a054" />
        {/* Right shoe (toe tip) */}
        <path d="M122 154 Q120 158 124 158 L132 156 Q134 154 132 154Z" fill="#c9a054" />
      </g>

      {/* Golf ball on tee */}
      <circle cx="82" cy="172" r="4" fill="rgba(255,255,255,0.5)" />
      <line x1="82" y1="176" x2="82" y2="184" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Swing arc trail */}
      <path
        d="M54 38 Q40 20 50 8"
        stroke="rgba(201,160,84,0.2)"
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
      />
    </svg>
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
