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
      const checkUser = async () => {
        const res = await fetch("/api/checkuser", {
          method: "POST",
          body: JSON.stringify({ email: session.user?.email }),
        });

        const data = await res.json();
        if (data.userExists) {
          router.push("/dashboard");
        } else {
          setUserExists(false);
        }
        setLoading(false);
      };

      checkUser();
    } else {
      router.push("/login");
    }
  }, [session, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Checking account status...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {session ? (
        <div className="min-h-screen bg-gray-900 p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-100 mb-2">
                Welcome, {session?.user?.name}
              </h1>
              <p className="text-gray-400">
                Complete your registration to continue
              </p>
            </div>

            {!userExists && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <UserRegisterForm />
              </div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={() => signOut()}
                className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <Link
            href="/login"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Redirecting to login...
          </Link>
        </div>
      )}
    </>
  );
};

export default Page;
