import { useState } from 'react';
import { Plus, Upload, FileSpreadsheet, RefreshCcw, Edit2, FileText, Paperclip, Trash2, Loader2 } from 'lucide-react';
import { downloadTemplate } from '../../services/enquiryToOfferService';
import { useBulkUpload } from '../../hooks/useBulkUpload';
import { useEnquiryTable } from '../../hooks/useEnquiryTable';
import UploadModal from './UploadModal';
import PreviewModal from './PreviewModal';

export default function DataTable({ filters, dateRange }) {
  const [downloadLoading, setDownloadLoading] = useState(false);
  
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
    client_enq_ref_no: "",
    actual_offer_date: "",
    date_from: dateRange?.date_from || "",
    date_to: dateRange?.date_to || ""
  };

  const { data, columns, loading, refresh } = useEnquiryTable(tableFilters);

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
    !["Edit", "Delete", "View Docs", "Attach Docs", "Convert To Order"].includes(c.colName)
  );
  
  // Only add Action column if there are any other columns
  const finalCols = filteredCols.length > 0 ? [...filteredCols, { colName: "Action", isAction: true }] : [];

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
  
  const formatCell = (val, colName) => {
    if (val === null || val === undefined || val === "") return "--";
    if (colName.toLowerCase().includes("date")) return formatDate(val);
    return String(val);
  };

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
              <tr className="bg-surface-container/50 border-b border-border-outline sticky top-0 z-10">
                {finalCols.map((col, idx) => (
                   <th key={idx} className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                     {col.colName}
                   </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIdx) => (
                  <tr key={rowIdx} className={`border-b border-border-outline/50 hover:bg-blue-50/50 transition-colors ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                    {finalCols.map((col, colIdx) => {
                      if (col.isAction) {
                        return (
                          <td key={colIdx} className="px-6 py-3 h-[56px] align-middle">
                            <div className="flex items-center gap-2 text-text-secondary">
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
                        <td key={colIdx} className="px-6 py-3 h-[56px] align-middle text-[14px] text-text-primary whitespace-nowrap">
                          {formatCell(val, col.colName)}
                        </td>
                      );
                    })}
                  </tr>
                ))
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
          <div className="text-[13px] text-text-secondary">
            Showing 1 to {data.length} entries
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer">
              <span className="text-sm font-bold">&lt;</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold shadow-sm cursor-pointer transition-colors">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer">
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
