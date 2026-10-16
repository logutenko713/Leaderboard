import { useState, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="text-on-background flex min-h-screen bg-surface">
      <Sidebar isMobileOpen={isMobileMenuOpen} onMobileClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col lg:ml-64 min-h-screen">
        <TopNavbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-[1280px] 2xl:max-w-[1600px]">
          {children}
        </main>
      </div>
    </div>
  );
}