import { useState, useEffect } from 'react';
import {
  getTotalOfferValue,
  getTurPackages,
  getDirectAtPackages,
  getExecutedProjects,
  getNonExecutedProjects,
  getConversionRate
} from '../services/enquiryToOfferService';

export const useEnquiryKpi = (filters, refreshTrigger = 0) => {
  const [data, setData] = useState({
    totalOffer: 0,
    tur: 0,
    directAt: 0,
    executed: 0,
    nonExecuted: 0,
    conversion: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [
          totalOffer,
          tur,
          directAt,
          executed,
          nonExecuted,
          conversion
        ] = await Promise.all([
          getTotalOfferValue(filters),
          getTurPackages(filters),
          getDirectAtPackages(filters),
          getExecutedProjects(filters),
          getNonExecutedProjects(filters),
          getConversionRate(filters)
        ]);

        if (isMounted) {
          setData({
            totalOffer,
            tur,
            directAt,
            executed,
            nonExecuted,
            conversion
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch KPIs:", err);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filters.date_from, filters.date_to, filters.customer, filters.projects, filters.packages, refreshTrigger]);

  return { data, isLoading, error };
};
