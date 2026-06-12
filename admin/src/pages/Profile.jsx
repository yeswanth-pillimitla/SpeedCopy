import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowLeft, 
  FiMapPin, 
  FiCheck, 
  FiMonitor, 
  FiSmartphone, 
  FiUser, 
  FiRefreshCw, 
  FiVolume2, 
  FiAlertTriangle,
  FiShield,
  FiX,
  FiCamera,
  FiEdit2
} from 'react-icons/fi'

// Custom Toggle Component (Blue color when active, with white check icon)
function Toggle({ active, onChange }) {
  return (
    <button 
      type="button"
      onClick={onChange}
      className={`w-[44px] h-[24px] rounded-full p-[2px] transition-colors relative flex items-center cursor-pointer shrink-0 outline-none ${
        active ? 'bg-[#3B28CC]' : 'bg-gray-200'
      }`}
    >
      <motion.div 
        layout
        className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center shadow-sm"
        animate={{ x: active ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {active && <FiCheck className="w-3 h-3 text-[#3B28CC] stroke-[3]" />}
      </motion.div>
    </button>
  )
}

function Profile() {
  // Personal Info States
  const [isEditing, setIsEditing] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@enterprise.corp',
    phone: '+1 (555) 019-2834',
    timezone: 'PST (UTC-8)'
  })
  const [avatarUrl, setAvatarUrl] = useState('/alex.jpg')
  const [imageError, setImageError] = useState(false)

  // Temp states during editing (commits only on Save)
  const [tempPersonalInfo, setTempPersonalInfo] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@enterprise.corp',
    phone: '+1 (555) 019-2834',
    timezone: 'PST (UTC-8)'
  })
  const [tempAvatarUrl, setTempAvatarUrl] = useState('/alex.jpg')

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      if (isEditing) {
        setTempAvatarUrl(url)
      } else {
        setTempAvatarUrl(url)
        setAvatarUrl(url)
      }
      setImageError(false)
    }
  }

  // Notifications Toggles
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    updates: true
  })

  // Sessions State
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro 16"',
      location: 'Seattle, WA • 192.168.1.1',
      status: 'Current Session',
      isCurrent: true,
      icon: FiMonitor
    },
    {
      id: 2,
      device: 'iPhone 14 Pro',
      location: 'Seattle, WA • Mobile Data',
      status: 'Last active 2h ago',
      isCurrent: false,
      icon: FiSmartphone
    }
  ])

  // Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Edit / Save Profile toggle
  const handleEditProfileToggle = () => {
    if (isEditing) {
      // Save changes
      setPersonalInfo({ ...tempPersonalInfo })
      setAvatarUrl(tempAvatarUrl)
      setIsEditing(false)
    } else {
      // Enter edit mode (sync temp state with official state)
      setTempPersonalInfo({ ...personalInfo })
      setTempAvatarUrl(avatarUrl)
      setIsEditing(true)
    }
  }

  // Logout other devices
  const handleLogoutAllDevices = () => {
    // Keeps only the current session
    setSessions(prev => prev.filter(s => s.isCurrent))
  }

  // Handle password submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      setPasswordSuccess(true)
      setTimeout(() => {
        setPasswordSuccess(false)
        setShowPasswordModal(false)
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }, 1500)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex flex-col gap-6"
    >
      {/* DIV 1: HEADER SECTION */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full h-auto md:h-[80px] pb-2 flex flex-col justify-end text-left border-b border-transparent"
      >
        <Link to="/dashboard" className="flex items-center gap-1.5 text-[12px] font-bold text-gray-500 hover:text-black transition-colors mb-2 cursor-pointer w-fit">
          <FiArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-[30px] font-bold text-gray-900 tracking-tight leading-tight font-sans">
          Administrator Profile
        </h1>
        <p className="text-[13px] text-gray-400 font-medium leading-none mt-1.5">
          Manage your personal information and security preferences.
        </p>
      </motion.div>

      {/* DIV 2: PROFILE OVERVIEW CARD */}
      <div className="w-full md:h-[146px] p-6 bg-white border border-[#C7C4D8] rounded-[15px] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-left w-full sm:w-auto">
          {/* Hidden File Input */}
          <input 
            type="file" 
            id="profile-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleAvatarChange}
          />
          
          {/* Circular avatar wrapper to handle relative positioning for absolute edit badge */}
          <div className="relative shrink-0 select-none">
            <button
              type="button"
              onClick={() => document.getElementById('profile-upload').click()}
              className="w-[84px] h-[84px] rounded-full border border-[#C7C4D8] overflow-hidden bg-slate-100 flex items-center justify-center relative outline-none cursor-pointer hover:border-[#3B28CC] transition-colors group/avatar font-sans"
            >
              {imageError ? (
                <div className="text-[28px] font-bold text-slate-500 select-none">
                  {personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              ) : (
                <img 
                  src={isEditing ? tempAvatarUrl : avatarUrl} 
                  alt={personalInfo.fullName} 
                  className="w-full h-full object-cover" 
                  onError={() => setImageError(true)}
                />
              )}
            </button>
            
            {/* Edit Symbol on circle line at bottom-right */}
            <button
              type="button"
              onClick={() => document.getElementById('profile-upload').click()}
              className="absolute bottom-0 right-0 w-[26px] h-[26px] rounded-full bg-white border border-[#C7C4D8] flex items-center justify-center text-gray-700 shadow-md cursor-pointer hover:border-[#3B28CC] hover:text-[#3B28CC] transition-colors z-10 outline-none"
            >
              <FiEdit2 className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col">
            <h2 className="text-[22px] font-bold text-gray-955 tracking-tight leading-tight font-sans">
              {personalInfo.fullName}
            </h2>
            <span className="text-[14px] text-gray-500 font-semibold mt-0.5">
              Senior Administrator
            </span>
            <div className="flex items-center gap-1 text-[13px] text-gray-400 font-medium mt-1.5">
              <FiMapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>Seattle, WA (HQ)</span>
            </div>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEditProfileToggle}
          className="h-[38px] px-5 bg-white border border-[#C7C4D8] rounded-[8px] text-[13px] font-bold text-gray-800 hover:bg-gray-50 transition-all cursor-pointer select-none"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </div>

      {/* DIV 3: PROFILE DETAILS GRID */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARD 1: PERSONAL INFORMATION */}
        <div className="col-span-1 lg:col-span-5 bg-white border border-[#C7C4D8] rounded-[15px] p-6 flex flex-col gap-6 text-left">
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
              Personal Information
            </h3>
            <div className="w-full h-[1px] bg-[#E2E8F0] mt-3" />
          </div>

          <div className="flex flex-col gap-5">
            {/* FULL NAME */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
                Full Name
              </label>
              <input 
                type="text" 
                disabled={!isEditing}
                value={isEditing ? tempPersonalInfo.fullName : personalInfo.fullName}
                onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, fullName: e.target.value})}
                className={`w-full h-[40px] px-3.5 text-[13px] font-medium rounded-[8px] border outline-none transition-all ${
                  isEditing 
                    ? 'bg-white border-[#3B28CC] focus:ring-1 focus:ring-[#3B28CC]' 
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-gray-900 cursor-not-allowed'
                }`}
              />
            </div>

            {/* EMAIL ADDRESS */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
                Email Address
              </label>
              <div className="relative w-full">
                <input 
                  type="email" 
                  disabled={!isEditing}
                  value={isEditing ? tempPersonalInfo.email : personalInfo.email}
                  onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, email: e.target.value})}
                  className={`w-full h-[40px] pl-3.5 pr-10 text-[13px] font-medium rounded-[8px] border outline-none transition-all ${
                    isEditing 
                      ? 'bg-white border-[#3B28CC] focus:ring-1 focus:ring-[#3B28CC]' 
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-gray-900 cursor-not-allowed'
                  }`}
                />
                <span className="absolute inset-y-0 right-3.5 flex items-center">
                  <FiCheck className="w-[15px] h-[15px] text-[#3B28CC] stroke-[3]" />
                </span>
              </div>
            </div>

            {/* PHONE NUMBER */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
                Phone Number
              </label>
              <input 
                type="text" 
                disabled={!isEditing}
                value={isEditing ? tempPersonalInfo.phone : personalInfo.phone}
                onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, phone: e.target.value})}
                className={`w-full h-[40px] px-3.5 text-[13px] font-medium rounded-[8px] border outline-none transition-all ${
                  isEditing 
                    ? 'bg-white border-[#3B28CC] focus:ring-1 focus:ring-[#3B28CC]' 
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-gray-900 cursor-not-allowed'
                }`}
              />
            </div>

            {/* TIMEZONE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
                Timezone
              </label>
              <input 
                type="text" 
                disabled={!isEditing}
                value={isEditing ? tempPersonalInfo.timezone : personalInfo.timezone}
                onChange={(e) => setTempPersonalInfo({...tempPersonalInfo, timezone: e.target.value})}
                className={`w-full h-[40px] px-3.5 text-[13px] font-medium rounded-[8px] border outline-none transition-all ${
                  isEditing 
                    ? 'bg-white border-[#3B28CC] focus:ring-1 focus:ring-[#3B28CC]' 
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-gray-900 cursor-not-allowed'
                }`}
              />
            </div>
          </div>
        </div>

        {/* CARD 2: SECURITY SETTINGS */}
        <div className="col-span-1 lg:col-span-7 bg-white border border-[#C7C4D8] rounded-[15px] p-6 flex flex-col gap-6 text-left">
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
              Security Settings
            </h3>
            <div className="w-full h-[1px] bg-[#E2E8F0] mt-3" />
          </div>

          {/* Authentication Box */}
          <div className="bg-[#F8FAFC] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#E2E8F0]">
            <div className="flex flex-col text-left">
              <h4 className="text-[14px] font-bold text-gray-900 leading-tight">
                Authentication
              </h4>
              <p className="text-[12px] text-gray-400 font-semibold mt-1">
                Manage your password and multi-factor methods.
              </p>
            </div>
            
            <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A] leading-none">
                <FiShield className="w-3 h-3 fill-current" />
                2FA Active
              </span>
              
              <button 
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="h-[32px] px-3.5 bg-white border border-[#C7C4D8] text-gray-800 hover:bg-gray-50 text-[12px] font-bold rounded-[8px] transition-colors cursor-pointer select-none"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Active Sessions Section */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex justify-between items-center">
              <h4 className="text-[14px] font-bold text-gray-900">
                Active Sessions
              </h4>
              {sessions.length > 1 && (
                <button 
                  onClick={handleLogoutAllDevices}
                  className="text-[12px] text-[#DC2626] font-bold hover:underline cursor-pointer select-none bg-transparent border-none outline-none"
                >
                  Log out all devices
                </button>
              )}
            </div>

            {/* Session Table */}
            <div className="w-full border border-[#E2E8F0] rounded-[12px] overflow-hidden">
              <table className="w-full text-[13px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-[#E2E8F0] text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-bold">Device</th>
                    <th className="py-2.5 px-4 font-bold">Location</th>
                    <th className="py-2.5 px-4 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {sessions.map(session => {
                    const Icon = session.icon
                    return (
                      <tr key={session.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <Icon className="w-4 h-4 text-gray-450 shrink-0" />
                          <span className="font-bold text-gray-900">{session.device}</span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 font-medium">
                          {session.location}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className={`font-bold ${
                            session.isCurrent ? 'text-[#3B28CC]' : 'text-gray-400'
                          }`}>
                            {session.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CARD 3: NOTIFICATION SETTINGS */}
        <div className="col-span-1 lg:col-span-4 bg-white border border-[#C7C4D8] rounded-[15px] p-6 flex flex-col gap-6 text-left">
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
              Notifications
            </h3>
            <div className="w-full h-[1px] bg-[#E2E8F0] mt-3" />
          </div>

          <div className="flex flex-col flex-1 justify-around pt-4 pb-2">
            {/* Email Notifications */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-950 leading-tight">
                  Email Notifications
                </span>
                <span className="text-[11px] text-gray-400 font-medium leading-tight mt-1 max-w-[180px]">
                  Daily summaries and critical alerts.
                </span>
              </div>
              <Toggle 
                active={notifications.email} 
                onChange={() => setNotifications({...notifications, email: !notifications.email})} 
              />
            </div>

            {/* Desktop Alerts */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-950 leading-tight">
                  Desktop Alerts
                </span>
                <span className="text-[11px] text-gray-400 font-medium leading-tight mt-1 max-w-[180px]">
                  Push notifications in browser.
                </span>
              </div>
              <Toggle 
                active={notifications.desktop} 
                onChange={() => setNotifications({...notifications, desktop: !notifications.desktop})} 
              />
            </div>

            {/* System Updates */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-gray-950 leading-tight">
                  System Updates
                </span>
                <span className="text-[11px] text-gray-400 font-medium leading-tight mt-1 max-w-[180px]">
                  Maintenance and version releases.
                </span>
              </div>
              <Toggle 
                active={notifications.updates} 
                onChange={() => setNotifications({...notifications, updates: !notifications.updates})} 
              />
            </div>
          </div>
        </div>

        {/* CARD 4: RECENT ACTIVITY LOG */}
        <div className="col-span-1 lg:col-span-8 bg-white border border-[#C7C4D8] rounded-[15px] p-6 flex flex-col gap-4 text-left">
          <div className="flex justify-between items-center">
            <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
              Recent Activity Log
            </h3>
            <button className="text-[12px] text-[#3B28CC] font-bold hover:underline cursor-pointer select-none bg-transparent border-none">
              View Full Log
            </button>
          </div>
          <div className="w-full h-[1px] bg-[#E2E8F0] mt-0.5" />

          {/* Activity Log Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Target / Source</th>
                  <th className="py-2.5 px-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {/* User Profile Updated */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#EEF2FF] text-[#3B28CC] flex items-center justify-center shrink-0">
                      <FiUser className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-gray-900">User Profile Updated</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[12px] text-gray-500 font-semibold">
                    user_id: john.doe
                  </td>
                  <td className="py-3 px-3 text-right text-gray-400 font-semibold">
                    Today, 14:23 PST
                  </td>
                </tr>

                {/* System Update Applied */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                      <FiRefreshCw className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-gray-900">System Update Applied</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[12px] text-gray-500 font-semibold">
                    version: 4.2.0-stable
                  </td>
                  <td className="py-3 px-3 text-right text-gray-400 font-semibold">
                    Yesterday, 02:00 PST
                  </td>
                </tr>

                {/* Security Banner Created */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                      <FiVolume2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-gray-900">Security Banner Created</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[12px] text-gray-500 font-semibold">
                    banner_id: sec_alert_99
                  </td>
                  <td className="py-3 px-3 text-right text-gray-400 font-semibold">
                    Oct 24, 09:15 PST
                  </td>
                </tr>

                {/* Failed Login Attempt */}
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
                      <FiAlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-gray-900">Failed Login Attempt</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[12px] text-gray-500 font-semibold">
                    ip: 104.28.19.44
                  </td>
                  <td className="py-3 px-3 text-right text-gray-400 font-semibold">
                    Oct 23, 23:45 PST
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="absolute inset-0 bg-black"
            />
            
            {/* Modal Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-[420px] bg-white rounded-[16px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-[#C7C4D8] p-6 z-10 text-left"
            >
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer bg-transparent border-none"
              >
                <FiX className="w-5 h-5" />
              </button>
              
              <h3 className="text-[16px] font-bold text-gray-950 tracking-tight pr-8">
                Change Password
              </h3>
              <p className="text-[12px] text-gray-400 font-semibold mt-1">
                Enter your current password and set a new one.
              </p>

              {passwordSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-[10px] text-[13px] font-semibold text-center"
                >
                  Password updated successfully!
                </motion.div>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 mt-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
                      Current Password
                    </label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="w-full h-[38px] px-3.5 text-[13px] font-medium rounded-[8px] border border-[#E2E8F0] outline-none focus:border-[#3B28CC] focus:ring-1 focus:ring-[#3B28CC]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
                      New Password
                    </label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="w-full h-[38px] px-3.5 text-[13px] font-medium rounded-[8px] border border-[#E2E8F0] outline-none focus:border-[#3B28CC] focus:ring-1 focus:ring-[#3B28CC]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
                      Confirm New Password
                    </label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="w-full h-[38px] px-3.5 text-[13px] font-medium rounded-[8px] border border-[#E2E8F0] outline-none focus:border-[#3B28CC] focus:ring-1 focus:ring-[#3B28CC]"
                    />
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <button 
                      type="submit"
                      className="flex-1 h-[36px] bg-[#3B28CC] text-white hover:bg-[#2F20A8] text-[13px] font-bold rounded-[8px] transition-colors cursor-pointer select-none"
                    >
                      Update Password
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowPasswordModal(false)}
                      className="flex-1 h-[36px] bg-white border border-[#C7C4D8] text-gray-700 hover:bg-gray-50 text-[13px] font-bold rounded-[8px] transition-colors cursor-pointer select-none"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Profile
