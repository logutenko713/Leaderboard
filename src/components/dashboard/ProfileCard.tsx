interface ProfileCardData {
  name: string;
  group: string;
  school: string;
  direction: string;
  course: number;
}

interface ProfileCardProps {
  user: ProfileCardData;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const initials = user.name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  const fields = [
    { label: 'Школа', value: user.school },
    { label: 'Направление', value: user.direction },
    { label: 'Группа', value: user.group },
    { label: 'Курс', value: `${user.course} курс` },
  ];

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-xl bg-surface-variant flex items-center justify-center font-bold text-xl text-on-surface-variant flex-shrink-0">
          {initials}
        </div>
        <div className="flex flex-col">
          <h1 className="text-headline-md text-on-surface mb-1">{user.name}</h1>
          <span className="text-label-md text-primary bg-primary-container/10 px-2 py-0.5 rounded-md inline-block w-max">
            Студент
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((field) => (
          <div key={field.label} className="flex justify-between items-center border-b border-outline-variant/50 pb-2 last:border-0 last:pb-0">
            <span className="text-label-sm text-on-surface-variant">{field.label}</span>
            <span className="text-body-md text-on-surface font-medium text-right">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}