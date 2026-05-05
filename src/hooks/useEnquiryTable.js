import { useState, useEffect } from 'react';
import { fetchEnquiryTable } from '../services/enquiryTableService';

export const useEnquiryTable = (filters) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTableData = async () => {
    setLoading(true);
    try {
      const res = await fetchEnquiryTable(filters);

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
    filters.package_type, 
    filters.client_enq_ref_no, 
    filters.actual_offer_date, 
    filters.date_from, 
    filters.date_to
  ]);

  return { data, columns, loading, refresh: getTableData };
};
