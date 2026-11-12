import type { SaveStatus } from '../../hooks/useAutosave';

export function SaveIndicator({ status }: { status: SaveStatus }) {
  const isSaving = status === 'saving';

  return (
    <span
      role="status"
      className="inline-flex items-center gap-1 text-label-md text-on-surface-variant"
    >
      <span className="material-symbols-outlined text-base">
        {isSaving ? 'sync' : 'cloud_done'}
      </span>
      {isSaving ? 'Сохранение…' : 'Сохранено'}
    </span>
  );
}