import { BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecondaryCard({ icon: Icon, title, description, href }) {
  return (
    <Link 
      to={href}
      className="group block bg-surface rounded-xl p-6 shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer flex flex-col"
    >
      <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center mb-6 shrink-0">
        <Icon className="w-6 h-6 text-secondary" />
      </div>
      
      <h2 className="text-[12px] font-bold text-secondary uppercase tracking-[0.05em] mb-3">
        {title}
      </h2>
      
      <p className="text-[14px] text-text-secondary leading-relaxed flex-grow">
        {description}
      </p>
      
      <div className="flex items-center gap-2 text-[14px] font-semibold text-secondary mt-4">
        <BarChart2 className="w-4 h-4" />
        View Analytics
      </div>
    </Link>
  );
}
