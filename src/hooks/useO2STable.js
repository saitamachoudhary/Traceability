import { useState, useEffect } from 'react';
import { fetchO2STable } from '../services/orderToShipmentService';

export const useO2STable = (filters, refreshTrigger = 0) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTableData = async () => {
    setLoading(true);
    try {
      const res = await fetchO2STable(filters);

      if (res) {
        const meta = res.metaData || [];
        const rows = res.resultSet || [];

        setColumns(meta);
        setData(rows);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, [
    filters.customer,
    filters.projects,
    filters.date_from,
    filters.date_to,
    refreshTrigger
  ]);

  return { data, columns, loading, refresh: getTableData };
};
