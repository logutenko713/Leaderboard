import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { ScoresheetDetail, ScoresheetLevel } from '../../types/scoresheet';
import {
  MIN_LEVELS,
  createCriterion,
  criterionMax,
  renumberLevels,
  sheetMax,
} from '../../utils/scoresheet';
import { duplicateScoresheet } from '../../api/scoresheetsMock';
import { useAutosave } from '../../hooks/useAutosave';
import { ScoresheetStatusBadge } from './ScoresheetStatusBadge';
import { SaveIndicator } from './SaveIndicator';
import { CriterionCard } from './CriterionCard';
import { ScoresheetPreview } from './ScoresheetPreview';
import { UndoToast } from './UndoToast';
import { ConfirmDialog } from './ConfirmDialog';

interface ScoresheetEditorProps {
  initial: ScoresheetDetail;
}

interface PendingUndo {
  criterionId: string;
  level: ScoresheetLevel;
  index: number;
}

const UNDO_TIMEOUT_MS = 5000;

export function ScoresheetEditor({ initial }: ScoresheetEditorProps) {
  const navigate = useNavigate();
  const [sheet, setSheet] = useState<ScoresheetDetail>(initial);
  const [pendingUndo, setPendingUndo] = useState<PendingUndo | null>(null);
  const [criterionToDeleteId, setCriterionToDeleteId] = useState<string | null>(null);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveStatus = useAutosave(sheet);

  const readOnly = sheet.status === 'locked';

  useEffect(() => {
    return () => {
      if (undoTimer.current) clearTimeout(undoTimer.current);
    };
  }, []);

  const criterionToDelete =
    sheet.criteria.find((criterion) => criterion.id === criterionToDeleteId) ?? null;

  const updateField = (field: 'title' | 'description', value: string) => {
    setSheet((current) => ({ ...current, [field]: value }));
  };

  const updateCriterionField = (
    criterionId: string,
    field: 'title' | 'description',
    value: string
  ) => {
    setSheet((current) => ({
      ...current,
      criteria: current.criteria.map((criterion) =>
        criterion.id === criterionId ? { ...criterion, [field]: value } : criterion
      ),
    }));
  };

  const updateLevelDescription = (criterionId: string, levelId: string, value: string) => {
    setSheet((current) => ({
      ...current,
      criteria: current.criteria.map((criterion) =>
        criterion.id === criterionId
          ? {
              ...criterion,
              levels: criterion.levels.map((level) =>
                level.id === levelId ? { ...level, description: value } : level
              ),
            }
          : criterion
      ),
    }));
  };

  const addLevel = (criterionId: string) => {
    setSheet((current) => ({
      ...current,
      criteria: current.criteria.map((criterion) =>
        criterion.id === criterionId
          ? {
              ...criterion,
              levels: [
                ...criterion.levels,
                {
                  id: `${criterionId}-level-${Date.now()}`,
                  score: criterion.levels.length,
                  description: '',
                },
              ],
            }
          : criterion
      ),
    }));
  };

  const removeLevel = (criterionId: string, levelId: string) => {
    const criterion = sheet.criteria.find((c) => c.id === criterionId);
    if (!criterion || criterion.levels.length <= MIN_LEVELS) return;

    const index = criterion.levels.findIndex((level) => level.id === levelId);
    if (index === -1) return;
    const removed = criterion.levels[index];

    setSheet((current) => ({
      ...current,
      criteria: current.criteria.map((c) =>
        c.id === criterionId
          ? { ...c, levels: renumberLevels(c.levels.filter((level) => level.id !== levelId)) }
          : c
      ),
    }));

    setPendingUndo({ criterionId, level: removed, index });
    if (undoTimer.current) clearTimeout(undoTimer.current);
    undoTimer.current = setTimeout(() => setPendingUndo(null), UNDO_TIMEOUT_MS);
  };

  const undoRemove = () => {
    if (!pendingUndo) return;
    const { criterionId, level, index } = pendingUndo;

    setSheet((current) => ({
      ...current,
      criteria: current.criteria.map((c) => {
        if (c.id !== criterionId) return c;
        const restored = [...c.levels];
        restored.splice(index, 0, level);
        return { ...c, levels: renumberLevels(restored) };
      }),
    }));

    if (undoTimer.current) clearTimeout(undoTimer.current);
    setPendingUndo(null);
  };

  const addCriterion = () => {
    setSheet((current) => ({
      ...current,
      criteria: [...current.criteria, createCriterion()],
    }));
  };

  const confirmRemoveCriterion = () => {
    if (!criterionToDelete) return;
    const removedId = criterionToDelete.id;

    setSheet((current) => ({
      ...current,
      criteria: current.criteria.filter((criterion) => criterion.id !== removedId),
    }));

    if (pendingUndo?.criterionId === removedId) {
      if (undoTimer.current) clearTimeout(undoTimer.current);
      setPendingUndo(null);
    }
    setCriterionToDeleteId(null);
  };

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    const newId = await duplicateScoresheet(sheet.id);
    setIsDuplicating(false);
    if (newId) navigate(`/scoresheets/${newId}`);
  };

  const currentMax = sheetMax(sheet.criteria);

  return (
    <div>
      <Link to="/scoresheets" className="text-label-sm text-primary hover:underline">
        Оценочные листы /
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mt-2 mb-8">
        <h1 className="text-headline-xl md:text-display-lg text-on-background break-words min-w-0">
          {sheet.title || 'Без названия'}
        </h1>
        <div className="shrink-0 flex items-center gap-3">
          <ScoresheetStatusBadge status={sheet.status} />
          {!readOnly && <SaveIndicator status={saveStatus} />}
        </div>
      </div>

      {readOnly && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-on-surface-variant">lock</span>
            <p className="text-body-md text-on-surface-variant">
              Лист уже выбран в мероприятии, поэтому его нельзя редактировать. Чтобы внести
              изменения, создайте копию.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDuplicate}
            disabled={isDuplicating}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-success text-white text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors cursor-pointer disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-xl">content_copy</span>
            {isDuplicating ? 'Копируем...' : 'Дублировать'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        <div>
          <div className="rounded-lg border border-outline-variant bg-white shadow-sm p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="sheet-title" className="text-label-sm text-on-surface-variant">
                Название листа
              </label>
              <input
                id="sheet-title"
                type="text"
                value={sheet.title}
                readOnly={readOnly}
                onChange={(e) => updateField('title', e.target.value)}
                className="border border-outline-variant rounded px-3 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary read-only:bg-surface-container-low read-only:text-on-surface-variant"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="sheet-description" className="text-label-sm text-on-surface-variant">
                Описание
              </label>
              <textarea
                id="sheet-description"
                rows={3}
                value={sheet.description}
                readOnly={readOnly}
                onChange={(e) => updateField('description', e.target.value)}
                className="border border-outline-variant rounded px-3 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary read-only:bg-surface-container-low read-only:text-on-surface-variant"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mt-10 mb-4">
            <h2 className="text-headline-lg text-on-surface">Критерии</h2>
            <p className="text-label-md text-on-surface-variant">
              Максимум листа: <span className="font-bold text-primary">{currentMax} баллов</span> ·
              считается автоматически
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {sheet.criteria.map((criterion) => (
              <CriterionCard
                key={criterion.id}
                criterion={criterion}
                readOnly={readOnly}
                canRemove={sheet.criteria.length > 1}
                onFieldChange={(field, value) => updateCriterionField(criterion.id, field, value)}
                onLevelDescriptionChange={(levelId, value) =>
                  updateLevelDescription(criterion.id, levelId, value)
                }
                onAddLevel={() => addLevel(criterion.id)}
                onRemoveLevel={(levelId) => removeLevel(criterion.id, levelId)}
                onRemove={() => setCriterionToDeleteId(criterion.id)}
              />
            ))}
          </div>

          {!readOnly && (
            <button
              type="button"
              onClick={addCriterion}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-outline-variant py-4 text-label-md text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">add</span>
              Добавить критерий
            </button>
          )}
        </div>

        <aside className="lg:sticky lg:top-24">
          <ScoresheetPreview sheet={sheet} />
        </aside>
      </div>

      {pendingUndo && (
        <UndoToast
          message={`Уровень «${pendingUndo.level.score} — ${
            pendingUndo.level.description || 'без описания'
          }» удалён`}
          onUndo={undoRemove}
        />
      )}

      {criterionToDelete && (
        <ConfirmDialog
          title={`Удалить критерий «${criterionToDelete.title || 'без названия'}»?`}
          message={`Максимум листа изменится с ${currentMax} на ${
            currentMax - criterionMax(criterionToDelete)
          } баллов.`}
          confirmLabel="Удалить"
          onConfirm={confirmRemoveCriterion}
          onCancel={() => setCriterionToDeleteId(null)}
        />
      )}
    </div>
  );
}