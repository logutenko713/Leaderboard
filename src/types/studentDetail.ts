export interface RawStudentDetail {
  login: string;
  full_name: string;
  student_group: string;
  direction_name: string;
  study_year: number;
  faculty: string;
  study_score: string;
  debt_count: number;
  top_view: string;
  history_work_all: string;
  history_work_sem: string;
  history_work_month: string;
  history_work_week: string;
}

export interface StudentDetail {
  id: string;
  name: string;
  group: string;
  school: string;
  direction: string;
  course: number;
  hoursWorked: number;
}