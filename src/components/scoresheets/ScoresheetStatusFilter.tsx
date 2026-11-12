import type { ScoresheetStatus } from '../../types/scoresheet';

export type ScoresheetStatusFilterValue = ScoresheetStatus | 'all';

interface ScoresheetStatusFilterProps {
  value: ScoresheetStatusFilterValue;
  onChange: (value: ScoresheetStatusFilterValue) => void;
}

export function ScoresheetStatusFilter({ value, onChange }: ScoresheetStatusFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ScoresheetStatusFilterValue)}
      className="border border-outline-variant rounded-lg px-4 py-2 text-label-md text-on-surface-variant bg-white focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <option value="all">Статус: все</option>
      <option value="draft">Статус: черновик</option>
      <option value="locked">Статус: заблокирован</option>
    </select>
  );
}