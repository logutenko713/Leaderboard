import { useAuth } from '../context/AuthContext';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { StatCard } from '../components/dashboard/StatCard';
import { ProjectsList } from '../components/dashboard/ProjectsList';
import { ScoreHistoryChart } from '../components/dashboard/ScoreHistoryChart';
import { mockProfileStats } from '../data/mockProfileStats';
import type { AuthUser } from '../types/auth';

const mockUser: AuthUser = {
  id: 1,
  name: 'Тестовый Студент',
  group: '8К52Т',
  school: 'ИШИТР',
  direction: 'Программная инженерия',
  course: 3,
};

export function ProfilePage() {
  const { user } = useAuth();
  const stats = mockProfileStats;
  const displayUser = user ?? mockUser;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4 flex flex-col gap-6">
        <ProfileCard user={displayUser} />

        <div className="grid grid-cols-2 gap-4">
          <StatCard icon="emoji_events" label="Рейтинг" value={`#${stats.rank}`} hint={`из ${stats.totalStudents}`} />
          <StatCard icon="star_rate" label="Баллы" value={stats.score} />
          <div className="col-span-2">
            <StatCard icon="schedule" label="Отработанные часы" value={stats.hoursWorked} suffix="ч." />
          </div>
        </div>
      </div>

      <div className="md:col-span-8 flex flex-col gap-6">
        <ProjectsList projects={stats.projects} />
        <ScoreHistoryChart data={stats.history} />
      </div>
    </div>
  );
}