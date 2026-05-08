import { useState } from 'react';
import { convertToOrder } from '../services/enquiryToOfferService';
import { useToast } from '../contexts/ToastContext';

export const useConvertToOrder = (onSuccess) => {
  const [convertingId, setConvertingId] = useState(null);
  const { showToast } = useToast();

  const handleConvertToOrder = async (id) => {
    if (!id) return;

    setConvertingId(id);
    try {
      const response = await convertToOrder(id);

      const statusValue = response?.status?.value?.toLowerCase();
      const notification = response?.data?.data?.notification || "Process Completed";
      const type = response?.data?.data?.type?.toLowerCase() || "success";

      if (statusValue === "success") {
        showToast({
          type: type,
          message: notification
        });

        if (type === "success" && onSuccess) {
          onSuccess();
        }
      } else {
        showToast({
          type: "error",
          message: notification || "Failed to convert offer"
        });
      }
    } catch (error) {
      console.error("Convert error:", error);
      showToast({
        type: "error",
        message: "Failed to convert offer"
      });
    } finally {
      setConvertingId(null);
    }
  };

  return {
    isConverting: !!convertingId,
    convertingId,
    handleConvertToOrder
  };
};
