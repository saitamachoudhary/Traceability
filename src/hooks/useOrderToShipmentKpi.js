import {
  getTotalOrders,
  getTotalOrderValue,
  getAvgLeadTime,
  getInManufacturing,
  getDelivered,
  getOtdRate,
} from '../services/orderToShipmentService';
import { useAsyncResource } from './useAsyncResource';

const INITIAL = {
  totalOrders: 0, totalOrderValue: 0, avgLeadTime: 0,
  inManufacturing: 0, delivered: 0, otdRate: 0,
};

export const useOrderToShipmentKpi = (filters, refreshTrigger = 0) => {
  const { data, isLoading } = useAsyncResource(
    async () => {
      const [totalOrders, totalOrderValue, avgLeadTime, inManufacturing, delivered, otdRate] =
        await Promise.all([
          getTotalOrders(filters),
          getTotalOrderValue(filters),
          getAvgLeadTime(filters),
          getInManufacturing(filters),
          getDelivered(filters),
          getOtdRate(filters),
        ]);
      return { totalOrders, totalOrderValue, avgLeadTime, inManufacturing, delivered, otdRate };
    },
    [filters?.date_from, filters?.date_to, refreshTrigger],
    INITIAL
  );

  // Public API kept identical to the previous version (`loading`, not `isLoading`).
  return { data, loading: isLoading };
};
