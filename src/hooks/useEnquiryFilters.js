import { useState, useEffect, useCallback } from 'react';
import { getCustomers, getProjects, getPackages } from '../services/enquiryToOfferService';

const mapDropdown = (data) =>
  Array.isArray(data) ? data.map(item => item[0]).filter(Boolean) : [];

export const useEnquiryFilters = () => {
  const [filters, setFilters] = useState({
    customer: "",
    projects: "",
    packages: ""
  });

  const [options, setOptions] = useState({
    customers: [],
    projects: [],
    packages: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchAll = useCallback(async (currentFilters) => {
    setIsLoading(true);
    try {
      const [customers, projects, packages] = await Promise.all([
        getCustomers(currentFilters),
        getProjects(currentFilters),
        getPackages(currentFilters)
      ]);
      setOptions({
        customers: mapDropdown(customers),
        projects: mapDropdown(projects),
        packages: mapDropdown(packages)
      });
    } catch (err) {
      console.error("Failed to fetch filter options:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll({ customer: "", projects: "", packages: "" });
  }, [fetchAll]);

  const updateFilter = async (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    await fetchAll(updated);
  };

  const resetFilters = async () => {
    const cleared = { customer: "", projects: "", packages: "" };
    setFilters(cleared);
    await fetchAll(cleared);
  };

  return { filters, options, isLoading, updateFilter, resetFilters };
};
