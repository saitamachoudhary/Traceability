import { getMonthlySalesChart } from '../services/orderToShipmentService';
import { mapMonthlySalesChart } from '../utils/chartDataMapper';
import { useAsyncResource } from './useAsyncResource';

export const useOrderToShipmentChart = (filters, refreshTrigger = 0) => {
  const { data, isLoading, error } = useAsyncResource(
    async () => {
      const response = await getMonthlySalesChart(filters);
      const resultSet = response?.resultSet || [];
      if (resultSet.length === 0 || response === "No Data") return null;
      return mapMonthlySalesChart(resultSet);
    },
    [filters?.date_from, filters?.date_to, refreshTrigger],
    null
  );

  // Keep previous public API (`chartData`, `loading`).
  return { chartData: data, loading: isLoading, error };
};
