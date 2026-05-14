import { useCascadingFilters } from './useCascadingFilters';
import { getCustomers, getProjects, getPackages } from '../services/enquiryToOfferService';

export const useEnquiryFilters = (refreshTrigger = 0) => {
  return useCascadingFilters({
    initialFilters: {
      customer: "",
      projects: "",
      packages: ""
    },
    fetchers: {
      customers: getCustomers,
      projects: getProjects,
      packages: getPackages
    },
    refreshTrigger
  });
};

