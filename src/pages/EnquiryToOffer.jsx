import WorkflowHeader from '../components/e2o/WorkflowHeader';
import KPICards from '../components/e2o/KPICards';
import FilterToolbar from '../components/e2o/FilterToolbar';
import DataTable from '../components/e2o/DataTable';

export default function EnquiryToOffer() {
  return (
    <main className="flex-1 w-full px-8 flex flex-col py-8 gap-6">
      <WorkflowHeader />
      <KPICards />
      <FilterToolbar />
      <DataTable />
    </main>
  );
}
