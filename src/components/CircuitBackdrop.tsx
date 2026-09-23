/** Subtle PCB-trace backdrop for the hero. Decorative only, CSS/SVG, no libraries. */
export function CircuitBackdrop(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.07] dark:opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 600"
    >
      <g stroke="currentColor" className="text-accent" strokeWidth="1.5" fill="none">
        <path d="M0 80 H220 L260 120 H420" />
        <path d="M0 200 H140 L180 240 H360 L400 200 H560" />
        <path d="M800 120 H600 L560 160 H380" />
        <path d="M800 300 H640 L600 340 H480" />
        <path d="M120 600 V440 L160 400 V280" />
        <path d="M680 600 V460 L640 420 V340" />
        <path d="M300 0 V100 L340 140 V220" />
        <path d="M520 0 V80 L480 120" />
      </g>
      <g fill="currentColor" className="text-accent">
        <circle cx="420" cy="120" r="5" />
        <circle cx="560" cy="200" r="5" />
        <circle cx="380" cy="160" r="5" />
        <circle cx="480" cy="340" r="5" />
        <circle cx="160" cy="400" r="5" />
        <circle cx="640" cy="420" r="5" />
        <circle cx="340" cy="220" r="5" />
        <circle cx="480" cy="120" r="5" />
      </g>
    </svg>
  );
}
