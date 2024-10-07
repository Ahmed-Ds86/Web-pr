import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { BookOpen, Star, Tag } from 'lucide-react'

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock manga data
  const mangaData = {
    title: `Manga Title ${id}`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    ratingCount: 1234,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tags: ['Action', 'Adventure', 'Fantasy'],
    chapterCount: Math.floor(Math.random() * 100) + 1,
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={`https://source.unsplash.com/random/300x400?manga&sig=${id}`} alt={mangaData.title} className="w-full md:w-64 h-96 object-cover rounded-lg" />
        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{mangaData.title}</h1>
          <div className="flex items-center mb-4">
            <Star className="text-yellow-400 mr-1" />
            <span className="font-semibold text-gray-900 dark:text-white">{mangaData.rating}</span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">({mangaData.ratingCount} ratings)</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {mangaData.description}
          </p>
          <div className="flex items-center mb-4">
            <Tag className="mr-2 text-gray-600 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {mangaData.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${tag}`}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <BookOpen className="mr-2" />
            <span>Total Chapters: {mangaData.chapterCount}</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Chapters</h2>
      <div className="space-y-2">
        {[...Array(10)].map((_, index) => (
          <Link
            key={index}
            to={`/manga/${id}/chapter/${index + 1}`}
            className="block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-md transition duration-300 text-gray-900 dark:text-white"
          >
            Chapter {index + 1}: Chapter Title
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MangaDetail