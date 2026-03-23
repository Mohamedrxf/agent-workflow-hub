import { useState } from 'react';
import { Search, AlertTriangle, X } from 'lucide-react';
import { TASKS_DATA, type TaskItem, type Domain, type TaskStatus, type Priority } from '@/data/mockData';
import { DomainBadge } from '@/components/DomainBadge';
import { StatusBadge } from '@/components/StatusBadge';

const statusToAgentStatus = (s: TaskStatus) => {
  switch (s) {
    case 'Completed': return 'completed' as const;
    case 'In Progress': return 'running' as const;
    case 'Escalated': return 'escalated' as const;
    case 'Delayed': return 'failed' as const;
    default: return 'idle' as const;
  }
};

const PRIORITY_CLASSES: Record<Priority, string> = {
  High: 'text-destructive font-semibold',
  Medium: 'text-warning font-medium',
  Low: 'text-muted-foreground',
};

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskItem[]>(TASKS_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [escalation, setEscalation] = useState<string | null>(null);

  const filtered = tasks.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.owner.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (domainFilter !== 'All' && t.domain !== domainFilter) return false;
    if (priorityFilter !== 'All' && t.priority !== priorityFilter) return false;
    return true;
  });

  const markDelayed = (task: TaskItem) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'Delayed' as TaskStatus } : t));
    setEscalation(`Escalation Agent triggered — "${task.name}" is delayed. ${task.owner} and Manager notified. Auto-reassignment initiated if no response in 2 hours.`);
    setTimeout(() => setEscalation(null), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">Tasks</h1>
        <p className="text-sm text-muted-foreground">All auto-generated tasks across domains</p>
      </div>

      {/* Escalation banner */}
      {escalation && (
        <div className="flex items-start gap-3 rounded-lg border-l-4 border-destructive bg-destructive/5 p-4 animate-slide-down">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm flex-1">{escalation}</p>
          <button onClick={() => setEscalation(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks or owners..."
            className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-sm outline-none">
          <option value="All">All Status</option>
          <option>Pending</option><option>In Progress</option><option>Completed</option><option>Escalated</option><option>Delayed</option>
        </select>
        <select value={domainFilter} onChange={e => setDomainFilter(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-sm outline-none">
          <option value="All">All Domains</option>
          <option value="engineering">Engineering</option><option value="finance">Finance</option><option value="hr">HR</option><option value="legal">Legal</option>
        </select>
        <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-sm outline-none">
          <option value="All">All Priority</option>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card card-shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-secondary/50">
              <th className="text-left p-3 font-semibold">Task Name</th>
              <th className="text-left p-3 font-semibold">Domain</th>
              <th className="text-left p-3 font-semibold">Owner</th>
              <th className="text-left p-3 font-semibold">Priority</th>
              <th className="text-left p-3 font-semibold">Deadline</th>
              <th className="text-left p-3 font-semibold">Progress</th>
              <th className="text-left p-3 font-semibold">Status</th>
              <th className="text-left p-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(task => (
              <tr key={task.id} className="border-b hover:bg-secondary/20 transition-colors">
                <td className="p-3 font-medium">{task.name}</td>
                <td className="p-3"><DomainBadge domain={task.domain} /></td>
                <td className="p-3 text-muted-foreground">{task.owner}</td>
                <td className={`p-3 ${PRIORITY_CLASSES[task.priority]}`}>{task.priority}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{task.deadline}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${task.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{task.progress}%</span>
                  </div>
                </td>
                <td className="p-3"><StatusBadge status={statusToAgentStatus(task.status)} /></td>
                <td className="p-3">
                  {task.status !== 'Completed' && task.status !== 'Delayed' && (
                    <button
                      onClick={() => markDelayed(task)}
                      className="text-xs rounded border border-destructive/50 text-destructive px-2 py-1 hover:bg-destructive/10 transition"
                    >
                      Mark Delayed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
