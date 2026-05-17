/**
 * Reusable KPI tile used by both E2O and O2S dashboards.
 *
 * Visual variants:
 *   - default:    standard tile.
 *   - highlight:  primary-colored title + value, primary border (the
 *                 "Conversion" / "OTD Rate" tile).
 *
 * State props:
 *   - loading:    shows a skeleton bar.
 *   - error:      shows "-" in red (E2O behavior).
 *   - noData:     dims the value (O2S "No Data" behavior).
 *   - suffix:     optional trailing string (e.g. "Days").
 */
export default function KpiCard({
  label,
  value,
  loading = false,
  error = false,
  noData = false,
  highlight = false,
  suffix = null,
  span = 'lg:col-span-2 md:col-span-2',
}) {
  const valueColor = error
    ? 'text-red-500'
    : noData
      ? 'text-[#CBD5E1]'
      : highlight
        ? 'text-primary'
        : 'text-text-primary';

  const labelColor = highlight ? 'text-primary' : 'text-text-secondary';
  const borderClass = highlight
    ? 'border border-[var(--color-primary)]/20'
    : '';

  return (
    <div className={`${span} bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow ${borderClass}`}>
      <h3 className={`text-[12px] font-bold uppercase tracking-wider mb-2 ${labelColor}`}>
        {label}
      </h3>

      {loading ? (
        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-2" />
      ) : error ? (
        <span className="text-[24px]">-</span>
      ) : (
        <div className="flex items-baseline gap-2">
          <span className={`text-[32px] font-bold ${valueColor}`}>{value}</span>
          {suffix && !noData && (
            <span className="text-[14px] font-bold text-[#64748B] ml-1">{suffix}</span>
          )}
        </div>
      )}
    </div>
  );
}
