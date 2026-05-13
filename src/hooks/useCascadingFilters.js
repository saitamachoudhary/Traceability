import { useState, useEffect, useCallback, useRef } from 'react';

const mapDropdown = (data) =>
  Array.isArray(data) ? data.map(item => item[0]).filter(Boolean) : [];

export const useCascadingFilters = ({ initialFilters, fetchers, refreshTrigger = 0 }) => {
  const [filters, setFilters] = useState(initialFilters);
  
  const fetchersRef = useRef(fetchers);
  useEffect(() => {
    fetchersRef.current = fetchers;
  }, [fetchers]);

  const [options, setOptions] = useState(() => {
    return Object.keys(fetchers).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const fetchAll = useCallback(async (currentFilters) => {
    setIsLoading(true);
    try {
      const currentFetchers = fetchersRef.current;
      const keys = Object.keys(currentFetchers);
      const promises = keys.map(key => currentFetchers[key](currentFilters));
      
      const results = await Promise.all(promises);
      
      const newOptions = {};
      keys.forEach((key, index) => {
        newOptions[key] = mapDropdown(results[index]);
      });
      
      setOptions(newOptions);
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch automatically on mount or when refreshTrigger changes
    fetchAll(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]); 

  const updateFilter = async (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    await fetchAll(updated);
  };

  const resetFilters = async () => {
    setFilters(initialFilters);
    await fetchAll(initialFilters);
  };

  const refreshFilters = async () => {
    await fetchAll(filters);
  };

  return { filters, options, isLoading, updateFilter, resetFilters, refreshFilters };
};
