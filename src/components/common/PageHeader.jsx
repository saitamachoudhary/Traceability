import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Standard page header: title on the left, back button on the right.
 * Used by Add/Edit pages.
 */
export default function PageHeader({ title, backTo, onBack }) {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(backTo || -1));

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[30px] font-bold text-[#0f3d66]">{title}</h1>
      <button
        onClick={handleBack}
        className="flex items-center gap-2 bg-white border border-[#cbd5e1] text-[#0f3d66] px-4 py-2 rounded-lg text-[14px] font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </button>
    </div>
  );
}
