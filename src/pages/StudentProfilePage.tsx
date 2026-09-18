import { useParams } from 'react-router-dom';
import { ProfileCard } from '../components/dashboard/ProfileCard';
import { StatCard } from '../components/dashboard/StatCard';
import { ProjectsList } from '../components/dashboard/ProjectsList';
import { SkillsList } from '../components/dashboard/SkillsList';
import { mockPublicProfiles } from '../data/mockPublicProfiles';

export function StudentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const profile = mockPublicProfiles[Number(id)];

  if (!profile) {
    return <div>Студент не найден</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-4 flex flex-col gap-6">
        <ProfileCard user={profile} />

        <div className="grid grid-cols-2 gap-4">
          <StatCard icon="emoji_events" label="Рейтинг" value={`#${profile.rank}`} hint={`из ${profile.totalStudents}`} />
          <StatCard icon="star_rate" label="Баллы" value={profile.score} />
          <div className="col-span-2">
            <StatCard icon="schedule" label="Отработанные часы" value={profile.hoursWorked} suffix="ч." />
          </div>
        </div>
      </div>

      <div className="md:col-span-8 flex flex-col gap-6">
        <SkillsList skills={profile.skills} />
        <ProjectsList projects={profile.projects} />
      </div>
    </div>
  );
}