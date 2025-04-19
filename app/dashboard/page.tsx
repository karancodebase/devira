/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

interface UserProfile {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  collegeName: string;
  semester: number;
  github: string;
  leetcode: string;
}

const BADGES = [
  { name: "Open Sourcerer", color: "bg-yellow-600" },
  { name: "Pull Shark", color: "bg-blue-600" },
  { name: "Galaxy Brain", color: "bg-purple-700" },
  { name: "Starstruck", color: "bg-pink-700" },
];

export default function UserProfileList() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/users?email=${session.user.email}`);
        const data = await res.json();
        setProfile(data.profile);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
        Loading...
      </div>
    );
  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
        No profile found.
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center py-12 px-2">
        <div className="w-full max-w-6xl ">
          <div className="flex flex-col md:flex-row gap-4 py-4">
            {/* (User Profile) */}
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-800">
              <div className="w-full flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-pink-600 rounded-full" />
                <h2 className="text-2xl font-bold text-orange-400 tracking-tight">
                  User Profile
                </h2>
              </div>
              <img
                src="https://ui-avatars.com/api/?name=User&background=374151&color=fff&size=128"
                alt="Default Avatar"
                className="w-20 h-20 rounded-full mb-4 border-4 border-gray-800 object-cover"
              />
              <p className="text-lg font-semibold mb-1">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-gray-400 text-sm mb-2">{profile.email}</p>
              <div className="flex gap-3 mb-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400"
                  title="GitHub"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.77 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.104.823 2.227v3.303c0 .319.192.694.801.576C20.565 22.266 24 17.789 24 12.5 24 5.87 18.627.5 12 .5z" />
                  </svg>
                </a>
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400"
                  title="LeetCode"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 2l4 4-9 9-4-4L17 2z" />
                    <path d="M3 22h18" />
                  </svg>
                </a>
              </div>
              <div className="bg-gray-800 rounded-lg px-3 py-1 text-xs text-gray-300 mb-2">
                {profile.collegeName} | Semester {profile.semester}
              </div>
            </div>

            {/* Milestone (Badges) */}
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col border border-gray-800">
              <div className="w-full flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-700 rounded-full" />
                <h2 className="text-2xl font-bold text-yellow-300 tracking-tight">
                  Badges
                </h2>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Your achievements and badges earned on the platform.
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {BADGES.map((badge) => (
                  <span
                    key={badge.name}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color} bg-opacity-80 text-white`}
                  >
                    {badge.name}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Keep contributing to unlock more badges!
              </p>
            </div>
          </div>

          {/* Personal Milestone (GitHub Heatmap) */}
          <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-800">
            <div className="w-full flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full" />
              <h2 className="text-2xl font-bold text-purple-300 tracking-tight">
                Personal Milestone
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-3 text-center">
              Celebrating your coding journey and contribution streaks!
            </p>
            <img
              src={`https://ghchart.rshah.org/${
                profile.github.split("/").pop() || "username"
              }`}
              alt="GitHub Heatmap"
              className="w-full h-32 object-contain bg-gray-950 rounded"
            />
            <p className="text-xs text-gray-500 mt-2">
              Your GitHub contribution activity
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
