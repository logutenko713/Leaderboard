import type { Scoresheet } from '../../types/scoresheet';
import { ScoresheetStatusBadge } from './ScoresheetStatusBadge';
import { Link } from 'react-router-dom';

interface ScoresheetsTableProps {
  sheets: Scoresheet[];
  onDuplicate: (id: string) => void;
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
}

export function ScoresheetsTable({ sheets, onDuplicate }: ScoresheetsTableProps) {
  return (
    <div className="rounded-lg border border-outline-variant bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant text-label-sm uppercase tracking-wider text-on-surface-variant">
              <th className="py-4 px-3 sm:px-6 font-semibold">Название</th>
              <th className="py-4 px-3 sm:px-6 font-semibold hidden md:table-cell">Критериев</th>
              <th className="py-4 px-3 sm:px-6 font-semibold hidden md:table-cell">Макс. баллов</th>
              <th className="py-4 px-3 sm:px-6 font-semibold">Статус</th>
              <th className="py-4 px-3 sm:px-6 font-semibold text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {sheets.map((sheet) => (
              <tr key={sheet.id} className="hover:bg-surface-container-low transition-colors">
                <td className="py-4 px-3 sm:px-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-tertiary text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">assignment</span>
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/scoresheets/${sheet.id}`}
                        className="block text-body-md font-semibold text-on-surface hover:text-primary hover:underline"
                      >
                        {sheet.title}
                      </Link>
                      <p className="text-label-sm text-on-surface-variant">
                        {sheet.usedIn
                          ? `Используется: ${sheet.usedIn}`
                          : `Изменён ${formatDate(sheet.updatedAt)}`}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-3 sm:px-6 text-body-md text-on-surface hidden md:table-cell">
                  {sheet.criteriaCount}
                </td>
                <td className="py-4 px-3 sm:px-6 text-body-md text-on-surface hidden md:table-cell">
                  {sheet.maxScore}
                </td>
                <td className="py-4 px-3 sm:px-6">
                  <ScoresheetStatusBadge status={sheet.status} />
                </td>
                <td className="py-4 px-3 sm:px-6 text-right">
                  <button
                      type="button"
                      onClick={() => onDuplicate(sheet.id)}
                      className="inline-flex items-center gap-1 text-label-md text-primary underline cursor-pointer"
                    >
                    <span className="material-symbols-outlined text-base">content_copy</span>
                    <span className="hidden sm:inline">Дублировать</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}