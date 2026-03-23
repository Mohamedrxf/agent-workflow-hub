import { ArrowUpRight, Brain, CheckCircle2, AlertTriangle, Shield } from 'lucide-react';
import { ACTIVE_WORKFLOWS, AGENTS_CONFIG, DOMAIN_CONFIG, DOMAIN_ICONS, type AgentStatus, type Domain } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';

const KPI_CARDS = [
  { label: 'Meetings Processed', value: 24, change: '↑8 this week', icon: Brain, accent: 'text-primary' },
  { label: 'Tasks Auto-Created', value: 147, change: 'across all domains', icon: CheckCircle2, accent: 'text-success' },
  { label: 'Failures Recovered', value: 12, change: 'self-corrections', icon: AlertTriangle, accent: 'text-warning' },
  { label: 'SLA Breaches Prevented', value: 6, change: 'this month', icon: Shield, accent: 'text-primary' },
];

const agentStatusPill = (status: AgentStatus, domain: Domain) => {
  const cfg = DOMAIN_CONFIG[domain];
  const short = cfg.label.slice(0, 3);
  if (status === 'completed') return <span key={domain} className="text-xs font-medium text-success">{short} ✓</span>;
  if (status === 'running') return <span key={domain} className="text-xs font-medium text-primary">{short} ⏳</span>;
  if (status === 'failed' || status === 'escalated') return <span key={domain} className="text-xs font-medium text-destructive">{short} ✗</span>;
  if (status === 'retrying') return <span key={domain} className="text-xs font-medium text-warning">{short} ↻</span>;
  return <span key={domain} className="text-xs font-medium text-muted-foreground">{short} —</span>;
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of autonomous workflows and agent performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map(kpi => (
          <div key={kpi.label} className="rounded-lg border bg-card p-5 card-shadow hover:card-shadow-hover transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
              <kpi.icon className={`h-5 w-5 ${kpi.accent}`} />
            </div>
            <p className="text-3xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Workflows */}
        <div className="rounded-lg border bg-card p-5 card-shadow">
          <h2 className="text-lg font-semibold mb-4">Active Workflows</h2>
          <div className="space-y-4">
            {ACTIVE_WORKFLOWS.map(wf => (
              <div key={wf.id} className="rounded-lg border p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{wf.name}</span>
                  <span className="text-xs text-muted-foreground">{wf.elapsed}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${wf.progress}%` }} />
                </div>
                <div className="flex items-center gap-3">
                  {(Object.entries(wf.agents) as [Domain, AgentStatus][]).map(([d, s]) => (
                    <span key={d}>{agentStatusPill(s, d)}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Health */}
        <div className="rounded-lg border bg-card p-5 card-shadow">
          <h2 className="text-lg font-semibold mb-4">Domain Agent Health</h2>
          <div className="space-y-3">
            {AGENTS_CONFIG.map(agent => {
              const Icon = agent.domain === 'orchestrator' ? Brain : DOMAIN_ICONS[agent.domain as Domain];
              return (
                <div key={agent.name} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
                  <Icon className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{agent.name}</span>
                      <span className="text-xs text-muted-foreground">{agent.actionsToday} actions today</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-success rounded-full" style={{ width: `${agent.successRate}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{agent.successRate}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
