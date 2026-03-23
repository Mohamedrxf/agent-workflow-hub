import { CheckCircle2, XCircle, Loader2, AlertTriangle, Clock, Pause, Circle } from 'lucide-react';
import type { AgentStatus } from '@/data/mockData';

const STATUS_MAP: Record<AgentStatus, { label: string; classes: string; Icon: React.FC<any> }> = {
  idle: { label: 'Idle', classes: 'bg-muted text-muted-foreground', Icon: Circle },
  running: { label: 'Running', classes: 'bg-primary/15 text-primary', Icon: Loader2 },
  completed: { label: 'Completed', classes: 'bg-success/15 text-success', Icon: CheckCircle2 },
  failed: { label: 'Failed', classes: 'bg-destructive/15 text-destructive', Icon: XCircle },
  retrying: { label: 'Retrying', classes: 'bg-warning/15 text-warning', Icon: Loader2 },
  escalated: { label: 'Escalated', classes: 'bg-warning/20 text-warning', Icon: AlertTriangle },
  blocked: { label: 'Blocked', classes: 'bg-warning/15 text-warning', Icon: Pause },
};

export function StatusBadge({ status }: { status: AgentStatus }) {
  const config = STATUS_MAP[status];
  const { Icon } = config;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes}`}>
      <Icon className={`h-3 w-3 ${status === 'running' || status === 'retrying' ? 'animate-spin-slow' : ''}`} />
      {config.label}
    </span>
  );
}
