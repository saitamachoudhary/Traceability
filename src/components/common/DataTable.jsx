import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Pagination from './Pagination';
import {
  buildStickyStyleResolver,
  defaultRenderCell,
} from '../../utils/tableHelpers';

/**
 * Generic schema-driven table used by both E2O and O2S modules.
 *
 * Props:
 *   title, subtitle   - text in the header bar
 *   toolbarActions    - React node rendered on the right side of the header
 *
 *   columns           - meta array from the API ({ colName, ... })
 *   data              - rows (array of arrays) from the API
 *   loading           - shows the skeleton / overlay
 *
 *   stickySchema      - array passed to buildStickyStyleResolver
 *   hiddenColumns     - column names to omit (case-sensitive)
 *   renderCell        - optional (val, colName) => ReactNode for custom cells
 *
 *   renderRowActions  - optional (row, ctx) => ReactNode for the trailing
 *                       "Action" column. If omitted, no Action column is added.
 *                       `ctx` is { rowId, rowIndex } where rowId is the value
 *                       of the column named "id" (case-insensitive).
 *
 *   rowsPerPageOptions - pagination size options
 *   initialRowsPerPage
 */
export default function DataTable({
  title,
  subtitle,
  toolbarActions = null,
  columns = [],
  data = [],
  loading = false,
  stickySchema = [],
  hiddenColumns = [],
  renderCell,
  renderRowActions,
  rowsPerPageOptions = [10, 50, 100, 200],
  initialRowsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const getStickyStyle = useMemo(() => buildStickyStyleResolver(stickySchema), [stickySchema]);
  const cellRenderer   = renderCell || defaultRenderCell;

  // Compute visible columns once per columns change.
  const { idColIndex, viewDocsColIndex, finalCols } = useMemo(() => {
    const withIndex = columns.map((c, i) => ({ ...c, originalIndex: i }));

    const idIndex = withIndex.findIndex(c => c.colName?.toLowerCase() === 'id');
    const docsIndex = withIndex.findIndex(
      c => (c.colName || '').toLowerCase().replace(/[\s_]/g, '') === 'viewdocs'
    );

    const visible = withIndex.filter(c =>
      !hiddenColumns.includes(c.colName) && c.colName?.toLowerCase() !== 'id'
    );

    const cols = visible.length > 0 && renderRowActions
      ? [...visible, { colName: 'Action', isAction: true }]
      : visible;

    return {
      idColIndex: idIndex,
      viewDocsColIndex: docsIndex,
      finalCols: cols,
    };
  }, [columns, hiddenColumns, renderRowActions]);

  const totalEntries = data.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );

  return (
    <div className="w-full bg-surface rounded-2xl shadow-[var(--shadow-default)] overflow-hidden flex flex-col border border-border-outline">
      {/* Header */}
      <div className="p-6 border-b border-border-outline flex flex-col md:flex-row justify-between md:items-center gap-4 bg-surface">
        <div>
          <h2 className="text-[20px] font-bold text-text-primary mb-1">{title}</h2>
          {subtitle && <p className="text-[14px] text-text-secondary">{subtitle}</p>}
        </div>
        {toolbarActions && (
          <div className="flex items-center justify-end gap-3 flex-wrap">{toolbarActions}</div>
        )}
      </div>

      {/* Body */}
      <div className="overflow-x-auto min-h-[300px] relative">
        {loading && data.length === 0 ? (
          <div className="flex w-full h-[300px] items-center justify-center text-primary gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium text-[14px]">Loading data...</span>
          </div>
        ) : (
          <>
            {loading && data.length > 0 && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30 backdrop-blur-[1px] transition-opacity">
                <div className="bg-white shadow-xl border border-border-outline rounded-full px-4 py-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-[12px] font-bold text-primary">Refreshing Data...</span>
                </div>
              </div>
            )}

            <table className={`w-full text-left border-collapse min-w-max transition-opacity duration-300 ${loading ? 'opacity-60' : 'opacity-100'}`}>
              <thead>
                <tr className="bg-surface-container border-b border-border-outline sticky top-0 z-20">
                  {finalCols.map((col, idx) => (
                    <th
                      key={idx}
                      style={getStickyStyle(col.colName, true)}
                      className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider whitespace-nowrap bg-surface-container"
                    >
                      {col.colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIdx) => {
                    const globalIndex = startIndex + rowIdx;
                    const isSelected = selectedRowIndex === globalIndex;
                    const rowId = idColIndex >= 0 ? row[idColIndex] : null;
                    const docPath = viewDocsColIndex >= 0 ? row[viewDocsColIndex] : null;

                    return (
                      <tr
                        key={globalIndex}
                        onClick={() => setSelectedRowIndex(globalIndex)}
                        className={`border-b border-border-outline/50 hover:bg-blue-50 transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-l-4 border-l-blue-600 bg-blue-50'
                            : (rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]')
                        }`}
                      >
                        {finalCols.map((col, colIdx) => {
                          if (col.isAction) {
                            return (
                              <td
                                key={colIdx}
                                className="px-6 py-3 h-[56px] align-middle text-center bg-inherit"
                              >
                                {renderRowActions(row, { rowId, rowIndex: globalIndex, docPath })}
                              </td>
                            );
                          }
                          const val = row[col.originalIndex];
                          return (
                            <td
                              key={colIdx}
                              style={getStickyStyle(col.colName, false)}
                              className="px-6 py-3 h-[56px] align-middle text-text-primary text-[13px] whitespace-nowrap bg-inherit"
                            >
                              {cellRenderer(val, col.colName)}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={finalCols.length || 1} className="px-6 py-8 text-center text-text-secondary bg-white">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>

      {!loading && (
        <Pagination
          total={totalEntries}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={setRowsPerPage}
          pageSizeOptions={rowsPerPageOptions}
        />
      )}
    </div>
  );
}
