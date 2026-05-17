import KpiCard from './KpiCard';

/**
 * Generic KPI grid:
 *   - up to 6 small tiles
 *   - one tall chart slot on the right (spans 6 cols × 2 rows)
 *
 * `cards` is an array of KpiCard props (label, value, loading, error, etc.).
 * `chartSlot` is the React node rendered in the tall right column.
 */
export default function KpiDashboard({ cards, chartSlot, chartTitle, chartSubtitle, chartLoading = false, chartLoadingText = 'Loading…' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 grid-rows-none lg:grid-rows-[auto_auto] gap-6">
      {/* First three KPI tiles (top-left half) */}
      {cards.slice(0, 3).map((c, i) => <KpiCard key={i} {...c} />)}

      {/* Tall chart slot on the right */}
      <div className="lg:col-span-6 lg:row-span-2 md:col-span-6 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow relative overflow-hidden flex flex-col min-h-[220px]">
        <div className="absolute top-6 right-6 bg-secondary-container text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          OFFICIAL KPI
        </div>
        {chartTitle && <h3 className="text-[14px] font-bold text-text-primary mb-1">{chartTitle}</h3>}
        {chartSubtitle && <p className="text-[12px] text-text-secondary mb-4">{chartSubtitle}</p>}

        {chartLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full h-[180px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-400 text-sm">
              {chartLoadingText}
            </div>
          </div>
        ) : (
          chartSlot
        )}
      </div>

      {/* Bottom three KPI tiles */}
      {cards.slice(3, 6).map((c, i) => <KpiCard key={i + 3} {...c} />)}
    </div>
  );
}
