import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Play, CheckSquare, Activity, FileText, Settings,
  ChevronLeft, ChevronRight, Wifi, Bot,
} from 'lucide-react';
import { TASKS_DATA } from '@/data/mockData';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Play, label: 'Run Workflow', path: '/run' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks', badge: TASKS_DATA.length },
  { icon: Activity, label: 'Agent Activity', path: '/activity' },
  { icon: FileText, label: 'Audit Logs', path: '/audit' },
  { icon: Settings, label: 'Settings', path: '#', disabled: true },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className={`fixed top-14 left-0 bottom-0 z-30 border-r bg-card transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-56'}`}>
      {/* Version */}
      {!collapsed && (
        <div className="px-4 py-3 border-b">
          <span className="text-xs font-mono text-muted-foreground">v2.4 Enterprise</span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 py-2 space-y-0.5 px-2">
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path + item.label}
              onClick={() => !item.disabled && navigate(item.path)}
              disabled={item.disabled}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                item.disabled
                  ? 'text-muted-foreground/40 cursor-not-allowed'
                  : isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <span className="flex-1 text-left truncate">
                  {item.label}
                  {item.disabled && <span className="text-[10px] ml-1 opacity-50">(soon)</span>}
                </span>
              )}
              {!collapsed && item.badge && (
                <span className="text-[10px] font-semibold bg-primary/15 text-primary rounded-full px-1.5 py-0.5">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-3 space-y-2">
        {!collapsed && (
          <>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Wifi className="h-3 w-3 text-success" />
              99.8% uptime
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="h-3 w-3 text-primary" />
              5 Agents Online
            </div>
          </>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center rounded-lg py-1.5 text-muted-foreground hover:bg-secondary transition"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
}
