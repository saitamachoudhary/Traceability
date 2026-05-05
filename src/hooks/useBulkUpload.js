import { useState } from 'react';
import { uploadFile, saveUploadedData } from '../utils/uploadApi';
import { getFilePreview } from '../services/enquiryToOfferService';
import { useToast } from '../contexts/ToastContext';

export const useBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleFileSelect = async (selectedFile) => {
    try {
      setFile(selectedFile);
      setIsUploading(true);
      setUploadProgress(0);

      const uploadRes = await uploadFile(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      setFilePath(uploadRes.path);
    } catch (error) {
      console.error("Upload error:", error);
      showToast({ type: 'error', message: error.message || 'Failed to upload file' });
      setFile(null);
      setFilePath("");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = async () => {
    if (!filePath) return;

    try {
      setIsPreviewLoading(true);
      const preview = await getFilePreview(filePath);
      setPreviewData(preview);
    } catch (error) {
      console.error("Preview error:", error);
      showToast({ type: 'error', message: error.message || 'Failed to fetch preview' });
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleSave = async (onSuccess) => {
    if (!filePath) return;

    try {
      setIsSaving(true);
      const res = await saveUploadedData(filePath);

      if (res?.data?.data?.validationMessage) {
        const isError = res.data.data.validationStatusCode === 400;
        showToast({
          type: isError ? "error" : "success",
          message: res.data.data.validationMessage
        });
        if (!isError && onSuccess) {
          onSuccess();
        }
      } else {
        showToast({ type: 'success', message: 'Data saved successfully' });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Save error:", error);
      showToast({ type: 'error', message: error.message || 'Failed to save data' });
    } finally {
      setIsSaving(false);
    }
  };

  const reset = () => {
    setFile(null);
    setFilePath("");
    setPreviewData(null);
    setUploadProgress(0);
  };

  return {
    file,
    filePath,
    previewData,
    isUploading,
    uploadProgress,
    isPreviewLoading,
    isSaving,
    handleFileSelect,
    handlePreview,
    handleSave,
    reset
  };
};
