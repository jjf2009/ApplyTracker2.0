import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApplicationService } from '@/lib/services/application.service';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await ApplicationService.updateApplication(
      supabase,
      parseInt(id, 10),
      body,
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.message === 'APPLICATION_NOT_FOUND') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 },
      );
    }
    console.error('Update application error:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await ApplicationService.deleteApplication(supabase, parseInt(id, 10));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'APPLICATION_NOT_FOUND') {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 },
      );
    }
    console.error('Delete application error:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 },
    );
  }
}
