import React, { useState, useEffect } from 'react';
import { X, Download, FileX, Loader2, File, FileText, FileSpreadsheet } from 'lucide-react';
import { getFileCategory, getFileExtension } from '../utils/documentUtils';

// ─── Fallback icon picker ─────────────────────────────────────────────────────
const FallbackIcon = ({ ext }) => {
  const spreadsheets = ['xlsx', 'xls', 'csv'];
  const documents = ['doc', 'docx', 'txt'];

  if (spreadsheets.includes(ext)) return <FileSpreadsheet className="w-16 h-16 text-emerald-500" />;
  if (documents.includes(ext)) return <FileText className="w-16 h-16 text-blue-500" />;
  return <File className="w-16 h-16 text-slate-400" />;
};

// ─── Preview renderer ──────────────────────────────────────────────────────────
const DocumentPreview = ({ url, onLoadSuccess, onLoadError }) => {
  const category = getFileCategory(url);
  const ext = getFileExtension(url);

  if (!url) {
    return (
      <div style={styles.fallbackCard}>
        <FileX className="w-16 h-16 text-slate-300" />
        <p style={styles.fallbackTitle}>No document available</p>
        <p style={styles.fallbackSub}>No file path was provided for this record.</p>
      </div>
    );
  }

  if (category === 'image') {
    return (
      <img
        src={url}
        alt="Document preview"
        style={styles.imagePreview}
        onLoad={onLoadSuccess}
        onError={onLoadError}
      />
    );
  }

  if (category === 'pdf') {
    return (
      <iframe
        src={url}
        title="PDF Preview"
        style={styles.pdfPreview}
        onLoad={onLoadSuccess}
        onError={onLoadError}
      />
    );
  }

  // Excel / Word / CSV / TXT — not previewable in browser
  if (category === 'unsupported') {
    onLoadSuccess?.(); // no async load needed
    return (
      <div style={styles.fallbackCard}>
        <FallbackIcon ext={ext} />
        <p style={styles.fallbackTitle}>File preview not available</p>
        <p style={styles.fallbackSub}>
          <strong>.{ext}</strong> files cannot be previewed in the browser.
          <br />Please download the document to view it.
        </p>
      </div>
    );
  }

  // Unknown extension
  onLoadSuccess?.();
  return (
    <div style={styles.fallbackCard}>
      <FileX className="w-16 h-16 text-slate-300" />
      <p style={styles.fallbackTitle}>Unable to preview document</p>
      <p style={styles.fallbackSub}>This file type is not supported for preview. Download the file to open it.</p>
    </div>
  );
};

// ─── Main modal ───────────────────────────────────────────────────────────────
export default function ViewDocumentModal({
  isOpen,
  documentUrl,
  isDownloading,
  onClose,
  onDownload
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset state whenever the URL or open state changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, documentUrl]);

  if (!isOpen) return null;

  const handleLoadSuccess = () => setIsLoading(false);
  const handleLoadError = () => { setIsLoading(false); setHasError(true); };

  const fileName = documentUrl ? documentUrl.split('/').pop() : 'document';
  const category = getFileCategory(documentUrl);

  return (
    // Backdrop
    <div style={styles.backdrop} onClick={onClose}>
      {/* Modal container — stop click propagation */}
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 style={styles.headerTitle}>Document Preview</h2>
              <p style={styles.headerSub} title={fileName}>{fileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            title="Close"
            onMouseEnter={e => Object.assign(e.currentTarget.style, styles.closeBtnHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'transparent' })}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div style={styles.body}>
          {/* Loading overlay — only show for image / pdf which have async load */}
          {isLoading && (category === 'image' || category === 'pdf') && (
            <div style={styles.loadingOverlay}>
              <div style={styles.loadingCard}>
                <Loader2 className="w-6 h-6 animate-spin text-[#004274]" />
                <span style={styles.loadingText}>Loading document…</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError ? (
            <div style={styles.fallbackCard}>
              <FileX className="w-16 h-16 text-red-300" />
              <p style={styles.fallbackTitle}>Unable to preview document</p>
              <p style={styles.fallbackSub}>
                The file could not be loaded. It may be unavailable or require authentication.
                <br />Try downloading the file instead.
              </p>
            </div>
          ) : (
            <div style={{ ...styles.previewWrapper, opacity: isLoading && (category === 'image' || category === 'pdf') ? 0 : 1, transition: 'opacity 0.3s ease' }}>
              <DocumentPreview
                url={documentUrl}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleLoadError}
              />
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div style={styles.footer}>
          <button
            onClick={onClose}
            style={styles.cancelBtn}
            onMouseEnter={e => Object.assign(e.currentTarget.style, styles.cancelBtnHover)}
            onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'white' })}
          >
            Cancel
          </button>
          <button
            onClick={onDownload}
            disabled={!documentUrl || isDownloading}
            style={{
              ...styles.downloadBtn,
              opacity: (!documentUrl || isDownloading) ? 0.55 : 1,
              cursor: (!documentUrl || isDownloading) ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={e => { if (documentUrl && !isDownloading) Object.assign(e.currentTarget.style, styles.downloadBtnHover); }}
            onMouseLeave={e => { Object.assign(e.currentTarget.style, { background: '#004274' }); }}
          >
            {isDownloading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Downloading…</>
            ) : (
              <><Download className="w-4 h-4" /> Download</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Inline styles (enterprise design system) ─────────────────────────────────
const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(15, 23, 42, 0.55)',
    backdropFilter: 'blur(4px)',
    padding: '16px'
  },
  modal: {
    width: '80vw',
    maxWidth: '1100px',
    height: '80vh',
    borderRadius: '20px',
    background: 'white',
    boxShadow: '0px 24px 60px rgba(15, 23, 42, 0.18)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 24px',
    borderBottom: '1px solid #E8ECEF',
    background: 'white',
    flexShrink: 0
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  headerIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #004274 0%, #005FA3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  headerTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#0F172A',
    margin: 0,
    lineHeight: 1.2
  },
  headerSub: {
    fontSize: '12px',
    color: '#64748B',
    marginTop: '2px',
    maxWidth: '500px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  closeBtn: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: '#64748B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    flexShrink: 0
  },
  closeBtnHover: {
    background: '#F1F5F9'
  },
  body: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: '#F8FAFC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingOverlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8FAFC'
  },
  loadingCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'white',
    border: '1px solid #E8ECEF',
    borderRadius: '12px',
    padding: '14px 24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.07)'
  },
  loadingText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#334155'
  },
  previewWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)'
  },
  pdfPreview: {
    width: '100%',
    height: '100%',
    border: 'none'
  },
  fallbackCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '40px',
    textAlign: 'center'
  },
  fallbackTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#334155',
    margin: 0
  },
  fallbackSub: {
    fontSize: '13px',
    color: '#64748B',
    lineHeight: 1.6,
    margin: 0,
    maxWidth: '360px'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 24px',
    borderTop: '1px solid #E8ECEF',
    background: '#F9FAFB',
    flexShrink: 0
  },
  cancelBtn: {
    height: '42px',
    padding: '0 20px',
    borderRadius: '10px',
    border: '1px solid #E2E8F0',
    background: 'white',
    color: '#334155',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.15s ease'
  },
  cancelBtnHover: {
    background: '#F1F5F9'
  },
  downloadBtn: {
    height: '42px',
    padding: '0 18px',
    borderRadius: '10px',
    border: 'none',
    background: '#004274',
    color: 'white',
    fontSize: '14px',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background 0.15s ease'
  },
  downloadBtnHover: {
    background: '#005A9B'
  }
};
