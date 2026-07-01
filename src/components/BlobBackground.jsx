/**
 * Decorative background blobs with gradient colors
 */
export default function BlobBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Pink blob - top right */}
      <div
        className="blob"
        style={{
          width: 600,
          height: 600,
          background: 'var(--accent)',
          top: -200,
          right: -150,
          opacity: 0.15,
        }}
      />
      {/* Purple blob - bottom center */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: 'var(--accent-3)',
          bottom: -150,
          left: '30%',
          opacity: 0.10,
        }}
      />
    </div>
  );
}
