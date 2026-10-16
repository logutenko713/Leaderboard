import type { Student } from '../types/student';

interface RawLeaderboardStudent {
  login: string;
  full_name: string;
  student_group: string;
  top_view: string;
  history_work_all: string;
  history_work_sem: string;
  history_work_month: string;
  study_score: string;
  total_medals: number;
  rating_score: string;
}

export function adaptLeaderboardStudent(raw: RawLeaderboardStudent): Student {
  return {
    id: raw.login,
    name: raw.full_name,
    group: raw.student_group,
    score: Math.round(Number(raw.rating_score) * 1000),
    hoursWorked: Number(raw.history_work_all),
    skills: [],
  };
}