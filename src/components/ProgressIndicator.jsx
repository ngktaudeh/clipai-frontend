/**
 * Horizontal step-by-step progress indicator
 * Steps: Upload → Extract Audio → Transcribe → Analyze → Processing → Done
 *
 * @param {object} props
 * @param {Array<{id: string, label: string}>} props.steps - Step definitions
 * @param {number} props.currentStep - Index of current active step (-1 = not started)
 * @param {boolean} props.showLabels - Show step labels below circles
 * @param {string} props.className
 */
export default function ProgressIndicator({
  steps = [],
  currentStep = -1,
  showLabels = true,
  className = '',
}) {
  if (steps.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      {/* Step circles and connectors */}
      <div className="flex items-center justify-center">
        {steps.map((step, i) => {
          const isDone = currentStep > i;
          const isActive = currentStep === i;
          const isPending = currentStep < i;

          return (
            <div key={step.id} className="flex items-center">
              {/* Connector line (before each step except first) */}
              {i > 0 && (
                <div
                  className={`
                    h-[2px] w-8 sm:w-14 mx-1 transition-colors duration-500
                    ${isDone ? 'bg-accent-gradient' : 'bg-clip-border-2'}
                  `}
                />
              )}

              {/* Step circle */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`
                    w-9 h-9 rounded-full grid place-items-center
                    transition-all duration-300 flex-shrink-0
                    ${
                      isDone
                        ? 'progress-step-done shadow-accent-sm'
                        : isActive
                        ? 'progress-step-active shadow-accent-sm'
                        : 'bg-clip-panel-2 border border-clip-border-2 text-clip-muted'
                    }
                  `}
                >
                  {isDone ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : isActive ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  ) : (
                    <span className="text-xs font-mono text-clip-muted">{i + 1}</span>
                  )}
                </div>

                {/* Label */}
                {showLabels && (
                  <span
                    className={`
                      text-[11px] font-medium transition-colors duration-300
                      ${
                        isActive
                          ? 'text-clip-accent-2'
                          : isDone
                          ? 'text-clip-muted-2'
                          : 'text-clip-muted'
                      }
                    `}
                  >
                    {step.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
