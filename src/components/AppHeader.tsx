import { useState } from 'react';
import { Zap, User, Menu, X, LayoutDashboard, Play, CheckSquare, Activity, FileText, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { TASKS_DATA } from '@/data/mockData';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Play, label: 'Run Workflow', path: '/run' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks', badge: TASKS_DATA.length },
  { icon: Activity, label: 'Agent Activity', path: '/activity' },
  { icon: FileText, label: 'Audit Logs', path: '/audit' },
  { icon: Settings, label: 'Settings', path: '#', disabled: true },
];

export function AppHeader({ onLoginClick }: { onLoginClick: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b bg-card/80 backdrop-blur-md">
        <div className="h-full flex items-center justify-between px-4">
          {/* Left — Hamburger + Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-secondary transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <div className="leading-tight">
                <span className="text-base font-bold">Auto<span className="text-primary">Ops</span></span>
                <p className="text-[10px] text-muted-foreground hidden sm:block">Autonomous Enterprise Workflows</p>
              </div>
            </div>
          </div>

          {/* Right — Theme, Login, Avatar */}
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

      {/* Hamburger Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-foreground/10 backdrop-blur-sm" />
          <nav
            className="absolute top-14 left-0 w-64 bottom-0 bg-card border-r shadow-lg animate-fade-up overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b">
              <span className="text-xs font-mono text-muted-foreground">v2.4 Enterprise</span>
            </div>
            <div className="py-2 px-2 space-y-0.5">
              {NAV_ITEMS.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path + item.label}
                    onClick={() => {
                      if (!item.disabled) {
                        navigate(item.path);
                        setMenuOpen(false);
                      }
                    }}
                    disabled={item.disabled}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      item.disabled
                        ? 'text-muted-foreground/40 cursor-not-allowed'
                        : isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">
                      {item.label}
                      {item.disabled && <span className="text-[10px] ml-1 opacity-50">(soon)</span>}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold bg-primary/15 text-primary rounded-full px-1.5 py-0.5">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t p-3 space-y-1 bg-card">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" /> 99.8% uptime
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-primary" /> 5 Agents Online
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
