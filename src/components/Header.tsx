import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Search, Moon, Sun, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'
import TagSelector from './TagSelector'
import LoginModal from './LoginModal'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useUser()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/manga?search=${encodeURIComponent(searchTerm)}`)
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
        staggerChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 10,
      },
    },
  }

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen size={24} />
            <motion.span
              className="text-xl font-bold"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              {'MANGAVERSE AI'.split('').map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
              <li><Link to="/manga" className="hover:text-blue-200">Manga List</Link></li>
              <li>
                <button onClick={toggleTheme} className="hover:text-blue-200">
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </li>
              {user ? (
                <li className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-1 hover:text-blue-200"
                  >
                    <User size={20} />
                    <span>{user.displayName || user.email}</span>
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                      <Link to="/profile" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        Profile
                      </Link>
                      <Link to="/favorites" className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        Favorites
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li>
                  <button onClick={() => setShowLoginModal(true)} className="hover:text-blue-200">
                    Login
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search manga..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={20} className="text-gray-500 dark:text-gray-300" />
              </button>
            </div>
          </form>
          <TagSelector />
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  )
}

export default Header