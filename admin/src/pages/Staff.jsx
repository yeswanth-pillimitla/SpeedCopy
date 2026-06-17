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
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiSend,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiCheckSquare,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiXCircle
} from 'react-icons/fi'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import QuickActions from '../components/QuickActions.jsx'
import StaffDetails from './StaffDetails.jsx'

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
const getRoleColors = (role) => {
  switch (role) {
    case 'Super Admin':
      return { text: 'text-[#6D28D9]', bg: 'bg-[#F5F3FF]', border: 'border-[#DDD6FE]', shield: 'text-[#6D28D9]' }
    case 'Admin':
      return { text: 'text-[#1D4ED8]', bg: 'bg-[#EFF6FF]', border: 'border-[#BFDBFE]', shield: 'text-[#1D4ED8]' }
    case 'Access Manager':
      return { text: 'text-[#C2410C]', bg: 'bg-[#FFF7ED]', border: 'border-[#FED7AA]', shield: 'text-[#C2410C]' }
    case 'Vendor Staff':
    default:
      return { text: 'text-[#475569]', bg: 'bg-[#F8FAFC]', border: 'border-[#E2E8F0]', shield: 'text-[#475569]' }
  }
}

// ─── RBAC module/permission data ─────────────────────────────────────────────
const MODULES = [
  { key: 'dashboard', label: 'Dashboard Module', perms: ['View Analytics', 'View Revenue'] },
  { key: 'products',  label: 'Products Module',  perms: ['View', 'Create', 'Edit', 'Delete'] },
  { key: 'orders',    label: 'Orders Module',    perms: ['View', 'Process', 'Refund', 'Delete'] },
  { key: 'customers', label: 'Customers Module', perms: ['View', 'Create', 'Edit', 'Delete'] },
  { key: 'vendors',   label: 'Vendors Module',   perms: ['View', 'Onboard', 'Suspend', 'Delete'] },
  { key: 'staff',     label: 'Staff Module',     perms: ['View', 'Invite', 'Manage Roles', 'Delete'] }
]

const ROLES = [
  { key: 'superAdmin',     label: 'SUPER ADMIN',     users: '1 users', readOnly: true },
  { key: 'admin',          label: 'ADMIN',            users: '2 users', readOnly: false },
  { key: 'accessManager',  label: 'ACCESS MANAGER',  users: '1 users', readOnly: false },
  { key: 'vendorStaff',    label: 'VENDOR STAFF',     users: '1 users', readOnly: false }
]

// Build initial state: all unchecked
function buildInitialPermissions() {
  const state = {}
  MODULES.forEach(mod => {
    state[mod.key] = {}
    mod.perms.forEach(perm => {
      state[mod.key][perm] = {}
      ROLES.forEach(role => { state[mod.key][perm][role.key] = false })
    })
  })
  return state
}

function RolesPermissionsContent({ roles, permissions, toggle }) {
  return (
    <motion.div
      key="roles-permissions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col bg-white"
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-[#E2E8F0]">
        <h2 className="text-[16px] font-bold text-[#0F172A] leading-tight">
          Enterprise Role-Based Access Control
        </h2>
        <p className="text-[12px] text-[#64748B] font-medium mt-1 leading-snug max-w-[620px]">
          Manage global permissions across all modules. Changes to roles affect all users assigned to that role immediately.
          System roles (Super Admin) cannot be modified.
        </p>
      </div>

      {/* Permission Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[12.5px]">
          {/* Table head */}
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <th className="px-6 py-3 text-[10.5px] font-bold uppercase tracking-wider text-[#64748B] w-[34%]">
                Permissions / Modules
              </th>
              {roles.map(role => (
                <th key={role.key} className="px-4 py-3 text-center w-[16.5%]">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#64748B]">{role.label}</span>
                    <span className="text-[10px] font-semibold text-[#94A3B8]">{role.users}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {MODULES.map(mod => (
              <>
                {/* Module heading row */}
                <tr key={mod.key + '-header'} className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <td colSpan={roles.length + 1} className="px-6 py-2.5">
                    <span className="text-[12.5px] font-semibold text-[#0F172A]">{mod.label}</span>
                  </td>
                </tr>

                {/* Permission rows */}
                {mod.perms.map((perm, pi) => (
                  <tr
                    key={mod.key + '-' + perm}
                    className="border-b border-[#F1F5F9] hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="px-6 py-3 text-[12.5px] font-medium text-[#475569] pl-8">
                      {perm}
                    </td>
                    {roles.map(role => {
                      const checked = permissions[mod.key]?.[perm]?.[role.key] || false
                      return (
                        <td key={role.key} className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center">
                            <button
                              type="button"
                              disabled={role.readOnly}
                              onClick={() => !role.readOnly && toggle(mod.key, perm, role.key)}
                              aria-checked={checked}
                              className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-all shrink-0 ${
                                role.readOnly
                                  ? 'border-[#CBD5E1] bg-[#F8FAFC] cursor-not-allowed opacity-60'
                                  : checked
                                    ? 'bg-[#0F172A] border-[#0F172A] cursor-pointer'
                                    : 'border-[#64748B] bg-white cursor-pointer hover:border-[#0F172A]'
                              }`}
                            >
                              {checked && (
                                <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="1,4 3.5,6.5 9,1" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button row */}
      <div className="flex justify-end px-6 py-4 border-t border-[#E2E8F0]">
        <button
          type="button"
          onClick={() => console.log('Save permission changes', permissions)}
          className="h-[38px] px-5 rounded-lg bg-black text-white text-[12.5px] font-bold hover:bg-zinc-900 transition-all cursor-pointer shadow-sm"
        >
          Save Permission Changes
        </button>
      </div>
    </motion.div>
  )
}

// ─── Payroll Management Content Component ─────────────────────────────────────
function PayrollManagementContent() {
  const [payrollMonth, setPayrollMonth] = useState('Oct 2023')
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear())
  const [rosterSearch, setRosterSearch] = useState('')
  const [rosterDept, setRosterDept] = useState('All Departments')
  const [rosterDeptOpen, setRosterDeptOpen] = useState(false)
  const [rosterPage, setRosterPage] = useState(1)

  const initialRoster = [
    { id: 'EMP-1042', initials: 'JD', name: 'John Doe', department: 'Operations', gross: '$8,500.00', net: '$6,245.50', date: 'Oct 31, 2023', status: 'Paid' },
    { id: 'EMP-1088', initials: 'AS', name: 'Alice Smith', department: 'Support', gross: '$9,200.00', net: '$6,810.20', date: 'Oct 31, 2023', status: 'Processing' },
    { id: 'EMP-1102', initials: 'RJ', name: 'Robert Jones', department: 'Security', gross: '$5,400.00', net: '$4,120.00', date: 'Oct 31, 2023', status: 'Scheduled' },
    { id: 'EMP-1155', initials: 'EW', name: 'Emily White', department: 'Management', gross: '$11,000.00', net: '$7,950.80', date: 'Oct 31, 2023', status: 'Paid' }
  ]

  const pieData = [
    { name: 'Engineering', value: 45 },
    { name: 'Operations', value: 25 },
    { name: 'Security', value: 15 },
    { name: 'Vendors', value: 10 },
    { name: 'Delivery partners', value: 5 }
  ]
  const COLORS = ['#6366F1', '#38BDF8', '#FB7185', '#22D3EE', '#FB923C']

  const filteredRoster = initialRoster.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(rosterSearch.toLowerCase()) || emp.id.toLowerCase().includes(rosterSearch.toLowerCase())
    const matchesDept = rosterDept === 'All Departments' || emp.department === rosterDept
    return matchesSearch && matchesDept
  })

  return (
    <motion.div
      key="payroll-management"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      className="p-6 flex flex-col gap-6 bg-[#F8FAFC] w-full"
    >
      {/* FIRST DIV: Header */}
      <div className="w-full flex flex-col sm:flex-row sm:items-start justify-between gap-4 shrink-0">
        <div className="flex flex-col text-left">
          <h2 className="text-[20px] font-black text-gray-950 tracking-tight leading-none">
            Payroll Management
          </h2>
          <p className="text-[13px] text-slate-400 font-semibold leading-none mt-2">
            Overview of your current payroll cycle and historical runs.
          </p>
        </div>

        {/* Date Dropdown – dynamic month-year picker */}
        <div className="relative shrink-0 self-start">
          <button
            type="button"
            onClick={() => {
              // Seed picker year from currently selected month
              const parts = payrollMonth.split(' ')
              setPickerYear(parts[1] ? parseInt(parts[1]) : new Date().getFullYear())
              setMonthDropdownOpen(prev => !prev)
            }}
            className="h-[38px] px-3 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <FiCalendar className="w-4 h-4 text-slate-500" />
            <span>{payrollMonth}</span>
            <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${monthDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {monthDropdownOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setMonthDropdownOpen(false)} />
              <div className="absolute right-0 top-[44px] z-30 bg-white border border-[#E2E8F0] rounded-xl shadow-xl w-[220px] p-3 select-none">
                {/* Year navigation */}
                <div className="flex items-center justify-between mb-2.5">
                  <button
                    type="button"
                    onClick={() => setPickerYear(y => y - 1)}
                    className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-black transition-colors cursor-pointer"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[13px] font-bold text-slate-800">{pickerYear}</span>
                  <button
                    type="button"
                    onClick={() => setPickerYear(y => y + 1)}
                    className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-black transition-colors cursor-pointer"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Month grid */}
                <div className="grid grid-cols-3 gap-1.5">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(mon => {
                    const label = `${mon} ${pickerYear}`
                    const isSelected = payrollMonth === label
                    return (
                      <button
                        key={mon}
                        type="button"
                        onClick={() => {
                          setPayrollMonth(label)
                          setMonthDropdownOpen(false)
                        }}
                        className={`h-8 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {mon}
                      </button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* SECOND DIV: Payroll Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="w-full h-[162px] p-6 rounded-xl bg-white border border-[#E0E3E5] flex flex-col justify-between shadow-2xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-bold text-slate-400">Total Monthly Payroll</span>
              <span className="text-[22px] font-black text-slate-800 tracking-tight mt-1">$1,245,000</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
              <FiDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[12px] font-bold text-[#10B981] flex items-center gap-1 mt-2">
            <FiArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            <span>+2.4% vs last month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full h-[162px] p-6 rounded-xl bg-white border border-[#E0E3E5] flex flex-col justify-between shadow-2xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-bold text-slate-400">Tax & Compliance</span>
              <span className="text-[22px] font-black text-slate-800 tracking-tight mt-1">$312,450</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-sky-50/70 border border-sky-100 flex items-center justify-center text-sky-500 shrink-0">
              <FiCheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[12px] font-semibold text-slate-400 mt-2 flex items-center gap-1">
            <FiCheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>All filings up to date</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full h-[162px] p-6 rounded-xl bg-white border border-[#E0E3E5] flex flex-col justify-between shadow-2xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-bold text-slate-400">Upcoming Payments</span>
              <span className="text-[22px] font-black text-slate-800 tracking-tight mt-1">Oct 31</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-rose-50/70 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
              <FiCalendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[12px] font-bold text-[#EF4444] flex items-center gap-1 mt-2">
            <FiClock className="w-3.5 h-3.5 shrink-0" />
            <span>3 days remaining</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="w-full h-[162px] p-6 rounded-xl bg-white border border-[#E0E3E5] flex flex-col justify-between shadow-2xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-bold text-slate-400">Active Employees</span>
              <span className="text-[22px] font-black text-slate-800 tracking-tight mt-1">428</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
              <FiUsers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[12px] font-semibold text-slate-400 mt-2 flex items-center gap-1">
            <FiUserPlus className="w-3.5 h-3.5 shrink-0" />
            <span>+12 new hires this cycle</span>
          </div>
        </div>
      </div>

      {/* THIRD DIV: Insights & Pie Chart */}
      <div className="w-full flex flex-col lg:flex-row gap-4 mb-4">
        {/* Left Department Distribution Div */}
        <div className="w-full lg:w-[370px] h-[340px] p-6 rounded-lg bg-white border border-[#E0E3E5] flex flex-col shadow-2xs">
          <div className="flex flex-col text-left">
            <h4 className="text-[14px] font-extrabold text-slate-800">Department Distribution</h4>
            <span className="text-[11px] text-slate-400 font-semibold mt-0.5">Department wise pay-roll</span>
          </div>
          <div className="flex-1 w-full flex items-center justify-center mt-2">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={72}
                  innerRadius={0}
                  dataKey="value"
                  label={({ name }) => name.length > 10 ? name.slice(0, 9) + '…' : name}
                  labelLine={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Payroll Insights Div */}
        <div className="flex-1 min-h-[320.25px] p-6 rounded-lg bg-white border border-[#E0E3E5] flex flex-col shadow-2xs text-left">
          <h4 className="text-[14px] font-extrabold text-slate-800 mb-4">Payroll Insights</h4>
          
          <div className="flex flex-col gap-4">
            {/* Box 1 */}
            <div className="p-4 bg-[#F1F5F9] rounded-lg text-[12.5px] text-slate-700 font-medium leading-relaxed">
              <span className="text-[#3B82F6] font-bold">Engineering</span> remains the highest expenditure at 45% of total monthly payroll.
            </div>

            {/* Box 2 */}
            <div className="p-4 bg-[#DEF7EC] border border-[#BCF0DA] rounded-lg flex items-start gap-3 text-[12.5px] text-[#03543F] font-semibold">
              <FiTrendingUp className="w-5 h-5 text-[#03543F] shrink-0 mt-0.5" />
              <span>Overall efficiency is up 2% from last cycle.</span>
            </div>
          </div>

          <div className="text-[11.5px] italic text-slate-400 font-medium mt-auto pt-4">
            Next review scheduled for Nov 5th.
          </div>
        </div>
      </div>

      {/* FOURTH DIV: Employee Payroll Roster */}
      <div className="w-full flex flex-col shadow-2xs border border-[#E0E3E5] rounded-xl overflow-hidden bg-white">
        {/* Roster Top Div */}
        <div className="h-[71px] px-4 bg-[#F7F9FB] border-b border-[#E0E3E5] flex items-center justify-between">
          <h4 className="text-[14px] font-extrabold text-slate-800">
            Employee Payroll Roster
          </h4>
          <div className="flex items-center gap-2.5">
            {/* Department Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRosterDeptOpen(prev => !prev)}
                className="h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>{rosterDept}</span>
                <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${rosterDeptOpen ? 'rotate-180' : ''}`} />
              </button>

              {rosterDeptOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setRosterDeptOpen(false)} />
                  <div className="absolute right-0 top-[40px] z-30 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden py-1 w-[150px]">
                    {['All Departments', 'Management', 'Operations', 'Security', 'Support'].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setRosterDept(d)
                          setRosterDeptOpen(false)
                        }}
                        className="w-full h-9 px-3 text-left text-[12px] text-gray-900 hover:bg-slate-50 transition-colors font-medium flex items-center"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-[180px]">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                <FiSearch className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={rosterSearch}
                onChange={(e) => setRosterSearch(e.target.value)}
                placeholder="Search ID or Name"
                className="w-full h-9 pl-9 pr-3 text-[12px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Roster Middle Div (Table) */}
        <div className="w-full overflow-x-auto min-h-[299.5px] bg-white">
          <table className="w-full border-collapse text-left text-[12.5px] min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-[#E0E3E5] text-slate-400 text-[11px] font-extrabold uppercase tracking-wider">
                <th className="px-6 py-4">Employee ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Gross Salary</th>
                <th className="px-6 py-4">Net Salary</th>
                <th className="px-6 py-4">Payment Date</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.length > 0 ? (
                filteredRoster.map(emp => (
                  <tr key={emp.id} className="border-b border-[#F1F5F9] hover:bg-slate-50/40 transition-colors">
                    <td className="px-6 py-4 text-[#64748B] font-semibold">{emp.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center text-[11px] text-indigo-650 font-bold shrink-0">
                          {emp.initials}
                        </div>
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-650 font-bold">{emp.gross}</td>
                    <td className="px-6 py-4 text-slate-650 font-bold">{emp.net}</td>
                    <td className="px-6 py-4 text-slate-400 font-semibold">{emp.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10.5px] font-bold ${
                        emp.status === 'Paid'
                          ? 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
                          : emp.status === 'Processing'
                            ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]'
                            : 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400 font-medium">
                    No roster entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Roster Bottom Div (Pagination) */}
        <div className="h-[65px] px-6 bg-white border-t border-[#E0E3E5] flex items-center justify-between text-[12px]">
          <span className="text-slate-400 font-semibold">
            Showing 1 to {filteredRoster.length} of 428 entries
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRosterPage(p => Math.max(1, p - 1))}
              type="button"
              className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer"
            >
              <FiChevronLeft className="w-3.5 h-3.5" />
            </button>
            
            {[1, 2, 3].map(page => (
              <button
                key={page}
                onClick={() => setRosterPage(page)}
                type="button"
                className={`w-7 h-7 rounded-md border text-[11.5px] font-bold flex items-center justify-center cursor-pointer transition-colors ${
                  rosterPage === page
                    ? 'bg-black border-black text-white'
                    : 'border-slate-100 text-slate-550 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <span className="text-slate-400 px-1 font-bold">...</span>

            <button
              onClick={() => setRosterPage(p => Math.min(3, p + 1))}
              type="button"
              className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer"
            >
              <FiChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Leave Management Content Component ───────────────────────────────────────
function LeaveManagementContent() {
  const [leaveDept, setLeaveDept] = useState('All Departments')
  const [leaveDeptOpen, setLeaveDeptOpen] = useState(false)
  const [leavePage, setLeavePage] = useState(1)
  const [requests, setRequests] = useState([
    { id: 1, name: 'Sarah Jenkins', dept: 'Engineering', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', type: 'Vacation', duration: 'Dec 15 - Dec 22, 2023', days: 5, status: 'Pending' },
    { id: 2, name: 'Marcus Chen', dept: 'Design', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', type: 'Sick Leave', duration: 'Nov 14 - Nov 15, 2023', days: 2, status: 'Approved' },
    { id: 3, name: 'Elena Rodriguez', dept: 'Marketing', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80', type: 'Personal', duration: 'Nov 20, 2023', days: 1, status: 'Pending' },
    { id: 4, name: 'David Morgan', dept: 'Engineering', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', type: 'Vacation', duration: 'Dec 24 - Dec 28, 2023', days: 4, status: 'Pending' },
    { id: 5, name: 'Emily White', dept: 'Operations', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80', type: 'Maternity Leave', duration: 'Jan 05 - Mar 05, 2024', days: 60, status: 'Approved' },
    { id: 6, name: 'John Doe', dept: 'Security', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80', type: 'Personal', duration: 'Nov 30, 2023', days: 1, status: 'Rejected' },
    { id: 7, name: 'Alice Smith', dept: 'Support', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', type: 'Sick Leave', duration: 'Nov 22 - Nov 23, 2023', days: 2, status: 'Approved' },
    { id: 8, name: 'Robert Jones', dept: 'Security', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80', type: 'Vacation', duration: 'Dec 01 - Dec 05, 2023', days: 5, status: 'Pending' },
    { id: 9, name: 'Rachel Green', dept: 'Marketing', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', type: 'Personal', duration: 'Nov 29, 2023', days: 1, status: 'Pending' },
    { id: 10, name: 'Michael Scott', dept: 'Management', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80', type: 'Vacation', duration: 'Dec 20 - Jan 03, 2024', days: 14, status: 'Approved' },
    { id: 11, name: 'Pam Beesly', dept: 'Design', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=80&q=80', type: 'Sick Leave', duration: 'Nov 18, 2023', days: 1, status: 'Approved' },
    { id: 12, name: 'Jim Halpert', dept: 'Engineering', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', type: 'Personal', duration: 'Nov 25, 2023', days: 1, status: 'Pending' }
  ])

  const handleApprove = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req))
  }

  const handleReject = (id) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req))
  }

  // Filter requests
  const filteredRequests = requests.filter(req => {
    return leaveDept === 'All Departments' || req.dept === leaveDept
  })

  // Pagination
  const itemsPerPage = 3
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / itemsPerPage))
  
  // Adjust current page if it's out of range after filtering
  const activePage = Math.min(leavePage, totalPages)

  const paginatedRequests = filteredRequests.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)

  const startEntry = filteredRequests.length === 0 ? 0 : (activePage - 1) * itemsPerPage + 1
  const endEntry = Math.min(activePage * itemsPerPage, filteredRequests.length)

  // Total Pending count for card 1
  const pendingCount = requests.filter(r => r.status === 'Pending').length

  return (
    <motion.div
      key="leave-management"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full flex flex-col gap-6 bg-[#F8FAFC] p-6 text-left"
    >
      {/* FIRST DIV: Stats Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {/* Card 1 */}
        <div className="w-full h-[147px] flex flex-col justify-between px-[14px] py-5 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs">
          <div className="flex flex-col text-left">
            <span className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide">Pending Approvals</span>
            <span className="text-[30px] font-black text-gray-900 leading-none mt-2">{pendingCount}</span>
          </div>
          <div className="text-[11px] font-semibold text-[#EF4444] flex items-center gap-1">
            <FiTrendingUp className="w-3.5 h-3.5" />
            <span>+3 since yesterday</span>
          </div>
        </div>

        {/* Card 2 – NO "Active Today" text */}
        <div className="w-full h-[147px] flex flex-col justify-between px-[14px] py-5 rounded-lg bg-[#FAF5FF] border border-[#D8B4FE] shadow-2xs">
          <div className="flex flex-col text-left">
            <span className="text-[11.5px] font-bold text-violet-700 uppercase tracking-wide">Staff on Leave Today</span>
            <span className="text-[30px] font-black text-slate-900 leading-none mt-2">4</span>
          </div>
        </div>

        {/* Card 3 – value sits just above the progress bar */}
        <div className="w-full h-[147px] flex flex-col px-[14px] py-5 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs">
          <span className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide text-left">Remaining Annual Leave</span>
          <div className="flex-1 flex flex-col justify-end gap-2">
            <span className="text-[20px] font-black text-gray-900 leading-none text-left">
              14.5 <span className="text-[12px] font-normal text-slate-500">days avg</span>
            </span>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-[#4F46E5] rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="w-full h-[147px] flex flex-col justify-between px-[14px] py-5 rounded-lg bg-white border border-[#E2E8F0] shadow-2xs">
          <span className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wide text-left">Upcoming Holidays</span>
          <div className="flex flex-col text-left">
            <span className="text-[13.5px] font-extrabold text-gray-900 leading-tight">Thanksgiving Break</span>
            <span className="text-[11px] text-slate-400 font-semibold mt-1">Nov 28 – Nov 29</span>
          </div>
        </div>
      </div>

      {/* SECOND DIV: Recent Requests Table Card */}
      <div className="w-full min-h-[338px] rounded-[10px] bg-white border border-[#E2E8F0] shadow-2xs flex flex-col overflow-hidden shrink-0">
        
        {/* HEADER DIV */}
        <div className="w-full h-[67px] px-4 bg-[#F7F9FB] border-b border-[#C7C4D8] flex items-center justify-between shrink-0">
          <h4 className="text-[15px] font-bold text-slate-800">Recent Requests</h4>
          
          {/* Department Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLeaveDeptOpen(prev => !prev)}
              className="h-[36px] px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
            >
              <span>{leaveDept}</span>
              <FiChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${leaveDeptOpen ? 'rotate-180' : ''}`} />
            </button>

            {leaveDeptOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setLeaveDeptOpen(false)} />
                <div className="absolute right-0 top-[40px] z-30 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden py-1 w-[160px]">
                  {['All Departments', 'Engineering', 'Design', 'Marketing', 'Operations', 'Support', 'Security', 'Management'].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setLeaveDept(d)
                        setLeavePage(1)
                        setLeaveDeptOpen(false)
                      }}
                      className="w-full h-9 px-3.5 text-left text-[12px] text-gray-900 hover:bg-slate-50 transition-colors font-medium flex items-center"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* MIDDLE TABLE DIV */}
        <div className="w-full overflow-x-auto min-h-[208px] bg-white">
          <table className="w-full border-collapse text-left text-[13px] min-w-[700px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-slate-450 text-[10.5px] font-bold uppercase tracking-wider h-11">
                <th className="px-4 py-2 font-bold w-[30%]">STAFF MEMBER</th>
                <th className="px-4 py-2 font-bold w-[18%]">LEAVE TYPE</th>
                <th className="px-4 py-2 font-bold w-[25%]">DURATION</th>
                <th className="px-4 py-2 font-bold text-center w-[9%]">DAYS</th>
                <th className="px-4 py-2 text-center w-[10%]">STATUS</th>
                <th className="px-4 py-2 text-center w-[12%]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {paginatedRequests.length > 0 ? (
                paginatedRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/20 transition-colors h-[54px]">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={req.avatar} 
                          alt={req.name} 
                          className="w-[32px] h-[32px] rounded-full object-cover border border-slate-200"
                        />
                        <div className="flex flex-col text-left leading-tight">
                          <span className="font-bold text-slate-900">{req.name}</span>
                          <span className="text-[11px] text-slate-400 font-semibold">{req.dept}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 font-semibold text-slate-700">{req.type}</td>
                    <td className="px-4 py-2 text-slate-400 font-medium">{req.duration}</td>
                    <td className="px-4 py-2 text-center font-bold text-slate-700">{req.days}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10.5px] font-bold ${
                        req.status === 'Approved'
                          ? 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
                          : req.status === 'Rejected'
                            ? 'bg-[#FDE8E8] text-[#9B1C1C] border-[#FBD5D5]'
                            : 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {req.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleApprove(req.id)}
                              type="button"
                              className="w-6 h-6 rounded-full hover:bg-emerald-50 flex items-center justify-center transition-colors cursor-pointer"
                              title="Approve"
                            >
                              <FiCheckCircle className="w-5 h-5 text-emerald-500" />
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              type="button"
                              className="w-6 h-6 rounded-full hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                              title="Reject"
                            >
                              <FiXCircle className="w-5 h-5 text-[#F97316]" />
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-black transition-colors cursor-pointer"
                          >
                            <FiMoreVertical className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400 font-bold">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER DIV */}
        <div className="w-full h-[61px] px-4 border-t border-[#E2E8F0] flex items-center justify-between shrink-0 text-[12.5px]">
          <span className="text-slate-400 font-semibold">
            Showing {startEntry} to {endEntry} of {filteredRequests.length} entries
          </span>

          <div className="flex items-center gap-1 select-none text-[12.5px]">
            {/* Prev button */}
            <button
              onClick={() => setLeavePage(p => Math.max(1, p - 1))}
              disabled={activePage === 1}
              type="button"
              className={`h-7 px-2.5 rounded-md border flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                activePage === 1 ? 'text-slate-300 border-slate-100 cursor-not-allowed' : 'text-slate-500 border-slate-200 hover:text-black hover:border-slate-400'
              }`}
            >
              <FiChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1
              return (
                <button
                  key={p}
                  onClick={() => setLeavePage(p)}
                  type="button"
                  className={`w-7 h-7 rounded-md flex items-center justify-center cursor-pointer font-bold ${
                    activePage === p ? 'bg-black text-white' : 'text-slate-550 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              )
            })}

            {/* Next button */}
            <button
              onClick={() => setLeavePage(p => Math.min(totalPages, p + 1))}
              disabled={activePage === totalPages}
              type="button"
              className={`h-7 px-2.5 rounded-md border flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                activePage === totalPages ? 'text-slate-300 border-slate-100 cursor-not-allowed' : 'text-slate-500 border-slate-200 hover:text-black hover:border-slate-400'
              }`}
            >
              Next
              <FiChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

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
  const [inviteRole, setInviteRole] = useState('Super Admin')
  const [inviteDept, setInviteDept] = useState('Management')
  const [requirePasswordChange, setRequirePasswordChange] = useState(true)
  const [enable2FA, setEnable2FA] = useState(false)
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false)
  const [inviteMethod, setInviteMethod] = useState('copy')
  const [personalMessage, setPersonalMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedStaffId, setSelectedStaffId] = useState(null)

  // State to support adding new staff members locally
  const [staffList, setStaffList] = useState(initialStaff)

  // Roles & Permissions states
  const [roles, setRoles] = useState(ROLES)
  const [permissions, setPermissions] = useState(buildInitialPermissions)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [newRoleDesc, setNewRoleDesc] = useState('')
  const [newRoleTemplate, setNewRoleTemplate] = useState('')
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false)

  const togglePermissions = (modKey, perm, roleKey) => {
    setPermissions(prev => ({
      ...prev,
      [modKey]: {
        ...prev[modKey],
        [perm]: {
          ...prev[modKey]?.[perm],
          [roleKey]: !prev[modKey]?.[perm]?.[roleKey]
        }
      }
    }))
  }

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      alert('Role Name is required')
      return
    }

    const roleKey = newRoleName.trim().toLowerCase().replace(/\s+/g, '')
    // Check if role key already exists
    if (roles.some(r => r.key === roleKey)) {
      alert('A role with this name already exists.')
      return
    }

    const newRoleObj = {
      key: roleKey,
      label: newRoleName.trim().toUpperCase(),
      users: '0 users',
      readOnly: false
    }

    // Add role to roles state
    setRoles(prev => [...prev, newRoleObj])

    // Copy permissions from base template if selected
    const templateKey = newRoleTemplate ? newRoleTemplate.toLowerCase().replace(/\s+/g, '') : ''

    setPermissions(prev => {
      const updated = { ...prev }
      MODULES.forEach(mod => {
        if (!updated[mod.key]) updated[mod.key] = {}
        mod.perms.forEach(perm => {
          if (!updated[mod.key][perm]) updated[mod.key][perm] = {}
          
          let templateVal = false
          if (templateKey) {
            templateVal = prev[mod.key]?.[perm]?.[templateKey] || false
          }
          updated[mod.key][perm][roleKey] = templateVal
        })
      })
      return updated
    })

    // Reset and close
    setNewRoleName('')
    setNewRoleDesc('')
    setNewRoleTemplate('')
    setIsCreateRoleOpen(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://admin.qcommerce.io/invite/tkn_7xK9PqR3vLnZ5w')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
    setInviteRole('Super Admin')
    setInviteDept('Management')
    setRequirePasswordChange(true)
    setEnable2FA(false)
    setDeptDropdownOpen(false)
    setInviteMethod('copy')
    setPersonalMessage('')
    setCopied(false)
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

  // If a staff member is selected, render the details page
  if (selectedStaffId !== null) {
    return <StaffDetails staffId={selectedStaffId} onBack={() => setSelectedStaffId(null)} />
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
          <AnimatePresence mode="wait">
            {activeTab === 'Roles & Permissions' ? (
              <motion.div
                key="roles-actions"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="flex items-center"
              >
                <button
                  onClick={() => setIsCreateRoleOpen(true)}
                  className="h-[38px] px-4 rounded-lg bg-black text-white text-[12.5px] font-medium hover:bg-zinc-900 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <FiShield className="w-4 h-4 text-white stroke-[1.8]" />
                  <span>Create New Role</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="default-actions"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="flex items-center gap-2"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
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
                              onClick={() => setSelectedStaffId(staff.id)}
                              className="hover:bg-slate-50/50 transition-colors cursor-pointer"
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
                                    onClick={(e) => { e.stopPropagation(); setSelectedStaffId(staff.id) }}
                                    type="button"
                                    className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                  >
                                    <FiEye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); console.log('Edit Staff:', staff.id) }}
                                    type="button"
                                    className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                  >
                                    <FiEdit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); console.log('Actions Menu:', staff.id) }}
                                    type="button"
                                    className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                                  >
                                    <FiMoreVertical className="w-4 h-4" />
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
            ) : activeTab === 'Roles & Permissions' ? (
              <RolesPermissionsContent roles={roles} permissions={permissions} toggle={togglePermissions} />
            ) : activeTab === 'Payroll management' ? (
              <PayrollManagementContent />
            ) : activeTab === 'Leave management' ? (
              <LeaveManagementContent />
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
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${inviteStep >= 1 ? 'bg-black text-white' : 'bg-[#E2E8F0] text-slate-500'}`}>
                    {inviteStep > 1 ? <FiCheck className="w-3 h-3 text-white" strokeWidth={3} /> : '1'}
                  </span>
                  <span className={`${inviteStep >= 1 ? 'text-slate-900 font-extrabold' : 'text-slate-400'}`}>Personal Details</span>
                </div>
                <div className={`flex-1 mx-4 h-[1px] transition-colors duration-300 ${inviteStep >= 2 ? 'bg-black' : 'bg-[#E2E8F0]'}`} />
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${inviteStep >= 2 ? 'bg-black text-white' : 'bg-[#E2E8F0] text-slate-500'}`}>
                    {inviteStep > 2 ? <FiCheck className="w-3 h-3 text-white" strokeWidth={3} /> : '2'}
                  </span>
                  <span className={`${inviteStep >= 2 ? 'text-slate-900 font-extrabold' : 'text-slate-400'}`}>Role & Access</span>
                </div>
                <div className={`flex-1 mx-4 h-[1px] transition-colors duration-300 ${inviteStep >= 3 ? 'bg-black' : 'bg-[#E2E8F0]'}`} />
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${inviteStep >= 3 ? 'bg-black text-white' : 'bg-[#E2E8F0] text-slate-500'}`}>3</span>
                  <span className={`${inviteStep >= 3 ? 'text-slate-900 font-extrabold' : 'text-slate-400'}`}>Send Invite</span>
                </div>
              </div>

              {/* STEP CONTENT: Padding 24px (p-6) */}
              <div className="flex-1 min-h-[320px] max-h-[500px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {inviteStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 flex flex-col gap-5 text-[12.5px] text-slate-700"
                    >
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
                    </motion.div>
                  )}

                  {inviteStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 flex flex-col gap-5 text-[12.5px] text-slate-700 bg-white"
                    >
                      {/* ASSIGN ROLE SECTION */}
                      <div className="flex flex-col gap-2.5 text-left">
                        <label className="font-semibold text-slate-700 text-[13px]">Assign Role <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-1 gap-2.5">
                          {[
                            {
                              role: 'Super Admin',
                              desc: 'Full system access, unrestricted.',
                              badgeColor: 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]',
                              iconColor: 'text-[#6D28D9]'
                            },
                            {
                              role: 'Admin',
                              desc: 'Manage operations, no destructive actions.',
                              badgeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
                              iconColor: 'text-[#1D4ED8]'
                            },
                            {
                              role: 'Access Manager',
                              desc: 'Manage staff & vendor access only.',
                              badgeColor: 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]',
                              iconColor: 'text-[#C2410C]'
                            },
                            {
                              role: 'Vendor Staff',
                              desc: 'Limited product & order views.',
                              badgeColor: 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]',
                              iconColor: 'text-[#475569]'
                            }
                          ].map((r) => {
                            const isSel = inviteRole === r.role
                            return (
                              <motion.div
                                layout
                                whileHover={{ scale: 1.005, y: -0.5 }}
                                whileTap={{ scale: 0.995 }}
                                key={r.role}
                                onClick={() => setInviteRole(r.role)}
                                className={`w-full px-4 flex items-center justify-between rounded-lg cursor-pointer transition-all select-none ${
                                  isSel ? 'border-2 border-black bg-white shadow-2xs' : 'border border-[#E2E8F0] hover:border-slate-350 bg-white'
                                }`}
                                style={{ height: '44px' }}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-bold shrink-0 ${r.badgeColor}`}>
                                    <FiShield className={`w-3.5 h-3.5 ${r.iconColor}`} />
                                    <span>{r.role}</span>
                                  </div>
                                  <span className="text-[12.5px] text-slate-400 font-semibold leading-none truncate mt-0.5">
                                    {r.desc}
                                  </span>
                                </div>

                                <AnimatePresence>
                                  {isSel && (
                                    <motion.div
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0, opacity: 0 }}
                                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                      className="w-[18px] h-[18px] rounded-full bg-black flex items-center justify-center text-white shrink-0"
                                    >
                                      <FiCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>

                      {/* DEPARTMENT SECTION */}
                      <div className="flex flex-col gap-1.5 text-left relative">
                        <label className="font-semibold text-slate-700 text-[13px]">Department <span className="text-red-500">*</span></label>
                        <button
                          type="button"
                          onClick={() => setDeptDropdownOpen((prev) => !prev)}
                          className="w-full h-11 px-4 flex items-center justify-between border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                              <line x1="9" y1="22" x2="9" y2="16" />
                              <line x1="15" y1="22" x2="15" y2="16" />
                              <line x1="9" y1="16" x2="15" y2="16" />
                              <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
                            </svg>
                            <span>{inviteDept}</span>
                          </div>
                          <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${deptDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {deptDropdownOpen && (
                          <>
                            {/* Backdrop to close dropdown when clicking outside */}
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setDeptDropdownOpen(false)}
                            />
                            <div className="absolute left-0 right-0 top-[68px] z-20 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden py-1">
                              {['Management', 'Operations', 'Security', 'Support'].map((dept) => (
                                <button
                                  key={dept}
                                  type="button"
                                  onClick={() => {
                                    setInviteDept(dept)
                                    setDeptDropdownOpen(false)
                                  }}
                                  className="w-full h-10 px-4 text-left text-[13px] text-gray-900 hover:bg-slate-50 transition-colors font-medium flex items-center"
                                >
                                  {dept}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* ACCOUNT SECURITY DEFAULTS CARD */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[10px] p-4 flex flex-col gap-3.5 mt-1">
                        <span className="text-[13px] font-bold text-slate-800">
                          Account Security Defaults
                        </span>

                        <div className="flex flex-col gap-3">
                          {/* Option 1: Require password change on first login */}
                          <div className="flex items-center justify-between">
                            <span className="text-[12.5px] text-slate-600 font-semibold">
                              Require password change on first login
                            </span>
                            <button
                              type="button"
                              onClick={() => setRequirePasswordChange((prev) => !prev)}
                              className={`w-[38px] h-[22px] rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
                                requirePasswordChange ? 'bg-black' : 'bg-slate-200'
                              }`}
                            >
                              <motion.span
                                layout
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm block ${
                                  requirePasswordChange ? 'translate-x-[16px]' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>

                          {/* Option 2: Enable two factor authentication */}
                          <div className="flex items-center justify-between">
                            <span className="text-[12.5px] text-slate-600 font-semibold">
                              Enable two factor authentication
                            </span>
                            <button
                              type="button"
                              onClick={() => setEnable2FA((prev) => !prev)}
                              className={`w-[38px] h-[22px] rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
                                enable2FA ? 'bg-black' : 'bg-slate-200'
                              }`}
                            >
                              <motion.span
                                layout
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm block ${
                                  enable2FA ? 'translate-x-[16px]' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {inviteStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 flex flex-col gap-5 text-[12.5px] text-slate-700 bg-white"
                    >
                      {/* STAFF PREVIEW CARD */}
                      <div className="w-full border border-[#E2E8F0] rounded-[10px] bg-[#F8FAFC] p-4 flex items-center gap-3.5" style={{ height: '80px' }}>
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-[#F1F5F9] shrink-0" />
                        {/* Content */}
                        <div className="flex flex-col text-left justify-center overflow-hidden">
                          <span className="text-[13.5px] font-bold text-gray-900 leading-tight">
                            {firstName} {lastName}
                          </span>
                          <span className="text-[12px] text-slate-400 font-semibold leading-none mt-1">
                            {inviteEmail}
                          </span>
                          <div className="flex items-center gap-2 mt-1.5 shrink-0">
                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-bold ${getRoleColors(inviteRole).bg} ${getRoleColors(inviteRole).text} ${getRoleColors(inviteRole).border}`}>
                              <FiShield className="w-3 h-3" />
                              <span>{inviteRole}</span>
                            </div>
                            <span className="text-[11.5px] text-slate-400 font-bold">
                              {inviteDept}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* INVITE METHOD SECTION */}
                      <div className="flex flex-col gap-2.5 text-left">
                        <span className="font-semibold text-slate-700 text-[13px]">Invite Method</span>
                        <div className="flex gap-4">
                          {/* CARD 1: Send via Email */}
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => setInviteMethod('email')}
                            className={`flex-1 flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer text-left transition-all select-none ${
                              inviteMethod === 'email' ? 'border-2 border-black bg-white shadow-2xs' : 'border border-[#E2E8F0] hover:border-slate-350 bg-white'
                            }`}
                            style={{ height: '80px' }}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              inviteMethod === 'email' ? 'bg-black text-white' : 'bg-[#F1F5F9] text-slate-500'
                            }`}>
                              <FiMail className="w-[18px] h-[18px]" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13.5px] font-bold text-gray-900 leading-tight">Send via Email</span>
                              <span className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-snug">Invite link sent to their inbox</span>
                            </div>
                          </motion.button>

                          {/* CARD 2: Copy Invite Link */}
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={() => setInviteMethod('copy')}
                            className={`flex-1 flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer text-left transition-all select-none ${
                              inviteMethod === 'copy' ? 'border-2 border-black bg-white shadow-2xs' : 'border border-[#E2E8F0] hover:border-slate-350 bg-white'
                            }`}
                            style={{ height: '80px' }}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              inviteMethod === 'copy' ? 'bg-black text-white' : 'bg-[#F1F5F9] text-slate-500'
                            }`}>
                              <FiCopy className="w-[18px] h-[18px]" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13.5px] font-bold text-gray-900 leading-tight">Copy Invite Link</span>
                              <span className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-snug">Share the link manually</span>
                            </div>
                          </motion.button>
                        </div>
                      </div>

                      {/* INVITE LINK BOX */}
                      <AnimatePresence mode="wait">
                        {inviteMethod === 'copy' && (
                          <motion.div
                            key="link-box"
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between">
                              <span className="text-[12px] text-slate-500 font-medium select-all truncate mr-4">
                                https://admin.qcommerce.io/invite/tkn_7xK9PqR3vLnZ5w
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyLink}
                                className="h-7 px-3 bg-black hover:bg-zinc-900 text-white text-[11px] font-bold rounded-md flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                              >
                                <FiCopy className="w-3.5 h-3.5 text-white" />
                                <span>{copied ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* PERSONAL MESSAGE SECTION */}
                      <div className="flex flex-col gap-1.5 text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-slate-700 text-[13px]">Personal Message</span>
                          <span className="text-[11px] text-slate-400 font-semibold">(optional)</span>
                        </div>
                        <textarea
                          value={personalMessage}
                          onChange={(e) => setPersonalMessage(e.target.value)}
                          placeholder="Welcome to the team! We're excited to have you on board..."
                          className="w-full p-3 border border-[#E2E8F0] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium resize-none"
                          style={{ height: '80px' }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                      <FiSend className="w-3.5 h-3.5 text-white" />
                      <span>Send Invite</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE NEW ROLE MODAL */}
      <AnimatePresence>
        {isCreateRoleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateRoleOpen(false)}
              className="absolute inset-0 cursor-pointer"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-[500px] bg-white rounded-[14px] shadow-[0px_1px_3px_rgba(0,0,0,0.1),_0px_20px_25px_-5px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col text-left z-10"
            >
              {/* HEADER: Height around 75px, Padding 24px */}
              <div className="h-[75px] px-6 py-4 flex items-center justify-between border-b border-[#E2E8F0] shrink-0 bg-white">
                <h3 className="text-xl font-semibold text-[#111827]">
                  Create New Role
                </h3>
                <button
                  onClick={() => setIsCreateRoleOpen(false)}
                  className="text-slate-400 hover:text-black transition-colors cursor-pointer p-1"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* BODY: Padding 24px */}
              <div className="p-6 flex flex-col gap-6 font-sans">
                {/* Field 1: Role Name */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Marketing Manager"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="w-full h-[42px] px-3 border border-[#CBD5E1] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-450 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-medium"
                  />
                </div>

                {/* Field 2: Description */}
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Description
                  </label>
                  <textarea
                    placeholder="Briefly describe the responsibilities of this role..."
                    value={newRoleDesc}
                    onChange={(e) => setNewRoleDesc(e.target.value)}
                    className="w-full h-[85px] p-3 border border-[#CBD5E1] rounded-lg bg-white text-[13px] text-gray-900 placeholder:text-slate-455 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-medium resize-none"
                  />
                </div>

                {/* Field 3: Base Role Template */}
                <div className="flex flex-col gap-2 text-left relative">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Base Role Template
                  </label>
                  <button
                    type="button"
                    onClick={() => setTemplateDropdownOpen((prev) => !prev)}
                    className="w-full h-[42px] px-3 flex items-center justify-between border border-[#CBD5E1] rounded-lg bg-white text-[13px] text-gray-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-medium cursor-pointer"
                  >
                    <span className={newRoleTemplate ? 'text-gray-900' : 'text-slate-400 font-normal'}>
                      {newRoleTemplate || ''}
                    </span>
                    <FiChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${templateDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {templateDropdownOpen && (
                    <>
                      {/* Backdrop to close templates list */}
                      <div 
                        className="fixed inset-0 z-20" 
                        onClick={() => setTemplateDropdownOpen(false)}
                      />
                      <div className="absolute left-0 right-0 top-[74px] z-30 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden py-1 max-h-[160px] overflow-y-auto">
                        {roles.map((r) => (
                          <button
                            key={r.key}
                            type="button"
                            onClick={() => {
                              setNewRoleTemplate(r.label)
                              setTemplateDropdownOpen(false)
                            }}
                            className="w-full h-10 px-3 text-left text-[13px] text-gray-900 hover:bg-slate-50 transition-colors font-medium flex items-center"
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* FOOTER: Height 72px, Background #F8FAFC */}
              <div className="h-[72px] bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setNewRoleName('')
                    setNewRoleDesc('')
                    setNewRoleTemplate('')
                    setIsCreateRoleOpen(false)
                  }}
                  className="h-10 px-5 rounded-lg border border-[#CBD5E1] bg-white text-[13px] font-medium text-[#334155] hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateRole}
                  className="h-10 px-5 rounded-lg bg-[#000000] text-white text-[13px] font-medium hover:bg-zinc-900 cursor-pointer shadow-sm transition-all"
                >
                  Create Role
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
