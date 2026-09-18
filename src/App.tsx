import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { LeaderboardTable } from './components/dashboard/LeaderboardTable';
import { Podium } from './components/Podium';
import { PageHeader } from './components/dashboard/PageHeader';
import { RatingTypeSelector } from './components/dashboard/RatingTypeSelector';
import type { RatingType } from './components/dashboard/RatingTypeSelector';
import type { Period } from './components/dashboard/PageHeader';
import { mockStudents } from './data/mockStudents';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ProfilePage } from './pages/ProfilePage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { SkillFilter } from './components/dashboard/SkillFilter';


const periodsByType: Record<RatingType, Period[]> = {
  personal: ['week', 'month', 'semester', 'all_time'],
  team: ['week', 'month', 'half_year'],
  mentor: ['month', 'semester', 'all_time'],
};

function App() {
  const [period, setPeriod] = useState<Period>('month');
  const [ratingType, setRatingType] = useState<RatingType>('personal');

  const handleRatingTypeChange = (type: RatingType) => {
  setRatingType(type);
  setPeriod(periodsByType[type][0]); // сбрасываем период на первый доступный для нового типа
  };

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

const allSkills = Array.from(new Set(mockStudents.flatMap((s) => s.skills))).sort();

const filteredStudents = selectedSkill
  ? mockStudents.filter((s) => s.skills.includes(selectedSkill))
  : mockStudents;

const sorted = [...filteredStudents].sort((a, b) => b.score - a.score);
  const podiumStudents = sorted.slice(0, 3);
  const tableStudents = sorted.slice(3);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <DashboardLayout>
            <PageHeader
              period={period}
              onPeriodChange={setPeriod}
              availablePeriods={periodsByType[ratingType]}
            />
            <RatingTypeSelector activeType={ratingType} onTypeChange={handleRatingTypeChange} />

            {/* <SkillFilter
              availableSkills={allSkills}
              selectedSkill={selectedSkill}
              onSkillChange={setSelectedSkill}
            /> */}
            {ratingType === 'personal' ? (
              <>
                {selectedSkill ? (
                  <>
                    <div className="mb-6">
                      <SkillFilter
                        availableSkills={allSkills}
                        selectedSkill={selectedSkill}
                        onSkillChange={setSelectedSkill}
                      />
                    </div>
                    <LeaderboardTable students={sorted} startRank={1} />
                  </>
                ) : (
                  <>
                    <Podium students={sorted.slice(0, 3)} />
                    <div className="mb-6">
                      <SkillFilter
                        availableSkills={allSkills}
                        selectedSkill={selectedSkill}
                        onSkillChange={setSelectedSkill}
                      />
                    </div>
                    <LeaderboardTable students={sorted.slice(3)} startRank={4} />
                  </>
                )}
              </>
            ) : (
              <div className="text-center py-16 text-on-surface-variant text-body-lg">
                Этот раздел скоро появится
              </div>
            )}
          </DashboardLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <ProfilePage />
          </DashboardLayout>
        }
      />

      <Route
        path="/students/:id"
        element={
          <DashboardLayout>
            <StudentProfilePage />
          </DashboardLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <SettingsPage />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

export default App;