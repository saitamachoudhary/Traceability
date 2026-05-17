import { useUser } from '../contexts/UserContext';

export default function HeroSection() {
  const { user } = useUser();
  const userName = user?.userName ?? '';

  return (
    <div className="text-center pt-8 pb-6 px-4">
      <h1 className="text-[28px] font-bold text-primary mb-2 tracking-tight">
        Welcome back{userName ? `, ${userName}` : ''}.
      </h1>
      <p className="text-[14px] text-text-secondary max-w-2xl mx-auto">
        Select a workflow module to continue. Manage your industrial operations through our precision-engineered management tools.
      </p>
    </div>
  );
}
