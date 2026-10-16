import type { Project } from './projects';

export interface PublicProfile {
  id: string;
  name: string;
  group: string;
  school: string;
  direction: string;
  course: number;
  score: number;
  hoursWorked: number;
  rank: number;
  totalStudents: number;
  skills: string[];
  projects: Project[];
}