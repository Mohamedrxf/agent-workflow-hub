import { TIMELINE_DATA, AGENTS_CONFIG, DOMAIN_CONFIG, type Domain, type TimelineEvent } from '@/data/mockData';
import { Brain, Clock } from 'lucide-react';
import { DOMAIN_ICONS } from '@/data/mockData';

const STATUS_COLORS: Record<TimelineEvent['status'], string> = {
  info: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  error: 'bg-destructive/15 text-destructive',
  warning: 'bg-warning/15 text-warning',
};

const BORDER_COLORS: Record<string, string> = {
  orchestrator: 'border-l-primary',
  engineering: 'border-l-domain-engineering',
  finance: 'border-l-domain-finance',
  hr: 'border-l-domain-hr',
  legal: 'border-l-domain-legal',
};

export default function AgentActivity() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">Agent Activity</h1>
        <p className="text-sm text-muted-foreground">Real-time timeline of all agent actions across domains</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Timeline */}
        <div className="rounded-lg border bg-card p-5 card-shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Execution Timeline
          </h2>
          <div className="space-y-2">
            {TIMELINE_DATA.map(entry => (
              <div key={entry.id} className={`flex items-start gap-3 rounded-lg border-l-4 p-3 hover:bg-secondary/20 transition-colors ${BORDER_COLORS[entry.domain]}`}>
                <span className="text-xs font-mono text-muted-foreground shrink-0 pt-0.5 w-16">{entry.time}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold">{entry.agent}</span>
                    <span className={`text-[10px] rounded-full px-2 py-0.5 font-medium ${STATUS_COLORS[entry.status]}`}>
                      {entry.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right summary */}
        <div className="space-y-4">
          {/* Per-agent stats */}
          <div className="rounded-lg border bg-card p-5 card-shadow">
            <h3 className="font-semibold mb-3">Agent Stats Today</h3>
            <div className="space-y-3">
              {AGENTS_CONFIG.map(agent => {
                const Icon = agent.domain === 'orchestrator' ? Brain : DOMAIN_ICONS[agent.domain as Domain];
                return (
                  <div key={agent.name} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm flex-1 truncate">{agent.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{agent.actionsToday}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success rates */}
          <div className="rounded-lg border bg-card p-5 card-shadow">
            <h3 className="font-semibold mb-3">Success Rates</h3>
            <div className="space-y-3">
              {AGENTS_CONFIG.map(agent => (
                <div key={agent.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{agent.name.replace(' Agent', '')}</span>
                    <span className="font-mono">{agent.successRate}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${agent.successRate >= 90 ? 'bg-success' : agent.successRate >= 80 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${agent.successRate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parallel Execution Proof */}
          <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
            <h3 className="font-semibold text-sm mb-2 text-primary">⚡ Parallel Execution Proof</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Engineering + HR + Legal + Finance all started at <span className="font-mono font-semibold text-foreground">10:28:03</span> — proving true parallel execution, not sequential processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
