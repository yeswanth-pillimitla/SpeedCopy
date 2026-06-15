import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import CustomerDetails from './CustomerDetails.jsx'
import { 
  FiChevronDown, 
  FiDownload, 
  FiUpload, 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiMail, 
  FiPhone, 
  FiEye, 
  FiEdit, 
  FiMoreHorizontal, 
  FiArrowUpRight, 
  FiArrowDownRight,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import QuickActions from '../components/QuickActions.jsx'

const initialCustomers = [
  { id: 1, name: 'Michael Chen', joined: 'Joined Oct 12, 2023', email: 'michael.c@example.com', phone: '+1 (555) 123-4567', orders: 12, spent: '₹1,245.00', status: 'Active' },
  { id: 2, name: 'Emma Wilson', joined: 'Joined Mar 05, 2023', email: 'emma.w@example.com', phone: '+1 (555) 987-6543', orders: 34, spent: '₹4,520.50', status: 'Active' },
  { id: 3, name: 'James Rodriguez', joined: 'Joined Jan 22, 2024', email: 'j.rodriguez@example.com', phone: '+1 (555) 456-7890', orders: 2, spent: '₹129.99', status: 'Inactive' },
  { id: 4, name: 'Sophia Taylor', joined: 'Joined Nov 30, 2023', email: 'sophia.t@example.com', phone: '+1 (555) 234-5678', orders: 8, spent: '₹845.20', status: 'Active' },
  { id: 5, name: 'William Brown', joined: 'Joined Sep 18, 2023', email: 'will.b@example.com', phone: '+1 (555) 876-5432', orders: 15, spent: '₹2,100.00', status: 'Active' },
  { id: 6, name: 'Olivia Martinez', joined: 'Joined Feb 10, 2024', email: 'olivia.m@example.com', phone: '+1 (555) 345-6789', orders: 1, spent: '₹45.00', status: 'Inactive' },
  { id: 7, name: 'Alexander Lee', joined: 'Joined Dec 05, 2023', email: 'alex.lee@example.com', phone: '+1 (555) 765-4321', orders: 5, spent: '₹540.75', status: 'Active' }
]

const statsCards = [
  { title: 'Total Customers', value: '33,493', change: '+5.4%', isPositive: true },
  { title: 'Active Customers', value: '28,104', change: '+12.5%', isPositive: true },
  { title: 'Inactive Customers', value: '5,389', change: '-2.4%', isPositive: false },
  { title: 'Repeated Orders', value: '400', change: '+18.2%', isPositive: true },
  { title: 'Avg. order value', value: '₹400', change: '+18.2%', isPositive: true }
]

function Customers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const customerId = searchParams.get('id')

  useEffect(() => {
    document.title = 'Customers -SpeedCopy'
  }, [])

  const [selectedRange, setSelectedRange] = useState('7days') // '7days', '30days', 'year', 'custom'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [tempStartDate, setTempStartDate] = useState('')
  const [tempEndDate, setTempEndDate] = useState('')
  const [customRange, setCustomRange] = useState({ start: '', end: '' })
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  const rangeLabels = {
    '7days': 'Last 7 days',
    '30days': 'Last 30 days',
    'year': 'Last 1 Year',
    'custom': customRange.start && customRange.end
      ? `${new Date(customRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(customRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
      : 'Custom Range'
  }

  const handleRangeSelect = (range) => {
    setSelectedRange(range)
    if (range !== 'custom') {
      setIsDropdownOpen(false)
    }
  }

  const handleCustomApply = () => {
    if (tempStartDate && tempEndDate) {
      setCustomRange({ start: tempStartDate, end: tempEndDate })
      setSelectedRange('custom')
      setIsDropdownOpen(false)
    }
  }

  const handleToggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleToggleAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredCustomers.map(c => c.id))
    } else {
      setSelectedIds([])
    }
  }

  const filteredCustomers = initialCustomers.filter(cust => {
    // Tab filtering
    if (activeTab === 'Active' && cust.status !== 'Active') return false
    if (activeTab === 'Inactive' && cust.status !== 'Inactive') return false
    if (activeTab === 'New' && !cust.joined.includes('2024')) return false

    // Search query filtering
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      return (
        cust.name.toLowerCase().includes(q) ||
        cust.email.toLowerCase().includes(q) ||
        cust.phone.toLowerCase().includes(q)
      )
    }
    return true
  })

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  }

  const cardsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  }

  const cardItem = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  const tableContainer = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  }

  if (customerId) {
    return <CustomerDetails customerId={parseInt(customerId)} onBack={() => setSearchParams({})} />
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full flex flex-col gap-6"
    >
        
        {/* 1 - HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full h-auto md:h-[56px]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-black text-gray-900 tracking-tight leading-none font-sans">
                Customers
              </h1>
              
              {/* Date selector button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-full px-2.5 py-1 bg-white shadow-xs flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-all focus:outline-none animate-pulse-slow"
                >
                  {rangeLabels[selectedRange]} 
                  <FiChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                  <>
                    {/* Invisible backdrop for closing when clicking outside */}
                    <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute left-0 mt-1.5 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-3.5 origin-top-left flex flex-col gap-1"
                    >
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('7days')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${
                          selectedRange === '7days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Last 7 days
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('30days')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${
                          selectedRange === '30days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Last 30 days (1 Month)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('year')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${
                          selectedRange === 'year' ? 'bg-gray-900 text-white' : 'text-gray-750 hover:bg-gray-50'
                        }`}
                      >
                        Last 1 Year
                      </button>

                      <div className="border-t border-gray-100 my-2 pt-2">
                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-3 mb-2 font-sans">Custom Date Range</div>
                        <div className="flex flex-col gap-2.5 px-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 font-bold font-sans">Start Date</label>
                            <input
                              type="date"
                              value={tempStartDate}
                              onChange={(e) => setTempStartDate(e.target.value)}
                              max={tempEndDate || undefined}
                              className="w-full text-[12px] font-medium border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-900 font-sans"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 font-bold font-sans">End Date</label>
                            <input
                              type="date"
                              value={tempEndDate}
                              onChange={(e) => setTempEndDate(e.target.value)}
                              min={tempStartDate || undefined}
                              className="w-full text-[12px] font-medium border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-900 font-sans"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleCustomApply}
                            disabled={!tempStartDate || !tempEndDate}
                            className="w-full h-8 bg-gray-900 hover:bg-black disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-lg text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center mt-1 font-sans"
                          >
                            Apply Range
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
            
            <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
              Manage your customer relationships and view their history.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-650 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <FiDownload className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-9 px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-650 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <FiUpload className="w-3.5 h-3.5 text-slate-500 animate-pulse-slow" />
              <span>Import</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-9 px-3.5 rounded-lg bg-black text-white text-[12px] font-bold hover:bg-zinc-900 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <FiPlus className="w-4 h-4 text-white stroke-[2.5]" />
              <span>Add Customer</span>
            </motion.button>
          </div>
        </div>

        {/* 2 - QUICK ACTIONS SECTION */}
        <QuickActions />

        {/* 3 - CUSTOMER STAT CARDS */}
        <motion.div 
          variants={cardsContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-5 gap-3 w-full pt-2"
        >
          {statsCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardItem}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-white border border-[#E2E8F0] rounded-[14px] p-4 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] h-[125px] sm:h-[135px] md:h-[149.6px]"
            >
              <span className="text-[11px] font-bold text-gray-400 tracking-tight leading-none">
                {card.title}
              </span>
              <div className="text-[20px] font-black text-gray-900 tracking-tight mt-1 leading-none">
                {card.value}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 mt-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 leading-none w-fit shrink-0 ${
                  card.isPositive 
                    ? 'bg-[#DEF7EC] text-[#03543F]' 
                    : 'bg-[#FDE8E8] text-[#9B1C1C]'
                }`}>
                  {card.isPositive ? <FiArrowUpRight className="w-2.5 h-2.5 stroke-[2.5]" /> : <FiArrowDownRight className="w-2.5 h-2.5 stroke-[2.5]" />}
                  {card.change}
                </span>
                <span className="text-[9.5px] text-gray-400 font-semibold truncate leading-none">
                  vs last month
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 4 - CUSTOMER TABLE SECTION */}
        <motion.div
          variants={tableContainer}
          initial="hidden"
          animate="show"
          className="bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col shadow-xs overflow-hidden w-full min-h-[450px] md:min-h-[520px]"
        >
          {/* TABLE TOP FILTER SECTION */}
          <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#E2E8F0]">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              {['All', 'Active', 'Inactive', 'New'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[12.5px] font-bold transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-slate-100 text-black font-extrabold shadow-2xs' 
                      : 'text-slate-400 hover:text-slate-650'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search + Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-[220px]">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                  <FiSearch className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customers..."
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

          {/* TABLE SECTION */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] h-10 select-none">
                  <th className="w-12 px-4 py-2.5">
                    <input 
                      type="checkbox" 
                      onChange={handleToggleAll}
                      checked={filteredCustomers.length > 0 && selectedIds.length === filteredCustomers.length}
                      className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-black focus:ring-black cursor-pointer" 
                    />
                  </th>
                  <th className="px-4 py-2.5 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-2.5 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="px-4 py-2.5 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider text-center">Orders</th>
                  <th className="px-4 py-2.5 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider text-center">Total Spent</th>
                  <th className="px-4 py-2.5 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                  <th className="px-4 py-2.5 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] bg-white">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust) => {
                    const isChecked = selectedIds.includes(cust.id)
                    return (
                      <tr 
                        key={cust.id} 
                        className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${isChecked ? 'bg-slate-50/30' : ''}`}
                        onClick={(e) => {
                          if (
                            e.target.closest('input[type="checkbox"]') ||
                            e.target.closest('button') ||
                            e.target.closest('a') ||
                            e.target.closest('svg')
                          ) {
                            return
                          }
                          setSearchParams({ id: cust.id })
                        }}
                      >
                        {/* Checkbox column */}
                        <td className="px-4 py-3.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSelect(cust.id)}
                            className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-black focus:ring-black cursor-pointer"
                          />
                        </td>

                        {/* Customer identity */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            {/* Circle avatar */}
                            <div className="w-[36px] h-[36px] rounded-full border border-slate-200 bg-slate-50/50 flex items-center justify-center text-slate-350 text-[12px] font-bold shrink-0">
                              {/* Empty circle outline as in design */}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-gray-900 leading-tight">
                                {cust.name}
                              </span>
                              <span className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-none">
                                {cust.joined}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Contact details */}
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[12px] text-slate-500 font-medium flex items-center gap-1.5">
                              <FiMail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              {cust.email}
                            </span>
                            <span className="text-[12px] text-slate-500 font-medium flex items-center gap-1.5">
                              <FiPhone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              {cust.phone}
                            </span>
                          </div>
                        </td>

                        {/* Orders count */}
                        <td className="px-4 py-3.5 text-center text-[13px] text-slate-700 font-bold">
                          {cust.orders}
                        </td>

                        {/* Total Spent */}
                        <td className="px-4 py-3.5 text-center text-[13px] font-bold text-gray-900">
                          {cust.spent}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                            cust.status === 'Active'
                              ? 'bg-[#DEF7EC] text-[#03543F]'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {cust.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-2.5">
                            <button type="button" className="text-slate-400 hover:text-black transition-colors cursor-pointer p-0.5">
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button type="button" className="text-slate-400 hover:text-black transition-colors cursor-pointer p-0.5">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button type="button" className="text-slate-400 hover:text-black transition-colors cursor-pointer p-0.5">
                              <FiMoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400 font-bold text-[13px]">
                      No customers match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E2E8F0]">
            <span className="text-[12.5px] text-slate-400 font-semibold">
              Showing 1 to {filteredCustomers.length} of {activeTab === 'All' && searchQuery.trim() === '' ? '33,493' : filteredCustomers.length} results
            </span>
            
            {/* Pagination numbers */}
            <div className="flex items-center gap-1 select-none">
              <button 
                type="button"
                className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer"
              >
                <FiChevronLeft className="w-3.5 h-3.5" />
              </button>
              
              <button 
                type="button"
                className="w-7 h-7 rounded-md bg-black text-white text-[12px] font-bold flex items-center justify-center cursor-pointer"
              >
                1
              </button>
              
              <button 
                type="button"
                className="w-7 h-7 rounded-md text-slate-500 hover:text-black hover:bg-slate-50 text-[12px] font-bold flex items-center justify-center cursor-pointer"
              >
                2
              </button>
              
              <button 
                type="button"
                className="w-7 h-7 rounded-md text-slate-500 hover:text-black hover:bg-slate-50 text-[12px] font-bold flex items-center justify-center cursor-pointer"
              >
                3
              </button>

              <span className="text-slate-450 text-[12px] px-1 font-bold">...</span>

              <button 
                type="button"
                className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer"
              >
                <FiChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
  )
}

export default Customers
