import type { AgentStatus, Domain } from '@/data/mockData';
import { DOMAIN_ICONS } from '@/data/mockData';
import { StatusBadge } from './StatusBadge';
import { Brain, RefreshCw } from 'lucide-react';

interface AgentCardProps {
  agentName: string;
  domain: Domain | 'orchestrator';
  status: AgentStatus;
  logs: string[];
  retryCount?: number;
  maxRetries?: number;
  tasksCount?: number;
  assignee?: string;
}

const DOMAIN_BORDER: Record<string, string> = {
  engineering: 'border-domain-engineering',
  finance: 'border-domain-finance',
  hr: 'border-domain-hr',
  legal: 'border-domain-legal',
  orchestrator: 'border-primary',
};

const DOMAIN_GLOW: Record<string, string> = {
  engineering: 'shadow-[0_0_16px_hsl(var(--domain-engineering)/0.3)]',
  finance: 'shadow-[0_0_16px_hsl(var(--domain-finance)/0.3)]',
  hr: 'shadow-[0_0_16px_hsl(var(--domain-hr)/0.3)]',
  legal: 'shadow-[0_0_16px_hsl(var(--domain-legal)/0.3)]',
  orchestrator: 'shadow-[0_0_16px_hsl(var(--primary)/0.3)]',
};

export function AgentCard({ agentName, domain, status, logs, retryCount, maxRetries, tasksCount, assignee }: AgentCardProps) {
  const Icon = domain === 'orchestrator' ? Brain : DOMAIN_ICONS[domain];
  const isActive = status === 'running';
  const isCompleted = status === 'completed';
  const isFailed = status === 'failed';
  const isRetrying = status === 'retrying';
  const isEscalated = status === 'escalated';

  let borderColor = 'border-border';
  let glowClass = '';
  if (isActive) {
    borderColor = DOMAIN_BORDER[domain];
    glowClass = DOMAIN_GLOW[domain];
  } else if (isCompleted) {
    borderColor = 'border-success';
  } else if (isFailed) {
    borderColor = 'border-destructive';
  } else if (isRetrying) {
    borderColor = 'border-warning';
  } else if (isEscalated) {
    borderColor = 'border-warning';
  }

  return (
    <div className={`rounded-lg border-2 bg-card p-4 transition-all duration-300 ${borderColor} ${glowClass} ${isActive ? 'animate-shimmer' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="font-semibold text-sm">{agentName}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      {isRetrying && retryCount !== undefined && maxRetries !== undefined && (
        <div className="flex items-center gap-2 mb-2 text-warning text-xs font-medium">
          <RefreshCw className="h-3 w-3 animate-spin-slow" />
          <span className="animate-bounce-num">Retry {retryCount}/{maxRetries}...</span>
        </div>
      )}

      {isEscalated && (
        <div className="mb-2 text-xs font-medium text-warning bg-warning/10 rounded px-2 py-1">
          ⚠ Escalated to CFO — human approval required
        </div>
      )}

      {tasksCount !== undefined && (
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Tasks: {tasksCount}</span>
          {assignee && <span>Owner: {assignee}</span>}
        </div>
      )}

      <div className="border-t pt-2 mt-1 max-h-24 overflow-y-auto space-y-1">
        {logs.map((log, i) => (
          <p key={i} className="text-xs font-mono text-muted-foreground leading-relaxed">{log}</p>
        ))}
      </div>
    </div>
  );
}
