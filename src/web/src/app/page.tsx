'use client';

import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1>Hello from Home</h1>
      <Button
        onClick={() => router.push("/timer")}
      >
        Timer
      </Button>
    </>
  );
}
