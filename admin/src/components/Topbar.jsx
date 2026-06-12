import { Link } from 'react-router-dom'
import { FiMenu, FiSearch, FiBell, FiChevronDown } from 'react-icons/fi'

function Topbar({ setSidebarOpen }) {
  return (
    <header className="w-full h-[64px] px-8 bg-white border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
      {/* Left side: Hamburger (mobile) + Search bar */}
      <div className="flex items-center gap-4 flex-1 max-w-[420px]">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-slate-100"
        >
          <FiMenu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <FiSearch className="w-4 h-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search orders, products, customers..."
            className="w-full h-[40px] pl-11 pr-4 text-[13px] bg-[#F8FAFC] border border-gray-200 rounded-full focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans"
          />
        </div>
      </div>

      {/* Right side: Notification + Profile */}
      <div className="flex items-center gap-5 ml-4">
        <Link to="/notifications" className="relative p-2 text-gray-600 hover:text-black hover:bg-slate-50 rounded-full transition-colors cursor-pointer flex items-center justify-center">
          <FiBell className="w-[19px] h-[19px]" />
          <span className="absolute top-[8px] right-[8px] h-2 w-2 rounded-full bg-[#EF4444] border-2 border-white"></span>
        </Link>

        {/* Profile Wrapper */}
        <Link to="/profile" className="flex items-center gap-2.5 pl-3 border-l border-slate-150 cursor-pointer group">
          <div className="w-[32px] h-[32px] rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[13px] border border-slate-300">
            SJ
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[13px] font-semibold text-gray-900 leading-tight">Sarah J.</span>
            <span className="text-[10px] text-gray-400 font-medium">Super Admin</span>
          </div>
          <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
        </Link>
      </div>
    </header>
  )
}

export default Topbar
