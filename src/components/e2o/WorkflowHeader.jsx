import { Calendar, RotateCcw, ArrowLeft } from 'lucide-react';

export default function WorkflowHeader() {
  return (
    <div className="w-full h-[56px] bg-[#0f3d66] rounded-xl flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-6">
        <h1 className="text-white font-bold text-[18px] uppercase tracking-wide">ENQUIRY TO OFFER</h1>
        <div className="flex items-center gap-2 bg-[#1a4f80] text-blue-100 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-400/20">
          <Calendar className="w-4 h-4 opacity-80" />
          <span>Jan 2024 - Dec 2024</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-transparent border border-white/30 text-white hover:bg-white/10 transition-colors text-[14px] font-medium">
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white text-[#0f3d66] hover:bg-gray-50 transition-colors text-[14px] font-bold shadow-sm">
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
