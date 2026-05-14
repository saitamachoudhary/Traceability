import { useCascadingFilters } from './useCascadingFilters';
import { getO2SCustomers, getO2SProjects } from '../services/orderToShipmentService';

export const useOrderToShipmentFilters = (refreshTrigger = 0) => {
  return useCascadingFilters({
    initialFilters: {
      customer: "",
      projects: ""
    },
    fetchers: {
      customers: getO2SCustomers,
      projects: getO2SProjects
    },
    refreshTrigger
  });
};
