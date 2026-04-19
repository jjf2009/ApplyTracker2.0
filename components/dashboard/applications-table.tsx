"use client";

import { DotsThreeVertical } from "@phosphor-icons/react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  company: string;
  role: string;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  method: "COLD EMAIL" | "OFFICAL MEANS";
  appliedDate: Date;
  // Mock fields for UI parity
  salary?: string;
  interviewType?: string;
}

interface ApplicationsTableProps {
  applications: Application[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  return (
    <div className="mx-8 bg-white border rounded-2xl overflow-hidden mb-8">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="w-[50px] pl-6">
              <Checkbox />
            </TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Company Name</TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Job Title</TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Salary Range</TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Interview Date</TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Interview Type</TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Stage</TableHead>
            <TableHead className="w-[50px] pr-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="hover:bg-gray-50/30 transition-colors">
              <TableCell className="pl-6">
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-xs">
                    {app.company.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{app.company}</div>
                    <div className="text-xs text-gray-400 font-normal">London, UK</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 font-medium">{app.role}</TableCell>
              <TableCell className="text-gray-500">{app.salary || "$2500–$3200"}</TableCell>
              <TableCell className="text-gray-500">
                {new Date(app.appliedDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-gray-500">{app.interviewType || "Virtual"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                   <div className={cn(
                     "w-1.5 h-1.5 rounded-full",
                     app.status === "APPLIED" && "bg-orange-400",
                     app.status === "INTERVIEW" && "bg-emerald-400",
                     app.status === "OFFER" && "bg-blue-400",
                     app.status === "REJECTED" && "bg-red-400",
                   )} />
                   <span className={cn(
                     "text-sm font-medium",
                     app.status === "APPLIED" && "text-orange-600",
                     app.status === "INTERVIEW" && "text-emerald-600",
                     app.status === "OFFER" && "text-blue-600",
                     app.status === "REJECTED" && "text-red-600",
                   )}>
                     {app.status === "APPLIED" ? "Pending" : 
                      app.status === "INTERVIEW" ? "Shortlisted" : 
                      app.status === "OFFER" ? "Offer" : "Rejected"}
                   </span>
                </div>
              </TableCell>
              <TableCell className="pr-6 text-right">
                <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                  <DotsThreeVertical size={20} weight="bold" className="text-gray-400" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
