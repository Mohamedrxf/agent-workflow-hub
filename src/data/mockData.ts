import { Code2, DollarSign, Users, Scale, Brain } from 'lucide-react';

export type Domain = 'engineering' | 'finance' | 'hr' | 'legal';
export type AgentStatus = 'idle' | 'running' | 'completed' | 'failed' | 'retrying' | 'escalated' | 'blocked';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Escalated' | 'Delayed';
export type Priority = 'High' | 'Medium' | 'Low';

export const DOMAIN_CONFIG: Record<Domain, { label: string; colorClass: string; bgClass: string; borderClass: string }> = {
  engineering: { label: 'Engineering', colorClass: 'text-domain-engineering', bgClass: 'bg-domain-engineering/10', borderClass: 'border-domain-engineering' },
  finance: { label: 'Finance', colorClass: 'text-domain-finance', bgClass: 'bg-domain-finance/10', borderClass: 'border-domain-finance' },
  hr: { label: 'HR', colorClass: 'text-domain-hr', bgClass: 'bg-domain-hr/10', borderClass: 'border-domain-hr' },
  legal: { label: 'Legal', colorClass: 'text-domain-legal', bgClass: 'bg-domain-legal/10', borderClass: 'border-domain-legal' },
};

export const DOMAIN_ICONS = {
  engineering: Code2,
  finance: DollarSign,
  hr: Users,
  legal: Scale,
  orchestrator: Brain,
};

export const SAMPLE_TRANSCRIPT = `Team Standup Meeting — October 12, 2024 — 10:15 AM

Sarah (PM): Alright team, let's go through priorities for this week.

Ravi (Engineering Lead): The API deployment is ready for staging. I'll need the production push done by Friday. Also, we need to write documentation for the new endpoints.

Amit (Finance): We need budget approval for the new server infrastructure — it's $15,000. I've submitted the request but it needs CFO sign-off since it exceeds the auto-approval limit.

Neha (HR): Priya, our new designer, starts Monday. I need IT to set up her workstation, accounts, and schedule her onboarding call with the team leads.

Deepak (Legal): The NDA for client Acme Corp needs to be reviewed before Wednesday. I've drafted it, but it needs counsel review and then filing with the legal registry.

Sarah: Ravi, can you own the API deployment end-to-end?
Ravi: Yes, I'll create the tickets and track it.

Sarah: Amit, the budget — is there a way to expedite?
Amit: I'll try the alternate approval chain through VP Finance first.

Sarah: Great. Neha, make sure Priya's onboarding is seamless.
Neha: Already on it. I'll coordinate with Ankit from IT.

Sarah: Deepak, Wednesday is a hard deadline for the NDA.
Deepak: Understood. I'll route it to counsel today.

Sarah: Perfect. Let's reconvene Thursday to check progress.`;

export interface TaskItem {
  id: string;
  name: string;
  domain: Domain;
  owner: string;
  priority: Priority;
  deadline: string;
  progress: number;
  status: TaskStatus;
  agentCreated: string;
}

export const TASKS_DATA: TaskItem[] = [
  { id: '1', name: 'Deploy API to production', domain: 'engineering', owner: 'Ravi Kumar', priority: 'High', deadline: 'Oct 17', progress: 65, status: 'In Progress', agentCreated: 'Engineering Agent' },
  { id: '2', name: 'Approve $15K server budget', domain: 'finance', owner: 'CFO Pending', priority: 'High', deadline: 'Oct 16', progress: 0, status: 'Escalated', agentCreated: 'Finance Agent' },
  { id: '3', name: 'Onboard Priya — IT setup', domain: 'hr', owner: 'Ankit Das', priority: 'Medium', deadline: 'Oct 14', progress: 100, status: 'Completed', agentCreated: 'HR Agent' },
  { id: '4', name: 'Review Acme Corp NDA', domain: 'legal', owner: 'Legal Team', priority: 'High', deadline: 'Oct 15', progress: 30, status: 'In Progress', agentCreated: 'Legal Agent' },
  { id: '5', name: 'Write API documentation', domain: 'engineering', owner: 'Ravi Kumar', priority: 'Medium', deadline: 'Oct 18', progress: 20, status: 'Pending', agentCreated: 'Engineering Agent' },
  { id: '6', name: 'Process payroll adjustment', domain: 'finance', owner: 'Finance Team', priority: 'High', deadline: 'Oct 15', progress: 80, status: 'In Progress', agentCreated: 'Finance Agent' },
  { id: '7', name: 'Schedule Priya onboarding call', domain: 'hr', owner: 'Neha Joshi', priority: 'Low', deadline: 'Oct 14', progress: 100, status: 'Completed', agentCreated: 'HR Agent' },
  { id: '8', name: 'File NDA with legal registry', domain: 'legal', owner: 'Legal Team', priority: 'Medium', deadline: 'Oct 16', progress: 0, status: 'Pending', agentCreated: 'Legal Agent' },
];

export interface TimelineEvent {
  id: string;
  time: string;
  agent: string;
  domain: Domain | 'orchestrator';
  text: string;
  status: 'info' | 'success' | 'error' | 'warning';
}

export const TIMELINE_DATA: TimelineEvent[] = [
  { id: 't1', time: '10:28:00', agent: 'Orchestrator', domain: 'orchestrator', text: 'Received transcript, detecting domains...', status: 'info' },
  { id: 't2', time: '10:28:02', agent: 'Orchestrator', domain: 'orchestrator', text: '4 domains detected: Eng, Finance, HR, Legal', status: 'info' },
  { id: 't3', time: '10:28:02', agent: 'Orchestrator', domain: 'orchestrator', text: 'Dispatching to all 4 agents simultaneously', status: 'info' },
  { id: 't4', time: '10:28:03', agent: 'Engineering Agent', domain: 'engineering', text: 'Creating Jira ticket: API Deployment', status: 'info' },
  { id: 't5', time: '10:28:03', agent: 'HR Agent', domain: 'hr', text: 'Initiating onboarding workflow for Priya', status: 'info' },
  { id: 't6', time: '10:28:03', agent: 'Legal Agent', domain: 'legal', text: 'Routing NDA to legal counsel', status: 'info' },
  { id: 't7', time: '10:28:03', agent: 'Finance Agent', domain: 'finance', text: 'Checking budget approval limits', status: 'info' },
  { id: 't8', time: '10:28:05', agent: 'HR Agent', domain: 'hr', text: 'Onboarding plan created ✓ (completed in 2s)', status: 'success' },
  { id: 't9', time: '10:28:06', agent: 'Finance Agent', domain: 'finance', text: 'ERROR: Budget cap exceeded ($15K > $10K limit)', status: 'error' },
  { id: 't10', time: '10:28:06', agent: 'Finance Agent', domain: 'finance', text: 'Self-correcting: Retry 1/3 — escalating tier', status: 'warning' },
  { id: 't11', time: '10:28:07', agent: 'Engineering Agent', domain: 'engineering', text: 'Tickets created, assigned to Ravi ✓', status: 'success' },
  { id: 't12', time: '10:28:08', agent: 'Finance Agent', domain: 'finance', text: 'Retry 2/3 failed — preparing CFO escalation', status: 'warning' },
  { id: 't13', time: '10:28:09', agent: 'Legal Agent', domain: 'legal', text: 'NDA routed, response expected by Wednesday ✓', status: 'success' },
  { id: 't14', time: '10:28:10', agent: 'Finance Agent', domain: 'finance', text: 'Escalated to CFO — human approval required', status: 'error' },
  { id: 't15', time: '10:28:10', agent: 'Orchestrator', domain: 'orchestrator', text: '3/4 agents complete, 1 escalated — workflow closed', status: 'warning' },
];

export interface AuditEntry {
  id: string;
  timestamp: string;
  agent: string;
  domain: Domain | 'orchestrator';
  action: string;
  reasoning: string;
  outcome: 'SUCCESS' | 'FAILED' | 'ESCALATED' | 'INFO';
  recovery: string;
}

export const AUDIT_DATA: AuditEntry[] = [
  { id: 'a1', timestamp: '10:28:00 AM', agent: 'Orchestrator', domain: 'orchestrator', action: 'Transcript received and parsed', reasoning: 'Incoming transcript contains 15 lines with mentions of 4 distinct domains based on keyword analysis', outcome: 'SUCCESS', recovery: 'N/A' },
  { id: 'a2', timestamp: '10:28:02 AM', agent: 'Orchestrator', domain: 'orchestrator', action: 'Domain detection complete', reasoning: 'Identified Engineering (API, deployment), Finance (budget, $15K), HR (onboarding, Priya), Legal (NDA, Acme Corp)', outcome: 'SUCCESS', recovery: 'N/A' },
  { id: 'a3', timestamp: '10:28:03 AM', agent: 'Engineering Agent', domain: 'engineering', action: 'Created Jira tickets for API deployment', reasoning: 'Transcript mentions "API deployment by Friday" with Ravi as owner — creating 2 tickets: deploy + docs', outcome: 'SUCCESS', recovery: 'N/A' },
  { id: 'a4', timestamp: '10:28:03 AM', agent: 'HR Agent', domain: 'hr', action: 'Initiated onboarding workflow', reasoning: 'New hire Priya starting Monday — triggering IT setup, account creation, and onboarding call scheduling', outcome: 'SUCCESS', recovery: 'N/A' },
  { id: 'a5', timestamp: '10:28:06 AM', agent: 'Finance Agent', domain: 'finance', action: 'Budget approval check failed', reasoning: 'Requested amount $15,000 exceeds auto-approval limit of $10,000 defined in company policy', outcome: 'FAILED', recovery: 'Initiated escalation to CFO — Retry 1/3 attempted first' },
  { id: 'a6', timestamp: '10:28:07 AM', agent: 'Finance Agent', domain: 'finance', action: 'Retry 1/3 via alternate approval route', reasoning: 'Attempting VP Finance approval chain as alternate path before CFO escalation', outcome: 'FAILED', recovery: 'VP Finance also blocked — attempting final retry via CFO direct route' },
  { id: 'a7', timestamp: '10:28:08 AM', agent: 'Finance Agent', domain: 'finance', action: 'Retry 2/3 via alternate route', reasoning: 'Retry 1 failed — alternate approval chain (VP Finance) also blocked. Attempting final retry via CFO direct route', outcome: 'FAILED', recovery: 'Preparing CFO escalation with full context package' },
  { id: 'a8', timestamp: '10:28:09 AM', agent: 'Legal Agent', domain: 'legal', action: 'NDA routed to counsel', reasoning: 'Acme Corp NDA has Wednesday deadline — routing to legal counsel with priority flag', outcome: 'SUCCESS', recovery: 'N/A' },
  { id: 'a9', timestamp: '10:28:10 AM', agent: 'Finance Agent', domain: 'finance', action: 'Escalated to CFO with full context', reasoning: 'All auto-correction paths exhausted. Human decision required. CFO notified with: amount, requester, business justification, urgency level', outcome: 'ESCALATED', recovery: 'Workflow paused for Finance domain. All other domains completed successfully and independently' },
  { id: 'a10', timestamp: '10:28:10 AM', agent: 'Orchestrator', domain: 'orchestrator', action: 'Workflow summary generated', reasoning: '3/4 domain agents completed successfully. Finance agent escalated to human. Full audit trail preserved.', outcome: 'INFO', recovery: 'Workflow marked as partially complete — awaiting Finance resolution' },
];

export interface AgentConfig {
  name: string;
  domain: Domain | 'orchestrator';
  description: string;
  actionsToday: number;
  successRate: number;
}

export const AGENTS_CONFIG: AgentConfig[] = [
  { name: 'Orchestrator Agent', domain: 'orchestrator', description: 'Reads transcripts, detects domains, dispatches agents', actionsToday: 24, successRate: 100 },
  { name: 'Engineering Agent', domain: 'engineering', description: 'Creates tickets, assigns tasks, tracks deployments', actionsToday: 38, successRate: 97 },
  { name: 'Finance Agent', domain: 'finance', description: 'Processes budgets, approvals, and financial workflows', actionsToday: 15, successRate: 78 },
  { name: 'HR Agent', domain: 'hr', description: 'Handles onboarding, scheduling, and people ops', actionsToday: 22, successRate: 95 },
  { name: 'Legal Agent', domain: 'legal', description: 'Routes contracts, NDAs, and compliance reviews', actionsToday: 11, successRate: 91 },
];

export const ACTIVE_WORKFLOWS = [
  {
    id: 'w1',
    name: 'Q4 Sprint Planning',
    progress: 75,
    elapsed: '12m ago',
    agents: { engineering: 'completed' as AgentStatus, finance: 'running' as AgentStatus, hr: 'completed' as AgentStatus, legal: 'failed' as AgentStatus },
  },
  {
    id: 'w2',
    name: 'Budget Review Meeting',
    progress: 50,
    elapsed: '28m ago',
    agents: { engineering: 'idle' as AgentStatus, finance: 'running' as AgentStatus, hr: 'completed' as AgentStatus, legal: 'running' as AgentStatus },
  },
  {
    id: 'w3',
    name: 'New Hire Orientation',
    progress: 90,
    elapsed: '45m ago',
    agents: { engineering: 'completed' as AgentStatus, finance: 'completed' as AgentStatus, hr: 'retrying' as AgentStatus, legal: 'completed' as AgentStatus },
  },
];
