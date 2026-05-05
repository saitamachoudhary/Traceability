import { useState } from 'react';
import WorkflowHeader from '../components/e2o/WorkflowHeader';
import KPICards from '../components/e2o/KPICards';
import FilterToolbar from '../components/e2o/FilterToolbar';
import DataTable from '../components/e2o/DataTable';
import { useEnquiryFilters } from '../hooks/useEnquiryFilters';

export default function EnquiryToOffer() {
  const [dateRange, setDateRange] = useState({
    date_from: "",
    date_to: ""
  });

  const { filters, options, isLoading, updateFilter, resetFilters } = useEnquiryFilters();

  return (
    <main className="flex-1 w-full px-8 flex flex-col py-8 gap-6">
      <WorkflowHeader dateRange={dateRange} setDateRange={setDateRange} />
      <KPICards filters={dateRange} />
      <FilterToolbar 
        filters={filters} 
        options={options} 
        isLoading={isLoading} 
        updateFilter={updateFilter} 
        resetFilters={resetFilters} 
      />
      <DataTable filters={filters} dateRange={dateRange} />
    </main>
  );
}
