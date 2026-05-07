import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEnquiryEditData, updateEnquiryData } from '../services/enquiryEditService';
import { useToast } from '../contexts/ToastContext';

/**
 * Maps the API metaData + resultSet[0] to a flat form object.
 * Handles null / "" safely.
 */
const mapResponseToForm = (response) => {
  try {
    const sqlResult = response?.data?.data
    if (!sqlResult) return null;

    const meta = sqlResult.metaData || [];
    const row = sqlResult.resultSet?.[0];
    if (!row) return null;

    const mappedData = {};
    meta.forEach((col, index) => {
      mappedData[col.colName] = row[index] ?? "";
    });
    return mappedData;
  } catch (err) {
    console.error("Failed to map edit response:", err);
    return null;
  }
};

export const useEditEnquiry = (id) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [defaultValues, setDefaultValues] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // --- Fetch existing data on mount ---
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsFetching(true);
      setFetchError(false);
      try {
        const response = await getEnquiryEditData(id);
        const mapped = mapResponseToForm(response);

        if (mapped) {
          setDefaultValues(mapped);
        } else {
          setFetchError(true);
          showToast({ type: "error", message: "Failed to load row data." });
        }
      } catch (err) {
        console.error("Fetch edit data error:", err);
        setFetchError(true);
        showToast({ type: "error", message: "Failed to load row data." });
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // --- Handle form submission ---
  const handleUpdate = async (formValues) => {
    try {
      const response = await updateEnquiryData(id, formValues);

      const statusValue = response?.status?.value?.toLowerCase();
      const notification = response?.data?.data?.notification;

      if (statusValue === "success") {
        showToast({
          type: "success",
          message: notification || "Data Edit Successfully."
        });
        navigate("/e2o");
      } else {
        showToast({ type: "error", message: "Failed to Edit data." });
        navigate("/e2o");
      }
    } catch (err) {
      console.error("Update enquiry error:", err);
      showToast({ type: "error", message: "Failed to Edit data." });
      navigate("/e2o");
    }
  };

  return { defaultValues, isFetching, fetchError, handleUpdate };
};
