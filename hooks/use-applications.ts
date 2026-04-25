import { useQuery } from "@tanstack/react-query";

export interface Application {
  id: number;
  user_id: string;
  company: string;
  role: string;
  status: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";
  method: "COLD EMAIL" | "OFFICAL MEANS";
  applied_date: string;
  notes: string | null;
  created_at: string;
}

export function useApplications() {
  return useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await fetch("/api/applications");
      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }
      return res.json();
    },
  });
}
