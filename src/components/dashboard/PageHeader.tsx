export type Period = 'week' | 'month' | 'semester' | 'half_year' | 'all_time';

const periodLabels: Record<Period, string> = {
  week: 'Неделя',
  month: 'Месяц',
  semester: 'Семестр',
  half_year: 'Полгода',
  all_time: 'Всё время',
};

interface PageHeaderProps {
  period: Period;
  onPeriodChange: (period: Period) => void;
  availablePeriods: Period[];
}

export function PageHeader({ period, onPeriodChange, availablePeriods }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
      <div>
        <h1 className="text-headline-xl md:text-display-lg text-on-background mb-2">Общий рейтинг</h1>
        <p className="text-body-lg text-on-surface-variant">
          Соревнуйся с лучшими студентами университета
        </p>
      </div>

      <div className="w-full md:w-auto bg-surface-container-low rounded-lg p-1 flex gap-1 shadow-sm border border-outline-variant overflow-x-auto">
        {availablePeriods.map((key) => (
          <button
            key={key}
            onClick={() => onPeriodChange(key)}
            className={`flex-1 md:flex-none px-2 sm:px-4 md:px-6 py-2 rounded-md text-label-md whitespace-nowrap transition-colors ${
              period === key
                ? 'bg-white shadow-sm text-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-variant font-medium'
            }`}
          >
            {periodLabels[key]}
          </button>
        ))}
      </div>
    </div>
  );
}