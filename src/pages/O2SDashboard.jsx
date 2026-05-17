import EmbeddedDashboard from '../components/common/EmbeddedDashboard';

const DASHBOARD_URL =
  'https://apphub.andritz.com/embed/?lumenore-object-id=e640c13e-75a0-4bec-8b18-b7e11464ad03&lumenore-object-type=dashboard&lumenore-object-name=Andritz';

export default function O2SDashboard() {
  return (
    <EmbeddedDashboard
      title="O2S Dashboard"
      url={DASHBOARD_URL}
      iframeId="o2s-dashboard-iframe"
      backButtonId="o2s-dashboard-back-btn"
    />
  );
}
