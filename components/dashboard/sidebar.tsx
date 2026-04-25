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

import { useAuthStore } from "@/store/authStore";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SignOut } from "@phosphor-icons/react";

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
      { name: "Cold Email Expert", href: "/dashboard/cold-emailer", icon: SealQuestion },
      { name: "Resume Builder", href: "/dashboard/resume-builder", icon: FileText },
    ],
  },

];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || "User";
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white p-6">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold tracking-tight text-[#6b21a8]">trackerezz</span>
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

      <div className="mt-auto pt-6 border-t flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-[#6b21a8] text-white text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <SignOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
