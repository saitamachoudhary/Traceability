import { fetchEnquiryTable } from '../services/enquiryToOfferService';
import { useAsyncResource } from './useAsyncResource';

const INITIAL = { data: [], columns: [] };

export const useEnquiryTable = (filters, refreshTrigger = 0) => {
  const { data: payload, isLoading, refetch } = useAsyncResource(
    async () => {
      const res = await fetchEnquiryTable(filters);
      return res
        ? { columns: res.metaData || [], data: res.resultSet || [] }
        : INITIAL;
    },
    [
      filters.customer,
      filters.projects,
      filters.package_type,
      filters.date_from,
      filters.date_to,
      refreshTrigger,
    ],
    INITIAL
  );

  return {
    data: payload.data,
    columns: payload.columns,
    loading: isLoading,
    refresh: refetch,
  };
};
