import { useState } from 'react';
import { FileText } from 'lucide-react';
import { AUDIT_DATA, type AuditEntry, type Domain } from '@/data/mockData';
import { DomainBadge } from '@/components/DomainBadge';

type Filter = 'all' | Domain | 'orchestrator' | 'escalations' | 'failures' | 'self-corrections';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'finance', label: 'Finance' },
  { value: 'hr', label: 'HR' },
  { value: 'legal', label: 'Legal' },
  { value: 'escalations', label: 'Escalations Only' },
  { value: 'failures', label: 'Failures Only' },
  { value: 'self-corrections', label: 'Self-Corrections Only' },
];

function filterEntries(entries: AuditEntry[], filter: Filter): AuditEntry[] {
  switch (filter) {
    case 'all': return entries;
    case 'escalations': return entries.filter(e => e.outcome === 'ESCALATED');
    case 'failures': return entries.filter(e => e.outcome === 'FAILED');
    case 'self-corrections': return entries.filter(e => e.recovery !== 'N/A' && e.outcome !== 'SUCCESS');
    default: return entries.filter(e => e.domain === filter);
  }
}

const OUTCOME_CLASSES: Record<string, string> = {
  SUCCESS: 'bg-success/15 text-success',
  FAILED: 'bg-destructive/15 text-destructive',
  ESCALATED: 'bg-warning/15 text-warning',
  INFO: 'bg-primary/15 text-primary',
};

const ROW_BG: Record<string, string> = {
  FAILED: 'bg-destructive/5',
  ESCALATED: 'bg-warning/5',
};

export default function AuditLogs() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const filtered = filterEntries(AUDIT_DATA, activeFilter);

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">Complete compliance trail of every agent decision and self-correction</p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
              activeFilter === f.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-muted-foreground border-border hover:bg-accent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card card-shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-secondary/50">
              <th className="text-left p-3 font-semibold">Timestamp</th>
              <th className="text-left p-3 font-semibold">Agent</th>
              <th className="text-left p-3 font-semibold">Domain</th>
              <th className="text-left p-3 font-semibold">Action</th>
              <th className="text-left p-3 font-semibold min-w-[200px]">AI Reasoning</th>
              <th className="text-left p-3 font-semibold">Outcome</th>
              <th className="text-left p-3 font-semibold min-w-[200px]">Recovery Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(entry => (
              <tr key={entry.id} className={`border-b hover:bg-secondary/20 transition-colors ${ROW_BG[entry.outcome] || ''}`}>
                <td className="p-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{entry.timestamp}</td>
                <td className="p-3 font-medium whitespace-nowrap">{entry.agent}</td>
                <td className="p-3">
                  {entry.domain !== 'orchestrator' ? (
                    <DomainBadge domain={entry.domain as Domain} />
                  ) : (
                    <span className="text-xs font-medium text-primary">Orchestrator</span>
                  )}
                </td>
                <td className="p-3">{entry.action}</td>
                <td className="p-3 text-muted-foreground text-xs leading-relaxed">{entry.reasoning}</td>
                <td className="p-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${OUTCOME_CLASSES[entry.outcome]}`}>
                    {entry.outcome}
                  </span>
                </td>
                <td className="p-3 text-xs text-muted-foreground leading-relaxed">{entry.recovery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
