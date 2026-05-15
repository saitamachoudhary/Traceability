import { useUser } from '../contexts/UserContext';

export default function HeroSection() {
  const { user } = useUser();
  const userName = user?.userName ?? '';

  return (
    <div className="text-center pt-16 pb-12 px-4">
      <h1 className="text-[32px] font-bold text-primary mb-4 tracking-tight">
        Welcome back{userName ? `, ${userName}` : ''}.
      </h1>
      <p className="text-[16px] text-text-secondary max-w-2xl mx-auto">
        Select a workflow module to continue. Manage your industrial operations through our precision-engineered management tools.
      </p>
    </div>
  );
}
