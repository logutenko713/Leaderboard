import type { ScoresheetStatus } from '../../types/scoresheet';

const statusConfig: Record<ScoresheetStatus, { label: string; icon: string; className: string }> = {
  locked: {
    label: 'Заблокирован',
    icon: 'lock',
    className: 'bg-surface-container text-on-surface-variant',
  },
  draft: {
    label: 'Черновик',
    icon: 'edit',
    className: 'bg-tertiary-container/25 text-tertiary',
  },
};

export function ScoresheetStatusBadge({ status }: { status: ScoresheetStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-label-sm whitespace-nowrap ${config.className}`}
    >
      <span className="material-symbols-outlined text-sm">{config.icon}</span>
      {config.label}
    </span>
  );
}