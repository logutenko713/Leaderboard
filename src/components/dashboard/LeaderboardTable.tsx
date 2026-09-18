import type { Student } from '../../types/student';
import { LeaderboardRow } from './LeaderboardRow';
import { useAuth } from '../../context/AuthContext';

interface LeaderboardTableProps {
  students: Student[];
  startRank: number;
}

export function LeaderboardTable({ students, startRank }: LeaderboardTableProps) {
  const { user } = useAuth();

  return (
    <div className="rounded-lg overflow-hidden border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface border-b border-outline-variant">
              <th className="py-4 px-6 text-label-md text-on-surface-variant font-semibold tracking-wider w-16 text-center">МЕСТО</th>
              <th className="py-4 px-6 text-label-md text-on-surface-variant font-semibold tracking-wider">СТУДЕНТ</th>
              <th className="py-4 px-6 text-label-md text-on-surface-variant font-semibold tracking-wider hidden sm:table-cell">ГРУППА</th>
              <th className="py-4 px-6 text-label-md text-on-surface-variant font-semibold tracking-wider hidden md:table-cell text-right">ЧАСЫ</th>
              <th className="py-4 px-6 text-label-md text-on-surface-variant font-semibold tracking-wider text-right">БАЛЛ (XP)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {students.map((student, index) => (
              <LeaderboardRow
                key={student.id}
                student={student}
                rank={startRank + index}
                isCurrentUser={student.id === user?.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}