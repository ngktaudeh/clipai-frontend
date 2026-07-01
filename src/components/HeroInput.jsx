import { useState, useCallback } from 'react';

/**
 * Hero section with file upload drop zone and feature chips
 * Designed for local file upload (video), not YouTube URL paste
 *
 * @param {object} props
 * @param {React.ReactNode} props.headline - Hero headline with gradient
 * @param {string} props.subtitle - Hero subtitle text
 * @param {Array<string>} props.features - Feature chip labels
 * @param {(files: File[]) => void} props.onUpload - Upload handler
 * @param {boolean} props.isUploading - Upload in progress state
 * @param {string} props.className
 */
export default function HeroInput({
  headline,
  subtitle = '',
  features = [],
  onUpload,
  isUploading = false,
  className = '',
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputId = 'clipai-file-upload';

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('video/')
      );

      if (files.length > 0) {
        setSelectedFile(files[0]);
        onUpload?.(files);
      }
    },
    [onUpload]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const files = Array.from(e.target.files).filter((f) =>
        f.type.startsWith('video/')
      );
      if (files.length > 0) {
        setSelectedFile(files[0]);
        onUpload?.(files);
      }
    },
    [onUpload]
  );

  const handleProcess = useCallback(() => {
    if (selectedFile) {
      onUpload?.([selectedFile]);
    }
  }, [selectedFile, onUpload]);

  return (
    <section className={`text-center py-6 pb-9 ${className}`}>
      {/* Headline */}
      {headline || (
        <h1 className="font-display text-[38px] font-extrabold tracking-[-0.03em] leading-tight mb-3">
          Ubah video panjang jadi{' '}
          <span className="text-gradient">klip viral</span>{' '}
          dengan AI
        </h1>
      )}

      {subtitle && (
        <p className="text-clip-muted-2 text-[15px] mb-7 leading-relaxed max-w-[560px] mx-auto">
          {subtitle}
        </p>
      )}

      {/* Upload drop zone */}
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative max-w-[720px] mx-auto
          bg-clip-panel border rounded-2xl p-2
          flex items-center gap-1.5
          transition-all duration-200
          shadow-card
          ${
            isDragOver
              ? 'border-clip-accent/50 shadow-accent-glow dropzone-active'
              : 'border-clip-border-2 focus-within:border-clip-accent/40 focus-within:shadow-accent-glow'
          }
        `}
      >
        {/* Upload icon */}
        <div className="pl-3 text-clip-muted flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        {/* Selected file name or placeholder */}
        <div className="flex-1 min-w-0 py-2.5 px-1">
          {selectedFile ? (
            <span className="text-clip-fg text-[14.5px] truncate block">
              {selectedFile.name}
            </span>
          ) : (
            <span className="text-clip-muted text-[14.5px] block">
              Drag & drop file video di sini, atau klik Browse...
            </span>
          )}
        </div>

        {/* Browse button */}
        <label
          htmlFor={fileInputId}
          className="
            flex items-center gap-1.5 px-3.5 py-2.5 rounded-2.5
            border border-dashed border-clip-border-3
            text-clip-muted-2 text-[13px] font-medium
            hover:text-clip-fg hover:border-clip-muted
            transition-all duration-150 cursor-pointer
            flex-shrink-0
          "
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Browse
        </label>
        <input
          id={fileInputId}
          type="file"
          accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Process button */}
        <button
          onClick={handleProcess}
          disabled={!selectedFile || isUploading}
          className="
            flex items-center gap-2 px-[18px] py-2.5 rounded-2.5
            bg-accent-gradient text-white
            text-[13.5px] font-bold
            shadow-accent-sm hover:-translate-y-px hover:shadow-accent-md
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
            flex-shrink-0
          "
        >
          {isUploading ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Memproses...
            </>
          ) : (
            <>
              Proses Video
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* Supported formats hint */}
      {isDragOver && (
        <p className="mt-4 text-clip-accent-2 text-sm font-medium animate-fade-in">
          Lepaskan file untuk mulai upload
        </p>
      )}

      {/* Feature chips */}
      {features.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-[18px] flex-wrap">
          {features.map((feature, i) => (
            <div
              key={i}
              className="
                flex items-center gap-1.5 px-3 py-1.5 rounded-full
                bg-clip-panel border border-clip-border
                text-xs text-clip-muted-2
              "
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {feature}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
