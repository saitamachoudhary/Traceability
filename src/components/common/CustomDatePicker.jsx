import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './CustomDatePicker.css';
import { CalendarDays } from 'lucide-react';

const CustomInput = forwardRef(({ value, onClick, placeholderText, onFocus, onBlur }, ref) => (
  <div className="relative w-full">
    <input
      value={value}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={ref}
      placeholder={placeholderText || "Select Date"}
      readOnly
      className="w-full h-[48px] rounded-[10px] border border-[#cbd5e1] bg-white pl-[14px] pr-[40px] text-[14px] text-[#1e293b] focus:border-2 focus:border-[#004274] focus:ring-[3px] focus:ring-[#004274]/10 focus:outline-none transition-all placeholder-[#9da3ae] cursor-pointer"
    />
    <CalendarDays className="w-4 h-4 text-slate-500 absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
));
CustomInput.displayName = 'CustomInput';

export default function CustomDatePicker({ value, onChange, placeholder }) {
  const selectedDate = value ? new Date(value) : null;

  const handleChange = (date) => {
    if (!date) {
      onChange("");
      return;
    }
    const offset = date.getTimezoneOffset()
    const adjustedDate = new Date(date.getTime() - (offset*60*1000))
    onChange(adjustedDate.toISOString().split('T')[0]);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      customInput={<CustomInput placeholderText={placeholder} />}
      calendarClassName="andritz-datepicker"
      wrapperClassName="w-full"
      dateFormat="yyyy-MM-dd"
      showPopperArrow={false}
    />
  );
}
