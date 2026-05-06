import { useNavigate } from "react-router-dom";
import { saveEnquiryData } from "../services/enquiryToOfferService";
import { useToast } from "../contexts/ToastContext";

export const useSaveEnquiry = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSave = async (formValues) => {
    try {
      const response = await saveEnquiryData(formValues);

      const result = response?.data?.data;

      if (response?.status?.value?.toLowerCase() === "success") {
        showToast({ type: "success", message: result?.notification || "Data Saved Successfully." });
        navigate("/e2o");
      } else {
        showToast({ type: "error", message: "Failed to add data." });
        navigate("/e2o");
      }
    } catch (error) {
      showToast({ type: "error", message: "Failed to add data." });
      navigate("/e2o");
    }
  };

  return { handleSave };
};
