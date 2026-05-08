import { useState } from 'react';
import { uploadMediaFile } from '../utils/uploadMediaApi';
import { saveUploadedDocument } from '../services/enquiryToOfferService';
import { useToast } from '../contexts/ToastContext';

const ALLOWED_EXTENSIONS = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xlsx', 'xls'];

export const useUploadDocument = (onSuccess) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const { showToast } = useToast();

  const openModal = (rowId) => {
    setSelectedRowId(rowId);
    setFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
    setSelectedRowId(null);
  };

  const handleFileSelect = (selectedFile) => {
    const ext = selectedFile?.name?.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      showToast({ type: 'error', message: 'Unsupported file type' });
      return;
    }
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSave = async () => {
    if (!file || !selectedRowId) return;

    setIsUploading(true);
    try {
      // Step 1: Upload the file
      const uploadResponse = await uploadMediaFile(file);
      const documentPath = uploadResponse?.data?.path;

      if (!documentPath) {
        throw new Error('No document path returned from upload API');
      }

      setIsUploading(false);
      setIsSaving(true);

      // Step 2: Save the document mapping
      const saveResponse = await saveUploadedDocument(selectedRowId, documentPath);

      if (saveResponse?.status?.value?.toLowerCase() === 'success') {
        showToast({
          type: 'success',
          message: saveResponse?.data?.data?.notification || 'Document Upload Success'
        });
        closeModal();
        if (onSuccess) onSuccess();
      } else {
        showToast({ type: 'error', message: 'Document Upload Failed' });
      }
    } catch (error) {
      if (error.message === 'UNSUPPORTED_FILE_TYPE') {
        showToast({ type: 'error', message: 'Unsupported file type' });
      } else {
        console.error('Document upload error:', error);
        showToast({ type: 'error', message: 'Document Upload Failed' });
      }
    } finally {
      setIsUploading(false);
      setIsSaving(false);
    }
  };

  return {
    file,
    isUploading,
    isSaving,
    isModalOpen,
    openModal,
    closeModal,
    handleFileSelect,
    handleRemoveFile,
    handleSave
  };
};
