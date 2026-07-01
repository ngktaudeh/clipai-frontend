import ScoreRing from './ScoreRing';
import ScoreBar from './ScoreBar';
import StatusBadge from './StatusBadge';

/**
 * Source icon SVGs
 */
const sourceIcons = {
  youtube: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.5 15.5v-7l6.5 3.5z" />
    </svg>
  ),
  tiktok: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 6.3a4.6 4.6 0 0 1-1.1-.7 4.6 4.6 0 0 1-1.4-2.5h-3.3v13.4a2.7 2.7 0 1 1-2-2.6V10a6 6 0 1 0 5.2 5.9V9.5a7.8 7.8 0 0 0 4.6 1.5V7.7a4.6 4.6 0 0 1-2-1.4z" />
    </svg>
  ),
  instagram: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  ),
  local: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
};

const sourceColorMap = {
  youtube: 'text-[#ff0033]',
  tiktok: 'text-white',
  instagram: 'text-[#e1306c]',
  local: 'text-clip-accent-2',
};

/**
 * Individual clip card with thumbnail, score ring, status, and metadata
 *
 * @param {object} props
 * @param {object} props.clip
 * @param {string} props.clip.title - Clip title
 * @param {string} props.clip.duration - Duration string (e.g. "0:48")
 * @param {number} props.clip.score - AI virality score 0-100
 * @param {'ready'|'processing'|'draft'|'error'} props.clip.status
 * @param {string} props.clip.source - Source platform key
 * @param {string} props.clip.sourceLabel - Source label text
 * @param {string} props.clip.caption - HTML caption string
 * @param {string} props.clip.thumbnail - Thumbnail image URL
 * @param {number} props.clip.hook - Hook score
 * @param {number} props.clip.trend - Trend score
 * @param {number} props.clip.visual - Visual score
 * @param {number} props.clip.audio - Audio score
 * @param {string} [props.clip.aspectRatio='9:16'] - Aspect ratio label
 * @param {() => void} props.onClick - Card click handler
 * @param {() => void} props.onPreview - Preview button handler
 * @param {() => void} props.onDownload - Download button handler
 * @param {number} props.index - Animation stagger index
 * @param {string} props.className
 */
export default function ClipCard({
  clip,
  onClick,
  onPreview,
  onDownload,
  index = 0,
  className = '',
}) {
  const {
    title = '',
    duration = '',
    score = 0,
    status = 'draft',
    source = 'local',
    sourceLabel = '',
    caption = '',
    thumbnail = '',
    hook = 0,
    trend = 0,
    visual = 0,
    audio = 0,
    aspectRatio = '9:16',
  } = clip;

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl overflow-hidden
        bg-clip-panel border border-clip-border
        cursor-pointer
        transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1 hover:border-clip-border-3 hover:shadow-card-hover
        group animate-fade-in
        ${className}
      `}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] overflow-hidden bg-clip-panel-2">
        {/* Image */}
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-card-overlay pointer-events-none" />

        {/* Top row: score + status */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-[2]">
          {/* Score badge with ring */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-[8px] text-[11px] font-bold border border-white/10">
            <ScoreRing score={score} size={14} strokeWidth={2} showLabel={false} />
            {score}
          </div>

          <StatusBadge status={status} />
        </div>

        {/* Caption preview */}
        {caption && (
          <div className="absolute bottom-9 left-2.5 right-2.5 z-[2] text-center">
            <span
              className="
                inline-block font-display text-sm font-extrabold text-white
                [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_2px_rgba(0,0,0,1)]
                tracking-[0.01em] bg-black/40 px-1.5 py-0.5 rounded leading-tight
              "
              dangerouslySetInnerHTML={{ __html: caption }}
            />
          </div>
        )}

        {/* Duration */}
        <span className="absolute bottom-2.5 right-2.5 z-[2] px-1.5 py-0.5 rounded-[5px] bg-black/70 backdrop-blur font-mono text-[11px] font-semibold">
          {duration}
        </span>

        {/* Play overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-[52px] h-[52px] rounded-full bg-white/95 grid place-items-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-black ml-0.5">
              <polygon points="5 3 19 12 5 21" />
            </svg>
          </div>
        </div>

        {/* Hover action buttons */}
        <div className="absolute top-2.5 right-2.5 z-[4] flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-[30px] group-hover:translate-y-0">
          {onPreview && (
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(); }}
              className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur grid place-items-center text-white hover:bg-black/80 transition-colors"
              title="Preview"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="5 3 19 12 5 21" />
              </svg>
            </button>
          )}
          {onDownload && (
            <button
              onClick={(e) => { e.stopPropagation(); onDownload(); }}
              className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur grid place-items-center text-white hover:bg-black/80 transition-colors"
              title="Download"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="p-3 pb-3.5">
        {/* Title */}
        <h3 className="text-[13.5px] font-semibold leading-[1.35] line-clamp-2 mb-1.5">
          {title}
        </h3>

        {/* Info row */}
        <div className="flex items-center gap-2 text-[11.5px] text-clip-muted">
          <span className={`flex items-center gap-1 ${sourceColorMap[source] || 'text-clip-muted-2'}`}>
            {sourceIcons[source] || sourceIcons.local}
          </span>
          <span>{sourceLabel}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-clip-muted" />
          <span>{duration}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-clip-muted" />
          <span>{aspectRatio}</span>
        </div>

        {/* Score breakdown */}
        <ScoreBar hook={hook} trend={trend} visual={visual} audio={audio} />
      </div>
    </div>
  );
}
