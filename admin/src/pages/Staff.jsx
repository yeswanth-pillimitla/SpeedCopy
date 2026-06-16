import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUsers,
  FiShield,
  FiUserPlus,
  FiLock,
  FiDownload,
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiMoreHorizontal,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiArrowLeft
} from 'react-icons/fi'
import QuickActions from '../components/QuickActions.jsx'

// Mock initial staff directory data
const initialStaff = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah@commerce.com',
    role: 'Super Admin',
    department: 'Management',
    status: 'Active',
    lastLogin: '2 mins ago',
    roleBadgeColor: 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]',
    statusBadgeColor: 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
  },
  {
    id: 2,
    name: 'David Chen',
    email: 'david@commerce.com',
    role: 'Admin',
    department: 'Operations',
    status: 'Active',
    lastLogin: '1 hour ago',
    roleBadgeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    statusBadgeColor: 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
  },
  {
    id: 3,
    name: 'Amanda Smith',
    email: 'amanda@commerce.com',
    role: 'Access Manager',
    department: 'Security',
    status: 'Active',
    lastLogin: '3 days ago',
    roleBadgeColor: 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]',
    statusBadgeColor: 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
  },
  {
    id: 4,
    name: 'Marcus Johnson',
    email: 'marcus@vendor.com',
    role: 'Vendor Staff',
    department: 'External',
    status: 'Inactive',
    lastLogin: '2 weeks ago',
    roleBadgeColor: 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]',
    statusBadgeColor: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]'
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    email: 'emily@commerce.com',
    role: 'Admin',
    department: 'Support',
    status: 'Active',
    lastLogin: '5 hours ago',
    roleBadgeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    statusBadgeColor: 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
  }
]

export default function Staff() {
  const [activeTab, setActiveTab] = useState('Staff Directory') // Staff Directory, Roles & Permissions, Payroll, Leave
  const [selectedDept, setSelectedDept] = useState('All Departments')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteStep, setInviteStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [invitePhone, setInvitePhone] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [inviteRole, setInviteRole] = useState('Admin')
  const [inviteDept, setInviteDept] = useState('Operations')

  // State to support adding new staff members locally
  const [staffList, setStaffList] = useState(initialStaff)

  // Handle invitation submission
  const handleInviteSubmit = (e) => {
    if (e) e.preventDefault()
    if (!firstName.trim() || !lastName.trim() || !inviteEmail.trim() || !invitePhone.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    let roleBadgeColor = 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
    if (inviteRole === 'Super Admin') {
      roleBadgeColor = 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]'
    } else if (inviteRole === 'Access Manager') {
      roleBadgeColor = 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
    } else if (inviteRole === 'Vendor Staff') {
      roleBadgeColor = 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]'
    }

    const newMember = {
      id: Date.now(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: inviteEmail.trim(),
      role: inviteRole,
      department: inviteDept,
      status: 'Active',
      lastLogin: 'Never',
      roleBadgeColor,
      statusBadgeColor: 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
    }

    setStaffList([...staffList, newMember])
    
    // Clear and close
    setFirstName('')
    setLastName('')
    setInviteEmail('')
    setInvitePhone('')
    setEmployeeId('')
    setInviteRole('Admin')
    setInviteDept('Operations')
    setInviteStep(1)
    setIsInviteOpen(false)
  }

  // Filter staff based on search query and department
  const filteredStaff = staffList.filter(member => {
    const matchesDept = selectedDept === 'All Departments' || member.department === selectedDept
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDept && matchesSearch
  })

  // Framer Motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  }

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  }

  const cardItemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full flex flex-col gap-6 font-sans text-left relative"
    >
   
          {/* 1) HEADER DIV */}
        
      <div className="w-full h-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div className="flex flex-col">
          <h1 className="text-[24px] font-black text-gray-900 tracking-tight leading-none">
            Staff Management
          </h1>
          <p className="text-[13px] text-slate-400 font-medium leading-none mt-2">
            Manage team members, roles, and enterprise access controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Button */}
          <button
            onClick={() => console.log('Export Staff List')}
            className="h-[38px] px-4 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiDownload className="w-4 h-4 text-slate-500" />
            <span>Export</span>
          </button>

          {/* Invite Staff Button */}
          <button
            onClick={() => {
              setFirstName('')
              setLastName('')
              setInviteEmail('')
              setInvitePhone('')
              setEmployeeId('')
              setInviteRole('Admin')
              setInviteDept('Operations')
              setInviteStep(1)
              setIsInviteOpen(true)
            }}
            className="h-[38px] px-4 rounded-lg bg-black text-white text-[12.5px] font-bold hover:bg-zinc-900 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiPlus className="w-4 h-4 text-white stroke-[2.5]" />
            <span>Invite Staff</span>
          </button>
        </div>
      </div>

    
          {/* 2) QUICK ACTION DIV */}
          
      <div className="w-full h-auto shrink-0">
        <QuickActions />
      </div>

      
          {/* 3) STAFF SUMMARY CARD SECTION */}
         
      <div className="w-full pt-0 shrink-0">
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
        >
          {/* Card 1: Total Staff */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full h-[97.6px] bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] p-5 flex justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
          >
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] font-semibold text-gray-400 tracking-tight leading-none font-sans">
                Total Staff
              </span>
              <span className="text-[22px] font-black text-gray-900 leading-none font-sans">
                {staffList.length + 43}
              </span>
            </div>
            <div className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-450 shrink-0 self-start">
              <FiUsers className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* Card 2: Active Roles */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full h-[97.6px] bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] p-5 flex justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
          >
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] font-semibold text-gray-400 tracking-tight leading-none font-sans">
                Active Roles
              </span>
              <span className="text-[22px] font-black text-gray-900 leading-none font-sans">
                12
              </span>
            </div>
            <div className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-450 shrink-0 self-start">
              <FiShield className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* Card 3: Pending Invites */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full h-[97.6px] bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] p-5 flex justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
          >
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] font-semibold text-gray-400 tracking-tight leading-none font-sans">
                Pending Invites
              </span>
              <span className="text-[22px] font-black text-gray-900 leading-none font-sans">
                5
              </span>
            </div>
            <div className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-450 shrink-0 self-start">
              <FiUserPlus className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* Card 4: Security Alerts */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full h-[97.6px] bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] p-5 flex justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
          >
            <div className="flex flex-col justify-between h-full">
              <span className="text-[12px] font-semibold text-gray-400 tracking-tight leading-none font-sans">
                Security Alerts
              </span>
              <span className="text-[22px] font-black text-[#0F172A] leading-none font-sans">
                0
              </span>
            </div>
            <div className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-450 shrink-0 self-start">
              <FiLock className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      
          {/* 4) STAFF TABLE MAIN CARD */}
          
      <div className="w-full pt-0 shrink-0">
        <div className="w-full bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] flex flex-col shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_rgba(0,0,0,0.1)] overflow-hidden">
          
          {/* TABLE FIRST DIV (Tabs) */}
          <div className="w-full min-h-[64px] h-[64px] px-6 bg-[#F8FAFC]/50 border-b border-[#E2E8F0] flex gap-8 items-center shrink-0 overflow-x-auto scrollbar-none">
            {[
              { name: 'Staff Directory', icon: FiUsers },
              { name: 'Roles & Permissions', icon: FiShield },
              { name: 'Payroll management', icon: FiShield },
              { name: 'Leave management', icon: FiShield }
            ].map((tab) => {
              const isActive = activeTab === tab.name
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`h-[64px] pb-0 px-0.5 text-[14px] font-medium cursor-pointer transition-all flex items-center gap-2 relative ${
                    isActive ? 'text-black font-bold' : 'text-[#64748B] hover:text-black'
                  }`}
                >
                  <TabIcon className="w-[18px] h-[18px] shrink-0" />
                  <span className="whitespace-nowrap">{tab.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeStaffDirTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* TAB CONTENT SWITCHER */}
          <AnimatePresence mode="wait">
            {activeTab === 'Staff Directory' ? (
              <motion.div
                key="directory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col flex-1"
              >
                {/* TABLE SECOND DIV (Filters) */}
                <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#E2E8F0]">
                  {/* Left filter buttons */}
                  <div className="flex flex-wrap items-center gap-1">
                    {['All Departments', 'Management', 'Operations', 'Security', 'Support'].map((dept) => {
                      const isActive = selectedDept === dept
                      return (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => setSelectedDept(dept)}
                          className={`px-3 py-1.5 rounded-lg text-[12.5px] font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-slate-100 text-black font-extrabold shadow-2xs'
                              : 'text-slate-400 hover:text-slate-650'
                          }`}
                        >
                          {dept}
                        </button>
                      )
                    })}
                  </div>

                  {/* Right search & filter icon */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="relative w-[200px]">
                      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                        <FiSearch className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search staff..."
                        className="w-full h-8 pl-9 pr-3 text-[12.5px] bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium placeholder-slate-400"
                      />
                    </div>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-slate-500 hover:text-black cursor-pointer shadow-2xs"
                    >
                      <FiFilter className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* TABLE THIRD DIV (Table Grid) */}
                <div className="flex-1 overflow-x-auto min-h-[350px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] h-10 select-none text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="px-6 py-2.5">Staff Member</th>
                        <th className="px-6 py-2.5">Role</th>
                        <th className="px-6 py-2.5">Department</th>
                        <th className="px-6 py-2.5 text-center">Status</th>
                        <th className="px-6 py-2.5">Last Login</th>
                        <th className="px-6 py-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] bg-white text-[13px]">
                      {filteredStaff.length > 0 ? (
                        filteredStaff.map((staff) => {
                          const initials = staff.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                          return (
                            <tr
                              key={staff.id}
                              className="hover:bg-slate-50/50 transition-colors"
                            >
                              {/* Staff Member (Identity) */}
                              <td className="px-6 py-3.5">
                                <div className="flex items-center gap-3">
                                  {/* Avatar circle outline */}
                                  <div className="w-[36px] h-[36px] rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 font-extrabold text-xs shrink-0 select-none">
                                    {initials}
                                  </div>
                                  <div className="flex flex-col text-left leading-tight">
                                    <span className="text-[13px] font-bold text-gray-900">
                                      {staff.name}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
                                      {staff.email}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Role */}
                              <td className="px-6 py-3.5">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${staff.roleBadgeColor}`}>
                                  <FiShield className="w-3 h-3 stroke-[2.5]" />
                                  <span>{staff.role}</span>
                                </span>
                              </td>

                              {/* Department */}
                              <td className="px-6 py-3.5 font-bold text-[#475569]">
                                {staff.department}
                              </td>

                              {/* Status */}
                              <td className="px-6 py-3.5 text-center">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${staff.statusBadgeColor}`}>
                                  {staff.status}
                                </span>
                              </td>

                              {/* Last Login */}
                              <td className="px-6 py-3.5 font-semibold text-slate-500">
                                {staff.lastLogin}
                              </td>

                              {/* Actions */}
                              <td className="px-6 py-3.5">
                                <div className="flex items-center justify-end gap-2.5 text-slate-400">
                                  <button
                                    onClick={() => console.log('View Staff details:', staff.id)}
                                    type="button"
                                    className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                  >
                                    <FiEye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => console.log('Edit Staff:', staff.id)}
                                    type="button"
                                    className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                  >
                                    <FiEdit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => console.log('Actions Menu:', staff.id)}
                                    type="button"
                                    className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                  >
                                    <FiMoreHorizontal className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-bold text-[13px]">
                            No staff members match your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* TABLE FOURTH DIV (Pagination) */}
                <div className="w-full h-[66.4px] border-t border-[#E2E8F0] p-4 flex justify-between items-center shrink-0">
                  <span className="text-[12.5px] text-slate-400 font-semibold">
                    Showing 1 to {filteredStaff.length} of {staffList.length + 43} results
                  </span>

                  {/* Pagination Numbers */}
                  <div className="flex items-center gap-1 select-none text-[12.5px]">
                    <button
                      onClick={() => setCurrentPage(1)}
                      type="button"
                      className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <FiChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setCurrentPage(1)}
                      type="button"
                      className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer font-bold ${
                        currentPage === 1 ? 'bg-black text-white' : 'text-slate-550 hover:bg-slate-50'
                      }`}
                    >
                      1
                    </button>

                    <button
                      onClick={() => setCurrentPage(2)}
                      type="button"
                      className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer font-bold ${
                        currentPage === 2 ? 'bg-black text-white' : 'text-slate-550 hover:bg-slate-50'
                      }`}
                    >
                      2
                    </button>

                    <span className="text-slate-450 text-[12px] px-1 font-bold">...</span>

                    <button
                      onClick={() => setCurrentPage(2)}
                      type="button"
                      className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <FiChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="other-tabs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-[450px] text-center p-6"
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <FiShield className="w-5 h-5" />
                </div>
                <h5 className="text-[14px] font-bold text-gray-900">{activeTab} Details</h5>
                <p className="text-[12px] text-slate-400 font-semibold mt-1">This section is ready to integrate live API data controls.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

  
          {/* INVITE STAFF MODAL OVERLAY */}
         
      <AnimatePresence>
        {isInviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInviteOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-[620px] bg-white rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),_0px_20px_25px_-5px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col text-left"
            >
              {/* TOP HEADER: Height 64px, Padding 24px */}
              <div className="h-16 px-6 py-4 flex items-center justify-between border-b border-[#E2E8F0] shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white shrink-0">
                    <FiShield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col text-left justify-center">
                    <h3 className="text-[15px] font-extrabold text-gray-900 leading-tight">
                      Add Staff Member
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-none">
                      Invite a new team member and assign their access role
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsInviteOpen(false)}
                  className="text-slate-400 hover:text-black transition-colors cursor-pointer p-1"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* STEP INDICATOR: Height 48px, background #F8FAFC */}
              <div className="h-12 bg-[#F8FAFC] px-6 border-b border-[#E2E8F0] flex items-center justify-between text-[11.5px] font-bold select-none shrink-0">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${inviteStep >= 1 ? 'bg-black text-white' : 'bg-[#E2E8F0] text-slate-500'}`}>1</span>
                  <span className={`${inviteStep >= 1 ? 'text-slate-900 font-extrabold' : 'text-slate-400'}`}>Personal Details</span>
                </div>
                <div className="flex-1 mx-4 h-[1px] bg-[#E2E8F0]" />
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${inviteStep >= 2 ? 'bg-black text-white' : 'bg-[#E2E8F0] text-slate-500'}`}>2</span>
                  <span className={`${inviteStep >= 2 ? 'text-slate-900 font-extrabold' : 'text-slate-400'}`}>Role & Access</span>
                </div>
                <div className="flex-1 mx-4 h-[1px] bg-[#E2E8F0]" />
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${inviteStep >= 3 ? 'bg-black text-white' : 'bg-[#E2E8F0] text-slate-500'}`}>3</span>
                  <span className={`${inviteStep >= 3 ? 'text-slate-900 font-extrabold' : 'text-slate-400'}`}>Send Invite</span>
                </div>
              </div>

              {/* STEP CONTENT: Padding 24px (p-6) */}
              <div className="flex-1 min-h-[320px] max-h-[500px] overflow-y-auto">
                {inviteStep === 1 && (
                  <div className="p-6 flex flex-col gap-5 text-[12.5px] text-slate-700">
                    {/* First Row: First Name & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="font-bold text-slate-700">First Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                            <FiUser className="w-[18px] h-[18px]" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full h-11 pl-10 pr-3 border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="font-bold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium"
                        />
                      </div>
                    </div>

                    {/* Second Row: Work Email */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="font-bold text-slate-700">Work Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                          <FiMail className="w-[18px] h-[18px]" />
                        </span>
                        <input
                          type="email"
                          required
                          placeholder="email@example.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="w-full h-11 pl-10 pr-3 border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium"
                        />
                      </div>
                    </div>

                    {/* Third Row: Phone Number & Employee ID */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="font-bold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                            <FiPhone className="w-[18px] h-[18px]" />
                          </span>
                          <input
                            type="text"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={invitePhone}
                            onChange={(e) => setInvitePhone(e.target.value)}
                            className="w-full h-11 pl-10 pr-3 border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 text-left">
                        <label className="font-bold text-slate-700">Employee ID <span className="text-slate-400 font-normal">(optional)</span></label>
                        <input
                          type="text"
                          placeholder="EMP-001"
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                          className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {inviteStep === 2 && (
                  <div className="p-6 flex flex-col gap-5 text-[12.5px] text-slate-700">
                    <div className="flex flex-col gap-2.5 text-left">
                      <label className="font-bold text-slate-700">Select Access Role <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { role: 'Super Admin', desc: 'Full system configuration, billing control, and management of all resources.' },
                          { role: 'Admin', desc: 'Manage operations, staff directory, vendors, orders, and catalog permissions.' },
                          { role: 'Access Manager', desc: 'Assign staff permissions and review system access and security logs.' }
                        ].map((r) => {
                          const isSel = inviteRole === r.role
                          return (
                            <button
                              type="button"
                              key={r.role}
                              onClick={() => setInviteRole(r.role)}
                              className={`w-full p-4 text-left border rounded-xl transition-all cursor-pointer ${
                                isSel ? 'border-black bg-slate-50/50 shadow-2xs font-bold' : 'border-[#E2E8F0] hover:border-slate-350 bg-white font-medium'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-bold text-gray-900">{r.role}</span>
                                {isSel && <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-white text-[9px]">✓</div>}
                              </div>
                              <p className="text-[11px] text-slate-400 font-medium mt-1 leading-snug">{r.desc}</p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="font-bold text-slate-700">Department <span className="text-red-500">*</span></label>
                      <select
                        value={inviteDept}
                        onChange={(e) => setInviteDept(e.target.value)}
                        className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium"
                      >
                        <option value="Management">Management</option>
                        <option value="Operations">Operations</option>
                        <option value="Security">Security</option>
                        <option value="Support">Support</option>
                        <option value="External">External</option>
                      </select>
                    </div>
                  </div>
                )}

                {inviteStep === 3 && (
                  <div className="p-6 flex flex-col gap-5 text-[12.5px] text-slate-700">
                    <div className="flex flex-col items-center justify-center py-2 text-center">
                      <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-650 mb-3 shrink-0">
                        <FiMail className="w-5 h-5 text-black" />
                      </div>
                      <h4 className="text-[14px] font-bold text-gray-950">Review Staff Invitation</h4>
                      <p className="text-[11px] text-slate-400 font-medium max-w-sm mt-1">
                        Please verify details before sending the invitation link.
                      </p>
                    </div>

                    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-slate-50/50">
                      <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
                        <span className="font-bold text-slate-900">Invitation Preview</span>
                        <span className="text-[10px] font-extrabold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] px-2 py-0.5 rounded-full uppercase">Pending Invite</span>
                      </div>
                      
                      <div className="p-4 grid grid-cols-2 gap-y-3.5 gap-x-4 text-left text-[12px]">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</span>
                          <span className="text-[13px] font-bold text-gray-900 mt-0.5">{firstName} {lastName}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Work Email</span>
                          <span className="text-[13px] font-bold text-gray-900 mt-0.5">{inviteEmail}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</span>
                          <span className="text-[13px] font-bold text-gray-900 mt-0.5">{invitePhone}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee ID</span>
                          <span className="text-[13px] font-bold text-gray-900 mt-0.5">{employeeId || 'None'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Access Role</span>
                          <span className="text-[13px] font-bold text-gray-900 mt-0.5 flex items-center gap-1">
                            <FiShield className="w-3.5 h-3.5 text-slate-500" />
                            {inviteRole}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</span>
                          <span className="text-[13px] font-bold text-gray-900 mt-0.5">{inviteDept}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center leading-normal">
                      An invitation link will be sent to <span className="font-semibold text-slate-600">{inviteEmail}</span>, valid for 48 hours.
                    </p>
                  </div>
                )}
              </div>

              {/* BOTTOM FOOTER: Height 64px, background #F8FAFC, border-top 0.8px solid #E2E8F0 */}
              <div className="h-16 bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 flex items-center justify-between shrink-0">
                <div>
                  {inviteStep === 1 ? (
                    <button
                      type="button"
                      onClick={() => setIsInviteOpen(false)}
                      className="h-10 px-4 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs transition-colors"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setInviteStep((prev) => prev - 1)}
                      className="h-10 px-4 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <FiArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[12px] text-slate-400 font-semibold">
                    Step {inviteStep} of 3
                  </span>

                  {inviteStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (inviteStep === 1) {
                          if (!firstName.trim() || !lastName.trim() || !inviteEmail.trim() || !invitePhone.trim()) {
                            alert('Please fill in all required fields.')
                            return
                          }
                          if (!/\S+@\S+\.\S+/.test(inviteEmail)) {
                            alert('Please enter a valid email address.')
                            return
                          }
                        }
                        setInviteStep((prev) => prev + 1)
                      }}
                      className="h-10 px-4 rounded-lg bg-black text-white text-[12.5px] font-bold hover:bg-zinc-900 cursor-pointer shadow-2xs transition-all flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <FiArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleInviteSubmit}
                      className="h-10 px-4 rounded-lg bg-black text-white text-[12.5px] font-bold hover:bg-zinc-900 cursor-pointer shadow-2xs transition-all flex items-center gap-1.5"
                    >
                      <span>Send Invite</span>
                      <FiArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
