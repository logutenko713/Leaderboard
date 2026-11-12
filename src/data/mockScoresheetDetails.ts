import type { ScoresheetCriterion, ScoresheetDetail } from '../types/scoresheet';

function makeLevels(prefix: string, texts: [string, string, string]) {
  return texts.map((description, score) => ({
    id: `${prefix}-level-${score}`,
    score,
    description,
  }));
}

function makeBaseCriteria(): ScoresheetCriterion[] {
  return [
    {
      id: 'crit-1',
      title: 'Актуальность',
      description: 'Проблема и пользователи проекта обоснованы',
      levels: makeLevels('crit-1', ['Не раскрыто', 'Частично', 'Полностью']),
    },
    {
      id: 'crit-2',
      title: 'Тех. реализация',
      description: 'Решение работает и соответствует заявленным целям',
      levels: makeLevels('crit-2', ['Не работает', 'Работает частично', 'Работает полностью']),
    },
    {
      id: 'crit-3',
      title: 'Демонстрация',
      description: 'Команда показала работающий результат',
      levels: makeLevels('crit-3', ['Не показана', 'Показана частично', 'Показана полностью']),
    },
    {
      id: 'crit-4',
      title: 'Речь и ответы',
      description: 'Выступление структурировано, ответы на вопросы по существу',
      levels: makeLevels('crit-4', ['Слабо', 'Приемлемо', 'Уверенно']),
    },
  ];
}

const description = 'Для предзащит проектов направления ИТ. Каждый критерий оценивается от 0 до 2.';

export const mockScoresheetDetails: Record<string, ScoresheetDetail> = {
  'sheet-1': {
    id: 'sheet-1',
    title: 'Предзащита ИТ, базовый',
    description,
    status: 'locked',
    criteria: makeBaseCriteria(),
  },
  'sheet-2': {
    id: 'sheet-2',
    title: 'Предзащита ИТ, базовый (копия)',
    description,
    status: 'draft',
    criteria: makeBaseCriteria(),
  },
};