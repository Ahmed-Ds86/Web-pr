import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tag } from 'lucide-react'

const MangaList: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('search') || ''
  const tags = searchParams.get('tags')?.split(',') || []
  const tagMode = searchParams.get('mode') || 'OR'

  // Mock function to filter manga based on search and tags
  const filterManga = (manga: any) => {
    if (searchTerm && !manga.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (tags.length > 0) {
      if (tagMode === 'AND') {
        return tags.every(tag => manga.genres.includes(tag))
      } else {
        return tags.some(tag => manga.genres.includes(tag))
      }
    }
    return true
  }

  // Mock manga data
  const mockManga = [
    { id: 1, title: 'Naruto', genres: ['Action', 'Adventure', 'Shounen'] },
    { id: 2, title: 'One Piece', genres: ['Action', 'Adventure', 'Comedy', 'Shounen'] },
    { id: 3, title: 'Attack on Titan', genres: ['Action', 'Dark Fantasy', 'Shounen'] },
    { id: 4, title: 'My Hero Academia', genres: ['Action', 'Superhero', 'Shounen'] },
    { id: 5, title: 'Death Note', genres: ['Mystery', 'Psychological', 'Thriller', 'Shounen'] },
    { id: 6, title: 'Fullmetal Alchemist', genres: ['Action', 'Adventure', 'Fantasy', 'Shounen'] },
  ]

  const filteredManga = mockManga.filter(filterManga)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Manga List</h1>
      
      {(searchTerm || tags.length > 0) && (
        <div className="mb-4 text-gray-700 dark:text-gray-300">
          {searchTerm && <p>Search results for: "{searchTerm}"</p>}
          {tags.length > 0 && (
            <p>Filtered by tags: {tags.join(', ')} ({tagMode} mode)</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredManga.map((manga) => (
          <Link key={manga.id} to={`/manga/${manga.id}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img src={`https://source.unsplash.com/random/300x200?manga&sig=${manga.id}`} alt={manga.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{manga.title}</h3>
              <div className="flex flex-wrap gap-2">
                {manga.genres.map((genre, index) => (
                  <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MangaList