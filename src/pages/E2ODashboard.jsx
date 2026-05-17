import EmbeddedDashboard from '../components/common/EmbeddedDashboard';

const DASHBOARD_URL =
  'https://apphub.andritz.com/embed/?lumenore-object-id=58de69ce-e9ab-49cb-8d68-39859b8edf8c&lumenore-object-type=dashboard&lumenore-object-name=Andritz';

export default function E2ODashboard() {
  return (
    <EmbeddedDashboard
      title="E2O Dashboard"
      url={DASHBOARD_URL}
      iframeId="e2o-dashboard-iframe"
      backButtonId="e2o-dashboard-back-btn"
    />
  );
}
