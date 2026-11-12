import type { Permission } from '../types/auth';

export interface NavItem {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}

export interface NavSection {
  title?: string;
  requires?: Permission;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    items: [
      { to: '/', label: 'Рейтинг', icon: 'leaderboard', end: true },
      { to: '/profile', label: 'Личный кабинет', icon: 'person' },
      { to: '/defenses', label: 'Мои предзащиты', icon: 'fact_check' },
    ],
  },
  {
    title: 'Организатор',
    requires: 'organizer',
    items: [
      { to: '/scoresheets', label: 'Оценочные листы', icon: 'assignment' },
      { to: '/events', label: 'Мероприятия', icon: 'event' },
    ],
  },
  {
    items: [{ to: '/settings', label: 'Настройки', icon: 'settings' }],
  },
];