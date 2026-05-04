import { Bell, HelpCircle, ChevronDown, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border-outline z-50 flex items-center justify-between px-8">
      <div className="flex items-center">
        <img src="/andritzlogo.png" alt="ANDRITZ" className="h-6" />
      </div>
      <div className="flex items-center gap-6">
        <Bell className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
        <HelpCircle className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
        <div className="w-px h-6 bg-border-outline"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <span className="text-[14px] font-medium text-text-primary">Marcus Weber</span>
          <div className="w-8 h-8 rounded-full bg-surface-container border border-border-outline flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-text-secondary" />
          </div>
          <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
        </div>
      </div>
    </nav>
  );
}
