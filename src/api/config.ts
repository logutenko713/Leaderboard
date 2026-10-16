export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const API_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login/`,
  consent: `${API_BASE_URL}/auth/consent/`,
  me: `${API_BASE_URL}/auth/me/`,
  logout: `${API_BASE_URL}/auth/logout/`,
  refresh: `${API_BASE_URL}/auth/refresh/`,
  myRating: `${API_BASE_URL}/auth/me/rating/`,
  leaderboardStudents: `${API_BASE_URL}/leaderboard/students/`,
  studentDetail: (login: string) => `${API_BASE_URL}/students/${login}/`,
};