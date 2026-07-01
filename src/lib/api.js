/**
 * ClipAI API client
 * Centralized fetch functions — App.jsx handlers call these instead of raw fetch()
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

/**
 * POST /api/upload — Upload video file (multipart)
 * @param {File} file - Video file
 * @returns {Promise<{jobId: string}>}
 */
export async function uploadVideoFile(file) {
  const formData = new FormData();
  formData.append('video', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || `Upload error ${res.status}`);
  }

  return res.json();
}

/**
 * POST /api/upload — Submit video URL (JSON body)
 * @param {string} url - Video URL (YouTube, TikTok, etc.)
 * @param {string} platform - Detected platform
 * @returns {Promise<{jobId: string}>}
 */
export async function uploadVideoUrl(url, platform) {
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, platform }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'URL submission failed' }));
    throw new Error(err.error || `URL error ${res.status}`);
  }

  return res.json();
}

/**
 * GET /api/status/:jobId — Poll job progress
 *
 * Response maps directly to ProgressIndicator props:
 *   currentStep → ProgressIndicator.currentStep
 *   status      → logic check for done/error
 *   clips       → ClipGrid.clips (null during processing, array when done)
 *
 * @param {string} jobId
 * @returns {Promise<{currentStep: number, status: string, progress: string, clips: Array|null, error: string|null}>}
 */
export async function getJobStatus(jobId) {
  const res = await fetch(`${API_BASE}/status/${jobId}`);

  if (!res.ok) {
    throw new Error('Job tidak ditemukan');
  }

  return res.json();
}

/**
 * GET /api/clips — List all clips
 * @param {string} [status] - Optional filter: 'ready', 'processing', 'draft'
 * @returns {Promise<Array>}
 */
export async function listClips(status) {
  const params = status ? `?status=${status}` : '';
  const res = await fetch(`${API_BASE}/clips${params}`);

  if (!res.ok) {
    throw new Error('Gagal mengambil daftar klip');
  }

  return res.json();
}

/**
 * GET /api/clips/:id/download — Trigger browser download
 *
 * Creates a temporary anchor, clicks it, then cleans up.
 * Used by ClipCard's download button (handleClipDownload).
 *
 * @param {string} clipId - Clip ID (format: {jobId}_{clipIndex})
 * @returns {Promise<void>}
 */
export async function downloadClip(clipId) {
  const res = await fetch(`${API_BASE}/clips/${clipId}/download`);

  if (!res.ok) {
    throw new Error('File klip tidak tersedia');
  }

  // Stream to blob → trigger download
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clipai-${clipId}.mp4`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Poll job status at interval until done or error
 *
 * @param {string} jobId
 * @param {(data: {currentStep: number, status: string, progress: string, clips: Array|null, error: string|null}) => void} onUpdate
 * @param {number} intervalMs - Poll interval (default 2000ms)
 * @returns {Promise<{clips: Array}>} — resolves when done
 */
export function pollJobStatus(jobId, onUpdate, intervalMs = 2000) {
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const data = await getJobStatus(jobId);
        onUpdate(data);

        if (data.status === 'done') {
          resolve({ clips: data.clips || [] });
          return;
        }

        if (data.status === 'error') {
          reject(new Error(data.error || 'Proses gagal'));
          return;
        }

        // Continue polling
        setTimeout(poll, intervalMs);
      } catch (err) {
        reject(err);
      }
    };

    // Start first poll immediately
    poll();
  });
}
