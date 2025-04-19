"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Button className="mt-4 mx-2">{session?.user?.name}</Button>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }

  return (
    <Button>
      <Link href="/login">Login</Link>
    </Button>
  );
}
