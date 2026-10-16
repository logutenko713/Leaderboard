import { useNavigate } from 'react-router-dom';
import type { Student } from '../../types/student';

interface LeaderboardRowProps {
  student: Student;
  rank: number;
  isCurrentUser: boolean;
}

export function LeaderboardRow({ student, rank, isCurrentUser }: LeaderboardRowProps) {
  const navigate = useNavigate();

  const initials = student.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <tr
      onClick={() => navigate(`/students/${student.id}`)}
      className={`hover:bg-surface-container-low transition-colors group cursor-pointer ${isCurrentUser ? 'bg-primary/5' : ''}`}>
      <td className={`py-4 px-3 sm:px-6 text-headline-md text-center ${isCurrentUser ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
        {rank}
      </td>
      <td className="py-4 px-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-full bg-tertiary-container ...">
            {initials}
          </div>
          <span className={`text-body-md ${isCurrentUser ? 'text-primary font-bold' : 'text-on-background font-medium'}`}>
            {student.name}{isCurrentUser ? ' (Вы)' : ''}
          </span>
        </div>
      </td>
      <td className="py-4 px-3 sm:px-6 text-body-md text-on-surface-variant hidden sm:table-cell">
        {student.group}
      </td>
      <td className="py-4 px-3 sm:px-6 text-body-md text-on-surface-variant hidden md:table-cell text-right">
        {student.hoursWorked}
      </td>
      <td className="py-4 px-3 sm:px-6 text-label-md text-primary font-bold text-right">
        {student.score}
      </td>
    </tr>
  );
}