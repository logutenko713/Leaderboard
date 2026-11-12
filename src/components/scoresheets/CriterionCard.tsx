import type { ScoresheetCriterion } from '../../types/scoresheet';
import { criterionMax, MIN_LEVELS } from '../../utils/scoresheet';

interface CriterionCardProps {
  criterion: ScoresheetCriterion;
  readOnly: boolean;
  canRemove: boolean;
  onFieldChange: (field: 'title' | 'description', value: string) => void;
  onLevelDescriptionChange: (levelId: string, value: string) => void;
  onAddLevel: () => void;
  onRemoveLevel: (levelId: string) => void;
  onRemove: () => void;
}

const inputClass =
  'border border-outline-variant rounded px-3 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary read-only:bg-surface-container-low read-only:text-on-surface-variant';

export function CriterionCard({
  criterion,
  readOnly,
  canRemove,
  onFieldChange,
  onLevelDescriptionChange,
  onAddLevel,
  onRemoveLevel,
  onRemove,
}: CriterionCardProps) {
  const canRemoveLevel = criterion.levels.length > MIN_LEVELS;

  return (
    <div className="rounded-lg border border-outline-variant bg-white shadow-sm p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <label htmlFor={`${criterion.id}-title`} className="text-label-sm text-on-surface-variant">
            Название критерия
          </label>
          <input
            id={`${criterion.id}-title`}
            type="text"
            value={criterion.title}
            readOnly={readOnly}
            onChange={(e) => onFieldChange('title', e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex items-end gap-2">
          <div className="flex flex-col gap-1 flex-1 sm:flex-none sm:w-32">
            <span className="text-label-sm text-on-surface-variant">Максимум</span>
            <div className="flex items-center justify-between rounded px-3 py-2 bg-surface-container text-body-md text-on-surface-variant">
              {criterionMax(criterion)}
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
          </div>
          {!readOnly && (
            <button
              type="button"
              onClick={onRemove}
              disabled={!canRemove}
              aria-label="Удалить критерий"
              title={canRemove ? 'Удалить критерий' : 'В листе должен остаться хотя бы один критерий'}
              className="shrink-0 p-2 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${criterion.id}-description`} className="text-label-sm text-on-surface-variant">
          Описание
        </label>
        <input
          id={`${criterion.id}-description`}
          type="text"
          value={criterion.description}
          readOnly={readOnly}
          onChange={(e) => onFieldChange('description', e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-3 text-label-sm uppercase tracking-wider text-on-surface-variant border-b border-outline-variant pb-2">
          <span className="w-16 shrink-0 text-center">Балл</span>
          <span>Описание уровня</span>
        </div>

        {criterion.levels.map((level) => (
          <div key={level.id} className="flex gap-3 items-center">
            <div className="w-16 shrink-0 text-center rounded border border-outline-variant bg-surface-container py-2 text-body-md font-semibold text-on-surface">
              {level.score}
            </div>
            <input
              type="text"
              aria-label={`Описание уровня ${level.score}`}
              value={level.description}
              readOnly={readOnly}
              onChange={(e) => onLevelDescriptionChange(level.id, e.target.value)}
              className={`${inputClass} flex-1 min-w-0`}
            />
            {!readOnly && (
              <button
                type="button"
                onClick={() => onRemoveLevel(level.id)}
                disabled={!canRemoveLevel}
                aria-label={`Удалить уровень ${level.score}`}
                title={canRemoveLevel ? 'Удалить уровень' : 'Нужно минимум два уровня'}
                className="shrink-0 p-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        ))}

        {!readOnly && (
          <button
            type="button"
            onClick={onAddLevel}
            className="inline-flex items-center gap-1 w-max text-label-md text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add</span>
            уровень
          </button>
        )}
      </div>
    </div>
  );
}