import * as Highcharts from 'highcharts';
import _HighchartsReact from 'highcharts-react-official';
const HighchartsReact = _HighchartsReact.default || _HighchartsReact;

export default function KPICards() {
  const chartOptions = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      height: 220,
    },
    title: { text: null },
    xAxis: {
      categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      lineColor: '#e1e2e8',
      labels: {
        style: { color: "#414750", fontSize: "12px" }
      }
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#eceef4',
      labels: {
        style: { color: '#64748B', fontSize: '11px' }
      },
      min: 0,
      max: 20
    },
    tooltip: {
      backgroundColor: '#004274',
      borderWidth: 0,
      borderRadius: 8,
      shadow: true,
      style: { color: '#FFFFFF', fontSize: '12px' },
      useHTML: true,
      formatter: function() {
        return `<div style="padding: 4px 8px;">
          <div style="font-weight: 700; margin-bottom: 2px;">${this.key} 2024</div>
          <div style="opacity: 0.9;">Vol: 1,420 kWh</div>
        </div>`;
      }
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
          lineColor: '#FFFFFF'
        }
      }
    },
    series: [{
      name: 'Monthly Sales',
      data: [4.35, 8.12, 6.45, 13.33, 11.20, 18.90]
    }]
  };

  const kpis = [
    { label: 'Total Orders', value: '12' },
    { label: 'Total Order Value', value: '29.82M' },
    { label: 'Avg. Lead Time', value: '307', unit: 'Days' },
    { label: 'In Manufacturing', value: '17%' },
    { label: 'Pending Dispatch', value: 'No Data', isPlaceholder: true },
    { label: 'Delivered', value: '8%', highlighted: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 grid-rows-none lg:grid-rows-[auto_auto] gap-6">
      {/* KPI Cards - first 3 */}
      {kpis.slice(0, 3).map((kpi, idx) => (
        <div 
          key={idx}
          className="lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow border border-[#EEF2F7]"
        >
          <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">{kpi.label}</h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-[32px] font-bold ${kpi.isPlaceholder ? 'text-[#CBD5E1]' : 'text-[#0F172A]'}`}>
              {kpi.value}
            </span>
            {kpi.unit && !kpi.isPlaceholder && <span className="text-[14px] font-bold text-[#64748B] ml-1">{kpi.unit}</span>}
          </div>
        </div>
      ))}

      {/* Right Column: Tall and Wide Chart Widget */}
      <div className="lg:col-span-6 lg:row-span-2 md:col-span-6 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow relative overflow-hidden flex flex-col min-h-[220px]">
        <div className="absolute top-6 right-6 bg-secondary-container text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          OFFICIAL KPI
        </div>
        <h3 className="text-[14px] font-bold text-text-primary mb-1">Monthly Sales</h3>
        <p className="text-[12px] text-text-secondary mb-4">Yearly Performance Trend</p>

        <div className="flex-grow">
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </div>

        <div className="flex justify-between items-center text-[12px] font-medium bg-surface-container/50 -mx-6 -mb-6 px-6 py-4 border-t border-border-outline/50 mt-auto">
          <span className="text-text-secondary">Total Sales</span>
          <span className="text-primary font-bold text-[14px]">14M</span>
        </div>
      </div>

      {/* KPI Cards - remaining 3 */}
      {kpis.slice(3).map((kpi, idx) => (
        <div 
          key={idx + 3}
          className={`lg:col-span-2 md:col-span-2 bg-[#ffffff] rounded-[16px] p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] transition-shadow border ${kpi.highlighted ? 'border-[#B8D8FF] border-2' : 'border-[#EEF2F7]'}`}
        >
          <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider mb-2">{kpi.label}</h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-[32px] font-bold ${kpi.isPlaceholder ? 'text-[#CBD5E1]' : 'text-[#0F172A]'}`}>
              {kpi.value}
            </span>
            {kpi.unit && !kpi.isPlaceholder && <span className="text-[14px] font-bold text-[#64748B] ml-1">{kpi.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

