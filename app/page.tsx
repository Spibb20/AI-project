"use client";
import { useEffect, useState } from "react";
import { Tab } from "./_components/Tab";

type User = {
  id: number;
  name: string;
  age: number;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className="w-screen h-screen items-center justify-items-center ">
      <Tab></Tab>
    </div>
  );
}
