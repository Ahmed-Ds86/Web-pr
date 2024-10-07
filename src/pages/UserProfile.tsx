import React from 'react'
import { useUser } from '../contexts/UserContext'

const UserProfile: React.FC = () => {
  const { user } = useUser()

  if (!user) {
    return <div>Please log in to view your profile.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">User Profile</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Username:</label>
          <p className="text-gray-900 dark:text-white">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email:</label>
          <p className="text-gray-900 dark:text-white">{user.email}</p>
        </div>
        {/* Add more user information and preferences here */}
      </div>
    </div>
  )
}

export default UserProfile