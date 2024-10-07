import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import MangaList from './pages/MangaList'
import MangaDetail from './pages/MangaDetail'
import ChapterReader from './pages/ChapterReader'
import TaggedMangaList from './pages/TaggedMangaList'
import UserProfile from './pages/UserProfile'
import Favorites from './pages/Favorites'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manga" element={<MangaList />} />
                <Route path="/manga/:id" element={<MangaDetail />} />
                <Route path="/manga/:id/chapter/:chapterId" element={<ChapterReader />} />
                <Route path="/tags/:tag" element={<TaggedMangaList />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App