import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowHeader from '../components/e2o/WorkflowHeader';
import KPICards from '../components/o2s/KPICards';
import FilterToolbar from '../components/o2s/FilterToolbar';
import DataTable from '../components/o2s/DataTable';
import { useOrderToShipmentFilters } from '../hooks/useOrderToShipmentFilters';

export default function OrderToShipment() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    date_from: "",
    date_to: ""
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { filters, options, isLoading, updateFilter, resetFilters } = useOrderToShipmentFilters(refreshTrigger);

  const handleGoBack = () => {
    navigate("/");
  };

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const resetO2SPage = () => {
    resetFilters();
    setDateRange({ date_from: "", date_to: "" });
    setRefreshTrigger(prev => prev + 1);
  };

  // Memoized so KPICards doesn't re-render unless the actual values change.
  const combinedFilters = useMemo(
    () => ({ ...filters, ...dateRange }),
    [filters, dateRange]
  );

  return (
    <main className="flex-1 w-full px-8 flex flex-col py-8 gap-6">
      <WorkflowHeader
        title="ORDER TO SHIPMENT"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onGoBack={handleGoBack}
        onReset={resetO2SPage}
      />

      <KPICards dateRange={combinedFilters} refreshTrigger={refreshTrigger} />

      <FilterToolbar
        filters={filters}
        options={options}
        isLoading={isLoading}
        updateFilter={updateFilter}
      />

      <DataTable 
        filters={filters} 
        dateRange={dateRange} 
        refreshTrigger={refreshTrigger} 
        onRefresh={triggerRefresh}
      />
    </main>
  );
}
