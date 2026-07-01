/**
 * Stats summary banner — 4 columns of key metrics
 *
 * @param {object} props
 * @param {Array<{
 *   id: string,
 *   value: string,
 *   label: string,
 *   trend?: { direction: 'up'|'down', value: string } | null,
 *   icon: 'clips'|'views'|'engagement'|'time'
 * }>} props.stats
 * @param {string} props.className
 */
export default function StatsBanner({ stats = [], className = '' }) {
  // Icon configs
  const iconConfig = {
    clips: {
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m22 8-6 4 6 4V8Z" />
          <rect width="14" height="12" x="2" y="6" rx="2" />
        </svg>
      ),
      className: 'text-clip-accent bg-clip-accent/10',
    },
    views: {
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 20v-6M6 20V10M18 20V4" />
        </svg>
      ),
      className: 'text-clip-accent-3 bg-clip-accent-3/10',
    },
    engagement: {
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      className: 'text-clip-success bg-clip-success/10',
    },
    time: {
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      className: 'text-clip-warning bg-clip-warning/10',
    },
  };

  return (
    <div
      className={`
        grid grid-cols-4 gap-3.5 mb-8
        px-5 py-[18px]
        bg-stats-bg border border-clip-border
        rounded-2xl
        max-sm:grid-cols-2
        ${className}
      `}
    >
      {stats.map((stat) => {
        const icon = iconConfig[stat.icon] || iconConfig.clips;
        return (
          <div key={stat.id} className="flex items-center gap-3">
            {/* Icon */}
            <div
              className={`
                w-10 h-10 rounded-2.5 grid place-items-center
                border border-clip-border-2
                ${icon.className}
              `}
            >
              {icon.svg}
            </div>

            {/* Value + Label */}
            <div>
              <div className="font-display text-xl font-extrabold tracking-[-0.02em] leading-tight">
                {stat.value}
              </div>
              <div className="text-[11.5px] text-clip-muted mt-0.5 flex items-center gap-1">
                {stat.label}
                {stat.trend && (
                  <span className="text-[10.5px] font-semibold text-clip-success flex items-center gap-0.5">
                    ↑ {stat.trend.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
