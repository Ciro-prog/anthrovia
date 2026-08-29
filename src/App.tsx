import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LearningPage } from './pages/LearningPage'
import { CoursePage } from './pages/CoursePage'
import { NewsPage } from './pages/NewsPage'
import { NewsDetailPage } from './pages/NewsDetailPage'
import { ApplicationPage } from './pages/ApplicationPage'
import DossierPage from './pages/DossierPage'
import DossierModulesPage from './pages/DossierModulesPage'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capacitaciones" element={<LearningPage />} />
        <Route path="/capacitaciones/:slug" element={<CoursePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/postulacion" element={<ApplicationPage />} />
        <Route path="/dossier" element={<DossierPage />} />
        <Route path="/dossier/modulos" element={<DossierModulesPage />} />
      </Routes>
    </Router>
  )
}

export default App
