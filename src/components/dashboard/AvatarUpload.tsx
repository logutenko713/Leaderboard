import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';

interface AvatarUploadProps {
  currentInitials: string;
}

export function AvatarUpload({ currentInitials }: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Можно загружать только изображения');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Файл слишком большой (максимум 5 МБ)');
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));

    // TODO: когда будет бэк — здесь реальная загрузка:
    // const formData = new FormData();
    // formData.append('avatar', file);
    // await fetch(API_ENDPOINTS.uploadAvatar, { method: 'POST', body: formData });
  };

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-headline-md text-on-surface">Фото профиля</h2>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-surface-variant overflow-hidden flex items-center justify-center font-bold text-xl text-on-surface-variant flex-shrink-0">
          {previewUrl ? (
            <img src={previewUrl} alt="Превью аватарки" className="w-full h-full object-cover" />
          ) : (
            currentInitials
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded border border-primary text-primary text-label-md hover:bg-primary/5 transition-colors w-max"
          >
            Выбрать файл
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-label-sm text-on-surface-variant">JPG, PNG до 5 МБ</p>
        </div>
      </div>

      {error && <p className="text-error text-label-md">{error}</p>}
    </div>
  );
}