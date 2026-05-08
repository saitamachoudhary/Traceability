import { useState, useCallback } from 'react';
import { getDocumentUrl } from '../utils/documentUtils';
import { useToast } from '../contexts/ToastContext';

/**
 * useDocumentViewer — Manages modal open/close, document URL resolution,
 * loading state, and file download for the ViewDocumentModal.
 *
 * @returns {object} hook API
 */
export const useDocumentViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentUrl, setDocumentUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const { showToast } = useToast();

  /**
   * Opens the viewer modal for a given raw document path from the table row.
   * @param {string} rawPath - e.g. "/public/file/abc.png"
   */
  const openViewModal = useCallback((rawPath) => {
    const url = getDocumentUrl(rawPath);
    setDocumentUrl(url);
    setIsModalOpen(true);
  }, []);

  /**
   * Closes the modal and resets document state.
   */
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing URL so exit animation stays smooth
    setTimeout(() => setDocumentUrl(""), 300);
  }, []);

  /**
   * Triggers a blob-based download so the file saves locally
   * instead of opening in a new tab.
   */
  const handleDownload = useCallback(async () => {
    if (!documentUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(documentUrl);
      if (!response.ok) throw new Error(`Download failed: ${response.status}`);

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = documentUrl.split("/").pop();
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

      showToast({ type: 'success', message: 'Document downloaded successfully' });
    } catch (error) {
      console.error("Download error:", error);
      showToast({ type: 'error', message: 'Failed to download document' });
    } finally {
      setIsDownloading(false);
    }
  }, [documentUrl, showToast]);

  return {
    isModalOpen,
    documentUrl,
    isDownloading,
    openViewModal,
    closeModal,
    handleDownload
  };
};
