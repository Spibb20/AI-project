export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    ok: true,
    route: "/api",
    message: "API is running",
  });
}

export async function POST() {
  return Response.json({
    ok: true,
    route: "/api",
    message: "API POST is running",
  });
}
