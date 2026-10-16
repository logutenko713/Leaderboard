import { API_ENDPOINTS } from './config';
import type { RawStudentDetail, StudentDetail } from '../types/studentDetail';

function adaptStudentDetail(raw: RawStudentDetail): StudentDetail {
  return {
    id: raw.login,
    name: raw.full_name,
    group: raw.student_group,
    school: raw.faculty,
    direction: raw.direction_name,
    course: raw.study_year,
    hoursWorked: Number(raw.history_work_all),
  };
}

export async function fetchStudentDetail(login: string): Promise<StudentDetail> {
  const res = await fetch(API_ENDPOINTS.studentDetail(login));

  if (!res.ok) {
    throw new Error('Студент не найден');
  }

  const raw: RawStudentDetail = await res.json();
  return adaptStudentDetail(raw);
}