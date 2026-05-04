import * as Highcharts from 'highcharts';
import _HighchartsReact from 'highcharts-react-official';
const HighchartsReact = _HighchartsReact.default || _HighchartsReact;

import { useEnquiryKpi } from '../../hooks/useEnquiryKpi';
import { useEnquiryChart } from '../../hooks/useEnquiryChart';

export default function KPICards({ filters }) {
  const { data, isLoading, error } = useEnquiryKpi(filters || { date_from: "", date_to: "" });
  const { categories, series, isLoading: isChartLoading } = useEnquiryChart(filters || { date_from: "", date_to: "" });

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

  const getChartOptions = (categories, data) => ({
    chart: {
      type: "line",
      backgroundColor: "transparent",
      height: 220
    },
    title: { text: null },
    xAxis: {
      categories,
      lineColor: "#e1e2e8",
      labels: {
        style: { color: "#414750", fontSize: "12px" }
      }
    },
    yAxis: {
      title: { text: null },
      gridLineColor: "#eceef4"
    },
    tooltip: {
      useHTML: true,
      shared: true,
      formatter: function () {
        return `
          <div style="
            background:#004274;
            color:white;
            padding:8px 12px;
            border-radius:8px;
          ">
            <strong>${this.category}</strong><br/>
            ${this.y.toFixed(2)}%
          </div>
        `;
      }
    },
    legend: { enabled: false },
    credits: { enabled: false },
    series: [
      {
        name: "Conversion Rate",
        data,
        color: "#004274",
        marker: {
          enabled: true,
          radius: 4
        }
      }
    ]
  });

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

        {/* Highcharts Integration */}
        {isChartLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full h-[180px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Loading Performance Trend...
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            <HighchartsReact
              highcharts={Highcharts}
              options={getChartOptions(categories, series)}
            />
          </div>
        )}

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
