/**
 * Status badge with a small color contract used across tables.
 * Centralizes the inline-coded color logic that previously lived in DataTable.
 *
 * Variants: 'pill' (default, rounded-full, larger) or 'tag' (rounded-sm, smaller).
 */
const PILL_CLASSES = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const TAG_CLASSES = {
  info:    'bg-slate-200 text-slate-700',
  warning: 'bg-orange-100 text-orange-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const resolveOfferStatus = (s) => {
  if (s.includes('executed') && !s.includes('non')) return 'success';
  if (s.includes('non executed') || s.includes('non-executed')) return 'warning';
  return 'neutral';
};

const resolveCustomerStatus = (s) => {
  if (s.includes('awaiting po'))    return 'info';
  if (s.includes('revision req'))   return 'warning';
  return 'neutral';
};

export default function StatusBadge({ value, kind = 'offer' }) {
  if (value === null || value === undefined || value === '') return null;
  const str = String(value);
  const lower = str.toLowerCase();

  if (kind === 'customer') {
    const variant = TAG_CLASSES[resolveCustomerStatus(lower)];
    return (
      <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-wider ${variant}`}>
        {str}
      </span>
    );
  }

  // default: offer pill
  const variant = PILL_CLASSES[resolveOfferStatus(lower)];
  return (
    <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold ${variant}`}>
      {str}
    </span>
  );
}
