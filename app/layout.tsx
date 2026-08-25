"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Building2, Users, LogOut } from "lucide-react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <html lang="en">
      <body className="bg-[#09090b] text-white min-h-screen flex">
        {isLogin ? (
          // Full screen for login page without sidebar
          <div className="w-full min-h-screen">{children}</div>
        ) : (
          // Standard dashboard layout with sidebar
          <>
            {/* Sidebar */}
            <aside className="w-64 bg-[#121214] border-r border-zinc-800 flex flex-col justify-between p-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 px-2 py-4 mb-6">
                  <span className="text-xl font-black tracking-wider text-white">TOURISM</span>
                  <span className="text-xl font-bold text-amber-500">SYS</span>
                </div>

                <nav className="space-y-1">
                  <Link 
                    href="/" 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === "/" ? "bg-amber-600/10 text-amber-500" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <Link 
                    href="/monthly-report" 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname === "/monthly-report" ? "bg-amber-600/10 text-amber-500" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    <FileText size={18} />
                    Official Monthly Report
                  </Link>
                  <Link 
                    href="/accommodations" 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith("/accommodations") ? "bg-amber-600/10 text-amber-500" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    <Building2 size={18} />
                    Accommodations
                  </Link>
                  <Link 
                    href="/visitor-records" 
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith("/visitor-records") ? "bg-amber-600/10 text-amber-500" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    <Users size={18} />
                    Visitor Records
                  </Link>
                </nav>
              </div>

              {/* Sidebar Footer / Sign Out */}
              <div className="pt-4 border-t border-zinc-800">
                <Link 
                  href="/login" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={18} />
                  Sign Out
                </Link>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-[#09090b] overflow-y-auto">
              {children}
            </main>
          </>
        )}
      </body>
    </html>
  );
}