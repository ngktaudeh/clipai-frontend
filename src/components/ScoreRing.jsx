/**
 * Circular progress ring showing AI virality score
 * Uses SVG for flexible, dynamic scoring
 *
 * @param {object} props
 * @param {number} props.score - Score 0-100
 * @param {number} props.size - SVG size in pixels
 * @param {number} props.strokeWidth - Ring stroke width
 * @param {boolean} props.showLabel - Show score number
 * @param {string} props.className
 */
export default function ScoreRing({
  score,
  size = 40,
  strokeWidth = 3,
  showLabel = true,
  className = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  // Color based on score thresholds
  const getColor = () => {
    if (progress >= 85) return 'var(--success)';
    if (progress >= 70) return 'var(--warning)';
    return 'var(--danger)';
  };

  const color = getColor();
  const center = size / 2;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg width={size} height={size} className="flex-shrink-0">
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      {showLabel && (
        <span className="font-mono text-[11px] font-bold text-clip-fg leading-none">
          {score}
        </span>
      )}
    </div>
  );
}
