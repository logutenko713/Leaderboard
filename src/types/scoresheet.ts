export type ScoresheetStatus = 'draft' | 'locked';

export interface Scoresheet {
  id: string;
  title: string;
  criteriaCount: number;
  maxScore: number;
  status: ScoresheetStatus;
  usedIn: string | null;
  updatedAt: string;
}

export interface ScoresheetLevel {
  id: string;
  score: number;
  description: string;
}

export interface ScoresheetCriterion {
  id: string;
  title: string;
  description: string;
  levels: ScoresheetLevel[];
}

export interface ScoresheetDetail {
  id: string;
  title: string;
  description: string;
  status: ScoresheetStatus;
  criteria: ScoresheetCriterion[];
}