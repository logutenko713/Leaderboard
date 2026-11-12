import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScoresheetsTable } from '../components/scoresheets/ScoresheetsTable';
import { ScoresheetStatusFilter } from '../components/scoresheets/ScoresheetStatusFilter';
import type { ScoresheetStatusFilterValue } from '../components/scoresheets/ScoresheetStatusFilter';
import { createScoresheet, duplicateScoresheet, listScoresheets } from '../api/scoresheetsMock';
import type { Scoresheet } from '../types/scoresheet';

export function ScoresheetsPage() {
  const navigate = useNavigate();
  const [sheets, setSheets] = useState<Scoresheet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ScoresheetStatusFilterValue>('all');

  useEffect(() => {
    listScoresheets()
      .then(setSheets)
      .finally(() => setIsLoading(false));
  }, []);

  const handleDuplicate = async (id: string) => {
    await duplicateScoresheet(id);
    setSheets(await listScoresheets());
  };

  const handleCreate = async () => {
    setIsCreating(true);
    const id = await createScoresheet();
    setIsCreating(false);
    navigate(`/scoresheets/${id}`);
  };

  const visibleSheets =
    statusFilter === 'all' ? sheets : sheets.filter((sheet) => sheet.status === statusFilter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-headline-xl md:text-display-lg text-on-background mb-2">
            Оценочные листы
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Критерии и уровни для предзащит и защит
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreate}
          disabled={isCreating}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-success text-white text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors cursor-pointer disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          {isCreating ? 'Создаём...' : 'Создать лист'}
        </button>
      </div>

      <div className="mb-4">
        <ScoresheetStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {isLoading ? (
        <div className="text-on-surface-variant">Загрузка...</div>
      ) : (
        <ScoresheetsTable sheets={visibleSheets} onDuplicate={handleDuplicate} />
      )}
    </div>
  );
}