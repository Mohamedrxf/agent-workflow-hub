import { Zap, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const NAV_TABS = [
  { label: 'Dashboard', path: '/' },
  { label: 'Run Workflow', path: '/run' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Agent Activity', path: '/activity' },
  { label: 'Audit Logs', path: '/audit' },
];

export function AppHeader({ onLoginClick }: { onLoginClick: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b bg-card/80 backdrop-blur-md">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left — Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Zap className="h-5 w-5 text-primary" />
          <div className="leading-tight">
            <span className="text-base font-bold">Auto<span className="text-primary">Ops</span></span>
            <p className="text-[10px] text-muted-foreground hidden sm:block">Autonomous Enterprise Workflows</p>
          </div>
        </div>

        {/* Center — Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {NAV_TABS.map(tab => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right — Status, Theme, Login, Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
            System Active
          </div>
          <ThemeToggle />
          <button
            onClick={onLoginClick}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-secondary transition"
          >
            <User className="h-4 w-4" />
            Login
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xs font-bold text-primary-foreground">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
