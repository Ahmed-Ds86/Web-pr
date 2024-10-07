import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

// Mock favorite manga data
const mockFavorites = [
  { id: 1, title: 'Naruto', cover: 'https://source.unsplash.com/random/300x400?manga&sig=1' },
  { id: 2, title: 'One Piece', cover: 'https://source.unsplash.com/random/300x400?manga&sig=2' },
  { id: 3, title: 'Attack on Titan', cover: 'https://source.unsplash.com/random/300x400?manga&sig=3' },
]

const Favorites: React.FC = () => {
  const { user } = useUser()

  if (!user) {
    return <div>Please log in to view your favorites.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFavorites.map((manga) => (
          <Link key={manga.id} to={`/manga/${manga.id}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img src={manga.cover} alt={manga.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{manga.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Favorites