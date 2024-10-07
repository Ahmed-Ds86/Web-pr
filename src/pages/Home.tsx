import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, TrendingUp, Tag, ThumbsUp } from 'lucide-react'

// Mock data for popular tags
const popularTags = ['Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Comedy', 'Drama', 'Slice of Life', 'Mystery']

// Mock data for recommended manga
const recommendedManga = [
  { id: 7, title: 'My Hero Academia', cover: 'https://source.unsplash.com/random/300x400?manga&sig=7' },
  { id: 8, title: 'Demon Slayer', cover: 'https://source.unsplash.com/random/300x400?manga&sig=8' },
  { id: 9, title: 'Tokyo Ghoul', cover: 'https://source.unsplash.com/random/300x400?manga&sig=9' },
]

const Home: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-3/4 space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <Clock className="mr-2" /> Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Replace with actual data */}
            {[1, 2, 3].map((id) => (
              <Link key={id} to={`/manga/${id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-md transition duration-300">
                <h3 className="font-semibold text-gray-900 dark:text-white">Manga Title {id}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chapter {Math.floor(Math.random() * 100) + 1}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <TrendingUp className="mr-2" /> Popular Manga
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Replace with actual data */}
            {[4, 5, 6].map((id) => (
              <Link key={id} to={`/manga/${id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-md transition duration-300">
                <h3 className="font-semibold text-gray-900 dark:text-white">Popular Manga {id}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {(Math.random() * 2 + 3).toFixed(1)}/5</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <aside className="md:w-1/4 space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <Tag className="mr-2" /> Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
            <ThumbsUp className="mr-2" /> Recommended Manga
          </h2>
          <div className="space-y-4">
            {recommendedManga.map((manga) => (
              <Link
                key={manga.id}
                to={`/manga/${manga.id}`}
                className="flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300"
              >
                <img src={manga.cover} alt={manga.title} className="w-16 h-24 object-cover rounded" />
                <h3 className="font-semibold text-gray-900 dark:text-white">{manga.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </div>
  )
}

export default Home