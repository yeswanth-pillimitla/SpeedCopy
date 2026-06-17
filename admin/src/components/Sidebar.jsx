import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  FiGrid,
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiUserCheck,
  FiBarChart2,
  FiSettings,
  FiX,
  FiLifeBuoy
} from 'react-icons/fi'
import {
  LuStore,
  LuWallet,
  LuMegaphone,
  LuTicket
} from 'react-icons/lu'

const menuItems = [
  { name: 'Dashboard', icon: FiGrid },
  { name: 'Products', icon: FiBox },
  { name: 'Customers', icon: FiUsers },
  { name: 'Orders', icon: FiShoppingCart },
  { name: 'Vendors', icon: LuStore },
  { name: 'Staff', icon: FiUserCheck },
  { name: 'Accounts', icon: LuWallet },
  { name: 'Support', icon: FiLifeBuoy },
  { name: 'Referral', icon: LuMegaphone },
  { name: 'Promotions', icon: LuTicket },
  { name: 'Reports', icon: FiBarChart2 },
  { name: 'Settings', icon: FiSettings },
]

function Sidebar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        w-[256px] h-screen bg-white border-r border-[#E2E8F0] flex flex-col justify-between z-50 overflow-hidden shrink-0
        fixed md:relative inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
      `}>

        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo Top Div (255.2px x 64px) */}
          <div className="w-full h-[64px] px-6 flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[22px] font-black text-black tracking-[-0.05em] font-sans">
                speedcopy
              </span>
              <img src="logo.jpg" alt="logo" className="w-[22px] h-[22px] object-contain" />
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-black">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Middle Div */}
          <nav className="w-full py-3 px-3 overflow-hidden flex-1 shrink-0 space-y-[2px]">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = (item.name === 'Dashboard' && location.pathname === '/dashboard') ||
                (item.name === 'Products' && ['/products', '/premium-business-card'].includes(location.pathname)) ||
                (item.name === 'Customers' && location.pathname === '/customers') ||
                (item.name === 'Orders' && location.pathname === '/orders') ||
                (item.name === 'Vendors' && location.pathname === '/vendors') ||
                (item.name === 'Staff' && location.pathname === '/staff') ||
                (item.name === 'Support' && location.pathname === '/support') ||
                (item.name === 'Referral' && location.pathname === '/referral') ||
                (item.name === 'Promotions' && location.pathname === '/promotions') ||
                (item.name === 'Reports' && location.pathname === '/reports')
              const btnClass = `
                w-full h-[36px] flex items-center px-3.5 rounded-[8px] text-[13px] font-medium transition-all duration-150 cursor-pointer
                ${isActive
                  ? 'bg-[#F1F5F9] text-black font-semibold shadow-sm'
                  : 'text-gray-500 hover:text-black hover:bg-gray-50'}
              `
              const innerContent = (
                <>
                  <IconComponent className={`w-[16px] h-[16px] mr-2.5 shrink-0 ${isActive ? 'text-black' : 'text-slate-450'}`} />
                  {item.name}
                </>
              )

              if (item.name === 'Dashboard' || item.name === 'Products' || item.name === 'Customers' || item.name === 'Orders' || item.name === 'Vendors' || item.name === 'Staff' || item.name === 'Support' || item.name === 'Referral' || item.name === 'Promotions' || item.name === 'Reports') {
                const path = item.name === 'Dashboard'
                  ? '/dashboard'
                  : item.name === 'Products'
                    ? '/products'
                    : item.name === 'Customers'
                      ? '/customers'
                      : item.name === 'Orders'
                        ? '/orders'
                        : item.name === 'Vendors'
                          ? '/vendors'
                          : item.name === 'Support'
                            ? '/support'
                            : item.name === 'Referral'
                              ? '/referral'
                              : item.name === 'Promotions'
                                ? '/promotions'
                                : item.name === 'Reports'
                                  ? '/reports'
                                  : '/staff'
                return (
                  <Link
                    key={item.name}
                    to={path}
                    onClick={() => setSidebarOpen(false)}
                    className={btnClass}
                  >
                    {innerContent}
                  </Link>
                )
              }

              return (
                <button
                  key={item.name}
                  onClick={() => setSidebarOpen(false)}
                  className={btnClass}
                >
                  {innerContent}
                </button>
              )
            })}
          </nav>
        </div>

        {/* System Status Div */}
        <div className="p-4 border-t border-[#E2E8F0] bg-white shrink-0 w-full">
          {/* System Status Card */}
          <div className="bg-[#F8FAFC] rounded-[12px] p-4 flex flex-col gap-2.5 border border-slate-100 shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold leading-none">SYSTEM STATUS</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[12px] text-slate-600 font-semibold leading-none">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Dark Mode Card Section */}
        {['/dashboard', '/notifications', '/profile'].includes(location.pathname) && (
          <div className="p-4 pt-0 bg-white shrink-0 w-full">
            <div className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-[12px] shadow-sm">
              <span className="text-[13px] font-bold text-slate-800">Dark Mode</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`
                  w-[40px] h-[22px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none cursor-pointer relative flex items-center
                  ${darkMode ? 'bg-black' : 'bg-slate-200'}
                `}
              >
                <div
                  className={`
                    bg-white w-[18px] h-[18px] rounded-full shadow-sm transform transition-transform duration-300
                    ${darkMode ? 'translate-x-[18px]' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Sidebar
