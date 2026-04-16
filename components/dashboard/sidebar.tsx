"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SquaresFour, 
  Briefcase, 
  SealQuestion, 
  FileText, 
  Clipboard, 
  Calendar, 
  PaperPlaneTilt, 
  Gear,
  CaretRight
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: SquaresFour },
    ],
  },
  {
    label: "JOB BOARD",
    items: [
      { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
      { name: "Interviews", href: "/dashboard/interviews", icon: SealQuestion },
      { name: "Saved Resume", href: "/dashboard/resume", icon: FileText },
      { name: "Survey Request", href: "/dashboard/survey", icon: Clipboard },
    ],
  },
  {
    label: "TOOLS",
    items: [
      { name: "Events", href: "/dashboard/events", icon: Calendar },
      { name: "Report An Exit", href: "/dashboard/exit", icon: PaperPlaneTilt },
      { name: "Settings", href: "/dashboard/settings", icon: Gear },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white p-6">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold tracking-tight">interview</span>
          <div className="flex gap-1 ml-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto pr-2">
        {navItems.map((group) => (
          <div key={group.label}>
            <h3 className="px-2 text-[10px] font-semibold text-gray-400 tracking-wider mb-4">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive 
                        ? "text-black bg-gray-50" 
                        : "text-gray-500 hover:text-black hover:bg-gray-50/50"
                    )}
                  >
                    <item.icon size={20} weight={isActive ? "fill" : "regular"} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatar.jpg" alt="Aliah Lane" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Aliah Lane</p>
            <p className="text-xs text-gray-500 truncate">aliahlane25@gmail.com</p>
          </div>
          <CaretRight size={14} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
