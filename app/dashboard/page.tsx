"use client";

import { useState, useMemo } from "react";
import { useApplications } from "@/hooks/use-applications";
import { DashboardHeader } from "@/components/dashboard/header";
import { ApplicationsStats } from "@/components/dashboard/stats";
import { FilterBar } from "@/components/dashboard/filters";
import { ApplicationsTable } from "@/components/dashboard/applications-table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis,
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 5;

export default function DashboardPage() {
  const { data: applications = [], isLoading } = useApplications();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Multi-field search and status filtering logic
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      // Search logic
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || (
        app.company.toLowerCase().includes(searchLower) ||
        app.role.toLowerCase().includes(searchLower) ||
        (app.location?.toLowerCase().includes(searchLower) ?? false) ||
        (app.salary_range?.toLowerCase().includes(searchLower) ?? false) ||
        (app.notes?.toLowerCase().includes(searchLower) ?? false) ||
        app.status.toLowerCase().includes(searchLower)
      );

      // Status filter logic
      let matchesStatus = true;
      if (filter === "Pending") matchesStatus = app.status === "APPLIED";
      else if (filter === "Shortlisted") matchesStatus = app.status === "INTERVIEW";
      else if (filter === "Rejected") matchesStatus = app.status === "REJECTED";

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, filter]);

  // Reset to page 1 when search or filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [search, filter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE) || 1;
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <DashboardHeader search={search} onSearchChange={setSearch} />
      <ApplicationsStats count={applications.length} />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      
      <ApplicationsTable applications={paginatedApplications} />
      
      {filteredApplications.length > 0 && (
        <div className="mx-8 mb-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  className={cn(
                    "border rounded-lg px-4",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  className={cn(
                    "border rounded-lg px-4",
                    currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

// Helper for class names since I used it above
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
