"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { AddApplicationModal } from "./add-application-modal";

interface DashboardHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DashboardHeader({ search, onSearchChange }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-6">
      <h1 className="text-xl font-bold text-gray-900">Applied Jobs</h1>
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search company, role, etc..." 
            className="pl-10 bg-gray-50/50 border-none h-10 w-full"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <AddApplicationModal />
      </div>
    </div>
  );
}
