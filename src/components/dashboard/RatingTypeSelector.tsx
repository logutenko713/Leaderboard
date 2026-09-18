export type RatingType = 'personal' | 'team' | 'mentor';

interface RatingTypeOption {
  type: RatingType;
  icon: string;
  title: string;
  description: string;
}

const options: RatingTypeOption[] = [
  { type: 'personal', icon: 'person', title: 'Личный', description: 'Индивидуальный зачёт' },
  { type: 'team', icon: 'groups', title: 'Командный', description: 'Рейтинг проектных групп' },
  { type: 'mentor', icon: 'school', title: 'Наставнический', description: 'Вклад в обучение других' },
];

interface RatingTypeSelectorProps {
  activeType: RatingType;
  onTypeChange: (type: RatingType) => void;
}

export function RatingTypeSelector({ activeType, onTypeChange }: RatingTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {options.map((option) => {
        const isActive = option.type === activeType;
        return (
          <button
            key={option.type}
            onClick={() => onTypeChange(option.type)}
            className={`p-6 flex flex-col items-center justify-center rounded-lg border transition-all hover:-translate-y-1 ${
              isActive
                ? 'border-2 border-primary bg-primary-container/5'
                : 'border-outline-variant bg-white'
            }`}
          >
            <span className={`material-symbols-outlined text-4xl mb-3 ${isActive ? 'text-primary' : 'text-tertiary'}`}>
              {option.icon}
            </span>
            <h3 className="text-headline-lg text-on-background text-center">{option.title}</h3>
            <p className="text-label-md text-on-surface-variant mt-2 text-center">{option.description}</p>
          </button>
        );
      })}
    </div>
  );
}