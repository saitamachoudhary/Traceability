import { useState } from 'react';
import { Plus, Upload, FileSpreadsheet, RefreshCcw, Edit2, FileText, Paperclip, Trash2, Loader2, ArrowLeftRight } from 'lucide-react';
import { downloadTemplate } from '../../services/enquiryToOfferService';
import { useBulkUpload } from '../../hooks/useBulkUpload';
import { useEnquiryTable } from '../../hooks/useEnquiryTable';
import UploadModal from './UploadModal';
import PreviewModal from './PreviewModal';

export default function DataTable({ filters, dateRange, refreshTrigger }) {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const {
    file,
    previewData,
    isUploading,
    uploadProgress,
    isPreviewLoading,
    isSaving,
    handleFileSelect,
    handlePreview,
    handleSave,
    reset
  } = useBulkUpload();

  const tableFilters = {
    customer: filters?.customer || "",
    projects: filters?.projects || "",
    package_type: filters?.packages || "",
    date_from: dateRange?.date_from || "",
    date_to: dateRange?.date_to || ""
  };

  const { data, columns, loading, refresh } = useEnquiryTable(tableFilters, refreshTrigger);

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await downloadTemplate();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleOpenUploadModal = () => {
    reset();
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    reset();
  };

  const handlePreviewClick = async () => {
    await handlePreview();
    setIsUploadModalOpen(false);
    setIsPreviewModalOpen(true);
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    reset();
  };

  const handleFinalSave = async () => {
    await handleSave(() => {
      setIsPreviewModalOpen(false);
      reset();
      refresh();
    });
  };

  // Add originalIndex to columns so we can map rows correctly since they are arrays
  const columnsWithIndex = columns.map((c, i) => ({ ...c, originalIndex: i }));

  const filteredCols = columnsWithIndex.filter(c =>
    !["Edit", "Delete", "View Docs", "Attach Docs", "Convert To Order", "id"].includes(c.colName) && c.colName.toLowerCase() !== "id"
  );
  // Only add Action column if there are any other columns
  const finalCols = filteredCols.length > 0 ? [...filteredCols, { colName: "Action", isAction: true }] : [];

  const getStickyStyle = (colName, isHeader = false) => {
    const lower = colName?.toLowerCase() || '';
    const baseZ = isHeader ? 30 : 10;
    if (lower === 'offer_reference_no' || lower === 'offer reference no') {
      return { position: 'sticky', left: 0, zIndex: baseZ, minWidth: '160px', backgroundColor: 'inherit' };
    }
    if (lower === 'customer') {
      return { position: 'sticky', left: '160px', zIndex: baseZ, minWidth: '140px', backgroundColor: 'inherit' };
    }
    if (lower === 'projects' || lower === 'project') {
      return { position: 'sticky', left: '300px', zIndex: baseZ, minWidth: '180px', backgroundColor: 'inherit', boxShadow: '4px 0 8px -4px rgba(0,0,0,0.1)' };
    }
    return {};
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return String(dateStr);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const renderCell = (val, colName) => {
    if (val === null || val === undefined || val === "") return "--";
    const lowerColName = colName.toLowerCase();

    // Project Name
    if (lowerColName.includes('project')) {
      return <span className="font-bold text-[#005A9B] hover:underline cursor-pointer">{String(val)}</span>;
    }

    // Offer Value
    if (lowerColName.includes('offer value')) {
      return <span className="font-bold">{String(val)}</span>;
    }

    // Status badge
    if (lowerColName === 'status' || lowerColName.includes('ahpl_offer_status') || lowerColName.includes('ahpl offer status')) {
      const statusStr = String(val).toLowerCase();
      let colorClass = "bg-gray-100 text-gray-700";
      if (statusStr.includes("executed") && !statusStr.includes("non")) {
        colorClass = "bg-green-100 text-green-700";
      } else if (statusStr.includes("non executed") || statusStr.includes("non-executed")) {
        colorClass = "bg-amber-100 text-amber-700";
      } else if (statusStr.includes("draft")) {
        colorClass = "bg-gray-100 text-gray-700";
      }
      return <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold ${colorClass}`}>{String(val)}</span>;
    }

    // Customer Status badge
    if (lowerColName.includes('customer status') || lowerColName.includes('customer_enquiry_status')) {
      const statusStr = String(val).toLowerCase();
      let colorClass = "bg-gray-100 text-gray-700";
      if (statusStr.includes("awaiting po")) {
        colorClass = "bg-slate-200 text-slate-700";
      } else if (statusStr.includes("revision req")) {
        colorClass = "bg-orange-100 text-orange-700";
      } else {
        colorClass = "bg-gray-100 text-gray-700";
      }
      return <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-wider ${colorClass}`}>{String(val)}</span>;
    }

    if (lowerColName.includes("date")) return formatDate(val);
    return String(val);
  };

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-surface rounded-2xl shadow-[var(--shadow-default)] overflow-hidden flex flex-col mt-2">
      {/* Header */}
      <div className="p-6 border-b border-border-outline flex flex-col md:flex-row justify-between md:items-center gap-4 bg-surface">
        <div>
          <h2 className="text-[20px] font-bold text-text-primary mb-1">SSB Demand Tracking</h2>
          <p className="text-[14px] text-text-secondary">Managing engineering demand lifecycle</p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-[14px] font-bold transition-colors">
            <Plus className="w-4 h-4" />
            Add New
          </button>
          <button
            onClick={handleOpenUploadModal}
            className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors">
            <Upload className="w-4 h-4 text-text-secondary" />
            Bulk Upload
          </button>
          <button
            onClick={handleDownload}
            disabled={downloadLoading}
            className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {downloadLoading ? (
              <RefreshCcw className="w-4 h-4 text-text-secondary animate-spin" />
            ) : (
              <FileSpreadsheet className="w-4 h-4 text-text-secondary" />
            )}
            {downloadLoading ? "Downloading..." : "Template"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[300px]">
        {loading ? (
          <div className="flex w-full h-[300px] items-center justify-center text-primary gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium text-[14px]">Loading data...</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="bg-surface-container border-b border-border-outline sticky top-0 z-20">
                {finalCols.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider whitespace-nowrap bg-surface-container"
                    style={getStickyStyle(col.colName, true)}
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
                  return (
                    <tr
                      key={globalIndex}
                      onClick={() => setSelectedRowIndex(globalIndex)}
                      className={`border-b border-border-outline/50 hover:bg-blue-50 transition-colors cursor-pointer ${isSelected ? 'border-l-4 border-l-blue-600 bg-blue-50' : (rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]')
                        }`}
                    >
                      {finalCols.map((col, colIdx) => {
                        if (col.isAction) {
                          return (
                            <td key={colIdx} className="px-6 py-3 h-[56px] align-middle bg-inherit">
                              <div className="flex items-center gap-2 text-text-secondary">
                                <button title="Convert to Order" className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><ArrowLeftRight className="w-4 h-4" /></button>
                                <button title="Edit" className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                                <button title="View Docs" className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><FileText className="w-4 h-4" /></button>
                                <button title="Attach Docs" className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><Paperclip className="w-4 h-4" /></button>
                                <button title="Delete" className="p-1.5 hover:text-red-600 transition-colors hover:bg-red-50 rounded-md cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          );
                        }

                        const val = row[col.originalIndex];
                        return (
                          <td
                            key={colIdx}
                            className="px-6 py-3 h-[56px] align-middle text-[13px] text-text-primary whitespace-nowrap bg-inherit"
                            style={getStickyStyle(col.colName, false)}
                          >
                            {renderCell(val, col.colName)}
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
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && data.length > 0 && (
        <div className="px-6 py-4 border-t border-border-outline flex items-center justify-between bg-white">
          <div className="flex items-center gap-4 text-[13px] text-text-secondary">
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
            </span>
            <div className="flex items-center gap-2 border-l border-border-outline pl-4">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-border-outline rounded px-2 py-1 text-[13px] focus:outline-none focus:border-primary"
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-sm font-bold">&lt;</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold shadow-sm cursor-pointer transition-colors">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-sm font-bold">&gt;</span>
            </button>
          </div>
        </div>
      )}

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        file={file}
        onFileSelect={handleFileSelect}
        onRemoveFile={reset}
        onPreview={handlePreviewClick}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        isPreviewLoading={isPreviewLoading}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreviewModal}
        onSave={handleFinalSave}
        previewData={previewData}
        isSaving={isSaving}
      />
    </div>
  );
}
