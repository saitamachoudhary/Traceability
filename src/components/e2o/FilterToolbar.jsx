import { useState, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import { useEnquiryFilters } from '../../hooks/useEnquiryFilters';

/* ── Reusable searchable dropdown ── */
function SearchableSelect({ label, placeholder, value, options, onChange, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  const filtered = options.filter(o =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  const displayValue = value || placeholder;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (option) => {
    onChange(option === value ? '' : option); // toggle off if re-selected
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
  };

  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]" ref={containerRef}>
      <label className="text-[12px] font-bold text-[#414750] uppercase tracking-[0.05em]">
        {label}
      </label>
      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => { setIsOpen(o => !o); setSearch(''); }}
          className="w-full h-[40px] flex items-center justify-between gap-2 px-3 bg-white border border-[#c1c7d2] rounded-[8px] text-[14px] text-[#191c20] focus:outline-none focus:border-[2px] focus:border-[#004274] transition-colors cursor-pointer"
          style={{ borderWidth: isOpen ? 2 : 1, borderColor: isOpen ? '#004274' : '#c1c7d2' }}
        >
          <span className={value ? 'text-[#191c20]' : 'text-[#9da3ae]'}>
            {isLoading ? 'Loading…' : displayValue}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {value && (
              <X className="w-3.5 h-3.5 text-[#414750] hover:text-red-500" onClick={handleClear} />
            )}
            <ChevronDown
              className="w-4 h-4 text-[#414750] transition-transform"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </div>
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div
            className="absolute left-0 right-0 top-[44px] z-50 bg-white rounded-[8px] overflow-hidden"
            style={{ boxShadow: '0px 8px 20px rgba(0,0,0,0.08)', border: '1px solid #e1e2e8' }}
          >
            {/* Search box */}
            <div className="p-2 border-b border-[#e1e2e8] relative">
              <Search className="w-3.5 h-3.5 text-[#9da3ae] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full pl-7 pr-3 py-1.5 text-[13px] bg-[#f2f3f9] rounded-[6px] border-none outline-none text-[#191c20] placeholder-[#9da3ae]"
              />
            </div>

            {/* Options list */}
            <ul className="max-h-[200px] overflow-y-auto">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-[13px] text-[#9da3ae]">No results</li>
              ) : (
                filtered.map(opt => (
                  <li
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="px-4 py-2.5 text-[14px] cursor-pointer transition-colors"
                    style={{
                      background: opt === value ? '#e6f0fa' : undefined,
                      color: opt === value ? '#004274' : '#191c20',
                      fontWeight: opt === value ? 700 : 400
                    }}
                    onMouseEnter={e => { if (opt !== value) e.target.style.background = '#f2f3f9'; }}
                    onMouseLeave={e => { if (opt !== value) e.target.style.background = ''; }}
                  >
                    {opt}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── FilterToolbar ── */
export default function FilterToolbar() {
  const { filters, options, isLoading, updateFilter, resetFilters } = useEnquiryFilters();

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
        <button className="bg-[#004274] text-white hover:bg-[#00335a] px-5 h-[40px] rounded-[8px] text-[14px] font-bold transition-colors shadow-sm">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
