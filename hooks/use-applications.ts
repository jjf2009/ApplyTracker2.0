import { useQuery } from "@tanstack/react-query";

interface Application {
  id: string;
  company: string;
  role: string;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  method: "COLD EMAIL" | "OFFICAL MEANS";
  appliedDate: string;
  salary?: string;
  interviewType?: string;
}

export function useApplications() {
  return useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await fetch("/api/applications");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    // Adding some initial data or placeholder to match the image if API is empty
    placeholderData: [
       { id: "1", company: "Apple", role: "Central Paradigm Engineer", status: "APPLIED", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "Virtual" },
       { id: "2", company: "Google", role: "Dynamic Directives Representative", status: "INTERVIEW", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "In Person" },
       { id: "3", company: "Amazon", role: "Future Integration Consultant", status: "INTERVIEW", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "Virtual" },
       { id: "4", company: "Shopify", role: "Chief Interactions Officer", status: "REJECTED", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "Virtual" },
       { id: "5", company: "McDonald", role: "Legacy Research Engineer", status: "APPLIED", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "Virtual" },
       { id: "6", company: "Adidas", role: "Corporate Intranet Engineer", status: "REJECTED", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "Virtual" },
       { id: "7", company: "Nike", role: "Legacy Division Manager", status: "INTERVIEW", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "In Person" },
       { id: "8", company: "Microsoft", role: "Dynamic Mobility Consultant", status: "REJECTED", method: "OFFICAL MEANS", appliedDate: "2025-03-16", salary: "$2500–$3200", interviewType: "In Person" },
    ],
  });
}
