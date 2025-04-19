/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Default avatar for demonstration
  const avatarUrl =
    session?.user?.image ||
    "https://ui-avatars.com/api/?name=User&background=374151&color=fff&size=128";

  return (
    <nav className="w-full  border-b border-[#232323] px-4 md:px-10 py-2 flex items-center justify-between z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow">
          S
        </span>
        <span className="font-bold text-lg md:text-2xl text-gray-100 tracking-tight">
          StreakNFT
        </span>
      </div>

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-4">
        {!session ? (
          <Link
            href="/login"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg  text-gray-100 font-medium hover:bg-[#2a2a2a] transition"
              onClick={() => setDropdown((v) => !v)}
            >
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-gray-700 object-cover"
              />
              <span>{session.user?.name || "User"}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${
                  dropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {/* Dropdown */}
            {dropdown && (
              <div className="absolute right-0 mt-2 w-40  rounded-xl shadow-lg py-2 z-50 border ">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-200 hover:bg-[#2a2a2a] transition"
                  onClick={() => setDropdown(false)}
                >
                  Show Profile
                </Link>
                <button
                  onClick={() => {
                    setDropdown(false);
                    signOut();
                  }}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#2a2a2a] transition"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileMenu((v) => !v)}
          className="p-2 rounded-lg hover:bg-[#232323] transition"
        >
          <HiMenu size={28} className="text-gray-100" />
        </button>
        {/* Mobile Menu Sheet */}
        {mobileMenu && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-60 flex"
            onClick={() => setMobileMenu(false)}
          >
            <div
              className="ml-auto w-64 h-full bg-[#232323] shadow-lg flex flex-col py-6 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-8">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-gray-700 object-cover"
                />
                <span className="font-medium text-gray-100 text-lg">
                  {session?.user?.name || "Guest"}
                </span>
              </div>
              {!session ? (
                <Link
                  href="/login"
                  className="block px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition mb-2"
                  onClick={() => setMobileMenu(false)}
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 rounded-lg text-gray-200 hover:bg-[#181818] transition mb-2"
                    onClick={() => setMobileMenu(false)}
                  >
                    Show Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenu(false);
                      signOut();
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-[#181818] transition"
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
