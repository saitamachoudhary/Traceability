import { useMemo } from 'react';
import { useEnquiryKpi } from '../../hooks/useEnquiryKpi';
import { useEnquiryChart } from '../../hooks/useEnquiryChart';
import KpiDashboard from '../common/KpiDashboard';
import HighchartsWrapper from '../common/HighchartsWrapper';

const formatNumber = (num) => {
  if (num === 0 || num === null || num === undefined) return '0';
  if (!Number(num)) return '0';
  return Number(num).toLocaleString('en-US');
};

const formatPercent = (num) => {
  if (num === 0 || num === null || num === undefined) return '0.00%';
  return num.toFixed(2) + '%';
};

const buildChartOptions = (categories, data) => ({
  chart: { type: 'line', backgroundColor: 'transparent', height: 220 },
  title: { text: null },
  xAxis: {
    categories,
    lineColor: '#e1e2e8',
    labels: { style: { color: '#414750', fontSize: '12px' } },
  },
  yAxis: { title: { text: null }, gridLineColor: '#eceef4' },
  tooltip: {
    useHTML: true,
    shared: true,
    formatter: function () {
      return `
        <div style="background:#004274;color:white;padding:8px 12px;border-radius:8px;">
          <strong>${this.category}</strong><br/>${this.y.toFixed(2)}%
        </div>`;
    },
  },
  legend: { enabled: false },
  credits: { enabled: false },
  series: [{
    name: 'Conversion Rate',
    data,
    color: '#004274',
    marker: { enabled: true, radius: 4 },
  }],
});

export default function KPICards({ filters, refreshTrigger }) {
  const { data, isLoading, error } =
    useEnquiryKpi(filters || { date_from: '', date_to: '' }, refreshTrigger);
  const { categories, series, isLoading: isChartLoading } =
    useEnquiryChart(filters || { date_from: '', date_to: '' }, refreshTrigger);

  const chartOptions = useMemo(
    () => buildChartOptions(categories, series),
    [categories, series]
  );

  const cards = [
    { label: 'Total Offer Value (MINR)', value: formatNumber(data.totalOffer), loading: isLoading, error: !!error, highlight: true },
    { label: 'TUR Packages',             value: formatNumber(data.tur),        loading: isLoading, error: !!error },
    { label: 'DIRECT_AT Packages',       value: formatNumber(data.directAt),   loading: isLoading, error: !!error },
    { label: 'Executed Projects',        value: formatNumber(data.executed),   loading: isLoading, error: !!error },
    { label: 'Non Executed',             value: formatNumber(data.nonExecuted),loading: isLoading, error: !!error },
    { label: 'Enquiry to Offer Conv.',   value: formatPercent(data.conversion),loading: isLoading, error: !!error, highlight: true },
  ];

  return (
    <KpiDashboard
      cards={cards}
      chartTitle="Conversion Rate"
      chartSubtitle="Yearly Performance Trend"
      chartLoading={isChartLoading}
      chartLoadingText="Loading Performance Trend..."
      chartSlot={
        <div className="flex-grow">
          <HighchartsWrapper options={chartOptions} />
        </div>
      }
    />
  );
}
