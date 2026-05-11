import { Search, ChevronDown, Calendar, Filter } from 'lucide-react';

export default function FilterToolbar() {
  return (
    <div className="w-full bg-white rounded-2xl p-6 flex flex-wrap items-center gap-[18px] shadow-[var(--shadow-default)] border border-[#EEF2F7]">
      <div className="flex items-center gap-2 text-text-secondary font-bold text-[12px] uppercase tracking-wider shrink-0">
        <Filter className="w-4 h-4" />
        FILTERS
      </div>

      {/* Project Code */}
      <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
        <label className="text-[12px] font-bold text-[#414750] uppercase tracking-[0.05em] ml-1">Project Code</label>
        <div className="relative group">
          <select className="w-full h-[40px] px-3 pr-10 rounded-[8px] border border-[#c1c7d2] bg-white text-[#191c20] text-[14px] font-medium appearance-none outline-none focus:border-[#004274] transition-all cursor-pointer">
            <option>Select Project</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414750] pointer-events-none group-hover:text-[#004274] transition-colors" />
        </div>
      </div>

      {/* PO Date */}
      <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
        <label className="text-[12px] font-bold text-[#414750] uppercase tracking-[0.05em] ml-1">PO Date</label>
        <div className="relative group">
          <select className="w-full h-[40px] px-3 pr-10 rounded-[8px] border border-[#c1c7d2] bg-white text-[#191c20] text-[14px] font-medium appearance-none outline-none focus:border-[#004274] transition-all cursor-pointer">
            <option>Select Date Range</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414750] pointer-events-none group-hover:text-[#004274] transition-colors" />
        </div>
      </div>

      {/* Client Enquiry Ref No */}
      <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
        <label className="text-[12px] font-bold text-[#414750] uppercase tracking-[0.05em] ml-1">Client Enquiry Ref No.</label>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search REF#"
            className="w-full h-[40px] px-3 pr-10 rounded-[8px] border border-[#c1c7d2] bg-white text-[#191c20] text-[14px] font-medium outline-none focus:border-[#004274] transition-all placeholder:text-[#9da3ae]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414750] group-focus-within:text-[#004274] transition-colors" />
        </div>
      </div>

      {/* Contractual Delivery Date */}
      <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
        <label className="text-[12px] font-bold text-[#414750] uppercase tracking-[0.05em] ml-1">Contractual Delivery Date</label>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="mm/dd/yyyy"
            className="w-full h-[40px] px-3 pr-10 rounded-[8px] border border-[#c1c7d2] bg-white text-[#191c20] text-[14px] font-medium outline-none focus:border-[#004274] transition-all placeholder:text-[#9da3ae]"
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414750] group-focus-within:text-[#004274] transition-colors" />
        </div>
      </div>

      {/* Apply Filters Button */}
      <button className="h-[40px] px-6 rounded-[8px] bg-primary text-white font-bold text-[14px] hover:bg-primary-container transition-all mt-4 lg:mt-6 shadow-sm">
        Apply Filters
      </button>
    </div>
  );
}

