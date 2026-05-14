import { useState, useEffect } from 'react';
import { getMonthlySalesChart } from '../services/orderToShipmentService';
import { mapMonthlySalesChart } from '../utils/chartDataMapper';

export const useOrderToShipmentChart = (filters, refreshTrigger = 0) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchChart = async () => {
      setLoading(true);

      try {
        const response = await getMonthlySalesChart(filters);
        const resultSet = response?.resultSet || [];

        if (isMounted) {
          if (resultSet.length === 0 || response === "No Data" || !resultSet) {
             setChartData(null);
          } else {
             const mappedData = mapMonthlySalesChart(resultSet);
             setChartData(mappedData);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchChart();

    return () => {
       isMounted = false;
    };
  }, [filters?.date_from, filters?.date_to, refreshTrigger]);

  return { chartData, loading, error };
};
