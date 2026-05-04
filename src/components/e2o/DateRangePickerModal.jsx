import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function DateRangePickerModal({ isOpen, onClose, initialStartDate, initialEndDate, onApply }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const modalRef = useRef(null);

  // Initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      const start = initialStartDate || new Date();
      setTempStartDate(initialStartDate || null);
      setTempEndDate(initialEndDate || null);
      setCurrentMonth(new Date(start.getFullYear(), start.getMonth(), 1));
      setHoverDate(null);
    }
  }, [isOpen, initialStartDate, initialEndDate]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const setToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setTempStartDate(today);
    setTempEndDate(today);
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleDateClick = (date) => {
    const clickedDate = new Date(date);
    clickedDate.setHours(0, 0, 0, 0);

    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      // First click or reset
      setTempStartDate(clickedDate);
      setTempEndDate(null);
    } else {
      // Second click
      if (clickedDate < tempStartDate) {
        setTempEndDate(tempStartDate);
        setTempStartDate(clickedDate);
      } else {
        setTempEndDate(clickedDate);
      }
    }
  };

  const handleDateHover = (date) => {
    if (tempStartDate && !tempEndDate) {
      const hDate = new Date(date);
      hDate.setHours(0, 0, 0, 0);
      setHoverDate(hDate);
    }
  };

  const handleApply = () => {
    // If only one date is selected, treat it as a single-day range
    onApply(tempStartDate, tempEndDate || tempStartDate);
    onClose();
  };

  const formatDate = (date) => {
    if (!date) return 'Select Date';
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const renderCalendar = (monthOffset) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    
    const monthName = displayMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    const days = [];
    // Empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    const weekLabels = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    return (
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 ? (
            <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : <div className="w-7 h-7"></div>}
          
          <div className="font-bold text-[15px] text-[#0f3d66]">{monthName}</div>
          
          {monthOffset === 1 ? (
            <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : <div className="w-7 h-7"></div>}
        </div>

        <div className="grid grid-cols-7 mb-2">
          {weekLabels.map((label) => (
            <div key={label} className="text-center text-[11px] font-bold text-gray-400 tracking-wider">
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {days.map((date, index) => {
            if (!date) return <div key={`empty-${index}`} className="h-9"></div>;

            // Zero out time for comparison
            const dateVal = date.getTime();
            const startVal = tempStartDate?.getTime();
            const endVal = tempEndDate?.getTime();
            const hoverVal = hoverDate?.getTime();

            const isStart = startVal === dateVal;
            const isEnd = endVal === dateVal;
            const isSingleDayRange = isStart && isEnd;

            let inRange = false;
            let isRangeStart = false;
            let isRangeEnd = false;

            if (startVal && endVal) {
              inRange = dateVal > startVal && dateVal < endVal;
              isRangeStart = isStart && startVal !== endVal;
              isRangeEnd = isEnd && startVal !== endVal;
            } else if (startVal && hoverVal && !endVal) {
              const minHover = Math.min(startVal, hoverVal);
              const maxHover = Math.max(startVal, hoverVal);
              inRange = dateVal > minHover && dateVal < maxHover;
              isRangeStart = isStart && dateVal === minHover;
              isRangeEnd = isStart && dateVal === maxHover;
            }

            // Cell Styles
            let bgClass = 'bg-transparent';
            let textClass = 'text-gray-700';
            let roundedClass = 'rounded-md';

            if (isStart || isEnd) {
              bgClass = 'bg-[#004274]';
              textClass = 'text-white font-medium';
              // If it's a range start/end, adjust rounding to connect the highlight visually
              if (isRangeStart) roundedClass = 'rounded-l-md rounded-r-none';
              if (isRangeEnd) roundedClass = 'rounded-r-md rounded-l-none';
              if (isSingleDayRange) roundedClass = 'rounded-md';
            } else if (inRange) {
              bgClass = 'bg-[#e6f0fa]';
              textClass = 'text-[#004274] font-medium';
              roundedClass = 'rounded-none';
            } else {
              // Hover for unselected dates
              bgClass = 'hover:bg-gray-100';
            }

            return (
              <div 
                key={date.toISOString()}
                className={`relative h-9 flex items-center justify-center cursor-pointer transition-colors ${bgClass} ${textClass} ${roundedClass}`}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => handleDateHover(date)}
              >
                <span className="text-[13px]">{date.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-200">
      <div 
        ref={modalRef}
        className="bg-white rounded-[16px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] w-full max-w-[760px] p-6 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Summary Section */}
        <div className="flex items-center justify-between border-b border-[#c1c7d2] pb-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-[11px] font-bold text-gray-400 tracking-widest mb-1">START DATE</div>
              <div className="text-[18px] font-bold text-[#004274]">{formatDate(tempStartDate)}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 mt-4" />
            <div>
              <div className="text-[11px] font-bold text-gray-400 tracking-widest mb-1">END DATE</div>
              <div className="text-[18px] font-bold text-[#004274]">{formatDate(tempEndDate || (tempStartDate ? tempStartDate : null))}</div>
            </div>
          </div>
          <button 
            onClick={setToday}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-[13px] font-medium border border-gray-200"
          >
            <CalendarIcon className="w-4 h-4" />
            Today
          </button>
        </div>

        {/* Calendar Section */}
        <div className="flex gap-8">
          {renderCalendar(0)}
          {renderCalendar(1)}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-[#c1c7d2]">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-transparent border border-[#c1c7d2] text-[#414750] hover:bg-gray-50 transition-colors text-[14px] font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleApply}
            disabled={!tempStartDate}
            className="px-5 py-2 rounded-lg bg-[#004274] text-white hover:bg-[#003057] transition-colors text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
