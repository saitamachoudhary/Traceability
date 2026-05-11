import { useState } from 'react';
import { Calendar, RotateCcw, ArrowLeft } from 'lucide-react';
import DateRangePickerModal from './DateRangePickerModal';

export default function WorkflowHeader({ title, dateRange, setDateRange, onGoBack, onReset }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyRange = (start, end) => {
    const formatForApi = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setDateRange({ date_from: formatForApi(start), date_to: formatForApi(end) });
  };

  const formatRangeDate = (dateStr) => {
    if (!dateStr) return 'Select Date';
    // Ensure we parse the string correctly, avoiding timezone offset issues
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };


  return (
    <>
      <div className="w-full h-[56px] bg-[#0f3d66] rounded-xl flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="text-white font-bold text-[18px] uppercase tracking-wide">{title}</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1a4f80] text-blue-100 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-400/20 hover:bg-[#1f5c94] transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 opacity-80" />
            <span>{formatRangeDate(dateRange.date_from)} - {formatRangeDate(dateRange.date_to)}</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-transparent border border-white/30 text-white hover:bg-white/10 transition-colors text-[14px] font-medium cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button 
            onClick={onGoBack}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white text-[#0f3d66] hover:bg-gray-50 transition-colors text-[14px] font-bold shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>

      <DateRangePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialStartDate={dateRange.date_from ? new Date(dateRange.date_from + 'T00:00:00') : null}
        initialEndDate={dateRange.date_to ? new Date(dateRange.date_to + 'T00:00:00') : null}
        onApply={handleApplyRange}
      />
    </>
  );
}
