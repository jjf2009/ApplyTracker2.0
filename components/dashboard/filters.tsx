"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = ["All", "Pending", "Shortlisted", "Rejected"];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mx-8 mb-4">
      <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-lg transition-all",
              activeFilter === filter
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="relative w-72">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <Input 
          placeholder="Search..." 
          className="pl-9 h-9 border-gray-200 rounded-lg text-sm"
        />
      </div>
    </div>
  );
}
