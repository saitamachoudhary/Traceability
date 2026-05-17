import { getConversionChartData } from '../services/enquiryToOfferService';
import { useAsyncResource } from './useAsyncResource';

const transformChartData = (data) => {
  if (!data || data.length === 0) return { categories: [], series: [] };

  const categories = data.map(item => item[0]);
  const values = data.map(item => {
    const val = item[1];
    return val === "No Data" || val === null ? 0 : Number(val);
  });

  return { categories, series: values };
};

const INITIAL = { categories: [], series: [] };

export const useEnquiryChart = (filters, refreshTrigger = 0) => {
  const { data, isLoading, error } = useAsyncResource(
    async () => transformChartData(await getConversionChartData(filters)),
    [filters?.date_from, filters?.date_to, refreshTrigger],
    INITIAL
  );

  // Keep the previous flat shape `{ categories, series, isLoading, error }`.
  return { ...data, isLoading, error };
};
