import { SupabaseClient } from '@supabase/supabase-js';
import { ApplicationModel, Application } from '../models/application.model';

export interface CreateApplicationInput {
  company: string;
  role: string;
  status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  method: 'COLD EMAIL' | 'OFFICAL MEANS';
  appliedDate: string;
  salaryRange?: string;
  interviewDate?: string;
  location?: string;
  notes?: string;
}

export class ApplicationService {
  static async createApplication(
    supabase: SupabaseClient,
    input: CreateApplicationInput,
    userId: string,
  ): Promise<Application> {
    return ApplicationModel.create(supabase, {
      user_id: userId,
      company: input.company,
      role: input.role,
      status: input.status,
      method: input.method,
      applied_date: input.appliedDate,
      salary_range: input.salaryRange ?? null,
      interview_date: input.interviewDate ?? null,
      location: input.location ?? null,
      notes: input.notes ?? null,
    });
  }

  static async getUserApplications(
    supabase: SupabaseClient,
  ): Promise<Application[]> {
    // RLS scopes results to the authenticated user automatically
    return ApplicationModel.findByUserId(supabase);
  }

  static async updateApplication(
    supabase: SupabaseClient,
    applicationId: number,
    updates: Partial<CreateApplicationInput>,
  ): Promise<Application> {
    // Map camelCase input to snake_case DB columns
    const dbUpdates: Record<string, unknown> = {};
    if (updates.company !== undefined) dbUpdates.company = updates.company;
    if (updates.role !== undefined) dbUpdates.role = updates.role;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.method !== undefined) dbUpdates.method = updates.method;
    if (updates.appliedDate !== undefined) dbUpdates.applied_date = updates.appliedDate;
    if (updates.salaryRange !== undefined) dbUpdates.salary_range = updates.salaryRange;
    if (updates.interviewDate !== undefined) dbUpdates.interview_date = updates.interviewDate;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;

    const updated = await ApplicationModel.update(supabase, applicationId, dbUpdates);

    if (!updated) {
      throw new Error('APPLICATION_NOT_FOUND');
    }

    return updated;
  }

  static async deleteApplication(
    supabase: SupabaseClient,
    applicationId: number,
  ): Promise<{ success: boolean }> {
    const deleted = await ApplicationModel.delete(supabase, applicationId);

    if (!deleted) {
      throw new Error('APPLICATION_NOT_FOUND');
    }

    return { success: true };
  }
}
