import { useState, useCallback, useRef } from 'react';
import BlobBackground from './components/BlobBackground';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HeroInput from './components/HeroInput';
import StatsBanner from './components/StatsBanner';
import ClipGrid from './components/ClipGrid';
import FilterChips from './components/FilterChips';
import ProgressIndicator from './components/ProgressIndicator';
import {
  uploadVideoFile,
  uploadVideoUrl,
  pollJobStatus,
  downloadClip,
} from './lib/api';
import {
  sampleClips,
  defaultStats,
  defaultNavItems,
  defaultBottomNavItems,
  defaultFeatures,
  processingSteps,
  clipFilters,
} from './data/sampleClips';

export default function App() {
  // State
  const [activeNav, setActiveNav] = useState('home');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [progressMessage, setProgressMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [clips, setClips] = useState(sampleClips);

  // Ref for abort & cleanup
  const activeJobRef = useRef(null); // { jobId, abort: () => void }

  // Derived: filtered clips
  const filteredClips = clips.filter((clip) => {
    if (activeFilter === 'viral' && clip.score < 85) return false;
    if (activeFilter === 'processing' && clip.status !== 'processing') return false;
    if (activeFilter === 'draft' && clip.status !== 'draft') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        clip.title.toLowerCase().includes(q) ||
        clip.sourceLabel.toLowerCase().includes(q) ||
        clip.caption.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // ──── Handlers — connected to real backend ────

  /**
   * Unified submit (URL or file) → POST /api/upload → poll /api/status/:jobId
   * Backend response { currentStep, status, progress, clips, error } maps directly:
   *   currentStep → ProgressIndicator (matches processingSteps[0..5])
   *   clips → ClipGrid (matches Clip type exactly, no transform needed)
   */
  const handleSubmit = useCallback(async (payload) => {
    if (!payload) return;

    // Abort any existing job
    if (activeJobRef.current) {
      activeJobRef.current.abort();
      activeJobRef.current = null;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setProgressMessage('Mengupload video...');
    setErrorMessage(null);

    let aborted = false;
    activeJobRef.current = {
      jobId: null,
      abort: () => { aborted = true; },
    };

    try {
      // 1. Submit to backend
      let result;
      if (payload.type === 'url') {
        result = await uploadVideoUrl(payload.url, payload.platform);
      } else {
        result = await uploadVideoFile(payload.files[0]);
      }

      if (aborted) return;
      activeJobRef.current.jobId = result.jobId;

      // 2. Poll status — response shape matches ProgressIndicator + ClipGrid directly
      await pollJobStatus(
        result.jobId,
        (data) => {
          if (aborted) return;
          setUploadProgress(data.currentStep);
          setProgressMessage(data.progress || '');
        },
        2000
      );

      if (aborted) return;

      // 3. Get final clips
      const finalStatus = await (
        await fetch(
          `${import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'}/status/${result.jobId}`
        )
      ).json();

      if (finalStatus.clips && finalStatus.clips.length > 0) {
        setClips((prev) => [...finalStatus.clips, ...prev]);
      }

      setIsUploading(false);
      setUploadProgress(-1);
      setProgressMessage('');
      activeJobRef.current = null;
    } catch (err) {
      if (aborted) return;
      setIsUploading(false);
      setUploadProgress(-1);
      setProgressMessage('');
      setErrorMessage(err.message || 'Gagal memproses video. Coba lagi.');
      activeJobRef.current = null;
    }
  }, []);

  const handleClipClick = useCallback((clip) => {
    console.log('Clip clicked:', clip);
  }, []);

  const handleClipPreview = useCallback((clip) => {
    console.log('Preview clip:', clip);
  }, []);

  /**
   * Download clip — triggers browser download via backend stream
   */
  const handleClipDownload = useCallback(async (clip) => {
    try {
      await downloadClip(clip.id);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal download klip.');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }, []);

  return (
    <div className="h-full">
      <BlobBackground />

      <div className="relative z-[2] grid h-full" style={{ gridTemplateColumns: '72px 1fr' }}>
        <Sidebar
          navItems={defaultNavItems}
          bottomItems={defaultBottomNavItems}
          activeNav={activeNav}
          onNavClick={setActiveNav}
          userInitials="RA"
        />

        <div className="flex flex-col overflow-hidden min-w-0">
          <TopBar
            credits={840}
            notificationCount={3}
            onSearch={setSearchQuery}
            onUpgrade={() => console.log('Upgrade clicked')}
            onNotifications={() => console.log('Notifications clicked')}
          >
            <div className="font-display text-lg font-bold flex items-center gap-2.5">
              Beranda
              <span
                className="
                  text-[11px] px-2 py-0.5 rounded-full
                  bg-accent-gradient-soft border border-clip-accent/20
                  text-clip-accent-2 font-semibold
                "
              >
                Pro
              </span>
            </div>
          </TopBar>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-7 py-8 pb-[60px] scroll-smooth">
            <div className="max-w-[1280px] mx-auto">
              {/* Error banner */}
              {errorMessage && (
                <div className="mb-4 p-4 rounded-xl bg-clip-danger/10 border border-clip-danger/30 animate-scale-in">
                  <div className="flex items-start gap-3">
                    <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-clip-danger">{errorMessage}</p>
                      <button
                        onClick={() => setErrorMessage(null)}
                        className="text-xs text-clip-muted-2 hover:text-clip-fg mt-1 transition-colors"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress indicator (visible during upload) */}
              {(isUploading || uploadProgress >= 0) && (
                <div className="mb-7 p-5 rounded-2xl bg-clip-panel border border-clip-border animate-scale-in">
                  <p className="text-sm font-medium text-clip-muted-2 mb-4">
                    {progressMessage || (uploadProgress < processingSteps.length - 1
                      ? 'Memproses video...'
                      : 'Hampir selesai...')}
                  </p>
                  <ProgressIndicator
                    steps={processingSteps}
                    currentStep={uploadProgress}
                  />
                </div>
              )}

              <HeroInput
                subtitle="Tempel link YouTube, TikTok, Instagram, Vimeo, atau upload file video. AI akan menemukan momen terbaik dan membuat klip siap posting."
                features={defaultFeatures}
                onSubmit={handleSubmit}
                isUploading={isUploading}
              />

              <StatsBanner stats={defaultStats} />

              <div className="flex items-center justify-between mb-5 mt-2">
                <h2 className="font-display text-xl font-bold tracking-[-0.02em] flex items-center gap-2.5">
                  Klip Terbaru
                  <span
                    className="
                      text-xs px-2 py-0.5 rounded-full
                      bg-clip-panel text-clip-muted-2
                      font-mono font-medium
                      border border-clip-border-2
                    "
                  >
                    {filteredClips.length} klip
                  </span>
                </h2>

                <FilterChips
                  filters={clipFilters}
                  activeFilter={activeFilter}
                  onChange={(id) => {
                    if (id !== 'grid') setActiveFilter(id);
                  }}
                />
              </div>

              <ClipGrid
                clips={filteredClips}
                onClipClick={handleClipClick}
                onClipPreview={handleClipPreview}
                onClipDownload={handleClipDownload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
