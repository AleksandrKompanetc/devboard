import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ProjectDetails from './pages/ProjectDetails'
import './App.css'

export default function App() {
  return (
    <div className='app-layout'>
      <Sidebar />

      <div className='app-layout__content'>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />
        </Routes>
      </div>
    </div>
  )
}
