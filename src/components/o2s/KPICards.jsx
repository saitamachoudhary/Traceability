import { useOrderToShipmentKpi } from '../../hooks/useOrderToShipmentKpi';
import MonthlySalesChart from '../charts/MonthlySalesChart';

export default function KPICards({ dateRange }) {
  const { data, loading } = useOrderToShipmentKpi(dateRange || { date_from: "", date_to: "" });

  const formatNumber = (num) => {
    if (num === 0 || num === null || num === undefined) return '0';
    if (!Number(num)) return '0';
    return Number(num).toLocaleString('en-US');
  };

  const formatLargeNumber = (num) => {
    if (num === 0 || num === null || num === undefined) return '0';
    if (!Number(num)) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Number(num).toLocaleString('en-US');
  };

  const formatPercent = (num) => {
    if (num === 0 || num === null || num === undefined) return '0.00%';
    return Number(num).toFixed(2) + '%';
  };

  const renderValue = (value, formatter, isPlaceholder = false) => {
    if (loading) return <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>;
    if (value === "No Data" || isPlaceholder) return "No Data";
    return formatter ? formatter(value) : value;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 grid-rows-none lg:grid-rows-[auto_auto] gap-6">

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Total Orders</h3>
        <div className={`text-[32px] font-bold ${data.totalOrders === "No Data" ? 'text-[#CBD5E1]' : 'text-text-primary'}`}>
          {renderValue(data.totalOrders, formatNumber)}
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Total Order Value</h3>
        <div className={`text-[32px] font-bold ${data.totalOrderValue === "No Data" ? 'text-[#CBD5E1]' : 'text-text-primary'}`}>
          {renderValue(data.totalOrderValue, formatLargeNumber)}
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Avg. Lead Time</h3>
        <div className={`flex items-baseline gap-2 ${data.avgLeadTime === "No Data" ? 'text-[#CBD5E1]' : 'text-text-primary'}`}>
          <span className="text-[32px] font-bold">{renderValue(data.avgLeadTime, formatNumber)}</span>
          {data.avgLeadTime !== "No Data" && !loading && (
            <span className="text-[14px] font-bold text-[#64748B] ml-1">Days</span>
          )}
        </div>
      </div>

      {/* Right Column: Tall and Wide Chart Widget */}
      <div className="lg:col-span-6 lg:row-span-2 md:col-span-6 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow relative overflow-hidden flex flex-col min-h-[220px]">
        <div className="absolute top-6 right-6 bg-secondary-container text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          OFFICIAL KPI
        </div>
        <h3 className="text-[14px] font-bold text-text-primary mb-1">Monthly Sales</h3>
        <p className="text-[12px] text-text-secondary mb-4">Yearly Performance Trend</p>

        <MonthlySalesChart filters={dateRange} />
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">In Manufacturing</h3>
        <div className={`text-[32px] font-bold ${data.inManufacturing === "No Data" ? 'text-[#CBD5E1]' : 'text-text-primary'}`}>
          {renderValue(data.inManufacturing, formatNumber)}
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Delivered</h3>
        <div className={`text-[32px] font-bold ${data.delivered === "No Data" ? 'text-[#CBD5E1]' : 'text-text-primary'}`}>
          {renderValue(data.delivered, formatNumber)}
        </div>
      </div>

      <div className={`lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow border ${data.otdRate === "No Data" ? 'border-[#EEF2F7]' : 'border-[var(--color-primary)]/20'}`}>
        <h3 className={`text-[12px] font-bold uppercase tracking-wider mb-2 ${data.otdRate === "No Data" ? 'text-text-secondary' : 'text-primary'}`}>OTD Rate</h3>
        <div className={`text-[32px] font-bold ${data.otdRate === "No Data" ? 'text-[#CBD5E1]' : 'text-primary'}`}>
          {renderValue(data.otdRate, formatPercent)}
        </div>
      </div>

    </div>
  );
}

