import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type DemoUser = {
  id: number;
  name: string;
  age: number;
};

const users: DemoUser[] = [];

export async function GET() {
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = {
      id: Date.now(),
      name: String(body.name || "Unnamed"),
      age: Number(body.age || 0),
    };
    users.unshift(user);
    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
