import SearchBox from './SearchBox';
import CreditsPill from './CreditsPill';

/**
 * Top bar with glassmorphism, search, credits, and notification bell
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Slot for left-side content (title etc)
 * @param {number} props.credits - Credit balance
 * @param {number} props.notificationCount - Unread notification count
 * @param {(query: string) => void} props.onSearch
 * @param {() => void} props.onUpgrade
 * @param {() => void} props.onNotifications
 * @param {string} props.className
 */
export default function TopBar({
  children,
  credits = 0,
  notificationCount = 0,
  onSearch,
  onUpgrade,
  onNotifications,
  className = '',
}) {
  return (
    <header
      className={`
        h-16 px-7 flex items-center gap-4 flex-shrink-0
        border-b border-clip-border
        bg-clip-base/70 backdrop-blur-[20px]
        ${className}
      `}
    >
      {/* Left slot — page title, badge, etc */}
      {children}

      {/* Search */}
      <SearchBox onSearch={onSearch} className="ml-5" />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Credits */}
      <CreditsPill credits={credits} onUpgrade={onUpgrade} />

      {/* Notification bell */}
      <button
        onClick={onNotifications}
        className="
          relative w-[38px] h-[38px] rounded-2.5 grid place-items-center
          bg-clip-panel border border-clip-border-2
          text-clip-muted-2 hover:text-clip-fg hover:border-clip-border-3
          transition-all duration-150
        "
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {notificationCount > 0 && (
          <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full bg-clip-accent shadow-[0_0_0_2px_var(--bg-2)]" />
        )}
      </button>
    </header>
  );
}
