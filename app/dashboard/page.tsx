'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface UserProfile {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
  collegeName: string
  semester: number
  github: string
  leetcode: string
}

export default function UserProfileList() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return

      try {
        const res = await fetch(`/api/users?email=${session.user.email}`)
        const data = await res.json()
        setProfile(data.profile)
      } catch (err) {
        console.error('Failed to fetch profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [session])

  if (loading) return <div>Loading...</div>
  if (!profile) return <div>No profile found.</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Profile</h1>
      <div className="border p-4 mb-2 rounded shadow">
        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>College:</strong> {profile.collegeName}</p>
        <p><strong>Semester:</strong> {profile.semester}</p>
        <p><strong>GitHub:</strong> <a href={profile.github} className="text-blue-500" target="_blank">{profile.github}</a></p>
        <p><strong>LeetCode:</strong> <a href={profile.leetcode} className="text-blue-500" target="_blank">{profile.leetcode}</a></p>
      </div>
    </div>
  )
}
