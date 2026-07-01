import { useState, useCallback } from 'react';
import BlobBackground from './components/BlobBackground';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HeroInput from './components/HeroInput';
import StatsBanner from './components/StatsBanner';
import ClipGrid from './components/ClipGrid';
import FilterChips from './components/FilterChips';
import ProgressIndicator from './components/ProgressIndicator';
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
  const [clips, setClips] = useState(sampleClips);

  // Derived: filtered clips
  const filteredClips = clips.filter((clip) => {
    // Filter by status
    if (activeFilter === 'viral' && clip.score < 85) return false;
    if (activeFilter === 'processing' && clip.status !== 'processing') return false;
    if (activeFilter === 'draft' && clip.status !== 'draft') return false;

    // Filter by search
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

  // Handlers
  const handleUpload = useCallback(async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress through steps
    const stepDelay = 800; // ms per step for demo
    for (let i = 1; i < processingSteps.length; i++) {
      await new Promise((r) => setTimeout(r, stepDelay));
      setUploadProgress(i);
    }

    // Create a new clip entry for the uploaded file
    const newClip = {
      id: `clip-${Date.now()}`,
      title: files[0].name.replace(/\.[^/.]+$/, ''),
      duration: '0:00',
      score: Math.floor(Math.random() * 30) + 65, // 65-94 range
      status: 'processing',
      source: 'local',
      sourceLabel: 'Upload Baru',
      caption: 'Sedang diproses...',
      thumbnail: `https://picsum.photos/seed/${Date.now()}/400/720.jpg`,
      hook: Math.floor(Math.random() * 30) + 65,
      trend: Math.floor(Math.random() * 30) + 60,
      visual: Math.floor(Math.random() * 30) + 60,
      audio: Math.floor(Math.random() * 30) + 65,
      aspectRatio: '9:16',
    };

    setClips((prev) => [newClip, ...prev]);

    // Simulate final processing
    await new Promise((r) => setTimeout(r, 1500));
    setIsUploading(false);
    setUploadProgress(-1);

    // Mark clip as ready after "processing"
    setTimeout(() => {
      setClips((prev) =>
        prev.map((c) =>
          c.id === newClip.id ? { ...c, status: 'ready', duration: '0:42' } : c
        )
      );
    }, 2000);
  }, []);

  const handleClipClick = useCallback((clip) => {
    console.log('Clip clicked:', clip);
  }, []);

  const handleClipPreview = useCallback((clip) => {
    console.log('Preview clip:', clip);
  }, []);

  const handleClipDownload = useCallback((clip) => {
    console.log('Download clip:', clip);
  }, []);

  return (
    <div className="h-full">
      {/* Decorative blobs */}
      <BlobBackground />

      {/* App layout: sidebar + main */}
      <div className="relative z-[2] grid h-full" style={{ gridTemplateColumns: '72px 1fr' }}>
        {/* ====== SIDEBAR ====== */}
        <Sidebar
          navItems={defaultNavItems}
          bottomItems={defaultBottomNavItems}
          activeNav={activeNav}
          onNavClick={setActiveNav}
          userInitials="RA"
        />

        {/* ====== MAIN ====== */}
        <div className="flex flex-col overflow-hidden min-w-0">
          {/* Top bar */}
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

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-7 py-8 pb-[60px] scroll-smooth">
            <div className="max-w-[1280px] mx-auto">
              {/* Progress indicator (visible during upload) */}
              {(isUploading || uploadProgress >= 0) && (
                <div className="mb-7 p-5 rounded-2xl bg-clip-panel border border-clip-border animate-scale-in">
                  <p className="text-sm font-medium text-clip-muted-2 mb-4">
                    {uploadProgress < processingSteps.length - 1
                      ? 'Memproses video...'
                      : 'Hampir selesai...'}
                  </p>
                  <ProgressIndicator
                    steps={processingSteps}
                    currentStep={uploadProgress}
                  />
                </div>
              )}

              {/* Hero input */}
              <HeroInput
                subtitle="Upload file video Anda. AI akan menemukan momen terbaik dan membuat klip siap posting dalam hitungan menit."
                features={defaultFeatures}
                onUpload={handleUpload}
                isUploading={isUploading}
              />

              {/* Stats banner */}
              <StatsBanner stats={defaultStats} />

              {/* Section: Recent clips */}
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

              {/* Clips grid */}
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
