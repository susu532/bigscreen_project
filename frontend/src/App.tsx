import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import SurveyPage from './pages/SurveyPage'
import ResponsePage from './pages/ResponsePage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminQuestionsPage from './pages/admin/AdminQuestionsPage'
import AdminResponsesPage from './pages/admin/AdminResponsesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SurveyPage />} />
      <Route path="/response/:slug" element={<ResponsePage />} />
      <Route path="/administration" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHomePage />} />
        <Route path="questions" element={<AdminQuestionsPage />} />
        <Route path="responses" element={<AdminResponsesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
