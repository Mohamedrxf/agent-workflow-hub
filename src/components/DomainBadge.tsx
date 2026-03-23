import { DOMAIN_CONFIG, DOMAIN_ICONS, type Domain } from '@/data/mockData';

export function DomainBadge({ domain }: { domain: Domain }) {
  const config = DOMAIN_CONFIG[domain];
  const Icon = DOMAIN_ICONS[domain];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${config.bgClass} ${config.colorClass} ${config.borderClass}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
