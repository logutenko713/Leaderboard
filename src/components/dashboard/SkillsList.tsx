interface SkillsListProps {
  skills: string[];
}

export function SkillsList({ skills }: SkillsListProps) {
  if (skills.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-headline-md text-on-surface">Стек</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-label-md text-primary bg-primary-container/10 px-3 py-1.5 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}