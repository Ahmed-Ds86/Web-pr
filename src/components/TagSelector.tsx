import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag } from 'lucide-react'

const tags = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Mystery', 'Horror', 'Psychological', 'Supernatural', 'Historical', 'Mecha', 'Music', 'School Life', 'Seinen', 'Shoujo', 'Shounen']

const TagSelector: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [tagMode, setTagMode] = useState<'AND' | 'OR'>('OR')
  const navigate = useNavigate()

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleSearch = () => {
    const queryString = `tags=${selectedTags.join(',')}&mode=${tagMode}`
    navigate(`/manga?${queryString}`)
    setShowDropdown(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
      >
        <Tag size={20} />
        <span>Tags</span>
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10">
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <button
                onClick={() => setTagMode('AND')}
                className={`px-2 py-1 rounded transition duration-300 ${tagMode === 'AND' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'}`}
              >
                AND
              </button>
              <button
                onClick={() => setTagMode('OR')}
                className={`px-2 py-1 rounded transition duration-300 ${tagMode === 'OR' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'}`}
              >
                OR
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {tags.map(tag => (
                <label key={tag} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{tag}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSearch}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TagSelector