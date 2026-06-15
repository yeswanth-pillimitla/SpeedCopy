import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiCheckCircle, 
  FiUserPlus, 
  FiSettings,
  FiArrowLeft
} from 'react-icons/fi'
import { LuCheckCheck } from 'react-icons/lu'
import { MdOutlineSystemUpdate } from 'react-icons/md'
import { TbShieldExclamation } from "react-icons/tb";

const initialNotifications = [
  {
    id: 1,
    type: 'security',
    title: 'New Security Vulnerability Detected',
    time: '2 mins ago',
    description: 'Critical severity vulnerability (CVE-2023-4567) detected in core services cluster. Immediate patching required to prevent unauthorized access.',
    read: false,
    category: 'Security',
    leftBorderColor: 'border-l-[#DC2626]',
    iconBg: 'bg-[#FEE2E2]',
    iconColor: 'text-[#DC2626]',
    icon: TbShieldExclamation,
    buttons: [
      { text: 'View Details', primary: true, type: 'danger' },
      { text: 'Dismiss', primary: false, action: 'dismiss' }
    ]
  },
  {
    id: 2,
    type: 'task',
    title: 'Payroll Approval Required',
    time: '1 hour ago',
    description: 'Pending approval for Q3 Departmental Payroll batch #8829. Total amount: $1.2M. Deadline in 4 hours.',
    read: false,
    category: 'Tasks',
    leftBorderColor: 'border-l-[#3B28CC]',
    iconBg: 'bg-[#EEF2FF]',
    iconColor: 'text-[#3B28CC]',
    icon: FiCheckCircle,
    buttons: [
      { text: 'Approve Batch', primary: true, type: 'primary' },
      { text: 'Review Details', primary: false }
    ]
  },
  {
    id: 3,
    type: 'update',
    title: 'System Update Scheduled',
    time: 'Yesterday, 4:30 PM',
    description: 'Routine maintenance and database optimization scheduled for Sunday at 02:00 AM UTC. Expected downtime: 15 minutes.',
    read: false,
    category: 'Update',
    leftBorderColor: '',
    iconBg: 'bg-[#F1F5F9]',
    iconColor: 'text-[#64748B]',
    icon: MdOutlineSystemUpdate,
    buttons: [
      { text: 'View Schedule', primary: false }
    ]
  },
  {
    id: 4,
    type: 'access',
    title: 'New Admin Access Request',
    time: '2 hours ago',
    description: "Sarah Jenkins (Engineering) has requested 'Super Admin' privileges for project deployment.",
    read: false,
    category: 'Tasks',
    leftBorderColor: 'border-l-[#3B28CC]',
    iconBg: 'bg-[#EEF2FF]',
    iconColor: 'text-[#3B28CC]',
    icon: FiUserPlus,
    buttons: [
      { text: 'Review Request', primary: true, type: 'primary' }
    ]
  }
]

function Notifications() {
  useEffect(() => {
    document.title = 'Notification Center -SpeedCopy'
  }, [])

  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState('All')

  // Handler to mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  // Handler to dismiss/remove a specific notification card
  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'All') return true
    if (activeTab === 'Unread') return !n.read
    if (activeTab === 'Tasks') return n.category === 'Tasks'
    if (activeTab === 'Security') return n.category === 'Security'
    return true
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    },
    exit: { 
      opacity: 0, 
      x: -50, 
      transition: { 
        duration: 0.2 
      } 
    }
  }

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Unread', label: 'Unread', badge: unreadCount },
    { id: 'Tasks', label: 'Tasks' },
    { id: 'Security', label: 'Security' }
  ]

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
        className="w-full h-auto md:h-[80px] pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-transparent"
      >
        <div className="flex flex-col text-left">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-[12px] font-bold text-gray-500 hover:text-black transition-colors mb-2 cursor-pointer">
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-[30px] font-bold text-gray-900 tracking-tight leading-tight font-sans">
            Notification Center
          </h1>
          <p className="text-[13px] text-gray-400 font-medium leading-none mt-1.5">
            Manage alerts, tasks, and system events.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMarkAllAsRead}
            className="h-[38px] px-4 bg-white border border-[#C7C4D8] rounded-[8px] text-[13px] font-semibold text-gray-800 hover:bg-gray-50 flex items-center gap-2 transition-all cursor-pointer"
          >
            <LuCheckCheck className="w-[18px] h-[18px] text-gray-750" />
            <span>Mark all as read</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-[38px] h-[38px] bg-white border border-[#C7C4D8] rounded-[8px] flex items-center justify-center text-gray-850 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <FiSettings className="w-[17px] h-[17px]" />
          </motion.button>
        </div>
      </motion.div>

      {/* DIV 2: FILTER TAB SECTION */}
      <div className="w-full border-b border-[#C7C4D8] flex items-center">
        <div className="flex gap-6 h-[31px] relative">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-2 text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive ? 'text-[#3B28CC]' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="w-[18px] h-[18px] rounded-full bg-[#3B28CC] text-white text-[10px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B28CC]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* DIV 3: NOTIFICATION LIST SECTION */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map(notification => {
            const Icon = notification.icon
            const isRed = notification.type === 'security'
            const isPurple = notification.type === 'task' || notification.type === 'access'

            return (
              <motion.div
                key={notification.id}
                variants={cardVariants}
                exit="exit"
                layout
                className={`w-full md:h-[208px] p-6 bg-white border border-[#C7C4D8] rounded-[12px] flex gap-5 transition-shadow hover:shadow-sm text-left relative ${
                  notification.leftBorderColor ? `border-l-[4px] ${notification.leftBorderColor}` : ''
                }`}
              >
                {/* Left Side: Icon */}
                <div className="shrink-0">
                  <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center ${notification.iconBg} ${notification.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Right Side: Content Area */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Top Row: Title & Time */}
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-[15px] font-bold text-gray-950 tracking-tight leading-tight font-sans">
                        {notification.title}
                      </h3>
                      <span className="text-[11px] text-gray-400 font-semibold whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>

                    {/* Middle Row: Description */}
                    <p className="text-[13px] text-gray-500 font-medium leading-relaxed mt-2.5 max-w-[720px]">
                      {notification.description}
                    </p>
                  </div>

                  {/* Bottom Row: Action Buttons */}
                  {notification.buttons && notification.buttons.length > 0 && (
                    <div className="flex items-center gap-3 mt-4">
                      {notification.buttons.map((btn, idx) => {
                        if (btn.primary) {
                          const bgClass = btn.type === 'danger' 
                            ? 'bg-[#B21E1E] hover:bg-[#991B1B]' 
                            : 'bg-[#3B28CC] hover:bg-[#2F20A8]'
                          return (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`h-[38px] px-4 ${bgClass} text-white text-[13px] font-bold rounded-[8px] transition-colors cursor-pointer`}
                            >
                              {btn.text}
                            </motion.button>
                          )
                        } else {
                          return (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                if (btn.action === 'dismiss') {
                                  handleDismiss(notification.id)
                                }
                              }}
                              className="h-[38px] px-4 bg-white border border-[#C7C4D8] text-gray-700 hover:bg-gray-50 text-[13px] font-bold rounded-[8px] transition-colors cursor-pointer"
                            >
                              {btn.text}
                            </motion.button>
                          )
                        }
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-16 flex flex-col items-center justify-center bg-white border border-[#C7C4D8] rounded-[12px]"
          >
            <FiCheckCircle className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-[15px] font-semibold text-gray-400">No notifications in this tab</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Notifications
