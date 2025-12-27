import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
// import { AdminPage } from './pages/AdminPage'
// import { LoginPage } from './pages/LoginPage'
// import { ProtectedRoute } from './components/ProtectedRoute'
// import    <CMSContext.Provider value={{ content, updateSection, saveContent, isLoading: false }}> from '../types/cms';
// import { initialContent } from '../data/initialContent';
// import { supabase } from '../lib/supabase';

import { PreviewPage } from './pages/PreviewPage'
import { NewsPage } from './pages/NewsPage'
import { NewsDetailPage } from './pages/NewsDetailPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Admin and Auth routes disabled temporarily
        <Route path="/login" element={<LoginPage />} />
        */}
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        
        {/*
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        */}
      </Routes>
    </Router>
  )
}

export default App
