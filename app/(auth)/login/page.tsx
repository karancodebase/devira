"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FiUser, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    gsap.fromTo(
      leftPanelRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      rightPanelRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/register");
    }
  }, [session, router]);

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-center p-8 bg-neutral-800 rounded-xl shadow">
          <p className="text-lg text-neutral-100 mb-4">
            Signed in as {session?.user?.email}
          </p>
          <button
            onClick={() => signOut()}
            className="px-6 py-2 bg-neutral-700 text-neutral-200 rounded-lg hover:bg-neutral-600 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-neutral-900 text-neutral-100">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="w-1/2 md:flex hidden flex-col justify-center items-center bg-neutral-800 p-10"
      >
        <div className="text-5xl font-bold mb-8 text-neutral-100 tracking-tight">
          Devira
        </div>
        <p className="text-neutral-400 text-lg">
          Track your coding journey. Simple. Secure. Rewarding.
        </p>
      </div>

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="md:w-1/2 w-full flex flex-col justify-center items-center p-8"
      >
        <div className="w-full max-w-md bg-neutral-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-neutral-100">Sign In</h2>
          <p className="mb-6 text-neutral-400">
            Enter your details to login to your account
          </p>

          <div className="space-y-3 flex flex-col">
            <button
              onClick={() => signIn("github")}
              className="border border-neutral-700 px-4 py-2 rounded-lg h-12 cursor-pointer flex gap-2 justify-center items-center bg-neutral-900 hover:bg-neutral-700 transition"
            >
              <FaGithub size={22} />
              <span>Sign in with GitHub</span>
            </button>
            <button
              onClick={() => signIn("google")}
              className="border border-neutral-700 px-4 py-2 rounded-lg h-12 cursor-pointer flex gap-2 justify-center items-center bg-neutral-900 hover:bg-neutral-700 transition"
            >
              <FcGoogle size={22} />
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="flex items-center my-6 w-full">
            <hr className="flex-grow border-neutral-700" />
            <span className="mx-4 text-neutral-500">or</span>
            <hr className="flex-grow border-neutral-700" />
          </div>

          <div className="mb-4">
            <div className="relative mb-3">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-neutral-900 rounded focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100 placeholder-neutral-500"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-neutral-900 rounded focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100 placeholder-neutral-500"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Must be at least 8 characters.
            </p>
          </div>

          <button className="w-full py-3 bg-neutral-700 text-neutral-100 rounded font-semibold hover:bg-neutral-600 transition mb-3">
            Sign in
          </button>

          <p className="text-sm text-neutral-400 text-center">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline text-neutral-200 hover:text-neutral-100">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
