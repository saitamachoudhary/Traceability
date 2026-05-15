import { useState, useRef, useEffect } from 'react';
import { Bell, HelpCircle, ChevronDown, User, LogOut, Mail } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user?.name ?? 'Loading...';
  const displayEmail = user?.email ?? '';
  const initials = getInitials(user?.name);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border-outline z-50 flex items-center justify-between px-8">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/andritzlogo.png" alt="ANDRITZ" className="h-6" />
      </div>

      {/* Right side icons + profile */}
      <div className="flex items-center gap-6">
        {/* <Bell className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
        <HelpCircle className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
        <div className="w-px h-6 bg-border-outline" /> */}

        {/* Profile trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="navbar-profile-trigger"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
          >
            <span className="text-[14px] font-medium text-text-primary">{displayName}</span>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-surface-container border border-border-outline flex items-center justify-center overflow-hidden select-none">
              {initials ? (
                <span className="text-[11px] font-semibold text-text-primary">{initials}</span>
              ) : (
                <User className="w-5 h-5 text-text-secondary" />
              )}
            </div>

            <ChevronDown
              className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              id="navbar-profile-dropdown"
              className="absolute right-0 mt-3 w-64 bg-surface border border-border-outline rounded-xl shadow-xl overflow-hidden z-50"
              style={{ animation: 'fadeSlideDown 0.15s ease' }}
            >
              {/* User info section */}
              <div className="px-4 py-3 border-b border-border-outline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container border border-border-outline flex items-center justify-center shrink-0">
                    {initials ? (
                      <span className="text-[13px] font-semibold text-text-primary">{initials}</span>
                    ) : (
                      <User className="w-5 h-5 text-text-secondary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-text-primary truncate">{displayName}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-text-secondary shrink-0" />
                      <p className="text-[11px] text-text-secondary truncate">{displayEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout button */}
              <div className="px-2 py-2">
                <button
                  id="navbar-logout-btn"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
