/**
 * Shared table pagination footer. Was duplicated in both DataTable components.
 */
export default function Pagination({
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  pageSizeOptions = [10, 50, 100, 200],
}) {
  if (total === 0) return null;

  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, total);

  return (
    <div className="px-6 py-4 border-t border-border-outline flex items-center justify-between bg-white">
      <div className="flex items-center gap-4 text-[13px] text-text-secondary">
        <span>Showing {startIndex + 1} to {endIndex} of {total} entries</span>
        <div className="flex items-center gap-2 border-l border-border-outline pl-4">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              onRowsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="bg-white border border-border-outline rounded px-2 py-1 text-[13px] focus:outline-none focus:border-primary"
          >
            {pageSizeOptions.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm font-bold">&lt;</span>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold shadow-sm cursor-pointer transition-colors">
          {page}
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-sm font-bold">&gt;</span>
        </button>
      </div>
    </div>
  );
}
