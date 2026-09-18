import { useAuth } from '../../context/AuthContext';

export function TopNavbar() {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center w-full px-container-padding py-unit max-w-[1440px] mx-auto sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-surface-container-low/80 shadow-sm">
      <div className="flex items-center gap-8">
        <span className="text-headline-lg font-extrabold text-primary tracking-tight">
          Лидерборд ТПУ
        </span>
        {/* <nav className="hidden md:flex gap-6 h-full items-end">
          
            <a href="#"
            className="text-primary font-bold border-b-2 border-primary pb-4 pt-5 px-2"
          >
            Рейтинг
          </a>
        </nav> */}
      </div>

      <div className="flex items-center gap-4 text-primary">
        <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant hidden md:flex items-center justify-center font-bold text-on-surface-variant">
          {user?.name.charAt(0) ?? '?'}
        </div>
      </div>
    </header>
  );
}