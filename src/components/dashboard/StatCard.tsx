interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  suffix?: string;
  hint?: string;
}

export function StatCard({ icon, label, value, suffix, hint }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-5 flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <span className="text-label-sm text-on-surface-variant">{label}</span>
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-headline-xl text-on-surface">{value}</span>
        {suffix && <span className="text-label-sm text-on-surface-variant">{suffix}</span>}
        {hint && <span className="text-label-sm text-tertiary">{hint}</span>}
      </div>
    </div>
  );
}