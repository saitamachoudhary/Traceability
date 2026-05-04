import { useEnquiryKpi } from '../../hooks/useEnquiryKpi';

export default function KPICards({ filters }) {
  const { data, isLoading, error } = useEnquiryKpi(filters || { date_from: "", date_to: "" });

  const formatNumber = (num) => {
    if (num === 0 || num === null || num === undefined) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(4) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatPercent = (num) => {
    if (num === 0 || num === null || num === undefined) return '0.00%';
    return num.toFixed(2) + '%';
  };

  const renderValue = (value, formatter) => {
    if (error) return <span className="text-red-500 text-[24px]">-</span>;
    if (isLoading) return <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-2"></div>;
    return formatter(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 grid-rows-none lg:grid-rows-[auto_auto] gap-6">

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Total Offer Value</h3>
        <div className="text-[32px] font-bold text-primary">{renderValue(data.totalOffer, formatNumber)}</div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">TUR Packages</h3>
        <div className="text-[32px] font-bold text-text-primary">{renderValue(data.tur, formatNumber)}</div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">DIRECT_AT Packages</h3>
        <div className="text-[32px] font-bold text-text-primary">{renderValue(data.directAt, formatNumber)}</div>
      </div>

      {/* Right Column: Tall and Wide Conversion Rate Widget */}
      <div className="lg:col-span-6 lg:row-span-2 md:col-span-6 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow relative overflow-hidden flex flex-col min-h-[220px]">
        <div className="absolute top-6 right-6 bg-secondary-container text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          OFFICIAL KPI
        </div>
        <h3 className="text-[14px] font-bold text-text-primary mb-1">Conversion Rate</h3>
        <p className="text-[12px] text-text-secondary mb-4">Yearly Performance Trend</p>

        {/* Mini Chart Placeholder */}
        <div className="flex items-end gap-1 h-12 mb-4 flex-grow relative mt-8">
          <div className="w-full bg-surface-container rounded-t h-[20%]"></div>
          <div className="w-full bg-surface-container rounded-t h-[30%]"></div>
          <div className="w-full bg-surface-container rounded-t h-[40%]"></div>
          <div className="w-full bg-surface-container rounded-t h-[50%]"></div>
          <div className="w-full bg-primary rounded-t h-[80%] relative group">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-bold text-primary whitespace-nowrap bg-secondary-container px-1.5 py-0.5 rounded shadow-sm opacity-100 transition-opacity">
              {isLoading ? "..." : formatPercent(data.conversion)}
            </span>
          </div>
          <div className="w-full bg-surface-container rounded-t h-[45%]"></div>
          <div className="w-full bg-surface-container rounded-t h-[35%]"></div>
        </div>

        <div className="flex justify-between items-center text-[12px] font-medium bg-surface-container/50 -mx-6 -mb-6 px-6 py-4 border-t border-border-outline/50 mt-auto">
          <span className="text-text-secondary">Overall Conversion Rate</span>
          <span className="text-primary font-bold text-[14px]">
            {isLoading ? <div className="h-4 w-12 bg-gray-200 animate-pulse rounded inline-block"></div> : formatPercent(data.conversion)}
          </span>
        </div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Executed Projects</h3>
        <div className="text-[32px] font-bold text-text-primary">{renderValue(data.executed, formatNumber)}</div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow">
        <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">Non Executed</h3>
        <div className="text-[32px] font-bold text-text-primary">{renderValue(data.nonExecuted, formatNumber)}</div>
      </div>

      <div className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow border border-[var(--color-primary)]/20">
        <h3 className="text-[12px] font-bold text-primary uppercase tracking-wider mb-2">Enquiry to Offer Conv.</h3>
        <div className="text-[32px] font-bold text-primary">{renderValue(data.conversion, formatPercent)}</div>
      </div>

    </div>
  );
}
