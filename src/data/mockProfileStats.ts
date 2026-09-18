import type { ProfileStats } from '../types/profile';

export const mockProfileStats: ProfileStats = {
  score: 1200,
  hoursWorked: 95,
  rank: 6,
  totalStudents: 452,
  history: [
    { week: 'Нед. 1', score: 200 },
    { week: 'Нед. 2', score: 450 },
    { week: 'Нед. 3', score: 680 },
    { week: 'Нед. 4', score: 900 },
    { week: 'Нед. 5', score: 1050 },
    { week: 'Нед. 6', score: 1200 },
  ],
  projects: [
    { id: 1, title: 'Автоматизированная система графиков', role: 'Frontend-разработчик', hours: 20, status: 'completed' },
    { id: 2, title: 'Моделирование процессов', role: 'Аналитик данных', hours: 12, status: 'in_progress' },
  ],
};