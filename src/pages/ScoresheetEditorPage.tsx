import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ScoresheetEditor } from '../components/scoresheets/ScoresheetEditor';
import { getScoresheetDetail } from '../api/scoresheetsMock';
import type { ScoresheetDetail } from '../types/scoresheet';

export function ScoresheetEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<ScoresheetDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setDetail(null);
    getScoresheetDetail(id)
      .then(setDetail)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="text-on-surface-variant">Загрузка...</div>;
  }

  if (!detail) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-on-surface-variant">Лист не найден</p>
        <Link to="/scoresheets" className="text-primary underline">
          К списку листов
        </Link>
      </div>
    );
  }

  return <ScoresheetEditor key={detail.id} initial={detail} />;
}