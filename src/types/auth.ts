export type UserRole = 'admin' | 'manager' | 'student';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RawAuthUser {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: UserRole;
}

export interface RawShortStudent {
  login: string;
  full_name: string;
  student_group: string;
  top_view: string;
  history_work_sem: string;
}

export interface LoginResponse {
  need_consent: boolean;
  temp_token?: string;
  message?: string;
  access?: string;
  refresh?: string;
  user?: RawAuthUser;
}

export interface MeResponse {
  user: RawAuthUser;
  student: RawShortStudent | null;
  consent_given: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  group: string | null;
  role: UserRole;
}