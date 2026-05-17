import { fetchO2STable } from '../services/orderToShipmentService';
import { useAsyncResource } from './useAsyncResource';

const INITIAL = { data: [], columns: [] };

export const useO2STable = (filters, refreshTrigger = 0) => {
  const { data: payload, isLoading, refetch } = useAsyncResource(
    async () => {
      const res = await fetchO2STable(filters);
      return res
        ? { columns: res.metaData || [], data: res.resultSet || [] }
        : INITIAL;
    },
    [filters.customer, filters.projects, filters.date_from, filters.date_to, refreshTrigger],
    INITIAL
  );

  return {
    data: payload.data,
    columns: payload.columns,
    loading: isLoading,
    refresh: refetch,
  };
};
