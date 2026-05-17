import * as Highcharts from 'highcharts';
import _HighchartsReact from 'highcharts-react-official';

// `highcharts-react-official` ships its component as a default export in one
// build form and as a CommonJS module in another. This interop handles both.
const HighchartsReact = _HighchartsReact.default || _HighchartsReact;

/**
 * Thin wrapper around Highcharts that lives in one place so the ESM/CJS
 * interop hack isn't repeated in every chart component.
 */
export default function HighchartsWrapper({ options }) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
