import { title } from "process";

export async function GET() {
  const todos = [
    {
      id: 1,
      title: "Note Taking",
      completed: false,
    },
    {
      id: 2,
      title: "Training",
      completed: false,
    },
  ];

  return Response.json({ todos });
}
