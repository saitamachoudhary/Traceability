import { Filter } from 'lucide-react';
import SearchableSelect from '../common/SearchableSelect';
import { useOrderToShipmentFilters } from '../../hooks/useOrderToShipmentFilters';

export default function FilterToolbar() {
  const { filters, options, isLoading, updateFilter } = useOrderToShipmentFilters();

  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-wrap items-center gap-[18px] shadow-[var(--shadow-default)] border border-[#EEF2F7]">
      <div className="flex items-center gap-2 text-text-secondary font-bold text-[12px] uppercase tracking-wider shrink-0">
        <Filter className="w-4 h-4" />
        FILTERS
      </div>

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

    </div>
  );
}

