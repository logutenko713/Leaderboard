import type { ReactNode } from "react";
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="text-on-background flex min-h-screen bg-surface">
            <Sidebar />
            <div className="flex-1 flex-col lg:ml-64 min-h-screen">
                <TopNavbar />
                <main className="flex-1 p-margin-mobile md:p-margin-desktop max-w-[1280px] mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}