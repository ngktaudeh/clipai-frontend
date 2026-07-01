import ClipCard from './ClipCard';

/**
 * Responsive grid of clip cards
 *
 * @param {object} props
 * @param {Array<object>} props.clips - Array of clip data objects
 * @param {(clip: object) => void} props.onClipClick - Clip click handler
 * @param {(clip: object) => void} props.onClipPreview - Preview handler
 * @param {(clip: object) => void} props.onClipDownload - Download handler
 * @param {string} props.emptyMessage - Message when no clips
 * @param {string} props.className
 */
export default function ClipGrid({
  clips = [],
  onClipClick,
  onClipPreview,
  onClipDownload,
  emptyMessage = 'Belum ada klip. Upload video untuk memulai.',
  className = '',
}) {
  if (clips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-clip-panel border border-clip-border-2 grid place-items-center mb-4 text-clip-muted">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <path d="m22 8-6 4 6 4V8Z" />
          </svg>
        </div>
        <p className="text-clip-muted-2 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`
        grid gap-[18px]
        grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
        ${className}
      `}
    >
      {clips.map((clip, i) => (
        <ClipCard
          key={clip.id || i}
          clip={clip}
          index={i}
          onClick={() => onClipClick?.(clip)}
          onPreview={() => onClipPreview?.(clip)}
          onDownload={() => onClipDownload?.(clip)}
        />
      ))}
    </div>
  );
}
