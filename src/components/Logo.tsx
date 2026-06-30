interface Props {
  size?: number
  className?: string
}

// Geometric "B" mark — spine + two rectangular bumps, all right angles
export default function Logo({ size = 20, className = 'text-foreground' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Vertical spine */}
      <rect x="0" y="0" width="3" height="24" />
      {/* Top bar */}
      <rect x="3" y="0" width="9.5" height="2.5" />
      {/* Middle bar */}
      <rect x="3" y="10.75" width="8.5" height="2.5" />
      {/* Bottom bar */}
      <rect x="3" y="21.5" width="9.5" height="2.5" />
      {/* Top right vertical */}
      <rect x="12.5" y="2.5" width="2.5" height="8.25" />
      {/* Bottom right vertical — slightly wider bump */}
      <rect x="11.5" y="13.25" width="2.5" height="8.25" />
    </svg>
  )
}
