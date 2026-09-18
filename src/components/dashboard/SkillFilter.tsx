interface SkillFilterProps {
  availableSkills: string[];
  selectedSkill: string | null;
  onSkillChange: (skill: string | null) => void;
}

export function SkillFilter({ availableSkills, selectedSkill, onSkillChange }: SkillFilterProps) {
  return (
    <select
      value={selectedSkill ?? ''}
      onChange={(e) => onSkillChange(e.target.value || null)}
      className="border border-outline-variant rounded-lg px-4 py-2 text-label-md text-on-surface-variant bg-white focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <option value="">Все технологии</option>
      {availableSkills.map((skill) => (
        <option key={skill} value={skill}>{skill}</option>
      ))}
    </select>
  );
}