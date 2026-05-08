import React, { useRef, useState } from 'react';
import { X, CloudUpload, FileText, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

/**
 * FileUploadModal — Unified reusable upload modal.
 *
 * Props:
 *  isOpen          — boolean, controls visibility
 *  onClose         — fn, called on cancel / close
 *  file            — current selected file object (or null)
 *  onFileSelect    — fn(file), called with validated file
 *  onRemoveFile    — fn, clears the selected file
 *  onPrimaryAction — fn, called when primary button is clicked
 *
 * --- Display / Label props ---
 *  title           — modal header text
 *  acceptedExts    — array of lowercase extensions e.g. ['xlsx'] or ['pdf','png',…]
 *  acceptedLabel   — string shown in the drop zone e.g. "XLSX (Max 25MB)"
 *  primaryLabel    — primary button label (idle state)
 *
 * --- Loading / State props ---
 *  isUploading     — boolean, shows upload progress bar (bulk mode)
 *  uploadProgress  — number 0-100 (bulk mode)
 *  isPreviewLoading— boolean, shows "Loading Preview…" in button (bulk mode)
 *  isSaving        — boolean, shows "Saving…" spinner in button (doc mode)
 */
export default function FileUploadModal({
  isOpen,
  onClose,
  file,
  onFileSelect,
  onRemoveFile,
  onPrimaryAction,
  // display
  title = 'Upload File',
  acceptedExts = ['xlsx'],
  acceptedLabel = 'XLSX (Max 25MB)',
  primaryLabel = 'Upload & Save',
  // state
  isUploading = false,
  uploadProgress = 0,
  isPreviewLoading = false,
  isSaving = false
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const isBusy = isUploading || isPreviewLoading || isSaving;

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!acceptedExts.includes(ext)) {
      showToast({ type: 'error', message: 'Unsupported file type' });
      return false;
    }

    const maxSize = 25 * 1024 * 1024; // 25 MB
    if (selectedFile.size > maxSize) {
      showToast({ type: 'error', message: 'File size must be less than 25MB' });
      return false;
    }

    return true;
  };

  // ── Drag handlers ────────────────────────────────────────────────────────────
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (isBusy) return;
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) onFileSelect(droppedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) onFileSelect(selectedFile);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const fileStatusLabel = () => {
    if (isUploading) return `Uploading... ${uploadProgress}%`;
    if (isSaving) return 'Saving document...';
    if (isPreviewLoading) return 'Loading preview...';
    return 'Ready to upload';
  };

  const buttonLabel = () => {
    if (isPreviewLoading) return 'Loading Preview...';
    if (isUploading) return 'Uploading...';
    if (isSaving) return 'Saving...';
    return primaryLabel;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-border-outline">
          <h2 className="text-[18px] font-bold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            disabled={isBusy}
            className="p-1 hover:bg-surface-container rounded-md transition-colors text-text-secondary disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">

          {/* Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors
              ${isDragging ? 'border-primary bg-primary-container/10' : 'border-border-outline bg-[#F9FAFB]'}
              ${isBusy ? 'opacity-60 pointer-events-none' : 'cursor-pointer hover:bg-surface-container/50'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isBusy && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept={acceptedExts.map(ext => `.${ext}`).join(',')}
              onChange={handleFileInput}
            />
            <div className="w-14 h-14 bg-[#EAF0F6] rounded-full flex items-center justify-center mb-4 text-[#00518A]">
              <CloudUpload className="w-7 h-7" />
            </div>
            <h3 className="text-[16px] font-medium text-text-primary mb-2">
              Click or drag file to this area to upload
            </h3>
            <p className="text-[13px] font-medium text-text-secondary">
              Supported formats: {acceptedLabel}
            </p>
          </div>

          {/* Selected File Preview */}
          {file && (
            <div>
              <h4 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                Selected File (1)
              </h4>
              <div className="border border-border-outline rounded-lg p-4 flex items-center justify-between bg-white shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 z-10 relative">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded flex items-center justify-center text-[#64748B]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-text-primary">{file.name}</div>
                    <div className="text-[12px] text-text-secondary mt-0.5 flex items-center gap-1.5">
                      {isBusy && <Loader2 className="w-3 h-3 animate-spin" />}
                      {formatFileSize(file.size)} • {fileStatusLabel()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveFile(); }}
                  disabled={isBusy}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors z-10 relative disabled:opacity-40"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                {/* Bulk-mode upload progress bar */}
                {isUploading && (
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-blue-50/80 transition-all duration-300 ease-out z-0"
                    style={{ width: `${uploadProgress}%` }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-outline flex items-center justify-end gap-3 bg-[#F9FAFB]">
          <button
            onClick={onClose}
            disabled={isBusy}
            className="px-5 py-2.5 rounded-lg border border-border-outline bg-white text-text-primary font-medium text-[14px] hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onPrimaryAction}
            disabled={!file || isBusy}
            className="px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-[14px] hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isBusy && <Loader2 className="w-4 h-4 animate-spin" />}
            {buttonLabel()}
          </button>
        </div>

      </div>
    </div>
  );
}
