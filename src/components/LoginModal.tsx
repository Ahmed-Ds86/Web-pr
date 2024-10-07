import React, { useState } from 'react'
import { useUser } from '../contexts/UserContext'
import { motion } from 'framer-motion'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, createAccount, loginWithGoogle } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    try {
      setError(null)
      await login(email, password)
      onClose()
    } catch (error: any) {
      console.error('Login failed:', error)
      setError(error.message || 'An error occurred during login. Please try again.')
    }
  }

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    try {
      setError(null)
      await createAccount(email, password)
      onClose()
    } catch (error: any) {
      console.error('Account creation failed:', error)
      setError(error.message || 'An error occurred during account creation. Please try again.')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setError(null)
      await loginWithGoogle()
      onClose()
    } catch (error: any) {
      console.error('Google login failed:', error)
      if (error.code === 'auth/popup-blocked') {
        setError('The login popup was blocked. Please enable popups for this site and try again.')
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('The login process was cancelled. Please try again.')
      } else {
        setError('An error occurred during Google login. Please try again later.')
      }
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {isCreatingAccount ? 'Create Account' : 'Login'}
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {isCreatingAccount && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
        )}
        <button
          onClick={isCreatingAccount ? handleCreateAccount : handleLogin}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mb-2"
        >
          {isCreatingAccount ? 'Create Account' : 'Login'}
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 mb-2"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => setIsCreatingAccount(!isCreatingAccount)}
          className="w-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-300 mb-2"
        >
          {isCreatingAccount ? 'Back to Login' : 'Create New Account'}
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-300"
        >
          Cancel
        </button>
      </motion.div>
    </motion.div>
  )
}

export default LoginModal