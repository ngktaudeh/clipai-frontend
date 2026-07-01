/**
 * Sidebar navigation with icon-only items and tooltips
 *
 * @param {object} props
 * @param {React.ReactNode} props.logo - Logo element (defaults to ClipAI logo)
 * @param {Array<{id: string, label: string, icon: string, active?: boolean, badge?: boolean}>} props.navItems
 * @param {Array<{id: string, label: string, icon: string}>} props.bottomItems
 * @param {string} props.userInitials - User avatar initials
 * @param {(id: string) => void} props.onNavClick
 * @param {string} props.activeNav - Currently active nav item id
 * @param {string} props.className
 */
export default function Sidebar({
  logo,
  navItems = [],
  bottomItems = [],
  userInitials = 'CA',
  onNavClick,
  activeNav = 'home',
  className = '',
}) {
  // SVG icons mapped by icon id
  const iconSvgs = {
    home: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    clips: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="m22 8-6 4 6 4V8Z" />
      </svg>
    ),
    comments: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    templates: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    analytics: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 20v-6M6 20V10M18 20V4" />
      </svg>
    ),
    help: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
    settings: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  };

  return (
    <aside
      className={`
        flex flex-col items-center gap-1.5 py-4
        bg-clip-bg border-r border-clip-border
        ${className}
      `}
      style={{ width: 72 }}
    >
      {/* Logo */}
      {logo || (
        <div
          className="
            w-10 h-10 rounded-xl mb-5
            bg-accent-gradient grid place-items-center
            shadow-logo relative overflow-hidden logo-shimmer
          "
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l4-4 4 4 4-8 4 8" />
            <circle cx="7" cy="13" r="1.5" fill="#fff" />
          </svg>
        </div>
      )}

      {/* Nav items */}
      {navItems.map((item) => {
        const isActive = item.id === activeNav;
        return (
          <button
            key={item.id}
            onClick={() => onNavClick?.(item.id)}
            className={`
              relative w-11 h-11 rounded-xl grid place-items-center
              transition-all duration-200 border border-transparent
              group
              ${
                isActive
                  ? 'bg-accent-gradient-soft text-clip-accent border-clip-accent/20 sidebar-active-indicator'
                  : 'text-clip-muted-2 hover:bg-clip-panel hover:text-clip-fg'
              }
            `}
          >
            {iconSvgs[item.icon]}
            {item.badge && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-clip-accent shadow-[0_0_0_2px_var(--bg-2)]" />
            )}
            {/* Tooltip */}
            <span
              className="
                absolute left-14 top-1/2 -translate-y-1/2
                bg-clip-panel-3 text-clip-fg
                px-2.5 py-1.5 rounded-md
                text-xs font-medium whitespace-nowrap
                opacity-0 pointer-events-none
                transition-opacity duration-150
                border border-clip-border-2
                group-hover:opacity-100
                z-[100]
              "
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom items */}
      {bottomItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavClick?.(item.id)}
          className="
            relative w-11 h-11 rounded-xl grid place-items-center
            transition-all duration-200 border border-transparent
            text-clip-muted-2 hover:bg-clip-panel hover:text-clip-fg
            group
          "
        >
          {iconSvgs[item.icon]}
          <span
            className="
              absolute left-14 top-1/2 -translate-y-1/2
              bg-clip-panel-3 text-clip-fg
              px-2.5 py-1.5 rounded-md
              text-xs font-medium whitespace-nowrap
              opacity-0 pointer-events-none
              transition-opacity duration-150
              border border-clip-border-2
              group-hover:opacity-100
              z-[100]
            "
          >
            {item.label}
          </span>
        </button>
      ))}

      {/* User avatar */}
      <button
        className="
          w-9 h-9 rounded-2.5 mt-1.5
          bg-accent-gradient grid place-items-center
          font-bold text-[13px] text-white
          border-2 border-clip-bg
          shadow-[0_0_0_1px_var(--border-3)]
          cursor-pointer
        "
      >
        {userInitials}
      </button>
    </aside>
  );
}
