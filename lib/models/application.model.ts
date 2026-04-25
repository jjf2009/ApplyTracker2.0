import { SupabaseClient } from '@supabase/supabase-js';

export interface Application {
  id: number;
  user_id: string;
  company: string;
  role: string;
  status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  method: 'COLD EMAIL' | 'OFFICAL MEANS';
  applied_date: string;
  notes: string | null;
  created_at: string;
}

export class ApplicationModel {
  /**
   * Create a new application.
   * RLS ensures user_id must match the authenticated user.
   */
  static async create(
    supabase: SupabaseClient,
    data: {
      user_id: string;
      company: string;
      role: string;
      status: Application['status'];
      method: Application['method'];
      applied_date: string;
      notes: string | null;
    },
  ): Promise<Application> {
    const { data: application, error } = await supabase
      .from('applications')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return application;
  }

  /**
   * Get all applications for the authenticated user.
   * RLS automatically filters to only the user's own rows.
   */
  static async findByUserId(supabase: SupabaseClient): Promise<Application[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('applied_date', { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  /**
   * Find a single application by ID.
   * RLS ensures only the owner can see it.
   */
  static async findById(
    supabase: SupabaseClient,
    id: number,
  ): Promise<Application | null> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  /**
   * Update an application.
   * RLS ensures only the owner can update.
   */
  static async update(
    supabase: SupabaseClient,
    id: number,
    updates: Partial<Omit<Application, 'id' | 'user_id' | 'created_at'>>,
  ): Promise<Application | null> {
    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  /**
   * Delete an application.
   * RLS ensures only the owner can delete.
   */
  static async delete(supabase: SupabaseClient, id: number): Promise<boolean> {
    const { error, count } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
}