import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ModuleCard({ icon: Icon, title, description, href }) {
  return (
    <Link 
      to={href}
      className="group block bg-surface rounded-xl p-5 h-[200px] shadow-[var(--shadow-default)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer flex flex-col"
    >
      <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center mb-3 shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      
      <h2 className="text-[12px] font-bold text-primary uppercase tracking-[0.05em] mb-2">
        {title}
      </h2>
      
      <p className="text-[13px] text-text-secondary leading-snug flex-grow">
        {description}
      </p>
      
      <div className="flex items-center gap-2 text-[13px] font-semibold text-primary mt-3">
        Enter Module
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
