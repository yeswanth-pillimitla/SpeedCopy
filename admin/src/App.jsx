import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Forgot from './pages/Forgot.jsx'
import Otp from './pages/Otp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Notifications from './pages/Notifications.jsx'
import Profile from './pages/Profile.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import "./index.css"

function AppContent() {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Dashboard')

  const showAdminLayout = !['/login', '/forgot', '/otp'].includes(location.pathname)

  return (
    <div className={`min-h-screen w-full flex bg-[#F8FAFC] ${darkMode ? 'dark' : ''} transition-colors duration-300 font-sans`}>
      {showAdminLayout && (
        <Sidebar 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
      )}
      
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {showAdminLayout && (
          <Topbar setSidebarOpen={setSidebarOpen} />
        )}
        
        <main className="flex-1 overflow-y-auto pb-8">
          <div className={showAdminLayout ? "w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-10 pt-5 flex flex-col gap-6" : ""}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;
