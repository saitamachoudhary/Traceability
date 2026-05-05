import React from 'react';
import { Loader2 } from 'lucide-react';

export default function PreviewModal({
  isOpen,
  onClose,
  onSave,
  previewData,
  isSaving
}) {
  if (!isOpen) return null;

  const renderTableContent = () => {
    if (!previewData) return null;

    const columns = previewData.column_name || [];
    const rows = previewData.data || [];

    return (
      <div className="w-full overflow-auto rounded-lg border border-border-outline flex-grow bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-max">
          <thead className="sticky top-0 z-20">
            <tr className="bg-[#00518A] border-b border-border-outline">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 text-[12px] font-bold text-white uppercase tracking-wider whitespace-nowrap shadow-[0_1px_0_0_var(--color-border-outline)]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIdx) => (
                <tr key={rowIdx} className={`border-b border-border-outline/50 transition-colors ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 text-[13px] text-text-primary whitespace-nowrap">
                      {row[colIdx] !== undefined && row[colIdx] !== null ? String(row[colIdx]) : ''}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length || 1} className="px-6 py-8 text-center text-text-secondary bg-white">
                  No data available in preview
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const totalCols = previewData?.column_name?.length || 0;
  const totalRows = previewData?.data?.length || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-[#F4F7F9] rounded-xl shadow-xl w-full max-w-7xl h-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 py-5 flex items-center justify-between border-b border-border-outline bg-white shrink-0">
          <h2 className="text-[24px] font-bold text-text-primary">Upload data preview</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-lg border border-border-outline bg-white text-text-primary font-medium text-[14px] hover:bg-surface-container transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-[14px] hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Info bar */}
        <div className="px-8 py-4 flex justify-end shrink-0">
          <div className="text-[11px] font-bold text-text-secondary uppercase tracking-widest text-right leading-relaxed flex flex-col items-end">
            <div>TOTAL ROW : <span className="text-text-primary">{totalRows}</span></div>
            <div>TOTAL COLUMN : <span className="text-text-primary">{totalCols}</span></div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 flex-grow overflow-hidden flex flex-col">
          {renderTableContent()}
        </div>
      </div>
    </div>
  );
}
