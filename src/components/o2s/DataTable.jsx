import { Plus, Upload, FileText, Pencil, Trash2, Download, RefreshCcw } from 'lucide-react';
import { downloadExcel } from '../../utils/downloadExcel';
import { useDownloadTemplate } from '../../hooks/useDownloadTemplate';

export default function DataTable() {
  const tableData = [
    {
      id: 'PRJ-2024-X102',
      subtext: 'Wind Turbine Assembly',
      plannedMfg: '12 Oct 2023',
      actualMfg: '15 Oct 2023',
      plannedReceipt: '20 Oct 2023',
      status: 'SHIPPED',
      statusColor: 'bg-green-100 text-green-700',
      value: '$1,420,000'
    },
    {
      id: 'PRJ-2024-K449',
      subtext: 'Solar Array Optimization',
      plannedMfg: '28 Oct 2023',
      actualMfg: 'In Progress',
      actualMfgStyle: 'text-text-secondary italic',
      plannedReceipt: '15 Nov 2023',
      status: 'MANUFACTURING',
      statusColor: 'bg-amber-100 text-amber-700',
      value: '€890,000'
    },
    {
      id: 'PRJ-2023-V912',
      subtext: 'Hydro Plant Refurbishment',
      plannedMfg: '05 Nov 2023',
      actualMfg: '10 Nov 2023',
      plannedReceipt: '22 Nov 2023',
      status: 'READY',
      statusColor: 'bg-blue-100 text-blue-700',
      value: '$2,100,000'
    }
  ];

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

  const handleDownloadData = () => {
    const columns = [
      { colName: 'Project Details' },
      { colName: 'Planned MFG.' },
      { colName: 'Actual MFG.' },
      { colName: 'Planned Receipt' },
      { colName: 'Status' },
      { colName: 'Offer Value' }
    ];
    const data = tableData.map(row => [
      row.id,
      row.plannedMfg,
      row.actualMfg,
      row.plannedReceipt,
      row.status,
      row.value
    ]);
    downloadExcel(columns, data, 'Order_To_Shipment_Data.csv');
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
          {/* <button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-[14px] font-bold transition-colors shadow-sm cursor-pointer">
            <Plus className="w-4 h-4" />
            Add New
          </button> */}
          <button className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer">
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
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-max">
          <thead>
            <tr className="bg-surface-container border-b border-border-outline">
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Project Details</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Planned MFG.</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Actual MFG.</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider">Planned Receipt</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider text-center">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider text-right">Offer Value</th>
              <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={row.id} className={`border-b border-border-outline/50 hover:bg-blue-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                <td className="px-6 py-3 h-[56px] align-middle">
                  <div className="font-bold text-[#005A9B] text-[13px] hover:underline transition-all">{row.id}</div>
                  <div className="text-text-secondary text-[11px] font-medium uppercase mt-0.5">{row.subtext}</div>
                </td>
                <td className="px-6 py-3 h-[56px] align-middle text-text-primary text-[13px]">{row.plannedMfg}</td>
                <td className={`px-6 py-3 h-[56px] align-middle text-[13px] ${row.actualMfgStyle || 'text-text-primary'}`}>{row.actualMfg}</td>
                <td className="px-6 py-3 h-[56px] align-middle text-text-primary text-[13px]">{row.plannedReceipt}</td>
                <td className="px-6 py-3 h-[56px] align-middle text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold ${row.statusColor}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-3 h-[56px] align-middle text-right text-text-primary font-bold text-[13px]">{row.value}</td>
                <td className="px-6 py-3 h-[56px] align-middle text-center">
                  <div className="flex items-center justify-center gap-2 text-text-secondary">
                    <button className="p-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors cursor-pointer" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-surface-container hover:text-primary transition-colors cursor-pointer" title="View Document">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

