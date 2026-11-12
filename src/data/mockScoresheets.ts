import type { Scoresheet } from '../types/scoresheet';

export const mockScoresheets: Scoresheet[] = [
  {
    id: 'sheet-1',
    title: 'Предзащита ИТ, базовый',
    criteriaCount: 4,
    maxScore: 8,
    status: 'locked',
    usedIn: 'Предзащита, осень 2026',
    updatedAt: '2026-10-01',
  },
  {
    id: 'sheet-2',
    title: 'Предзащита ИТ, базовый (копия)',
    criteriaCount: 4,
    maxScore: 8,
    status: 'draft',
    usedIn: null,
    updatedAt: '2026-10-08',
  },
  {
    id: 'sheet-3',
    title: 'Защита ВКР, расширенный',
    criteriaCount: 6,
    maxScore: 12,
    status: 'locked',
    usedIn: 'Защита, весна 2026',
    updatedAt: '2026-03-15',
  },
  {
    id: 'sheet-4',
    title: 'Защита проекта, осень 2026',
    criteriaCount: 5,
    maxScore: 10,
    status: 'draft',
    usedIn: null,
    updatedAt: '2026-10-02',
  },
  {
    id: 'sheet-5',
    title: 'Хакатон, экспресс',
    criteriaCount: 3,
    maxScore: 6,
    status: 'locked',
    usedIn: 'Предзащита, весна 2026',
    updatedAt: '2026-02-20',
  },
];