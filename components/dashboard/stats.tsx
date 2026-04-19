"use client";

import { Briefcase } from "@phosphor-icons/react";

interface ApplicationsStatsProps {
  count: number;
}

export function ApplicationsStats({ count }: ApplicationsStatsProps) {
  return (
    <div className="mx-8 mb-8 p-6 bg-white border rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
          <Briefcase size={24} weight="fill" className="text-gray-900" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Jobs You Have Applied</h2>
      </div>
      <div className="text-right">
        <span className="text-sm font-medium text-gray-400">{count} Jobs applied</span>
      </div>
    </div>
  );
}
