import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, LayoutDashboard } from 'lucide-react';
import { postSessionToIframe } from '../utils/auth';

const DASHBOARD_URL =
  'https://apphub.andritz.com/embed/?lumenore-object-id=e640c13e-75a0-4bec-8b18-b7e11464ad03&lumenore-object-type=dashboard&lumenore-object-name=Andritz';

export default function O2SDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  const handleLoad = () => {
    postSessionToIframe(iframeRef.current);
    setLoading(false);
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>

      {/* ── Sub-header bar ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 h-12 shrink-0 bg-surface">

        {/* Left: back button */}
        <button
          id="o2s-dashboard-back-btn"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-150 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
          Back to Home
        </button>

        {/* Centre: page title */}
        <div className="flex items-center gap-2 text-[13px] font-semibold text-text-primary">
          <LayoutDashboard className="w-4 h-4 text-secondary" />
          O2S Dashboard
        </div>

        {/* Right: spacer to keep title visually centred */}
        <div className="w-[110px]" />
      </div>

      {/* ── Content area ──────────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--color-background)]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-[14px] font-medium text-text-secondary">Loading dashboard…</p>
          </div>
        )}

        {/* Dashboard iframe */}
        <iframe
          ref={iframeRef}
          id="o2s-dashboard-iframe"
          src={DASHBOARD_URL}
          title="O2S Dashboard"
          className="w-full h-full border-0"
          onLoad={handleLoad}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
