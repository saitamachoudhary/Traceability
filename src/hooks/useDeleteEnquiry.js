import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteEnquiryRow } from '../services/enquiryToOfferService';
import { useToast } from '../contexts/ToastContext';

export const useDeleteEnquiry = (onSuccess) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
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
      const response = await deleteEnquiryRow(selectedId);

      if (response?.status?.value?.toLowerCase() === "success") {
        showToast({
          type: "success",
          message: response?.data?.data?.notification || "Data Deleted Success"
        });

        closeDeleteModal();

        if (onSuccess) {
          onSuccess();
        }
        // else {
        //   navigate("/enquiry-to-offer");
        // }
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
