import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowHeader from '../components/e2o/WorkflowHeader';
import KPICards from '../components/o2s/KPICards';
import FilterToolbar from '../components/o2s/FilterToolbar';
import DataTable from '../components/o2s/DataTable';

export default function OrderToShipment() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    date_from: "",
    date_to: ""
  });

  const handleGoBack = () => {
    navigate("/");
  };

  const handleReset = () => {
    setDateRange({ date_from: "", date_to: "" });
  };

  return (
    <main className="flex-1 w-full px-8 flex flex-col py-8 gap-6">
      <WorkflowHeader
        title="ORDER TO SHIPMENT"
        dateRange={dateRange}
        setDateRange={setDateRange}
        onGoBack={handleGoBack}
        onReset={handleReset}
      />

      <KPICards dateRange={dateRange} />

      <FilterToolbar />

      <DataTable />
    </main>
  );
}
