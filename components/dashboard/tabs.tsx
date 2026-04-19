"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderSimple, SuitcaseSimple, PlayCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Interview Dashboard", href: "/dashboard", icon: FolderSimple },
  { name: "Applied Jobs", href: "/dashboard/applied-jobs", icon: SuitcaseSimple },
  { name: "Overview", href: "/dashboard/overview", icon: PlayCircle },
];

export function DashboardTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8 px-8 py-4 border-b bg-white">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors relative pb-1",
              isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <tab.icon size={18} weight={isActive ? "fill" : "regular"} />
            {tab.name}
            {isActive && (
              <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-black" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
