import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../api/config';
import type { LoginResponse, RawShortStudent } from '../types/auth';

type LoginType = 'student' | 'partner';

const loginTabs: { type: LoginType; label: string; icon: string; hint: string }[] = [
  { type: 'student', label: 'Студент', icon: 'school', hint: 'Вход для студентов' },
  { type: 'partner', label: 'Партнёр', icon: 'handshake', hint: 'Вход для партнёров вуза' },
];

export function LoginForm() {
  const [loginType, setLoginType] = useState<LoginType>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const activeTab = loginTabs.find((tab) => tab.type === loginType) ?? loginTabs[0];

  const fetchStudent = async (accessToken: string): Promise<RawShortStudent | null> => {
    const res = await fetch(API_ENDPOINTS.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.student;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Неверный логин или пароль');
      }

      const data: LoginResponse = await res.json();

      if (data.need_consent) {
        const consentRes = await fetch(API_ENDPOINTS.consent, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ consent: true, temp_token: data.temp_token }),
        });

        if (!consentRes.ok) {
          throw new Error('Не удалось подтвердить согласие');
        }

        const consentData = await consentRes.json();
        const student = await fetchStudent(consentData.access);
        authLogin(consentData.access, consentData.refresh, consentData.user, student);
        navigate('/');
        return;
      }

      if (data.access && data.refresh && data.user) {
        const student = await fetchStudent(data.access);
        authLogin(data.access, data.refresh, data.user, student);
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center px-gutter">
      <div className="bg-surface rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] w-full max-w-md overflow-hidden border border-border-subtle">
        <div className="bg-primary px-card-padding py-stack-lg flex flex-col items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-[48px] mb-stack-sm">{activeTab.icon}</span>
          <h1 className="text-headline-md font-semibold uppercase tracking-wider text-center">
            АВТОРИЗАЦИЯ
          </h1>
          <p className="text-body-md opacity-80 mt-1">{activeTab.hint}</p>
        </div>

        <div className="p-card-padding">
          <div
            role="tablist"
            className="grid grid-cols-2 gap-1 bg-surface-container-low rounded-lg p-1 border border-outline-variant mb-stack-md"
          >
            {loginTabs.map((tab) => (
              <button
                key={tab.type}
                type="button"
                role="tab"
                aria-selected={loginType === tab.type}
                onClick={() => {
                  setLoginType(tab.type);
                  setError(null);
                }}
                className={`flex items-center justify-center gap-2 py-2 rounded-md text-label-md transition-colors cursor-pointer ${
                  loginType === tab.type
                    ? 'bg-white shadow-sm text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-variant font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            <div>
              <label htmlFor="username" className="sr-only">Логин</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary text-xl">person</span>
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border-subtle rounded bg-surface-bright text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-body-md transition-shadow duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Пароль</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary text-xl">lock</span>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border-subtle rounded bg-surface-bright text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-body-md transition-shadow duration-200"
                />
              </div>
            </div>

            {error && <p className="text-error text-body-md">{error}</p>}

            <div className="pt-stack-sm">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 rounded shadow-sm text-label-md uppercase tracking-wider text-on-primary bg-success hover:bg-primary-container transition-colors duration-200 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? 'Входим...' : 'Войти'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}