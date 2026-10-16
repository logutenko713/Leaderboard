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
import { useState, useEffect } from 'react';
import { fetchLeaderboardStudents } from './api/leaderboard';
import type { Student } from './types/student';
import { ProtectedRoute } from './components/ProtectedRoute';


const periodsByType: Record<RatingType, Period[]> = {
  personal: ['week', 'month', 'semester', 'all_time'],
  team: ['week', 'month', 'half_year'],
  mentor: ['month', 'semester', 'all_time'],
};

function App() {
  const [period, setPeriod] = useState<Period>('month');
  const [ratingType, setRatingType] = useState<RatingType>('personal');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboardStudents()
      .then(setStudents)
      .catch(() => setLoadError('Не удалось загрузить рейтинг'))
      .finally(() => setIsLoadingStudents(false));
  }, []);

  const handleRatingTypeChange = (type: RatingType) => {
    setRatingType(type);
    setPeriod(periodsByType[type][0]);
  };

  const allSkills = Array.from(new Set(students.flatMap((s) => s.skills))).sort();

const filteredStudents = selectedSkill
  ? students.filter((s) => s.skills.includes(selectedSkill))
  : students;

const sorted = [...filteredStudents].sort((a, b) => b.score - a.score);
  const podiumStudents = sorted.slice(0, 3);
  const tableStudents = sorted.slice(3);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
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
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <StudentProfilePage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;