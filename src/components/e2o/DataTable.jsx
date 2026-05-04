import { Plus, Upload, FileSpreadsheet, RefreshCcw, Edit2, FileText, Paperclip, Trash2 } from 'lucide-react';

const mockData = [
  {
    id: 'PRJ-2024-X102',
    name: 'Wind Turbine Assembly',
    date: '12 Oct 2023',
    status: 'Executed',
    currency: 'USD',
    value: '$1,420,000',
    sm: 'John Smith',
    smInitials: 'JS',
    customerStatus: 'AWAITING PO'
  },
  {
    id: 'PRJ-2024-K449',
    name: 'Solar Array Optimization',
    date: '28 Oct 2023',
    status: 'Non Executed',
    currency: 'EUR',
    value: '€890,000',
    sm: 'Maria Anders',
    smInitials: 'MA',
    customerStatus: 'REVISION REQ.'
  },
  {
    id: 'PRJ-2023-V912',
    name: 'Hydro Plant Refurbishment',
    date: '05 Nov 2023',
    status: 'Draft',
    currency: 'USD',
    value: '$2,100,000',
    sm: 'Robert King',
    smInitials: 'RK',
    customerStatus: 'INTERNAL REVIEW'
  }
];

export default function DataTable() {
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
          <button className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors">
            <Upload className="w-4 h-4 text-text-secondary" />
            Bulk Upload
          </button>
          <button className="flex items-center gap-2 bg-white border border-border-outline hover:bg-surface-container text-text-primary px-4 py-2 rounded-lg text-[14px] font-medium transition-colors">
            <FileSpreadsheet className="w-4 h-4 text-text-secondary" />
            Template
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container/50 border-b border-border-outline sticky top-0 z-10">
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Projects</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">AHPL Offer Date</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Convert to Order</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Currency</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Offer Value</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Responsible SM</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider">Customer Status</th>
              <th className="px-6 py-4 text-[12px] font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, idx) => (
              <tr key={idx} className={`border-b border-border-outline/50 hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                <td className="px-6 py-3 h-[56px] align-middle">
                  <div className="font-bold text-[14px] text-primary">{row.id}</div>
                  <div className="text-[12px] text-text-secondary mt-0.5 max-w-[150px] truncate" title={row.name}>{row.name}</div>
                </td>
                <td className="px-6 py-3 h-[56px] align-middle text-[14px] text-text-primary whitespace-nowrap">{row.date}</td>
                <td className="px-6 py-3 h-[56px] align-middle">
                  <button className="flex items-center gap-1.5 bg-primary-container/10 text-primary hover:bg-primary-container/20 px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors">
                    <RefreshCcw className="w-3.5 h-3.5" />
                    Convert
                  </button>
                </td>
                <td className="px-6 py-3 h-[56px] align-middle">
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[12px] font-bold leading-tight
                    ${row.status === 'Executed' ? 'bg-green-100 text-green-800' : 
                      row.status === 'Non Executed' ? 'bg-orange-100 text-orange-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-3 h-[56px] align-middle text-[14px] text-text-primary font-medium">{row.currency}</td>
                <td className="px-6 py-3 h-[56px] align-middle text-[14px] text-text-primary font-bold">{row.value}</td>
                <td className="px-6 py-3 h-[56px] align-middle">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-surface-container border border-border-outline flex items-center justify-center text-[10px] font-bold text-text-secondary shrink-0">
                      {row.smInitials}
                    </div>
                    <span className="text-[13px] text-text-primary whitespace-nowrap font-medium">{row.sm}</span>
                  </div>
                </td>
                <td className="px-6 py-3 h-[56px] align-middle">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 bg-surface-container rounded-full text-[10px] font-bold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    {row.customerStatus}
                  </span>
                </td>
                <td className="px-6 py-3 h-[56px] align-middle">
                  <div className="flex items-center justify-end gap-2 text-text-secondary">
                    <button className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><FileText className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><Paperclip className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:text-primary transition-colors hover:bg-surface-container rounded-md cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-border-outline flex items-center justify-between bg-white">
        <div className="text-[13px] text-text-secondary">
          Showing 1 to 3 of 225 entries
        </div>
        <div className="flex items-center justify-end gap-1.5">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer">
            <span className="text-sm font-bold">&lt;</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold shadow-sm cursor-pointer transition-colors">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-border-outline text-text-secondary hover:bg-surface-container transition-colors bg-white shadow-sm cursor-pointer">
            <span className="text-sm font-bold">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
