import { API_ENDPOINTS } from './config';
import { adaptLeaderboardStudent } from './adapters';
import type { Student } from '../types/student';

export async function fetchLeaderboardStudents(): Promise<Student[]> {
  const res = await fetch(API_ENDPOINTS.leaderboardStudents);

  if (!res.ok) {
    throw new Error('Не удалось загрузить рейтинг');
  }

  const data = await res.json();
  return data.results.map(adaptLeaderboardStudent);
}