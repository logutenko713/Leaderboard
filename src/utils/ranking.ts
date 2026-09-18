import type { Student } from '../types/student';

export interface RankedStudent extends Student {
  rank: number;
}

export function rankStudents(students: Student[]): RankedStudent[] {
  return [...students]
    .sort((a, b) => b.score - a.score)
    .map((student, index) => ({ ...student, rank: index + 1 }));
}