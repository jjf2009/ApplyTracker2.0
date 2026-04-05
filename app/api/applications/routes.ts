import { NextResponse } from "next/server";
import { ApplicationModel } from "@/lib/models/application.model";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = createApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error },
        { status: 400 }
      );
    }

    const { company, role, status, method, appliedDate, notes, userId } =
      parsed.data;

    const application = await ApplicationModel.create(
      company,
      role,
      status,
      method,
      new Date(appliedDate),
      notes ?? null,
      userId
    );

    return NextResponse.json(application, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId required" },
        { status: 400 }
      );
    }

    const applications = await ApplicationModel.findByUserId(userId);

    return NextResponse.json(applications);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}