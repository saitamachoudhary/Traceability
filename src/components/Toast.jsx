import { XCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';

export default function Toast({ type, message, onClose }) {
  const isError = type === 'error';
  const isWarning = type === 'warning';

  let containerClasses = 'bg-green-50 border-green-200 text-green-800';
  let icon = <CheckCircle className="w-5 h-5 text-green-500" />;

  if (isError) {
    containerClasses = 'bg-red-50 border-red-200 text-red-800';
    icon = <XCircle className="w-5 h-5 text-red-500" />;
  } else if (isWarning) {
    containerClasses = 'bg-amber-50 border-amber-200 text-amber-800';
    icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${containerClasses} animate-in slide-in-from-bottom-4 fade-in duration-300`}>
      {icon}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
