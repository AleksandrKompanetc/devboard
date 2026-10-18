import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {

  return (
    <div className='app-layout'>
      <Sidebar />

      <div className='app-layout__content'>
        <Dashboard />
      </div>
    </div>
  )
}
