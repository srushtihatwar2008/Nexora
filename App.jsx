import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import HarvestAdvice from './pages/HarvestAdvice'
import BestMarket from './pages/BestMarket'
import StorageHelp from './pages/StorageHelp'
import { LanguageProvider, useLanguage } from './hooks/useLanguage'

function AppContent() {
  const { language } = useLanguage()

  useEffect(() => {
    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <div className="app-container" data-language={language}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/harvest" element={<HarvestAdvice />} />
        <Route path="/market" element={<BestMarket />} />
        <Route path="/storage" element={<StorageHelp />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </Router>
  )
}
