import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-xl border-b border-surface-container-low/80 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-unit max-w-[1280px] 2xl:max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 hover:bg-surface-container-highest/50 transition-colors rounded-full cursor-pointer text-primary"
            aria-label="Открыть меню"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="text-headline-lg font-extrabold text-primary tracking-tight">
            Лидерборд ТПУ
          </span>
        </div>

        <div className="flex items-center gap-4 text-primary">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant hidden md:flex items-center justify-center font-bold text-on-surface-variant">
            {user?.name.charAt(0) ?? '?'}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-surface-container-highest/50 transition-colors rounded-full cursor-pointer"
            title="Выйти"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}