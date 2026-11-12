import { mockScoresheets } from '../data/mockScoresheets';
import { mockScoresheetDetails } from '../data/mockScoresheetDetails';
import { createCriterion, sheetMax } from '../utils/scoresheet';
import type { Scoresheet, ScoresheetDetail } from '../types/scoresheet';

// Данные живут в памяти страницы: после перезагрузки (F5) возвращаются к исходным
let sheets: Scoresheet[] = [...mockScoresheets];
const details: Record<string, ScoresheetDetail> = { ...mockScoresheetDetails };

// Для листов, у которых нет подробных моков, собираем простой набор критериев
function buildGenericDetail(sheet: Scoresheet): ScoresheetDetail {
  return {
    id: sheet.id,
    title: sheet.title,
    description: '',
    status: sheet.status,
    criteria: Array.from({ length: sheet.criteriaCount }, (_, index) => ({
      id: `${sheet.id}-crit-${index + 1}`,
      title: `Критерий ${index + 1}`,
      description: '',
      levels: ['Не раскрыто', 'Частично', 'Полностью'].map((description, score) => ({
        id: `${sheet.id}-crit-${index + 1}-level-${score}`,
        score,
        description,
      })),
    })),
  };
}

export async function listScoresheets(): Promise<Scoresheet[]> {
  return [...sheets];
}

export async function getScoresheetDetail(id: string): Promise<ScoresheetDetail | null> {
  if (details[id]) return details[id];

  const sheet = sheets.find((item) => item.id === id);
  if (!sheet) return null;

  details[id] = buildGenericDetail(sheet);
  return details[id];
}

export async function createScoresheet(): Promise<string> {
  const id = `sheet-${Date.now()}`;
  const title = 'Новый оценочный лист';
  const criterion = createCriterion();

  const entry: Scoresheet = {
    id,
    title,
    criteriaCount: 1,
    maxScore: sheetMax([criterion]),
    status: 'draft',
    usedIn: null,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  sheets = [entry, ...sheets];
  details[id] = { id, title, description: '', status: 'draft', criteria: [criterion] };

  return id;
}

export async function duplicateScoresheet(id: string): Promise<string | null> {
  const source = sheets.find((item) => item.id === id);
  const sourceDetail = await getScoresheetDetail(id);
  if (!source || !sourceDetail) return null;

  const newId = `sheet-${Date.now()}`;
  const title = `${source.title} (копия)`;

  const copy: Scoresheet = {
    ...source,
    id: newId,
    title,
    status: 'draft',
    usedIn: null,
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  const index = sheets.findIndex((item) => item.id === id);
  sheets = [...sheets.slice(0, index + 1), copy, ...sheets.slice(index + 1)];
  details[newId] = { ...structuredClone(sourceDetail), id: newId, title, status: 'draft' };

  return newId;
}