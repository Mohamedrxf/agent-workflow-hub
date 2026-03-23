import { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, Play, FileText, Info, ArrowDown, CheckCircle2 } from 'lucide-react';
import { SAMPLE_TRANSCRIPT, type AgentStatus, type Domain } from '@/data/mockData';
import { AgentCard } from '@/components/AgentCard';
import { DomainBadge } from '@/components/DomainBadge';

const DOMAIN_KEYWORDS: Record<Domain, string[]> = {
  engineering: ['api', 'deploy', 'production', 'staging', 'code', 'ticket', 'jira', 'documentation', 'endpoint'],
  finance: ['budget', 'approval', '$', 'cost', 'expense', 'payment', 'payroll', 'finance', 'cfo'],
  hr: ['onboard', 'hire', 'new designer', 'new employee', 'workstation', 'hr', 'scheduling', 'orientation'],
  legal: ['nda', 'contract', 'legal', 'counsel', 'compliance', 'registry', 'agreement', 'acme'],
};

function detectDomains(text: string): Domain[] {
  const lower = text.toLowerCase();
  return (['engineering', 'finance', 'hr', 'legal'] as Domain[]).filter(d =>
    DOMAIN_KEYWORDS[d].some(kw => lower.includes(kw))
  );
}

interface DomainAgentState {
  status: AgentStatus;
  logs: string[];
  retryCount: number;
  tasksCount: number;
  assignee: string;
}

const INITIAL_AGENT: DomainAgentState = { status: 'idle', logs: [], retryCount: 0, tasksCount: 0, assignee: '' };

export default function RunWorkflow() {
  const [transcript, setTranscript] = useState('');
  const [detectedDomains, setDetectedDomains] = useState<Domain[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [orchestratorStatus, setOrchestratorStatus] = useState<AgentStatus>('idle');
  const [orchestratorLogs, setOrchestratorLogs] = useState<string[]>([]);
  const [agents, setAgents] = useState<Record<Domain, DomainAgentState>>({
    engineering: { ...INITIAL_AGENT },
    finance: { ...INITIAL_AGENT },
    hr: { ...INITIAL_AGENT },
    legal: { ...INITIAL_AGENT },
  });
  const [showSummary, setShowSummary] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    setDetectedDomains(detectDomains(transcript));
  }, [transcript]);

  const updateAgent = useCallback((domain: Domain, update: Partial<DomainAgentState>) => {
    setAgents(prev => ({ ...prev, [domain]: { ...prev[domain], ...update } }));
  }, []);

  const addAgentLog = useCallback((domain: Domain, log: string) => {
    setAgents(prev => ({
      ...prev,
      [domain]: { ...prev[domain], logs: [...prev[domain].logs, log] },
    }));
  }, []);

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const t = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeouts.current.push(id);
  };

  const runWorkflow = () => {
    if (!transcript.trim()) return;
    clearTimeouts();
    setIsRunning(true);
    setShowSummary(false);
    setProgress(0);
    setOrchestratorStatus('running');
    setOrchestratorLogs(['Analyzing transcript...']);
    setAgents({
      engineering: { ...INITIAL_AGENT },
      finance: { ...INITIAL_AGENT },
      hr: { ...INITIAL_AGENT },
      legal: { ...INITIAL_AGENT },
    });

    // Orchestrator phase
    t(() => {
      setOrchestratorLogs(prev => [...prev, '4 domains detected: Engineering, Finance, HR, Legal']);
      setProgress(10);
    }, 1000);

    t(() => {
      setOrchestratorStatus('completed');
      setOrchestratorLogs(prev => [...prev, 'Dispatching to all 4 agents simultaneously...']);
      setProgress(20);

      // PARALLEL activation
      updateAgent('engineering', { status: 'running' });
      addAgentLog('engineering', 'Creating Jira ticket: API Deployment');
      updateAgent('finance', { status: 'running' });
      addAgentLog('finance', 'Checking budget approval limits...');
      updateAgent('hr', { status: 'running' });
      addAgentLog('hr', 'Initiating onboarding workflow for Priya');
      updateAgent('legal', { status: 'running' });
      addAgentLog('legal', 'Routing NDA to legal counsel');
    }, 1500);

    // HR completes first (2s after activation)
    t(() => {
      updateAgent('hr', { status: 'completed', tasksCount: 2, assignee: 'Neha Joshi' });
      addAgentLog('hr', 'Onboarding plan created ✓');
      addAgentLog('hr', 'Onboarding call scheduled ✓');
      setProgress(40);
    }, 3500);

    // Engineering completes (3s)
    t(() => {
      updateAgent('engineering', { status: 'completed', tasksCount: 3, assignee: 'Ravi Kumar' });
      addAgentLog('engineering', 'Tickets created, assigned to Ravi ✓');
      addAgentLog('engineering', 'Documentation task queued ✓');
      setProgress(55);
    }, 4500);

    // Finance FAILS
    t(() => {
      updateAgent('finance', { status: 'failed' });
      addAgentLog('finance', 'ERROR: Budget cap exceeded ($15K > $10K limit)');
      setProgress(60);
    }, 4000);

    // Finance retry 1
    t(() => {
      updateAgent('finance', { status: 'retrying', retryCount: 1 });
      addAgentLog('finance', 'Self-correcting: Retry 1/3 — VP Finance route');
    }, 5000);

    // Finance retry 2
    t(() => {
      updateAgent('finance', { status: 'retrying', retryCount: 2 });
      addAgentLog('finance', 'Retry 2/3 failed — preparing CFO escalation');
      setProgress(70);
    }, 6000);

    // Legal completes (4s)
    t(() => {
      updateAgent('legal', { status: 'completed', tasksCount: 1, assignee: 'Legal Team' });
      addAgentLog('legal', 'NDA routed, response expected by Wednesday ✓');
      setProgress(80);
    }, 5500);

    // Finance escalates
    t(() => {
      updateAgent('finance', { status: 'escalated', retryCount: 3, tasksCount: 1, assignee: 'CFO Pending' });
      addAgentLog('finance', 'Escalated to CFO — human approval required');
      setProgress(95);
    }, 7000);

    // Summary
    t(() => {
      setProgress(100);
      setShowSummary(true);
      setIsRunning(false);
    }, 8000);
  };

  const loadSample = () => {
    setTranscript(SAMPLE_TRANSCRIPT);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold">Run Workflow</h1>
        <p className="text-sm text-muted-foreground">Upload a meeting transcript and let autonomous agents handle the rest</p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">True parallel execution</span> — Engineering, Finance, HR, and Legal agents run simultaneously. Each operates independently: if Finance fails, HR and Engineering continue unblocked. This cannot be replaced by a single API call.
        </p>
      </div>

      {/* Progress bar */}
      {isRunning && (
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LEFT — Meeting Input */}
        <div className="rounded-lg border bg-card p-5 card-shadow space-y-4">
          <h2 className="text-lg font-semibold">Meeting Input</h2>
          <textarea
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            className="w-full h-48 rounded-lg border bg-background p-3 text-sm font-mono resize-none outline-none focus:ring-2 focus:ring-primary/50 transition"
          />

          <div className="border-2 border-dashed rounded-lg p-4 text-center text-sm text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-5 w-5 mx-auto mb-1" />
            Drop .txt .docx .pdf or click to upload
          </div>

          {/* Domain detection */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Detected Domains</p>
            <div className="flex flex-wrap gap-2">
              {(['engineering', 'finance', 'hr', 'legal'] as Domain[]).map(d => (
                <div key={d} className={`transition-opacity duration-300 ${detectedDomains.includes(d) ? 'opacity-100' : 'opacity-25'}`}>
                  <DomainBadge domain={d} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={runWorkflow}
              disabled={isRunning || !transcript.trim()}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <><span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin-slow" /> Running...</>
              ) : (
                <><Play className="h-4 w-4" /> Run Autonomous Workflow</>
              )}
            </button>
            <button
              onClick={loadSample}
              className="rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-secondary transition"
            >
              <FileText className="h-4 w-4 inline mr-1" />
              Load Sample
            </button>
          </div>
        </div>

        {/* RIGHT — Agent Execution Pipeline */}
        <div className="space-y-4">
          {/* Orchestrator */}
          <AgentCard
            agentName="Orchestrator Agent"
            domain="orchestrator"
            status={orchestratorStatus}
            logs={orchestratorLogs}
          />

          {/* Fan-out arrow */}
          {orchestratorStatus !== 'idle' && (
            <div className="flex justify-center text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <ArrowDown className="h-5 w-5" />
                <span className="text-xs font-mono">FAN-OUT (parallel)</span>
                <div className="flex gap-4">
                  <div className="w-px h-4 bg-border" />
                  <div className="w-px h-4 bg-border" />
                  <div className="w-px h-4 bg-border" />
                  <div className="w-px h-4 bg-border" />
                </div>
              </div>
            </div>
          )}

          {/* 2x2 Agent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AgentCard
              agentName="Engineering Agent"
              domain="engineering"
              status={agents.engineering.status}
              logs={agents.engineering.logs}
              tasksCount={agents.engineering.tasksCount}
              assignee={agents.engineering.assignee}
            />
            <AgentCard
              agentName="Finance Agent"
              domain="finance"
              status={agents.finance.status}
              logs={agents.finance.logs}
              retryCount={agents.finance.retryCount}
              maxRetries={3}
              tasksCount={agents.finance.tasksCount}
              assignee={agents.finance.assignee}
            />
            <AgentCard
              agentName="HR Agent"
              domain="hr"
              status={agents.hr.status}
              logs={agents.hr.logs}
              tasksCount={agents.hr.tasksCount}
              assignee={agents.hr.assignee}
            />
            <AgentCard
              agentName="Legal Agent"
              domain="legal"
              status={agents.legal.status}
              logs={agents.legal.logs}
              tasksCount={agents.legal.tasksCount}
              assignee={agents.legal.assignee}
            />
          </div>

          {/* Summary */}
          {showSummary && (
            <div className="rounded-lg border-2 border-success bg-success/5 p-5 animate-fade-up">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-semibold">Workflow Complete — Partial Success</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div><p className="text-2xl font-bold">7</p><p className="text-xs text-muted-foreground">Tasks Created</p></div>
                <div><p className="text-2xl font-bold text-warning">1</p><p className="text-xs text-muted-foreground">Approvals Pending</p></div>
                <div><p className="text-2xl font-bold text-warning">1</p><p className="text-xs text-muted-foreground">Escalations</p></div>
                <div><p className="text-2xl font-bold text-success">✓</p><p className="text-xs text-muted-foreground">Audit Logged</p></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
