import type { ScoresheetCriterion, ScoresheetLevel } from '../types/scoresheet';

export const MIN_LEVELS = 2;

export function criterionMax(criterion: ScoresheetCriterion): number {
  return criterion.levels.reduce((max, level) => Math.max(max, level.score), 0);
}

export function sheetMax(criteria: ScoresheetCriterion[]): number {
  return criteria.reduce((sum, criterion) => sum + criterionMax(criterion), 0);
}

export function renumberLevels(levels: ScoresheetLevel[]): ScoresheetLevel[] {
  return levels.map((level, index) => ({ ...level, score: index }));
}

export function createCriterion(): ScoresheetCriterion {
  const id = `crit-${Date.now()}`;
  return {
    id,
    title: '',
    description: '',
    levels: [0, 1, 2].map((score) => ({
      id: `${id}-level-${score}`,
      score,
      description: '',
    })),
  };
}