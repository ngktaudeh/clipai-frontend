/**
 * Credits/usage indicator pill in top bar
 *
 * @param {object} props
 * @param {number} props.credits - Available credits
 * @param {string} props.label - Credit label text
 * @param {() => void} props.onUpgrade - Upgrade click handler
 * @param {string} props.className
 */
export default function CreditsPill({
  credits = 0,
  label = 'credits',
  onUpgrade,
  className = '',
}) {
  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full
        bg-clip-panel border border-clip-border-2
        text-[12.5px] font-medium
        ${className}
      `}
    >
      {/* Star icon */}
      <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-clip-warning to-clip-accent grid place-items-center text-black">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.6-6.2 4.6 2.4-7.4L2 9.4h7.6z" />
        </svg>
      </div>

      <span className="font-mono font-semibold">{credits.toLocaleString()}</span>
      <span className="text-clip-muted">{label}</span>

      {onUpgrade && (
        <button
          onClick={onUpgrade}
          className="
            ml-1 px-2 py-0.5 rounded-full
            bg-clip-fg text-black
            text-[11px] font-bold
            hover:scale-105 transition-transform
          "
        >
          Upgrade
        </button>
      )}
    </div>
  );
}
