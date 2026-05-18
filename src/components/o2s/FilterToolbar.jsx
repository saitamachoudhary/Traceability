import { Filter } from 'lucide-react';
import SearchableSelect from '../common/SearchableSelect';

export default function FilterToolbar({ filters, options, isLoading, updateFilter }) {
  return (
    <div className="w-full bg-white rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4 shadow-[var(--shadow-default)] border border-[#EEF2F7]">
      <div className="flex items-center gap-2 text-text-secondary font-bold text-[12px] uppercase tracking-wider shrink-0">
        <Filter className="w-4 h-4" />
        FILTERS
      </div>

      <div className="w-px h-5 bg-[#EEF2F7] shrink-0" />

      <div className="flex flex-wrap items-end gap-4 flex-1">
        <div className="w-[360px] min-w-[180px]">
          <SearchableSelect
            label="Customer"
            placeholder="All Customers"
            value={filters.customer}
            options={options.customers}
            onChange={val => updateFilter('customer', val)}
            isLoading={isLoading}
          />
        </div>

        <div className="w-[360px] min-w-[180px]">
          <SearchableSelect
            label="Project"
            placeholder="All Projects"
            value={filters.projects}
            options={options.projects}
            onChange={val => updateFilter('projects', val)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}


