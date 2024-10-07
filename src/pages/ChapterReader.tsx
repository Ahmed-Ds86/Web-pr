import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, List, Layers, Book } from 'lucide-react'

const ChapterReader: React.FC = () => {
  const { id, chapterId } = useParams<{ id: string; chapterId: string }>()
  const [showTOC, setShowTOC] = useState(false)
  const [viewMode, setViewMode] = useState<'webtoon' | 'manga'>('manga')
  const navigate = useNavigate()

  // Mock chapter data
  const totalPages = 20
  const [currentPage, setCurrentPage] = useState(1)
  const mangaTitle = "Sample Manga Title" // Replace with actual manga title

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'manga' ? 'webtoon' : 'manga'))
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <Link to={`/manga/${id}`} className="text-2xl font-bold hover:underline">
          {mangaTitle}
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleViewMode}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            {viewMode === 'manga' ? <Layers className="mr-2" /> : <Book className="mr-2" />}
            {viewMode === 'manga' ? 'Webtoon Mode' : 'Manga Mode'}
          </button>
          <button
            onClick={() => setShowTOC(!showTOC)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            <List className="mr-2" /> Table of Contents
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Chapter {chapterId}</h2>

      {viewMode === 'manga' && (
        <div className="text-center mb-4">
          Page {currentPage} of {totalPages}
        </div>
      )}

      <div className={`relative ${viewMode === 'webtoon' ? 'space-y-4' : ''}`}>
        {viewMode === 'webtoon' ? (
          // Webtoon mode: vertical scrolling
          [...Array(totalPages)].map((_, index) => (
            <img
              key={index}
              src={`https://source.unsplash.com/random/800x1200?manga&sig=${id}-${chapterId}-${index + 1}`}
              alt={`Chapter ${chapterId} Page ${index + 1}`}
              className="mx-auto max-w-full h-auto"
            />
          ))
        ) : (
          // Manga mode: single page view
          <div className="relative">
            <img
              src={`https://source.unsplash.com/random/800x1200?manga&sig=${id}-${chapterId}-${currentPage}`}
              alt={`Chapter ${chapterId} Page ${currentPage}`}
              className="mx-auto max-w-full h-auto"
            />

            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>

      {showTOC && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{mangaTitle} - Table of Contents</h2>
            <ul className="space-y-2">
              {[...Array(20)].map((_, index) => (
                <li key={index}>
                  <Link
                    to={`/manga/${id}/chapter/${index + 1}`}
                    className="block hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md text-gray-900 dark:text-white"
                    onClick={() => setShowTOC(false)}
                  >
                    Chapter {index + 1}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Action', 'Adventure', 'Fantasy'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      navigate(`/tags/${tag}`)
                      setShowTOC(false)
                    }}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowTOC(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChapterReader