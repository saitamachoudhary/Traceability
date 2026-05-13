import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getO2SEditData, saveO2SEditData } from '../services/orderToShipmentService';
import { useToast } from '../contexts/ToastContext';

export const useEditO2S = (id) => {
  const [defaultValues, setDefaultValues] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const response = await getO2SEditData(id);

        if (response?.data?.data?.metaData && response?.data?.data?.resultSet?.[0]) {
          const meta = response.data.data.metaData;
          const row = response.data.data.resultSet[0];

          const values = {};
          meta.forEach((col) => {
            const val = row[col.colIndex];
            values[col.colName.toLowerCase()] = val === null ? "" : val;
          });

          setDefaultValues(values);
        } else {
          setFetchError(true);
        }
      } catch (error) {
        console.error("Failed to fetch edit data:", error);
        setFetchError(true);
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const response = await saveO2SEditData(id, data);

      if (response?.status?.value === "success" || response?.data?.notification) {
        showToast({ type: 'success', message: response?.data?.data?.notification || "Data Edit Success" })
        navigate('/o2s');
      } else {
        showToast({ type: 'error', message: response?.data?.data?.notification || "Failed to Edit data" })
        navigate('/o2s');
      }
    } catch (error) {
      console.error("Update failed:", error);
      showToast({ type: 'error', message: error })
      navigate('/o2s');
    }
  };

  return {
    defaultValues,
    isFetching,
    fetchError,
    handleUpdate
  };
};
