import {
  getTotalOfferValue,
  getTurPackages,
  getDirectAtPackages,
  getExecutedProjects,
  getNonExecutedProjects,
  getConversionRate,
} from '../services/enquiryToOfferService';
import { useAsyncResource } from './useAsyncResource';

const INITIAL = {
  totalOffer: 0, tur: 0, directAt: 0,
  executed: 0, nonExecuted: 0, conversion: 0,
};

export const useEnquiryKpi = (filters, refreshTrigger = 0) => {
  const { data, isLoading, error } = useAsyncResource(
    async () => {
      const [totalOffer, tur, directAt, executed, nonExecuted, conversion] = await Promise.all([
        getTotalOfferValue(filters),
        getTurPackages(filters),
        getDirectAtPackages(filters),
        getExecutedProjects(filters),
        getNonExecutedProjects(filters),
        getConversionRate(filters),
      ]);
      return { totalOffer, tur, directAt, executed, nonExecuted, conversion };
    },
    [filters?.date_from, filters?.date_to, refreshTrigger],
    INITIAL
  );

  return { data, isLoading, error };
};
