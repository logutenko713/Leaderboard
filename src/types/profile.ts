import type { Project } from './projects';

export interface ScoreHistoryPoint {
  week: string;
  score: number;
}

export interface ProfileStats {
  score: number;
  hoursWorked: number;
  rank: number;
  totalStudents: number;
  history: ScoreHistoryPoint[];
  projects: Project[];
}