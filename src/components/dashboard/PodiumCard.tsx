import type { Student } from '../../types/student';

type PodiumPlace = 1 | 2 | 3;

interface PodiumCardProps {
  student: Student;
  place: PodiumPlace;
}

const placeConfig: Record<PodiumPlace, {
  color: string;
  icon: string;
  avatarSize: string;
  postHeight: string;
  nameTextClass: string;
  scoreTextClass: string;
  borderClass: string;
  badgeBgClass: string;
  gradientClass: string;
  gradientBorderClass: string;
}> = {
  1: {
    icon: 'emoji_events',
    avatarSize: 'w-24 h-24 md:w-32 md:h-32',
    postHeight: 'h-44',
    nameTextClass: 'text-headline-md',
    scoreTextClass: 'text-headline-xl',
    borderClass: 'border-primary-container',
    badgeBgClass: 'bg-primary-container',
    gradientClass: 'from-primary-container/40 to-transparent',
    gradientBorderClass: 'border-primary-container/60',
  },
  2: {
    icon: 'workspace_premium',
    avatarSize: 'w-20 h-20 md:w-24 md:h-24',
    postHeight: 'h-32',
    nameTextClass: 'text-label-md',
    scoreTextClass: 'text-headline-md',
    borderClass: 'border-silver-medal',
    badgeBgClass: 'bg-silver-medal',
    gradientClass: 'from-silver-medal/40 to-transparent',
    gradientBorderClass: 'border-silver-medal/60',
  },
  3: {
    icon: 'military_tech',
    avatarSize: 'w-20 h-20 md:w-24 md:h-24',
    postHeight: 'h-24',
    nameTextClass: 'text-label-md',
    scoreTextClass: 'text-headline-md',
    borderClass: 'border-bronze-medal',
    badgeBgClass: 'bg-bronze-medal',
    gradientClass: 'from-bronze-medal/40 to-transparent',
    gradientBorderClass: 'border-bronze-medal/60',
  },
};

export function PodiumCard({ student, place }: PodiumCardProps) {
  const config = placeConfig[place];
  const initials = student.name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <div className={`flex flex-col items-center min-w-0 ${place === 1 ? '-mt-12 w-1/3 max-w-[240px]' : 'w-1/3 max-w-[200px]'}`}>
      <div className="relative mb-2">
        <div className={`${config.avatarSize} rounded-full bg-surface-variant border-4 ${config.borderClass} shadow-lg flex items-center justify-center font-bold text-on-surface-variant text-xl`}>
            {initials}
        </div>
        <div className={`absolute -bottom-2 ${place === 1 ? 'left-1/2 -translate-x-1/2 w-12 h-12' : '-right-2 w-8 h-8'} rounded-full ${config.badgeBgClass} flex items-center justify-center shadow-md border-2 border-white`}>
            <span className="material-symbols-outlined text-lg">{config.icon}</span>
        </div>
      </div>

      <div className="text-center">
       <h4
        title={student.name}
        className={`${config.nameTextClass} text-on-background font-bold text-center break-words w-full`}
      >
        {student.name.split(' ').slice(0, 2).join(' ')}
      </h4>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className={`${config.scoreTextClass} text-primary font-bold`}>{student.score}</span>
          <span className="text-label-sm text-on-surface-variant font-medium">XP</span>
        </div>
      </div>

      <div className={`w-full ${config.postHeight} bg-gradient-to-b ${config.gradientClass} rounded-t-lg mt-4 border-t-2 ${config.gradientBorderClass}`} />
    </div>
  );
}
