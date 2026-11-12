import type { ScoresheetDetail } from '../../types/scoresheet';
import { sheetMax } from '../../utils/scoresheet';

// Для примера: настоящее число равно числу команд в мероприятии
const SAMPLE_TEAM_COLUMNS = 8;

const cellClass = 'border border-on-surface/50';

export function ScoresheetPreview({ sheet }: { sheet: ScoresheetDetail }) {
  const columns = Array.from({ length: SAMPLE_TEAM_COLUMNS }, (_, index) => index + 1);

  return (
    <div className="rounded-lg border border-outline-variant bg-white shadow-sm p-4 flex flex-col gap-3">
      <h2 className="text-body-lg font-semibold text-on-surface">Предпросмотр бланка</h2>

      <div className="border border-on-surface/60 bg-white p-2 text-on-surface">
        <p className="text-[10px] font-bold leading-tight break-words">
          {sheet.title || 'Без названия'}
        </p>
        <p className="text-[8px] text-on-surface-variant mb-1">
          Максимум: {sheetMax(sheet.criteria)} баллов
        </p>

        <table className="w-full table-fixed border-collapse text-[8px]">
          <thead>
            <tr>
              <th className={`${cellClass} w-[36%] px-1 py-0.5 text-left font-semibold`}>
                Критерий
              </th>
              {columns.map((number) => (
                <th key={number} className={`${cellClass} py-0.5 font-semibold`}>
                  {number}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheet.criteria.map((criterion) => (
              <tr key={criterion.id} className="h-5">
                <td className={`${cellClass} px-1 break-words`}>
                  {criterion.title || (
                    <span className="italic text-on-surface-variant">Без названия</span>
                  )}
                </td>
                {columns.map((number) => (
                  <td key={number} className={cellClass} />
                ))}
              </tr>
            ))}
            <tr className="h-5">
              <td className={`${cellClass} px-1 font-bold`}>Итого</td>
              {columns.map((number) => (
                <td key={number} className={cellClass} />
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-label-sm text-on-surface-variant">
        Обновляется при каждом изменении. Команды подставляются из мероприятия при печати.
      </p>
    </div>
  );
}