import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Forgot from './pages/Forgot.jsx'
import Otp from './pages/Otp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Notifications from './pages/Notifications.jsx'
import Profile from './pages/Profile.jsx'
import PremiumBusinessCard from './pages/PremiumBusinessCard.jsx'
import Orders from './pages/Orders.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Customers from './pages/Customers.jsx'
import Vendors from './pages/Vendors.jsx'
import VendorOnboarding from './pages/VendorOnboarding.jsx'
import Staff from './pages/Staff.jsx'
import Referral from './pages/Referral.jsx'
import Promotions from './pages/Promotions.jsx';
import Support from './pages/Support.jsx';
import Reports from './pages/Reports.jsx';
import Accounts from './pages/Accounts.jsx'
import Settings from './pages/Settings.jsx'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import "./index.css"

function AppContent() {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const showAdminLayout = !['/login', '/forgot', '/otp', '/add-product', '/vendor-onboarding'].includes(location.pathname)

  return (
    <div className={`min-h-screen w-full flex bg-[#F8FAFC] ${darkMode ? 'dark' : ''} transition-colors duration-300 font-sans`}>
      {showAdminLayout && (
        <Sidebar
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
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/premium-business-card" element={<PremiumBusinessCard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/support" element={<Support />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/settings" element={<Settings />} />
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
