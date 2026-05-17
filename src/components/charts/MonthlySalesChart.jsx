import { useMemo } from 'react';
import HighchartsWrapper from '../common/HighchartsWrapper';
import { useOrderToShipmentChart } from '../../hooks/useOrderToShipmentChart';

const buildChartOptions = (chartData) => ({
  chart: { type: 'spline', backgroundColor: 'transparent', height: 220 },
  title: { text: null },
  xAxis: {
    categories: chartData.categories,
    lineColor: '#e1e2e8',
    labels: { style: { color: '#64748B', fontSize: '12px' } },
  },
  yAxis: {
    title: { text: null },
    gridLineColor: '#E2E8F0',
    labels: { style: { color: '#64748B', fontSize: '11px' } },
  },
  tooltip: {
    backgroundColor: '#004274',
    borderWidth: 0,
    borderRadius: 12,
    shadow: true,
    style: { color: '#ffffff', fontSize: '12px' },
    useHTML: true,
    formatter: function () {
      return `<div style="padding: 4px 8px;">
        <div style="font-weight: 700; margin-bottom: 4px;">${this.key}</div>
        <div style="opacity: 0.9;">Monthly Sales:<br/><b>${Number(this.y).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 3 })}</b></div>
      </div>`;
    },
  },
  legend: { enabled: false },
  credits: { enabled: false },
  plotOptions: {
    spline: {
      lineWidth: 4,
      color: '#0057A3',
      marker: {
        enabled: true,
        radius: 5,
        fillColor: '#0057A3',
        lineWidth: 2,
        lineColor: '#FFFFFF',
      },
    },
  },
  series: [{ name: 'Monthly Sales', data: chartData.monthlySales }],
});

export default function MonthlySalesChart({ filters, refreshTrigger = 0 }) {
  const { chartData, loading, error } = useOrderToShipmentChart(filters || { date_from: "", date_to: "" }, refreshTrigger);

  const chartOptions = useMemo(
    () => (chartData ? buildChartOptions(chartData) : null),
    [chartData]
  );

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[220px]">
        <div className="animate-pulse flex flex-col items-center gap-4 w-full h-full justify-center">
          <div className="h-[200px] w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !chartData || !chartData.monthlySales || chartData.monthlySales.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center text-text-secondary min-h-[220px] bg-gray-50 rounded-lg">
        No Data Available
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <HighchartsWrapper options={chartOptions} />
    </div>
  );
}
