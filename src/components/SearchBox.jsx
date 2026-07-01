import { useState } from 'react';

/**
 * Search input with icon and keyboard shortcut hint
 *
 * @param {object} props
 * @param {string} props.placeholder
 * @param {(query: string) => void} props.onSearch
 * @param {string} props.className
 */
export default function SearchBox({ placeholder = 'Cari klip, projek, atau video...', onSearch, className = '' }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className={`relative ${className}`} style={{ width: 320 }}>
      {/* Search icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-clip-muted pointer-events-none"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full py-2 pl-9 pr-14
          bg-clip-panel border border-clip-border-2
          rounded-2.5 text-clip-fg text-[13px]
          font-sans outline-none
          transition-all duration-200
          placeholder:text-clip-muted
          focus:border-clip-border-3 focus:bg-clip-panel-2
        "
      />

      {/* Keyboard shortcut badge */}
      <span
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          font-mono text-[10px] px-1.5 py-0.5 rounded
          bg-clip-panel-3 text-clip-muted-2
          border border-clip-border-2
          pointer-events-none select-none
        "
      >
        ⌘K
      </span>
    </div>
  );
}
