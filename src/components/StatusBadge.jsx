/**
 * Status badge pill — Ready / Processing / Draft / Error
 *
 * @param {object} props
 * @param {'ready'|'processing'|'draft'|'error'} props.status
 * @param {string} props.className
 */
export default function StatusBadge({ status, className = '' }) {
  const config = {
    ready: {
      label: 'Ready',
      classes: 'bg-clip-success/95 text-black',
    },
    processing: {
      label: 'Processing',
      classes: 'bg-clip-warning/95 text-black animate-pulse-soft',
    },
    draft: {
      label: 'Draft',
      classes: 'bg-clip-muted-2/85 text-black',
    },
    error: {
      label: 'Error',
      classes: 'bg-clip-danger/95 text-white',
    },
  };

  const { label, classes } = config[status] || config.draft;

  return (
    <span
      className={`
        inline-block px-2 py-0.5 rounded-full
        text-[10px] font-bold uppercase tracking-wider
        ${classes} ${className}
      `}
    >
      {label}
    </span>
  );
}
