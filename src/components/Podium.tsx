import type { Student } from '../types/student';
import { PodiumCard } from './dashboard/PodiumCard'; 

interface PodiumProps {
  students: Student[];
}

export function Podium({ students }: PodiumProps) {
  const [first, second, third] = students;

  if (!first || !second || !third) {
    return null;
  }

  return (
    <div className="mb-16 relative pt-32">
      <div className="flex justify-center items-end gap-4 md:gap-8 max-w-3xl mx-auto h-64">
        <PodiumCard student={second} place={2} />
        <PodiumCard student={first} place={1} />
        <PodiumCard student={third} place={3} />
      </div>
    </div>
  );
}