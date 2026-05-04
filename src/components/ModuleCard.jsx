import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ModuleCard({ icon: Icon, title, description, href }) {
  return (
    <Link 
      to={href}
      className="group block bg-surface rounded-xl p-6 h-[260px] shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer flex flex-col"
    >
      <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center mb-6 shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h2 className="text-[12px] font-bold text-primary uppercase tracking-[0.05em] mb-3">
        {title}
      </h2>
      
      <p className="text-[14px] text-text-secondary leading-relaxed flex-grow">
        {description}
      </p>
      
      <div className="flex items-center gap-2 text-[14px] font-semibold text-primary mt-4">
        Enter Module
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
