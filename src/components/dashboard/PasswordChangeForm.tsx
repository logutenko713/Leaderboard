import { useState } from 'react';
import type { FormEvent } from 'react';

export function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword.length < 8) {
      setError('Новый пароль должен быть не короче 8 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: заменить на реальный запрос, когда будет готов бэк
      // await fetch(API_ENDPOINTS.changePassword, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ currentPassword, newPassword }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setError('Не удалось сменить пароль');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-headline-md text-on-surface">Смена пароля</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="currentPassword" className="text-label-sm text-on-surface-variant">
          Текущий пароль
        </label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="border border-outline-variant rounded px-3 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="newPassword" className="text-label-sm text-on-surface-variant">
          Новый пароль
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="border border-outline-variant rounded px-3 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="confirmPassword" className="text-label-sm text-on-surface-variant">
          Подтвердите новый пароль
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border border-outline-variant rounded px-3 py-2 text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      {error && <p className="text-error text-label-md">{error}</p>}
      {success && <p className="text-primary text-label-md">Пароль успешно изменён</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start px-6 py-2 rounded bg-success text-white text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors disabled:opacity-60"
      >
        {isSubmitting ? 'Сохраняем...' : 'Сохранить'}
      </button>
    </form>
  );
}