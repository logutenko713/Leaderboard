import type { PublicProfile } from '../types/publicProfile';

export const mockPublicProfiles: Record<number, PublicProfile> = {
  1: {
    id: 1, name: 'Иван М.', group: '8К52Т', school: 'ИШИТР',
    direction: 'Программная инженерия', course: 2,
    score: 3420, hoursWorked: 210, rank: 10, totalStudents: 452,
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    projects: [
      { id: 1, title: 'Система бронирования аудиторий', role: 'Fullstack-разработчик', hours: 45, status: 'completed' },
      { id: 2, title: 'Чат-бот приёмной комиссии', role: 'Backend-разработчик', hours: 30, status: 'in_progress' },
    ],
  },
  4: {
    id: 4, name: 'Мария Петрова', group: '8В42', school: 'ИШИТР',
    direction: 'Информатика и вычислительная техника', course: 3,
    score: 2450, hoursWorked: 142, rank: 4, totalStudents: 452,
    skills: ['Python', 'Wireshark', 'Kali Linux'],
    projects: [
      { id: 3, title: 'Аудит безопасности внутренней сети', role: 'Аналитик', hours: 25, status: 'completed' },
    ],
  },
};