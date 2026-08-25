"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Building2, Users, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: <Home size={20} /> },
    { name: "Official Monthly Report", href: "/monthly-report", icon: <FileText size={20} /> },
    { name: "Accommodations", href: "/accommodations", icon: <Building2 size={20} /> },
    { name: "Visitor Records", href: "/visitor-records", icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-64 bg-[#18181b] border-r border-zinc-800 h-screen sticky top-0 flex flex-col hidden md:flex">
      {/* Brand Header */}
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-xl font-bold text-white tracking-wider">TOURISM<span className="text-blue-500">SYS</span></h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${
                isActive 
                  ? "bg-blue-600/10 text-blue-500 border border-blue-600/20" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Area */}
      <div className="p-4 border-t border-zinc-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors text-sm font-medium">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}