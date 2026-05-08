import React, { useRef, useState } from 'react';
import { X, CloudUpload, FileText, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xlsx', 'xls'];
const ALLOWED_LABEL = 'PDF, PNG, JPG, JPEG, DOC, DOCX, XLSX, XLS';

export default function DocumentUploadModal({
  isOpen,
  onClose,
  file,
  onFileSelect,
  onRemoveFile,
  onSave,
  isUploading,
  isSaving
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const isBusy = isUploading || isSaving;

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      showToast({ type: 'error', message: 'Unsupported file type' });
      return false;
    }

    const maxSize = 25 * 1024 * 1024; // 25MB
    if (selectedFile.size > maxSize) {
      showToast({ type: 'error', message: 'File size must be less than 25MB' });
      return false;
    }

    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getStatusLabel = () => {
    if (isUploading) return 'Uploading file...';
    if (isSaving) return 'Saving document...';
    return 'Ready to upload';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-border-outline">
          <h2 className="text-[18px] font-bold text-text-primary">Upload Document</h2>
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
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xlsx,.xls"
              onChange={handleFileInput}
            />
            <div className="w-14 h-14 bg-[#EAF0F6] rounded-full flex items-center justify-center mb-4 text-[#00518A]">
              <CloudUpload className="w-7 h-7" />
            </div>
            <h3 className="text-[16px] font-medium text-text-primary mb-2">
              Click or drag file to this area to upload
            </h3>
            <p className="text-[13px] font-medium text-text-secondary">
              Supported formats: {ALLOWED_LABEL} (Max 25MB)
            </p>
          </div>

          {/* Selected File Preview */}
          {file && (
            <div>
              <h4 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                Selected File (1)
              </h4>
              <div className="border border-border-outline rounded-lg p-4 flex items-center justify-between bg-white shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded flex items-center justify-center text-[#64748B]">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-text-primary">{file.name}</div>
                    <div className="text-[12px] text-text-secondary mt-0.5 flex items-center gap-1.5">
                      {isBusy && <Loader2 className="w-3 h-3 animate-spin" />}
                      {formatFileSize(file.size)} • {getStatusLabel()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveFile(); }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  disabled={isBusy}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
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
            onClick={onSave}
            disabled={!file || isBusy}
            className="px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-[14px] hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isBusy && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUploading ? 'Uploading...' : isSaving ? 'Saving...' : 'Upload & Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
