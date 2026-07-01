/**
 * Filter chip row for clip filtering
 *
 * @param {object} props
 * @param {Array<{id: string, label: string}>} props.filters - Filter options
 * @param {string} props.activeFilter - Currently active filter id
 * @param {(id: string) => void} props.onChange - Filter change handler
 * @param {boolean} props.showGridToggle - Show grid/list toggle
 * @param {string} props.className
 */
export default function FilterChips({
  filters = [],
  activeFilter = 'all',
  onChange,
  showGridToggle = true,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {showGridToggle && (
        <button
          className="
            flex items-center gap-1.5 px-3 py-1.5 rounded-full
            bg-transparent border border-clip-border-2
            text-clip-muted-2 text-[12.5px] font-medium
            hover:text-clip-fg hover:border-clip-border-3
            transition-all duration-150
          "
          onClick={() => onChange?.('grid')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          Grid
        </button>
      )}

      {filters.map((f) => {
        const isActive = f.id === activeFilter;
        return (
          <button
            key={f.id}
            onClick={() => onChange?.(f.id)}
            className={`
              px-3 py-1.5 rounded-full text-[12.5px] font-medium
              transition-all duration-150
              ${
                isActive
                  ? 'bg-clip-fg text-black border border-clip-fg'
                  : 'bg-transparent border border-clip-border-2 text-clip-muted-2 hover:text-clip-fg hover:border-clip-border-3'
              }
            `}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
