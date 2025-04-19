/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserRegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    collegeName: '',
    semester: '',
    github: '',
    leetcode: '',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          semester: Number(formData.semester),
        }),
      })

      const data = await res.json()
      setMessage(data.message || 'User created')
      setShowModal(true)

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        setShowModal(false)
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      setMessage('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['email', 'password', 'firstName', 'lastName', 'collegeName', 'semester', 'github', 'leetcode'].map(field => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(formData as any)[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>

        {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-2">🎉 Thank you!</h2>
            <p className="text-gray-700">Your profile has been created.</p>
            <p className="text-sm mt-2 text-gray-500">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  )
}
