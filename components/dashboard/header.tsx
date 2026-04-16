"use client";

import { MagnifyingGlass, Bell } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between px-8 py-6">
      <h1 className="text-xl font-bold text-gray-900">Applied Jobs</h1>
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search" 
            className="pl-10 bg-gray-50/50 border-none h-10 w-full"
          />
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell size={24} weight="regular" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>
    </div>
  );
}
