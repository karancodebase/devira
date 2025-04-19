"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import UserRegisterForm from "../../components/UserRegisterForm";
import { useState, useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      // Make the API request to check if the user exists
      const checkUser = async () => {
        const res = await fetch("/api/checkuser", {
          method: "POST",
          body: JSON.stringify({ email: session.user?.email }),
        });

        const data = await res.json();
        if (data.userExists) {
          router.push("/dashboard");
        } else {
          setUserExists(false); // If user does not exist, show the form
        }

        setLoading(false); // Stop loading once the check is done
      };

      checkUser();
    } else {
      router.push("/login");
    }
  }, [session, router]);

  if (loading) {
    return <div className="text-center">Loading... Please wait.</div>;
  }

  return (
    <>
      {session ? (
        <div className="flex flex-col gap-4 justify-center items-center">
          <p className="text-3xl font-bold mt-10">
            Hello {session?.user?.name}!{" "}
          </p>
          {/* Display the form only if the user does not exist */}
          {!userExists && <UserRegisterForm />}
          <Button onClick={() => signOut()} className="border p-2 cursor-pointer">
            Sign out
          </Button>
        </div>
      ) : (
        <div>
          <Link href="/login" className="ml-4">
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Page;
