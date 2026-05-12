import { useState, useEffect } from 'react';
import {
  getTotalOrders,
  getTotalOrderValue,
  getAvgLeadTime,
  getInManufacturing,
  getDelivered,
  getOtdRate
} from '../services/orderToShipmentService';

export const useOrderToShipmentKpi = (filters) => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalOrderValue: 0,
    avgLeadTime: 0,
    inManufacturing: 0,
    delivered: 0,
    otdRate: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          totalOrders,
          totalOrderValue,
          avgLeadTime,
          inManufacturing,
          delivered,
          otdRate
        ] = await Promise.all([
          getTotalOrders(filters),
          getTotalOrderValue(filters),
          getAvgLeadTime(filters),
          getInManufacturing(filters),
          getDelivered(filters),
          getOtdRate(filters)
        ]);

        if (isMounted) {
          setData({
            totalOrders,
            totalOrderValue,
            avgLeadTime,
            inManufacturing,
            delivered,
            otdRate
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filters?.date_from, filters?.date_to]);

  return {
    data,
    loading
  };
};
