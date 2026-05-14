import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useDeleteRecord = (deleteServiceFn, onSuccess) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { showToast } = useToast();

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const closeDeleteModal = () => {
    setShowConfirmModal(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setIsDeleting(true);
    try {
      const response = await deleteServiceFn(selectedId);

      if (response?.status?.value?.toLowerCase() === "success") {
        showToast({
          type: "success",
          message: response?.data?.data?.notification || "Data Deleted Success"
        });

        closeDeleteModal();

        if (onSuccess) {
          onSuccess();
        }
      } else {
        showToast({
          type: "error",
          message: "Data Delete Failed"
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast({
        type: "error",
        message: "Data Delete Failed"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    showConfirmModal,
    openDeleteModal,
    closeDeleteModal,
    handleDelete
  };
};
