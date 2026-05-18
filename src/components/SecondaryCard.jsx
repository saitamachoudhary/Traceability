import { BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SecondaryCard({ icon: Icon, title, description, href }) {
  return (
    <Link 
      to={href}
      className="group block bg-surface rounded-xl p-5 h-[180px] shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer flex flex-col"
    >
      <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center mb-3 shrink-0">
        <Icon className="w-5 h-5 text-secondary" />
      </div>
      
      <h2 className="text-[12px] font-bold text-secondary uppercase tracking-[0.05em] mb-2">
        {title}
      </h2>
      
      <p className="text-[13px] text-text-secondary leading-snug flex-grow">
        {description}
      </p>
      
      <div className="flex items-center gap-2 text-[13px] font-semibold text-secondary mt-3">
        <BarChart2 className="w-4 h-4" />
        View Analytics
      </div>
    </Link>
  );
}
