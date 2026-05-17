import { useOrderToShipmentKpi } from '../../hooks/useOrderToShipmentKpi';
import MonthlySalesChart from '../charts/MonthlySalesChart';
import KpiDashboard from '../common/KpiDashboard';

const formatNumber = (num) => {
  if (num === 0 || num === null || num === undefined) return '0';
  if (!Number(num)) return '0';
  return Number(num).toLocaleString('en-US');
};

const formatLargeNumber = (num) => {
  if (num === 0 || num === null || num === undefined) return '0';
  if (!Number(num)) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
  if (num >= 1000)    return (num / 1000).toFixed(1) + 'K';
  return Number(num).toLocaleString('en-US');
};

const formatPercent = (num) => {
  if (num === 0 || num === null || num === undefined) return '0.00%';
  return Number(num).toFixed(2) + '%';
};

// Wraps a formatter so any "No Data" sentinel value short-circuits to the
// dimmed-styled "No Data" string.
const renderOrNoData = (val, formatter) =>
  val === 'No Data' ? 'No Data' : formatter(val);

export default function KPICards({ dateRange, refreshTrigger = 0 }) {
  const { data, loading } =
    useOrderToShipmentKpi(dateRange || { date_from: '', date_to: '' }, refreshTrigger);

  const isNoData = (v) => v === 'No Data';

  const cards = [
    { label: 'Total Orders',      value: renderOrNoData(data.totalOrders,     formatNumber),       loading, noData: isNoData(data.totalOrders) },
    { label: 'Total Order Value', value: renderOrNoData(data.totalOrderValue, formatLargeNumber),  loading, noData: isNoData(data.totalOrderValue) },
    {
      label: 'Avg. Lead Time',
      value: renderOrNoData(data.avgLeadTime, formatNumber),
      loading,
      noData: isNoData(data.avgLeadTime),
      suffix: 'Days',
    },
    { label: 'In Manufacturing',  value: renderOrNoData(data.inManufacturing, formatNumber),       loading, noData: isNoData(data.inManufacturing) },
    { label: 'Delivered',         value: renderOrNoData(data.delivered,       formatNumber),       loading, noData: isNoData(data.delivered) },
    {
      label: 'OTD Rate',
      value: renderOrNoData(data.otdRate, formatPercent),
      loading,
      noData: isNoData(data.otdRate),
      highlight: !isNoData(data.otdRate),
    },
  ];

  return (
    <KpiDashboard
      cards={cards}
      chartTitle="Monthly Sales"
      chartSubtitle="Yearly Performance Trend"
      chartSlot={<MonthlySalesChart filters={dateRange} refreshTrigger={refreshTrigger} />}
    />
  );
}
