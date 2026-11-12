interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div>
      <h1 className="text-headline-xl md:text-display-lg text-on-background mb-6">{title}</h1>
      <div className="border border-dashed border-outline-variant rounded-lg p-10 text-center text-on-surface-variant">
        Раздел в разработке
      </div>
    </div>
  );
}