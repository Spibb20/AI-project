import { User } from "@/utils/models/User.schema";
import { title } from "process";
import connectDB from "@/utils/mongodb";

export async function GET() {
  await connectDB();
  /*const users = [
    {
      id: 1,
      username: "bobb",
      age: 18,
    },
    {
      id: 2,
      username: "sod",
      age: 20,
    },
  ];*/

  const users = await User.find();

  return Response.json({ users });
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();
  console.log(body);

  return Response.json({ message: "Hello" });
}
