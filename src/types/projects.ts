export type ProjectStatus = 'completed' | 'in_progress';

export interface Project {
  id: number;
  title: string;
  role: string;
  hours: number;
  status: ProjectStatus;
}