import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg p-3 mx-2 text-label-md transition-all duration-200 ${
      isActive
        ? 'bg-primary-container text-on-primary-container shadow-sm'
        : 'text-on-surface-variant hover:bg-surface-container-high'
    }`;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[45] lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`h-screen w-64 fixed left-0 top-0 bg-surface shadow-md flex flex-col gap-2 py-6 border-r border-outline-variant/30 overflow-y-auto z-50 transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={onMobileClose}
          className="lg:hidden absolute top-3 right-3 p-2 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer text-on-surface-variant"
          aria-label="Закрыть меню"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="px-6 mb-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-surface-variant mb-4 border-2 border-primary-container shadow-sm flex items-center justify-center text-on-surface-variant font-bold text-xl">
            {user?.name.charAt(0) ?? '?'}
          </div>
          <h2 className="text-headline-md text-primary text-center">{user?.name}</h2>
          {user?.group && (
            <p className="text-label-sm text-on-surface-variant mt-1">{user.group}</p>
          )}
        </div>

        <nav className="flex-1 px-2 flex flex-col gap-1">
          <NavLink to="/" end className={navLinkClass} onClick={onMobileClose}>
            <span className="material-symbols-outlined">leaderboard</span>
            Рейтинг
          </NavLink>
          <NavLink to="/profile" className={navLinkClass} onClick={onMobileClose}>
            <span className="material-symbols-outlined">person</span>
            Личный кабинет
          </NavLink>
          <NavLink to="/settings" className={navLinkClass} onClick={onMobileClose}>
            <span className="material-symbols-outlined">settings</span>
            Настройки
          </NavLink>
        </nav>
      </aside>
    </>
  );
}