import { useEffect } from 'react';
import { FileText, Truck, LayoutDashboard, Activity } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ModuleCard from '../components/ModuleCard';
import SecondaryCard from '../components/SecondaryCard';
import { fetchUserProfile } from '../utils/apiClient';
import { useUser } from '../contexts/UserContext';

export default function Home() {
  const { setUser } = useUser();

  useEffect(() => {
    fetchUserProfile()
      .then((data) => { if (data) setUser(data); })
      .catch((err) => console.error('Failed to load user profile:', err));
  }, []);

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-8 flex flex-col justify-center pb-16">
      <HeroSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1000px] mx-auto">
        <ModuleCard
          icon={FileText}
          title="ENQUIRY TO OFFER"
          description="Comprehensive management of the quoting lifecycle. Process customer requests, generate technical specifications, and track proposal approvals in real-time."
          href="/e2o"
        />
        <ModuleCard
          icon={Truck}
          title="ORDER TO SHIPMENT"
          description="End-to-end monitoring of production schedules and logistics. Oversee manufacturing progress, quality inspections, and final delivery dispatch."
          href="/o2s"
        />
        <SecondaryCard
          icon={LayoutDashboard}
          title="E2O DASHBOARD"
          description="Analyze conversion rates and sales funnel performance across all enquiry channels."
          href="/analytics-e2o"
        />
        <SecondaryCard
          icon={Activity}
          title="O2S DASHBOARD"
          description="Monitor supply chain efficiency and production throughput KPIs in real-time."
          href="/analytics-o2s"
        />
      </div>

    </main>
  );
}
