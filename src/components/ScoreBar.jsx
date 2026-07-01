/**
 * Score breakdown bar showing hook/trend/visual/audio segments
 *
 * @param {object} props
 * @param {number} props.hook
 * @param {number} props.trend
 * @param {number} props.visual
 * @param {number} props.audio
 * @param {boolean} props.showLegend
 * @param {string} props.className
 */
export default function ScoreBar({
  hook = 0,
  trend = 0,
  visual = 0,
  audio = 0,
  showLegend = true,
  className = '',
}) {
  const total = hook + trend + visual + audio || 1;

  const segments = [
    { value: hook, color: 'bg-clip-accent', label: 'Hook' },
    { value: trend, color: 'bg-clip-accent-3', label: 'Tren' },
    { value: visual, color: 'bg-clip-success', label: 'Visual' },
    { value: audio, color: 'bg-clip-warning', label: 'Audio' },
  ];

  return (
    <div className={className}>
      {/* Bar */}
      <div className="flex gap-0.5 h-1 rounded-full overflow-hidden bg-clip-panel-2 mt-2.5">
        {segments.map((seg, i) => (
          seg.value > 0 && (
            <div
              key={i}
              className={`h-full ${seg.color} transition-all duration-300`}
              style={{ width: `${(seg.value / total) * 100}%` }}
            />
          )
        ))}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex gap-2.5 mt-1.5 text-[10px] text-clip-muted">
          {segments.slice(0, 2).map((seg, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className={`w-[7px] h-[7px] rounded-sm ${seg.color}`} />
              {seg.label} {seg.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
