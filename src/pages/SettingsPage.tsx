import { useAuth } from '../context/AuthContext';
import { AvatarUpload } from '../components/dashboard/AvatarUpload';
import { PasswordChangeForm } from '../components/dashboard/PasswordChangeForm';

export function SettingsPage() {
  const { user } = useAuth();

  const initials = user?.name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase() ?? '?';

  return (
    <div className="max-w-xl flex flex-col gap-6">
      <h1 className="text-display-lg text-on-background mb-2">Настройки</h1>
      <AvatarUpload currentInitials={initials} />
      <PasswordChangeForm />
    </div>
  );
}