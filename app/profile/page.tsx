/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useWallet } from "../../hooks/useWallet"
import { redeemBadge } from "../../utils/redeemBadge"
import { UserProfile } from "../../models/UserProfile";

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
  streak: number;
  badgeClaimed: boolean;
  github_oauth: string;
 
}

const BADGES = [
  { name: "Open Sourcerer", color: "bg-yellow-600" },
  { name: "Pull Shark", color: "bg-blue-600" },
  { name: "Galaxy Brain", color: "bg-purple-700" },
  { name: "Starstruck", color: "bg-pink-700" },
];

export default function UserProfileList() {
  const { data: session } = useSession();
  const { address, connectWallet, signer } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [canRedeem, setCanRedeem] = useState(false);
  const [streak, setStreak] = useState({ currentStreak: 0, maxStreak: 0 });
 
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/users?email=${session.user.email}`);
        const data = await res.json();
        setProfile({ ...data.profile, nfts: data.profile.nfts || [] });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);
useEffect(() => { 
    const fetchStreak = async () => {
      if (!profile?.github) return;

      try {
        const res = await fetch(`/api/github?username=${profile.github}` , {
           method :"POST"
        });
        const data = await res.json();
        setStreak(data);
      } catch (err) {
        console.error("Failed to fetch streak:", err);
      }
    };

    fetchStreak();
  }
, [profile]);


  useEffect(() => {
    if (profile) {
      setCanRedeem((profile.streak === 30 || profile.streak === 50) && !profile.badgeClaimed);
    }
  }, [profile]);

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

  const remainingForNextNFT = 5 - (profile.streak % 5);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center py-12 px-2">
        <div className="w-full max-w-6xl ">
          <div className="flex flex-col md:flex-row gap-4 py-4">
            {/* User Profile */}
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
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" title="GitHub">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="..." />
                  </svg>
                </a>
                <a href={profile.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400" title="LeetCode">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="..." />
                  </svg>
                </a>
              </div>
              <div className="bg-gray-800 rounded-lg px-3 py-1 text-xs text-gray-300 mb-2">
                {profile.collegeName} | Semester {profile.semester}
              </div>

              <div className="mt-4">
                <p>GitHub Streak: {streak.currentStreak} days</p>
                <p>Max Streak: {streak.maxStreak} days</p>
                {canRedeem && (
                  address
                    ? <button
                        onClick={() => redeemBadge(profile.streak, signer!)}
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Redeem Badge
                      </button>
                    : <button
                        onClick={connectWallet}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Connect Wallet to Redeem
                      </button>
                )}
              </div>
            </div>

            {/* Badges & NFTs Section */}
            <div className="flex-1 bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800 grid grid-cols-2 gap-6">
              {/* Badges */}
              <div className="flex flex-col">
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

              {/* NFTs */}
              <div className="flex flex-col">
                <div className="w-full flex items-center gap-3 mb-4">
                  <div className="w-2 h-8 bg-gradient-to-b from-teal-400 to-teal-700 rounded-full" />
                  <h2 className="text-2xl font-bold text-teal-300 tracking-tight">
                    My NFTs
                  </h2>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  NFTs you've earned through your contributions.
                </p>
                <div className="flex flex-wrap gap-2 mb-2 max-h-32 overflow-auto">
                   (
                    <p className="text-xs text-gray-500">No NFTs earned yet.</p>
                  )
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  NFTs will appear here once you reach the required streaks.
                </p>
              </div>
            </div>
          </div>

          {/* GitHub Heatmap & Streak Notice */}
          <div className="bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-800 mt-6">
            <div className="mb-4 text-center">
              <p className="text-lg font-medium">
                You need <span className="font-bold">{10 - streak.currentStreak}</span> more day{remainingForNextNFT > 1 ? 's' : ''} of streak to earn your next NFT!
              </p>
            </div>
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
              src={`https://ghchart.rshah.org/${profile.github.split("/").pop() || "username"}`}
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
