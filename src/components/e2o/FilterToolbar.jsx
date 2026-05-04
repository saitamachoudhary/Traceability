import { Search, ChevronDown, Calendar, Filter } from 'lucide-react';

export default function FilterToolbar() {
  return (
    <div className="w-full mt-6 bg-surface rounded-2xl p-6 shadow-[var(--shadow-default)] flex flex-col xl:flex-row xl:items-center justify-between gap-6">
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-2 text-text-secondary font-bold text-[12px] uppercase tracking-wider shrink-0">
          <Filter className="w-4 h-4" />
          FILTERS
        </div>

        <div className="flex flex-1 items-center gap-4">
          <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Customer</label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface border border-border-outline rounded-lg px-4 py-2 text-[14px] text-text-primary focus:outline-none focus:border-primary cursor-pointer">
                <option>All Customers</option>
              </select>
              <ChevronDown className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Project</label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface border border-border-outline rounded-lg px-4 py-2 text-[14px] text-text-primary focus:outline-none focus:border-primary cursor-pointer">
                <option>Select Project</option>
              </select>
              <ChevronDown className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Package Type</label>
            <div className="relative">
              <select className="w-full appearance-none bg-surface border border-border-outline rounded-lg px-4 py-2 text-[14px] text-text-primary focus:outline-none focus:border-primary cursor-pointer">
                <option>Standard Package</option>
              </select>
              <ChevronDown className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Client Enquiry Ref. No.</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search REF#" 
                className="w-full bg-surface border border-border-outline rounded-lg px-4 py-2 text-[14px] text-text-primary focus:outline-none focus:border-primary placeholder-text-secondary/50"
              />
              <Search className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div> */}

          {/* <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">AHPL Offer Date</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="mm/dd/yyyy" 
                className="w-full bg-surface border border-border-outline rounded-lg px-4 py-2 pr-10 text-[14px] text-text-primary focus:outline-none focus:border-primary placeholder-text-secondary/50"
              />
              <Calendar className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div> */}
        </div>
      </div>

      <div className="shrink-0 flex items-end h-[58px]">
        <button className="bg-[var(--color-surface-container)] text-[var(--color-text-primary)] border border-[var(--color-border-outline)] hover:bg-[var(--color-border-outline)]/20 px-5 h-[40px] rounded-[8px] text-[14px] font-bold transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
