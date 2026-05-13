import { useState } from 'react';
import { Plus, Upload, FileText, Pencil, Trash2, Download, RefreshCcw, Loader2 } from 'lucide-react';
import { downloadExcel } from '../../utils/downloadExcel';
import { useDownloadTemplate } from '../../hooks/useDownloadTemplate';
import { useBulkUpload } from '../../hooks/useBulkUpload';
import { useO2STable } from '../../hooks/useO2STable';
import { saveO2SUploadedData } from '../../utils/uploadApi';
import FileUploadModal from '../e2o/FileUploadModal';
import PreviewModal from '../e2o/PreviewModal';

export default function DataTable({ filters, dateRange, refreshTrigger, onRefresh }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tableFilters = {
    customer: filters?.customer || "",
    projects: filters?.projects || "",
    date_from: dateRange?.date_from || "",
    date_to: dateRange?.date_to || ""
  };

  const { data, columns, loading, refresh } = useO2STable(tableFilters, refreshTrigger);

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
  } = useBulkUpload(saveO2SUploadedData);

  const { isDownloading, handleDownload: handleDownloadTemplate } = useDownloadTemplate({
    tableName: "order_to_shipment_new",
    columns: [
      "project_name",
      "customer_name",
      "backlog_hot",
      "project_category",
      "oi_month",
      "scope_description",
      "location_hip_hib",
      "order_value_inr",
      "precal_gross_profit_inr",
      "precal_cogs_II",
      "cogsII_act_comt",
      "cogsII_fcst_act_comt_tbc",
      "invoice_date",
      "invoice_value",
      "bom_or_sap_specs_ready_for_purchase_requistion_actual",
      "pr_raised_by_ppc_and_pm_actual",
      "placement_of_po_by_scm_actual",
      "raw_material_material_receipt_grn_planned",
      "raw_material_material_receipt_grn_actual",
      "manufacturing_packing_and_dispatch_actuals",
      "contractual_delivery_date",
      "expected_delivery_date"
    ],
    fileName: "order_to_shipment_template.xlsx"
  });

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
      if (onRefresh) onRefresh();
      else refresh();
    });
  };

  const handleDownloadData = () => {
    downloadExcel(columns, data, 'Order_To_Shipment_Data.csv');
  };

  const columnsWithIndex = columns.map((c, i) => ({ ...c, originalIndex: i }));
  const filteredCols = columnsWithIndex.filter(c => 
    !["Edit", "Delete"].includes(c.colName)
  );
  
  const finalCols = filteredCols.length > 0 ? [...filteredCols, { colName: "Action", isAction: true }] : [];

  const totalEntries = data.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const getStickyStyle = (colName, isHeader = false) => {
    const lower = colName?.toLowerCase() || '';
    const baseZ = isHeader ? 30 : 10;
    
    if (lower === 'project code/wbs') {
      return { position: 'sticky', left: 0, zIndex: baseZ, minWidth: '160px', backgroundColor: 'inherit' };
    }
    if (lower === 'project name') {
      return { position: 'sticky', left: '160px', zIndex: baseZ, minWidth: '180px', backgroundColor: 'inherit' };
    }
    if (lower === 'customer name') {
      return { position: 'sticky', left: '340px', zIndex: baseZ, minWidth: '180px', backgroundColor: 'inherit', boxShadow: '4px 0 8px -4px rgba(0,0,0,0.1)' };
    }
    return {};
  };

  const renderCell = (val, colName) => {
    if (val === null || val === undefined || val === "") return "--";
    return String(val);
  };

  return (
    <div className="w-full bg-surface rounded-2xl shadow-[var(--shadow-default)] overflow-hidden flex flex-col border border-border-outline">
      {/* Table Header Section */}
      <div className="p-6 border-b border-border-outline flex flex-col md:flex-row justify-between md:items-center gap-4 bg-surface">
        <div>
          <h2 className="text-[20px] font-bold text-text-primary mb-1">SSB Demand Tracking</h2>
          <p className="text-[14px] text-text-secondary">Managing engineering demand lifecycle</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleOpenUploadModal}
            className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-text-secondary" />
            Bulk Upload
          </button>
          <button 
            onClick={handleDownloadTemplate}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {isDownloading ? (
              <RefreshCcw className="w-4 h-4 text-text-secondary animate-spin" />
            ) : (
              <FileText className="w-4 h-4 text-text-secondary" />
            )}
            {isDownloading ? "Downloading..." : "Template"}
          </button>
          <button
            onClick={handleDownloadData}
            className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
            <Download className="w-4 h-4 text-text-secondary" />
            Download Data
          </button>
        </div>
      </div>

      {/* Table Content */}
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
                <tr className="bg-surface-container border-b border-border-outline">
                  {finalCols.map((col, idx) => (
                    <th key={idx} style={getStickyStyle(col.colName, true)} className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                      {col.colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIdx) => (
                    <tr key={rowIdx} className={`border-b border-border-outline/50 hover:bg-blue-50 transition-colors cursor-pointer ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                      {finalCols.map((col, colIdx) => {
                        if (col.isAction) {
                          return (
                            <td key={colIdx} className="px-6 py-3 h-[56px] align-middle text-center">
                              <div className="flex items-center justify-center gap-2 text-text-secondary">
                                <button className="p-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors cursor-pointer" title="Edit">
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" title="Delete">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          );
                        }
                        const val = row[col.originalIndex];
                        return (
                          <td key={colIdx} style={getStickyStyle(col.colName, false)} className="px-6 py-3 h-[56px] align-middle text-text-primary text-[13px] bg-inherit">
                            {renderCell(val, col.colName)}
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
          </>
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

      {/* Bulk Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        file={file}
        onFileSelect={handleFileSelect}
        onRemoveFile={reset}
        onPrimaryAction={handlePreviewClick}
        title="Bulk Upload"
        acceptedExts={['xlsx']}
        acceptedLabel="XLSX (Max 25MB)"
        primaryLabel="Preview & Save"
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        isPreviewLoading={isPreviewLoading}
      />

      {/* Preview Modal */}
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
