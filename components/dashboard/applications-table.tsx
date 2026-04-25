"use client";

import * as React from "react";
import { DotsThreeVertical, PencilSimple, Trash } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Application } from "@/hooks/use-applications";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApplicationForm } from "./application-form";

interface ApplicationsTableProps {
  applications: Application[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`/api/applications?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    } catch (error) {
      console.error(error);
      alert("Failed to delete application.");
    }
  };

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
            <TableHead className="font-semibold text-gray-500 py-4">Applied Date</TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Location</TableHead>
            <TableHead className="font-semibold text-gray-500 py-4">Stage</TableHead>
            <TableHead className="w-[50px] pr-6"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                No applications found.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow key={app.id} className="hover:bg-gray-50/30 transition-colors group">
                <TableCell className="pl-6">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                      {app.company.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{app.company}</div>
                      <div className="text-xs text-gray-400 font-normal">
                        {app.method === "COLD EMAIL" ? "Cold Email" : "Official"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 font-medium">{app.role}</TableCell>
                <TableCell className="text-gray-500">{app.salary_range || "—"}</TableCell>
                <TableCell className="text-gray-500">
                  {new Date(app.applied_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-gray-500">{app.location || "—"}</TableCell>
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
                        app.status === "INTERVIEW" ? "Interviewing" : 
                        app.status === "OFFER" ? "Offer" : "Rejected"}
                     </span>
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <RowActions app={app} onDelete={handleDelete} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function RowActions({ app, onDelete }: { app: Application, onDelete: (id: number) => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <DotsThreeVertical size={20} weight="bold" className="text-gray-400" />
          </button>
        } />
        <DropdownMenuContent align="end">
          <DialogTrigger render={
            <DropdownMenuItem className="cursor-pointer">
              <PencilSimple size={16} />
              Edit
            </DropdownMenuItem>
          } nativeButton={false} />
          
          <DropdownMenuItem 
            variant="destructive" 
            className="cursor-pointer"
            onSelect={() => onDelete(app.id)}
          >
            <Trash size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Application</DialogTitle>
          <DialogDescription>
            Update the details of your job application.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm 
          application={app} 
          onSuccess={() => setOpen(false)} 
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
