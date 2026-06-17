import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiEdit,
  FiMoreHorizontal,
  FiShield,
  FiCheckCircle,
  FiUser,
  FiClock,
  FiMonitor,
  FiKey,
  FiSlash,
  FiGlobe,
  FiMapPin
} from 'react-icons/fi'

// ─── Static staff profile data keyed by staff id ───────────────────────────
const staffProfiles = {
  1: {
    id: 'EMP-10491',
    name: 'Sarah Jenkins',
    email: 'sarah@commerce.com',
    phone: '+1 (555) 234-5678',
    department: 'Management',
    role: 'Super Admin',
    roleColor: { text: 'text-[#6D28D9]', bg: 'bg-[#F5F3FF]', border: 'border-[#DDD6FE]' },
    status: 'Active',
    joined: 'Jan 12, 2021',
    employeeId: 'EMP-10491',
    manager: 'N/A',
    location: 'New York (EST)',
    twoFA: 'Enabled',
    lastPasswordChange: '1 month ago'
  },
  2: {
    id: 'EMP-10492',
    name: 'David Chen',
    email: 'david@qcommerce.com',
    phone: '+1 (555) 345-6789',
    department: 'Operations',
    role: 'Admin',
    roleColor: { text: 'text-[#1D4ED8]', bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]' },
    status: 'Active',
    joined: 'Feb 15, 2022',
    employeeId: 'EMP-10492',
    manager: 'Sarah Jenkins',
    location: 'San Francisco (PST)',
    twoFA: 'Enabled',
    lastPasswordChange: '3 months ago'
  },
  3: {
    id: 'EMP-10493',
    name: 'Amanda Smith',
    email: 'amanda@commerce.com',
    phone: '+1 (555) 456-7890',
    department: 'Security',
    role: 'Access Manager',
    roleColor: { text: 'text-[#C2410C]', bg: 'bg-[#FFF7ED]', border: 'border-[#FED7AA]' },
    status: 'Active',
    joined: 'Mar 20, 2022',
    employeeId: 'EMP-10493',
    manager: 'Sarah Jenkins',
    location: 'Chicago (CST)',
    twoFA: 'Enabled',
    lastPasswordChange: '2 months ago'
  },
  4: {
    id: 'EMP-10494',
    name: 'Marcus Johnson',
    email: 'marcus@vendor.com',
    phone: '+1 (555) 567-8901',
    department: 'External',
    role: 'Vendor Staff',
    roleColor: { text: 'text-[#475569]', bg: 'bg-[#F8FAFC]', border: 'border-[#E2E8F0]' },
    status: 'Inactive',
    joined: 'Jul 05, 2023',
    employeeId: 'EMP-10494',
    manager: 'David Chen',
    location: 'Austin (CST)',
    twoFA: 'Disabled',
    lastPasswordChange: '6 months ago'
  },
  5: {
    id: 'EMP-10495',
    name: 'Emily Rodriguez',
    email: 'emily@commerce.com',
    phone: '+1 (555) 678-9012',
    department: 'Support',
    role: 'Admin',
    roleColor: { text: 'text-[#1D4ED8]', bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]' },
    status: 'Active',
    joined: 'Aug 10, 2022',
    employeeId: 'EMP-10495',
    manager: 'Sarah Jenkins',
    location: 'Miami (EST)',
    twoFA: 'Enabled',
    lastPasswordChange: '1 month ago'
  }
}

const roleDescriptions = {
  'Super Admin': 'This role has full, unrestricted access to all system resources and configurations.',
  'Admin': 'This role has administrative privileges with certain restrictions.',
  'Access Manager': 'This role can manage staff and vendor access but cannot perform destructive actions.',
  'Vendor Staff': 'This role has limited read-only access to product and order views.'
}

export default function StaffDetails({ staffId, onBack }) {
  const staff = staffProfiles[staffId] || staffProfiles[2]
  const [activeTab, setActiveTab] = useState('Profile')
  const [requirePasswordChange, setRequirePasswordChange] = useState(false)

  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  const tabContentVariants = {
    hidden: { opacity: 0, x: 8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, x: -8, transition: { duration: 0.15 } }
  }

  const tabs = [
    { name: 'Profile', icon: FiUser },
    { name: 'Activity Logs', icon: FiClock },
    { name: 'Active Sessions', icon: FiMonitor },
    { name: 'Security', icon: FiKey }
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full max-w-[939px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6 font-sans text-left"
    >

      
          {/* 1) BREADCRUMB DIV */}
         
      <div className="w-full h-[20px] flex items-center gap-2 text-[13px] shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-bold text-[#64748B] hover:text-black transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4 text-[#64748B]" />
          <span>Staff Directory</span>
        </button>
        <span className="text-slate-300 font-medium select-none">/</span>
        <span className="text-[#0F172A] font-bold">{staff.name}</span>
      </div>

      
          {/* 2) STAFF PROFILE HEADER CARD */}
         
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="w-full bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] px-6 pt-6 pb-5 flex justify-between items-start shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
      >
        {/* Left: Avatar + Name + Badges + Details */}
        <div className="flex items-start gap-4">
          {/* Avatar circle placeholder */}
          <div className="w-[68px] h-[68px] rounded-full border-[0.8px] border-[#E2E8F0] bg-[#F1F5F9] flex items-center justify-center shrink-0" />

          <div className="flex flex-col gap-1.5 text-left">
            {/* Name + Status + Role badges */}
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight leading-none">
                {staff.name}
              </h2>
              {/* Status badge */}
              <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none border ${
                staff.status === 'Active'
                  ? 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
                  : 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]'
              }`}>
                {staff.status}
              </span>
              {/* Role badge with shield */}
              <span className={`inline-flex items-center gap-1 text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none border ${staff.roleColor.bg} ${staff.roleColor.text} ${staff.roleColor.border}`}>
                <FiShield className="w-3 h-3" />
                {staff.role}
              </span>
            </div>

            {/* Contact details row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-1 text-[#64748B] font-medium text-[12.5px]">
              <span className="flex items-center gap-1.5">
                <FiMail className="w-[14px] h-[14px] text-[#64748B]" />
                {staff.email}
              </span>
              <span className="flex items-center gap-1.5">
                <FiPhone className="w-[14px] h-[14px] text-[#64748B]" />
                {staff.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 shrink-0" style={{ color: '#94A3B8' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <line x1="9" y1="22" x2="9" y2="16" />
                  <line x1="15" y1="22" x2="15" y2="16" />
                  <line x1="9" y1="16" x2="15" y2="16" />
                  <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
                </svg>
                {staff.department}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log('Edit Profile', staff.id)}
            className="h-[36px] px-4 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiEdit className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Edit Profile</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log('More options', staff.id)}
            className="h-[36px] w-[36px] rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:bg-slate-50 shadow-sm cursor-pointer"
          >
            <FiMoreHorizontal className="w-4 h-4 text-[#64748B]" />
          </motion.button>
        </div>
      </motion.div>

     
          {/* 3) DETAILS CONTENT SECTION */}
        
      <div className="w-full flex flex-col md:flex-row gap-6 items-stretch">

        {/* LEFT COLUMN*/}
        <div className="w-full md:w-[320px] flex flex-col gap-4 shrink-0">

          {/* LEFT CARD 1: Employment Details */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.01 }}
            className="w-full p-5 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col text-left"
          >
            <h3 className="text-[13.5px] font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#F8FAFC] pb-2.5 leading-none shrink-0">
              <FiUser className="w-4 h-4 text-[#64748B]" />
              Employment Details
            </h3>

            <div className="flex flex-col gap-3 mt-3.5 text-[12.5px]">
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Employee ID</span>
                <span className="text-[#0F172A] font-bold">{staff.employeeId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Joined</span>
                <span className="text-[#0F172A] font-bold">{staff.joined}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Direct Manager</span>
                <span className="text-[#0F172A] font-bold">{staff.manager}</span>
              </div>
            </div>
          </motion.div>

          {/* LEFT CARD 2: Access & Security */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.01 }}
            className="w-full p-5 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col text-left"
          >
            <h3 className="text-[13.5px] font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#F8FAFC] pb-2.5 leading-none shrink-0">
              <FiShield className="w-4 h-4 text-[#64748B]" />
              Access & Security
            </h3>

            <div className="flex flex-col gap-3 mt-3.5 text-[12.5px]">
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">2FA Status</span>
                <span className={`inline-flex items-center gap-1 font-bold ${
                  staff.twoFA === 'Enabled' ? 'text-[#107C41]' : 'text-[#64748B]'
                }`}>
                  {staff.twoFA === 'Enabled' && <FiCheckCircle className="w-3.5 h-3.5 text-[#107C41]" />}
                  {staff.twoFA}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Last Password Change</span>
                <span className="text-[#0F172A] font-bold">{staff.lastPasswordChange}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="w-full md:flex-1 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden flex flex-col text-left"
        >
          {/* TOP TAB BAR */}
          <div className="w-full h-[50px] px-2 bg-[#F8FAFC80] border-b border-[#E2E8F0] flex gap-1 items-center shrink-0 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`h-full px-3 text-[12.5px] font-medium cursor-pointer transition-all flex items-center gap-1.5 relative whitespace-nowrap ${
                    isActive ? 'text-[#0F172A] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <TabIcon className="w-[15px] h-[15px] shrink-0" />
                  <span>{tab.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeStaffTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F172A]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* TAB CONTENT AREA */}
          <div className="w-full flex-1 p-6 bg-white overflow-y-auto">
            <AnimatePresence mode="wait">

              {/* PROFILE TAB*/}
              {activeTab === 'Profile' && (
                <motion.div
                  key="profile"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col"
                >
                  {/* Personal Information */}
                  <h4 className="text-[14.5px] font-bold text-[#0F172A] tracking-tight leading-none">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Full Name</span>
                      <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{staff.name}</span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Email Address</span>
                      <span className="text-[13.5px] font-bold text-[#0F172A] mt-1 truncate">{staff.email}</span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Phone Number</span>
                      <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{staff.phone}</span>
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Location / Timezone</span>
                      <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{staff.location}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-[#E2E8F0] my-5" />

                  {/* Role Capabilities */}
                  <h4 className="text-[14.5px] font-bold text-[#0F172A] tracking-tight leading-none">
                    Role Capabilities
                  </h4>

                  <div className="mt-3.5 p-4 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] flex flex-col gap-2.5 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0 mt-0.5">
                        <FiShield className="w-4 h-4 text-[#1D4ED8]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13.5px] font-bold text-[#0F172A] leading-tight">
                          Assigned Role: {staff.role}
                        </span>
                        <p className="text-[12px] text-[#64748B] font-medium mt-0.5 leading-snug">
                          {roleDescriptions[staff.role] || 'This role has defined access capabilities.'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-[12.5px] font-bold text-[#0F172A] hover:text-black cursor-pointer transition-colors text-left"
                    >
                      View Enterprise Role Matrix →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ACTIVITY LOGS TAB*/}
              {activeTab === 'Activity Logs' && (
                <motion.div
                  key="activity"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col gap-4"
                >
                  {/* Top header row */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <h4 className="text-[14.5px] font-bold text-[#0F172A] leading-none">Activity Logs</h4>
                      <p className="text-[12px] text-[#64748B] font-medium mt-1">Recent actions performed by this user.</p>
                    </div>
                    <button
                      type="button"
                      className="h-[34px] px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                    >
                      Export Logs
                    </button>
                  </div>

                  {/* Table */}
                  <div className="w-full border border-[#E2E8F0] rounded-xl overflow-hidden">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-wider text-[#64748B] w-[40%]">Action</th>
                          <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-wider text-[#64748B] w-[18%]">Module</th>
                          <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-wider text-[#64748B] w-[22%]">IP Address</th>
                          <th className="px-4 py-3 text-[10.5px] font-bold uppercase tracking-wider text-[#64748B] w-[20%]">Date & Time</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-[#F1F5F9]">
                        {[
                          {
                            action: "Updated order #ORD-7352 status to Processing",
                            module: "Orders",
                            ip: "192.168.1.105",
                            date: "Oct 4, 2023",
                            time: "14:32"
                          },
                          {
                            action: "Exported Customers list (CSV)",
                            module: "Customers",
                            ip: "192.168.1.105",
                            date: "Oct 3, 2023",
                            time: "09:15"
                          },
                          {
                            action: "Approved vendor application for Fresh Foods Market",
                            module: "Vendors",
                            ip: "192.168.1.105",
                            date: "Oct 2, 2023",
                            time: "16:45"
                          },
                          {
                            action: "Logged in successfully",
                            module: "System",
                            ip: "192.168.1.105",
                            date: "Oct 2, 2023",
                            time: "08:30"
                          },
                          {
                            action: "Created new product category 'Organic Produce'",
                            module: "Products",
                            ip: "10.0.0.45",
                            date: "Oct 1, 2023",
                            time: "11:20"
                          }
                        ].map((log, i) => (
                          <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                            {/* Action */}
                            <td className="px-4 py-3.5 text-[12.5px] font-semibold text-[#0F172A] leading-snug align-top">
                              {log.action}
                            </td>
                            {/* Module badge */}
                            <td className="px-4 py-3.5 align-top">
                              <span className="inline-block px-2.5 py-[3px] rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-bold text-[#475569] whitespace-nowrap">
                                {log.module}
                              </span>
                            </td>
                            {/* IP Address */}
                            <td className="px-4 py-3.5 text-[12.5px] font-medium text-[#64748B] align-top">
                              {log.ip}
                            </td>
                            {/* Date & Time */}
                            <td className="px-4 py-3.5 align-top">
                              <span className="text-[12.5px] font-medium text-[#0F172A] leading-tight block">{log.date}</span>
                              <span className="text-[11.5px] text-[#64748B] font-medium mt-0.5 block">{log.time}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* ACTIVE SESSIONS TAB */}
              {activeTab === 'Active Sessions' && (
                <motion.div
                  key="sessions"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col gap-4"
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col">
                      <h4 className="text-[14.5px] font-bold text-[#0F172A] leading-none">Active Sessions</h4>
                      <p className="text-[12px] text-[#64748B] font-medium mt-1">Devices currently logged into this account.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => console.log('Revoke all sessions')}
                      className="h-[34px] px-3.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[12.5px] font-bold text-[#E11D48] hover:bg-[#FEE2E2] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <FiSlash className="w-3.5 h-3.5" />
                      Revoke All Sessions
                    </button>
                  </div>

                  {/* Session Cards */}
                  <div className="flex flex-col gap-3">

                    {/* Card 1 — MacBook Pro (Current) */}
                    <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                      <div className="flex items-start gap-3">
                        {/* Device icon */}
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                          <FiMonitor className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {/* Name + badge */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[13.5px] font-bold text-[#0F172A] leading-none">MacBook Pro - macOS</span>
                            <span className="inline-flex items-center px-2 py-[2px] rounded-full bg-[#DEF7EC] border border-[#BCF0DA] text-[9.5px] font-bold text-[#03543F] leading-none whitespace-nowrap">
                              Current Session
                            </span>
                          </div>
                          {/* Browser + IP */}
                          <span className="text-[12px] text-[#64748B] font-medium">Chrome 118 &nbsp;•&nbsp; 192.168.1.105</span>
                          {/* Location */}
                          <span className="flex items-center gap-1 text-[11.5px] text-[#64748B] font-medium mt-0.5">
                            <FiMapPin className="w-3 h-3 text-[#94A3B8] shrink-0" />
                            San Francisco, CA, US &nbsp;•&nbsp; Last active: <span className="text-[#0F172A] font-semibold ml-0.5">Active now</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2 — iPhone 13 */}
                    <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                      <div className="flex items-start gap-3">
                        {/* Device icon */}
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                          <FiGlobe className="w-5 h-5 text-[#64748B]" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {/* Name */}
                          <span className="text-[13.5px] font-bold text-[#0F172A] leading-none">iPhone 13 - iOS 17</span>
                          {/* Browser + IP */}
                          <span className="text-[12px] text-[#64748B] font-medium">Safari Mobile &nbsp;•&nbsp; 10.0.0.45</span>
                          {/* Location */}
                          <span className="flex items-center gap-1 text-[11.5px] text-[#64748B] font-medium mt-0.5">
                            <FiMapPin className="w-3 h-3 text-[#94A3B8] shrink-0" />
                            San Jose, CA, US &nbsp;•&nbsp; Last active: <span className="text-[#0F172A] font-semibold ml-0.5">2 days ago</span>
                          </span>
                        </div>
                      </div>
                      {/* Revoke button */}
                      <button
                        type="button"
                        onClick={() => console.log('Revoke iPhone 13 session')}
                        className="h-[34px] px-3.5 rounded-lg bg-white border border-[#E2E8F0] text-[12.5px] font-bold text-[#0F172A] hover:bg-slate-50 transition-all cursor-pointer shrink-0 shadow-sm whitespace-nowrap"
                      >
                        Revoke Session
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'Security' && (
                <motion.div
                  key="security"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col gap-4"
                >
                  {/* Header */}
                  <div className="flex flex-col">
                    <h4 className="text-[14.5px] font-semibold text-[#0F172A] leading-none">Security Settings</h4>
                    <p className="text-[12px] text-[#64748B] font-medium mt-1">Manage password and authentication preferences for this account.</p>
                  </div>

                  {/* Card 1 — Reset Password */}
                  <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold text-[#0F172A]">Reset Password</span>
                      <span className="text-[11.5px] text-[#64748B] font-medium leading-snug max-w-[280px]">
                        Send a secure link to the user's email to reset their password.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => console.log('Send reset link to', staff.email)}
                      className="h-[34px] px-3.5 rounded-lg bg-white border border-[#E2E8F0] text-[12.5px] font-bold text-[#0F172A] hover:bg-slate-50 transition-all cursor-pointer shrink-0 shadow-sm whitespace-nowrap"
                    >
                      Send Reset Link
                    </button>
                  </div>

                  {/* Card 2 — Two-Factor Authentication */}
                  <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold text-[#0F172A]">Two-Factor Authentication (2FA)</span>
                      <span className="text-[11.5px] text-[#64748B] font-medium leading-snug">
                        Require an extra layer of security for login.
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[12.5px] font-bold text-[#059669]">Enabled</span>
                      <button
                        type="button"
                        onClick={() => console.log('Disable 2FA for', staff.id)}
                        className="h-[32px] px-3.5 rounded-lg bg-white border border-[#E2E8F0] text-[12.5px] font-bold text-[#0F172A] hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                      >
                        Disable
                      </button>
                    </div>
                  </div>

                  {/* Card 3 — Require Password Change (Toggle) */}
                  <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-bold text-[#0F172A]">Require Password Change</span>
                      <span className="text-[11.5px] text-[#64748B] font-medium leading-snug max-w-[280px]">
                        Force the user to update their password on their next login.
                      </span>
                    </div>
                    {/* Animated toggle */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={requirePasswordChange}
                      onClick={() => setRequirePasswordChange(prev => !prev)}
                      className={`w-[42px] h-[24px] rounded-full p-[3px] transition-colors duration-200 cursor-pointer flex items-center shrink-0 ${
                        requirePasswordChange ? 'bg-black' : 'bg-[#E2E8F0]'
                      }`}
                    >
                      <motion.span
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-[18px] h-[18px] rounded-full bg-white shadow-sm block"
                        style={{ marginLeft: requirePasswordChange ? 'auto' : '0' }}
                      />
                    </button>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
