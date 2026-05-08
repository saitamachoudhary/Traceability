import { useState, useEffect } from 'react';
import { getConversionChartData } from '../services/enquiryToOfferService';

const transformChartData = (data) => {
  if (!data || data.length === 0) return { categories: [], series: [] };

  const categories = data.map(item => item[0]); // month
  const values = data.map(item => {
    const val = item[3];
    return val === "No Data" || val === null ? 0 : Number(val);
  });

  return {
    categories,
    series: values
  };
};

export const useEnquiryChart = (filters, refreshTrigger = 0) => {
  const [chartData, setChartData] = useState({
    categories: [],
    series: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchChart = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const raw = await getConversionChartData(filters);
        if (isMounted) {
          const formatted = transformChartData(raw);
          setChartData(formatted);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch chart data:", err);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchChart();

    return () => {
      isMounted = false;
    };
  }, [filters.date_from, filters.date_to, refreshTrigger]);

  return { ...chartData, isLoading, error };
};
