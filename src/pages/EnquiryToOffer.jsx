import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowHeader from '../components/e2o/WorkflowHeader';
import KPICards from '../components/e2o/KPICards';
import FilterToolbar from '../components/e2o/FilterToolbar';
import DataTable from '../components/e2o/enquiry to offer table/DataTable';
import { useEnquiryFilters } from '../hooks/useEnquiryFilters';

export default function EnquiryToOffer() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    date_from: "",
    date_to: ""
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { filters, options, isLoading, updateFilter, resetFilters } = useEnquiryFilters(refreshTrigger);

  const handleGoBack = () => {
    navigate("/");
  };

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const resetEnquiryPage = () => {
    resetFilters();
    setDateRange({ date_from: "", date_to: "" });
    setRefreshTrigger(prev => prev + 1);
  };

  const combinedFilters = { ...filters, ...dateRange };

  return (
    <main className="flex-1 w-full px-8 flex flex-col py-8 gap-6">
      <WorkflowHeader
        title="ENQUIRY TO OFFER"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onGoBack={handleGoBack}
        onReset={resetEnquiryPage}
      />
      <KPICards filters={dateRange} refreshTrigger={refreshTrigger} />
      <FilterToolbar
        filters={filters}
        options={options}
        isLoading={isLoading}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
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
