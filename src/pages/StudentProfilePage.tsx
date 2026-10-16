import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { StatCard } from '../components/dashboard/StatCard';
import { fetchStudentDetail } from '../api/students';
import type { StudentDetail } from '../types/studentDetail';

export function StudentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    fetchStudentDetail(id)
      .then(setStudent)
      .catch(() => setError('Студент не найден'))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <div className="text-on-surface-variant">Загрузка...</div>;
  }

  if (error || !student) {
    return <div className="text-on-surface-variant">{error ?? 'Студент не найден'}</div>;
  }

  return (
    <div className="max-w-xl flex flex-col gap-6">
      <ProfileCard user={student} />
      <StatCard
        icon="schedule"
        label="Отработанные часы"
        value={student.hoursWorked}
        suffix="ч."
      />
    </div>
  );
}