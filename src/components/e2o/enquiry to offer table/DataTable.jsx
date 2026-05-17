import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Upload, FileSpreadsheet, RefreshCcw, Edit2, FileText,
  Paperclip, Trash2, ArrowLeftRight, Download,
} from 'lucide-react';

import DataTable from '../../common/DataTable';
import StatusBadge from '../../common/StatusBadge';
import FileUploadModal from '../FileUploadModal';
import PreviewModal from '../PreviewModal';
import ConfirmationModal from '../../common/ConfirmationModal';
import ViewDocumentModal from '../../ViewDocumentModal';

import { useEnquiryTable }    from '../../../hooks/useEnquiryTable';
import { useBulkUpload }      from '../../../hooks/useBulkUpload';
import { useDeleteRecord }    from '../../../hooks/useDeleteRecord';
import { useConvertToOrder }  from '../../../hooks/useConvertToOrder';
import { useUploadDocument }  from '../../../hooks/useUploadDocument';
import { useDocumentViewer }  from '../../../hooks/useDocumentViewer';

import { downloadTemplate, deleteEnquiryRow } from '../../../services/enquiryToOfferService';
import { downloadExcel } from '../../../utils/downloadExcel';
import { formatTableDate } from '../../../utils/tableHelpers';

const STICKY_SCHEMA = [
  { match: ['offer_reference_no', 'offer reference no'], width: 160, offset: 0 },
  { match: 'customer',                                   width: 140, offset: 160 },
  { match: ['projects', 'project'],                      width: 180, offset: 300, withShadow: true },
];

const HIDDEN_COLUMNS = ['Edit', 'Delete', 'View Docs', 'Attach Docs', 'Convert To Order'];

// Per-cell renderer for the E2O table (status badges, bold project name,
// formatted dates, etc).
const renderE2OCell = (val, colName) => {
  if (val === null || val === undefined || val === '') return '--';
  const lower = colName.toLowerCase();

  if (lower.includes('project'))      return <span className="font-bold text-[#005A9B] hover:underline cursor-pointer">{String(val)}</span>;
  if (lower.includes('offer value'))  return <span className="font-bold">{String(val)}</span>;

  if (lower === 'status' || lower.includes('ahpl_offer_status') || lower.includes('ahpl offer status')) {
    return <StatusBadge value={val} kind="offer" />;
  }
  if (lower.includes('customer status') || lower.includes('customer_enquiry_status')) {
    return <StatusBadge value={val} kind="customer" />;
  }
  if (lower.includes('date')) return formatTableDate(val);
  return String(val);
};

export default function E2ODataTable({ filters, dateRange, refreshTrigger, onRefresh }) {
  const navigate = useNavigate();
  const [downloadLoading, setDownloadLoading]       = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen]   = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const tableFilters = {
    customer:     filters?.customer || '',
    projects:     filters?.projects || '',
    package_type: filters?.packages || '',
    date_from:    dateRange?.date_from || '',
    date_to:      dateRange?.date_to   || '',
  };

  const { data, columns, loading, refresh } = useEnquiryTable(tableFilters, refreshTrigger);

  const {
    file, previewData, isUploading, uploadProgress, isPreviewLoading, isSaving,
    handleFileSelect, handlePreview, handleSave, reset,
  } = useBulkUpload();

  const { isDeleting, showConfirmModal, openDeleteModal, closeDeleteModal, handleDelete } =
    useDeleteRecord(deleteEnquiryRow, onRefresh || refresh);

  const { isConverting, convertingId, handleConvertToOrder } =
    useConvertToOrder(onRefresh || refresh);

  // Table-only refresh for attach-document flow (filters/KPIs don't need to refetch).
  const {
    file: docFile,
    isUploading: isDocUploading,
    isSaving: isDocSaving,
    isModalOpen: isDocModalOpen,
    openModal: openDocModal,
    closeModal: closeDocModal,
    handleFileSelect: handleDocFileSelect,
    handleRemoveFile: handleDocRemoveFile,
    handleSave: handleDocSave,
  } = useUploadDocument(refresh);

  const {
    isModalOpen: isViewDocModalOpen,
    documentUrl,
    isDownloading,
    openViewModal,
    closeModal: closeViewDocModal,
    handleDownload: handleDocDownload,
  } = useDocumentViewer();

  const handleDownloadTemplate = async () => {
    setDownloadLoading(true);
    try {
      await downloadTemplate();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadLoading(false);
    }
  };

  const downloadData = () => downloadExcel(columns, data);

  const openUploadModal = () => { reset(); setIsUploadModalOpen(true); };
  const closeUploadModal = () => { setIsUploadModalOpen(false); reset(); };

  const onPreviewClick = async () => {
    await handlePreview();
    setIsUploadModalOpen(false);
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => { setIsPreviewModalOpen(false); reset(); };

  const onFinalSave = () => handleSave(() => {
    setIsPreviewModalOpen(false);
    reset();
    (onRefresh || refresh)();
  });

  const toolbarActions = (
    <>
      <button
        onClick={() => navigate('/e2o/add')}
        className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-[14px] font-bold transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Add New
      </button>
      <button
        onClick={openUploadModal}
        className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
        <Upload className="w-4 h-4 text-text-secondary" />
        Bulk Upload
      </button>
      <button
        onClick={handleDownloadTemplate}
        disabled={downloadLoading}
        className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
        {downloadLoading
          ? <RefreshCcw      className="w-4 h-4 text-text-secondary animate-spin" />
          : <FileSpreadsheet className="w-4 h-4 text-text-secondary" />}
        {downloadLoading ? 'Downloading...' : 'Template'}
      </button>
      <button
        onClick={downloadData}
        className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
        <Download className="w-4 h-4 text-text-secondary" />
        Download Data
      </button>
    </>
  );

  const renderRowActions = (row, { rowId, docPath }) => (
    <div className="flex items-center gap-2 text-text-secondary">
      <button
        title="Convert to Order"
        disabled={isConverting}
        onClick={(e) => {
          e.stopPropagation();
          if (rowId != null) handleConvertToOrder(rowId);
        }}
        className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer disabled:opacity-50"
      >
        {convertingId === rowId
          ? <RefreshCcw     className="w-4 h-4 animate-spin" />
          : <ArrowLeftRight className="w-4 h-4" />}
      </button>
      <button
        title="Edit"
        onClick={(e) => {
          e.stopPropagation();
          if (rowId != null) navigate(`/e2o/edit/${rowId}`);
        }}
        className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        title="View Docs"
        onClick={(e) => { e.stopPropagation(); openViewModal(docPath); }}
        className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"
      >
        <FileText className="w-4 h-4" />
      </button>
      <button
        title="Attach Docs"
        onClick={(e) => {
          e.stopPropagation();
          if (rowId != null) openDocModal(rowId);
        }}
        className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"
      >
        <Paperclip className="w-4 h-4" />
      </button>
      <button
        title="Delete"
        onClick={(e) => {
          e.stopPropagation();
          if (rowId != null) openDeleteModal(rowId);
        }}
        className="p-1.5 hover:text-red-600 transition-colors hover:bg-red-50 rounded-md cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <>
      <DataTable
        title="SSB Demand Tracking"
        subtitle="Managing engineering demand lifecycle"
        columns={columns}
        data={data}
        loading={loading}
        stickySchema={STICKY_SCHEMA}
        hiddenColumns={HIDDEN_COLUMNS}
        renderCell={renderE2OCell}
        toolbarActions={toolbarActions}
        renderRowActions={renderRowActions}
      />

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={closeUploadModal}
        file={file}
        onFileSelect={handleFileSelect}
        onRemoveFile={reset}
        onPrimaryAction={onPreviewClick}
        title="Bulk Upload"
        acceptedExts={['xlsx']}
        acceptedLabel="XLSX (Max 25MB)"
        primaryLabel="Preview & Save"
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        isPreviewLoading={isPreviewLoading}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        onSave={onFinalSave}
        previewData={previewData}
        isSaving={isSaving}
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <FileUploadModal
        isOpen={isDocModalOpen}
        onClose={closeDocModal}
        file={docFile}
        onFileSelect={handleDocFileSelect}
        onRemoveFile={handleDocRemoveFile}
        onPrimaryAction={handleDocSave}
        title="Upload Document"
        acceptedExts={['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xlsx', 'xls']}
        acceptedLabel="PDF, PNG, JPG, JPEG, DOC, DOCX, XLSX, XLS (Max 25MB)"
        primaryLabel="Upload & Save"
        isUploading={isDocUploading}
        isSaving={isDocSaving}
      />

      <ViewDocumentModal
        isOpen={isViewDocModalOpen}
        documentUrl={documentUrl}
        isDownloading={isDownloading}
        onClose={closeViewDocModal}
        onDownload={handleDocDownload}
      />
    </>
  );
}
