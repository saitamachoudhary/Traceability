import { Filter } from 'lucide-react';
import SearchableSelect from '../common/SearchableSelect';

/* ── FilterToolbar ── */
export default function FilterToolbar({ filters, options, isLoading, updateFilter, resetFilters }) {

  return (
    <div className="w-full mt-6 bg-surface rounded-2xl p-6 shadow-[var(--shadow-default)] flex flex-col xl:flex-row xl:items-end justify-between gap-6">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-2 text-text-secondary font-bold text-[12px] uppercase tracking-wider shrink-0">
          <Filter className="w-4 h-4" />
          FILTERS
        </div>

        <div className="flex flex-1 items-end gap-4 flex-wrap">
          <SearchableSelect
            label="Customer"
            placeholder="All Customers"
            value={filters.customer}
            options={options.customers}
            onChange={val => updateFilter('customer', val)}
            isLoading={isLoading}
          />
          <SearchableSelect
            label="Project"
            placeholder="All Projects"
            value={filters.projects}
            options={options.projects}
            onChange={val => updateFilter('projects', val)}
            isLoading={isLoading}
          />
          <SearchableSelect
            label="Package Type"
            placeholder="All Packages"
            value={filters.packages}
            options={options.packages}
            onChange={val => updateFilter('packages', val)}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="shrink-0 flex items-end gap-3 h-[58px]">
      </div>
    </div>
  );
}
