import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, LayoutDashboard } from 'lucide-react';
import { postSessionToIframe } from '../../utils/auth';

/**
 * Generic full-screen embedded dashboard wrapper used by both E2O and O2S
 * analytics pages. Differences between them are now just props.
 */
export default function EmbeddedDashboard({ title, url, iframeId, backButtonId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  const handleLoad = () => {
    postSessionToIframe(iframeRef.current);
    setLoading(false);
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="flex items-center justify-between px-6 h-12 shrink-0 bg-surface">
        <button
          id={backButtonId}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors duration-150 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" />
          Back to Home
        </button>

        <div className="flex items-center gap-2 text-[13px] font-semibold text-text-primary">
          <LayoutDashboard className="w-4 h-4 text-secondary" />
          {title}
        </div>

        <div className="w-[110px]" />
      </div>

      <div className="relative flex-1 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[var(--color-background)]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-[14px] font-medium text-text-secondary">Loading dashboard…</p>
          </div>
        )}

        <iframe
          ref={iframeRef}
          id={iframeId}
          src={url}
          title={title}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
