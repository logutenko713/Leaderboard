import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../api/config';
import type { LoginResponse } from '../types/auth';

export function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (!res.ok) {
        throw new Error('Неверный логин или пароль');
      }

      const data: LoginResponse = await res.json();
      authLogin(data.token, data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center px-gutter">
      <div className="bg-surface rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] w-full max-w-md overflow-hidden border border-border-subtle">
        {/* Header */}
        <div className="bg-primary px-card-padding py-stack-lg flex flex-col items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-[48px] mb-stack-sm">school</span>
          <h1 className="text-headline-md font-semibold uppercase tracking-wider text-center">
            АВТОРИЗАЦИЯ
          </h1>
          <p className="text-body-md opacity-80 mt-1">ТПУ Лидерборд</p>
        </div>

        {/* Form */}
        <div className="p-card-padding">
          <form onSubmit={handleSubmit} className="space-y-stack-md">
            {/* Login input */}
            <div>
              <label htmlFor="login" className="sr-only">Логин</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-secondary text-xl">person</span>
                </div>
                <input
                  id="login"
                  type="text"
                  placeholder="Логин (Email)"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border-subtle rounded bg-surface-bright text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-body-md transition-shadow duration-200"
                />
              </div>
            </div>

            {/* Password input */}
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

            {error && (
              <p className="text-error text-body-md">{error}</p>
            )}

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