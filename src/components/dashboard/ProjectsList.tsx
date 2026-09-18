import type { Project, ProjectStatus } from '../../types/projects';

interface ProjectsListProps {
  projects: Project[];
}

const statusConfig: Record<ProjectStatus, { label: string; textClass: string }> = {
  completed: { label: 'Завершён', textClass: 'text-primary' },
  in_progress: { label: 'В работе', textClass: 'text-secondary' },
};

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-headline-md text-on-surface">Проектная деятельность</h2>

      <div className="flex flex-col gap-3">
        {projects.map((project) => {
          const status = statusConfig[project.status];
          return (
            <div
              key={project.id}
              className="flex justify-between items-center p-4 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors duration-200"
            >
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface">{project.title}</span>
                <span className="text-label-sm text-on-surface-variant">Роль: {project.role}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-label-md text-on-surface">
                  {project.status === 'completed' ? '+' : ''}{project.hours} ч
                </span>
                <span className={`text-label-sm ${status.textClass}`}>{status.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}