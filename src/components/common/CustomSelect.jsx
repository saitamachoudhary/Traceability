import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({ value, onChange, options, placeholder = "Select" }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] rounded-[10px] bg-white px-[14px] text-[14px] flex items-center justify-between transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'border-2 border-[#004274] ring-[3px] ring-[#004274]/10'
            : 'border border-[#cbd5e1] hover:border-[#94a3b8]'
        }`}
      >
        <span className={`block truncate ${value ? 'text-[#1e293b]' : 'text-[#9da3ae]'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 flex-shrink-0 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-[12px] border border-[#e2e8f0] p-2 shadow-[0px_10px_30px_rgba(15,23,42,0.08)]">
          <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
            {options.map((opt, idx) => {
              const optionValue = typeof opt === 'string' ? opt : opt.value;
              const optionLabel = typeof opt === 'string' ? opt : opt.label;
              const isSelected = value === optionValue;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(optionValue)}
                  className={`px-3 py-2.5 rounded-[8px] text-[14px] cursor-pointer transition-colors duration-200 mb-1 last:mb-0 ${
                    isSelected
                      ? 'bg-[#e0f2fe] text-[#004274] font-semibold'
                      : 'hover:bg-[#f1f5f9] text-[#1e293b]'
                  }`}
                >
                  {optionLabel}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
