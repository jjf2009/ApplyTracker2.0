"use client";

import { useEffect, useState } from "react";
import { useApplications } from "@/hooks/use-applications";
import { DashboardHeader } from "@/components/dashboard/header";
import { ApplicationsStats } from "@/components/dashboard/stats";
import { FilterBar } from "@/components/dashboard/filters";
import { ApplicationsTable } from "@/components/dashboard/applications-table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

export default function DashboardPage() {
  const { data: applications = [], isLoading } = useApplications();
  const [filter, setFilter] = useState("All");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const filteredApplications = filter === "All" 
    ? applications 
    : applications.filter(app => {
        if (filter === "Pending") return app.status === "APPLIED";
        if (filter === "Shortlisted") return app.status === "INTERVIEW";
        if (filter === "Rejected") return app.status === "REJECTED";
        return true;
      });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">

      <DashboardHeader />
      <ApplicationsStats count={applications.length} />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      <ApplicationsTable applications={filteredApplications} />
      
      <div className="mx-8 mb-12">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="border rounded-lg px-4" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <span className="px-2 text-gray-400">...</span>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">8</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">9</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="border rounded-lg px-4" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
