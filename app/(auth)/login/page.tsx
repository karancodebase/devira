"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
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
  if (session) {
    
    router.push("/register")
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <div className="min-h-screen flex bg-black text-white">
      <div
        ref={leftPanelRef}
        className="w-1/2 flex flex-col md:block hidden justify-center items-center bg-gradient-to-b from-purple-900 to-black p-10"
      >
        <div className="text-6xl font-bold mb-10">Devira</div>
      </div>

      <div
        ref={rightPanelRef}
        className="md:w-1/2 flex flex-col justify-center items-center p-10"
      >
        <h2 className="text-3xl font-bold mb-2">Sign In Account</h2>
        <p className="mb-6 text-zinc-400">
          Enter your details to login your account
        </p>

        <div className="space-y-4 flex lg:flex-row flex-col lg:gap-4">
          <button
            onClick={() => signIn("github")}
            className="border-2 text-sm px-4 py-2 rounded-lg h-14 cursor-pointer 
            flex gap-2 justify-center items-center"
          >
            <FaGithub size={25}/>
            <span>Sign in with GitHub</span>
          </button>
          <button
            onClick={() => signIn("google")}
            className="border-2 text-sm px-4 py-2 rounded-lg h-14 cursor-pointer
            flex gap-2 justify-center items-center"
          >
             <FcGoogle size={25}/>
             <span>Sign in with Goggle</span>
          </button>
        </div>

        <div className="flex items-center my-4 w-full">
          <hr className="flex-grow border-zinc-700" />
          <span className="mx-4 text-zinc-500">or</span>
          <hr className="flex-grow border-zinc-700" />
        </div>

        <input
          type="text"
          placeholder="username"
          className="bg-zinc-900 p-3 md:w-[25vw] rounded mb-4"
        />

        <input
          type="password"
          placeholder="Enter your password."
          className="bg-zinc-900 md:w-[25vw] p-3 rounded mb-2"
        />
        <p className="text-sm text-zinc-500 mb-4">
          Must be at least 8 characters.
        </p>

        <button className="bg-white text-black px-6 py-2 rounded md:w-[25vw] w-[50vw] mb-4 font-semibold">
          Sign in
        </button>

        <p className="text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline text-white">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
