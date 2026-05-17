import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Pencil, Trash2, Download, RefreshCcw } from 'lucide-react';

import DataTable from '../common/DataTable';
import FileUploadModal from '../e2o/FileUploadModal';
import PreviewModal from '../e2o/PreviewModal';
import ConfirmationModal from '../common/ConfirmationModal';

import { useO2STable } from '../../hooks/useO2STable';
import { useBulkUpload } from '../../hooks/useBulkUpload';
import { useDownloadTemplate } from '../../hooks/useDownloadTemplate';
import { useDeleteRecord } from '../../hooks/useDeleteRecord';
import { saveO2SUploadedData } from '../../utils/uploadApi';
import { deleteShipmentRow } from '../../services/orderToShipmentService';
import { downloadExcel } from '../../utils/downloadExcel';

const STICKY_SCHEMA = [
  { match: 'project code/wbs', width: 160, offset: 0 },
  { match: 'project name',     width: 180, offset: 160 },
  { match: 'customer name',    width: 180, offset: 340, withShadow: true },
];

const HIDDEN_COLUMNS = ['Edit', 'Delete'];

const TEMPLATE_CONFIG = {
  tableName: 'order_to_shipment_new',
  fileName:  'order_to_shipment_template.xlsx',
  columns: [
    'project_name', 'customer_name', 'backlog_hot', 'project_category', 'oi_month',
    'scope_description', 'location_hip_hib', 'order_value_inr', 'precal_gross_profit_inr',
    'precal_cogs_II', 'cogsII_act_comt', 'cogsII_fcst_act_comt_tbc', 'invoice_date',
    'invoice_value', 'bom_or_sap_specs_ready_for_purchase_requistion_actual',
    'pr_raised_by_ppc_and_pm_actual', 'placement_of_po_by_scm_actual',
    'raw_material_material_receipt_grn_planned', 'raw_material_material_receipt_grn_actual',
    'manufacturing_packing_and_dispatch_actuals', 'contractual_delivery_date',
    'expected_delivery_date',
  ],
};

export default function O2SDataTable({ filters, dateRange, refreshTrigger, onRefresh }) {
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen]   = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const tableFilters = {
    customer:  filters?.customer  || '',
    projects:  filters?.projects  || '',
    date_from: dateRange?.date_from || '',
    date_to:   dateRange?.date_to   || '',
  };

  const { data, columns, loading, refresh } = useO2STable(tableFilters, refreshTrigger);

  const { isDeleting, showConfirmModal, openDeleteModal, closeDeleteModal, handleDelete } =
    useDeleteRecord(deleteShipmentRow, onRefresh || refresh);

  const {
    file, previewData, isUploading, uploadProgress, isPreviewLoading, isSaving,
    handleFileSelect, handlePreview, handleSave, reset,
  } = useBulkUpload(saveO2SUploadedData);

  const { isDownloading, handleDownload: handleDownloadTemplate } =
    useDownloadTemplate(TEMPLATE_CONFIG);

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

  const downloadData = () => downloadExcel(columns, data, 'Order_To_Shipment_Data.csv');

  const toolbarActions = (
    <>
      <button
        onClick={openUploadModal}
        className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
        <Upload className="w-4 h-4 text-text-secondary" />
        Bulk Upload
      </button>
      <button
        onClick={handleDownloadTemplate}
        disabled={isDownloading}
        className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
        {isDownloading
          ? <RefreshCcw className="w-4 h-4 text-text-secondary animate-spin" />
          : <FileText  className="w-4 h-4 text-text-secondary" />}
        {isDownloading ? 'Downloading...' : 'Template'}
      </button>
      <button
        onClick={downloadData}
        className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
        <Download className="w-4 h-4 text-text-secondary" />
        Download Data
      </button>
    </>
  );

  const renderRowActions = (row, { rowId }) => (
    <div className="flex items-center justify-center gap-2 text-text-secondary">
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/o2s/edit/${rowId}`); }}
        className="p-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); openDeleteModal(rowId); }}
        className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
        title="Delete"
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
    </>
  );
}
