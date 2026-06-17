import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import QuickActions from '../components/QuickActions.jsx'
import VendorDetails from './VendorDetails.jsx'
import {
  FiChevronDown,
  FiDownload,
  FiPlus,
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiShield,
  FiTrendingUp,
  FiEye,
  FiEdit,
  FiMoreHorizontal,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import { LuStore } from 'react-icons/lu'

// Pre-defined static metrics for cards
const topStatusCards = [
  { title: 'Total Vendors', value: '245', change: '+12 this month', isPositive: true, icon: LuStore },
  { title: 'Active Vendors', value: '210', change: '+8 this month', isPositive: true, icon: FiCheckCircle },
  { title: 'Pending Approvals', value: '15', change: '-3 this month', isPositive: false, icon: FiShield },
  { title: 'Avg. Commission', value: '12.5%', change: '+0.5 this month', isPositive: true, icon: FiTrendingUp }
]

const secondStatusCards = [
  { title: 'Applications', value: '245', change: '+12 this month', isPositive: true, icon: LuStore },
  { title: 'Under Review', value: '210', change: '+8 this month', isPositive: true, icon: FiCheckCircle },
  { title: 'Approved', value: '15', change: '-3 this month', isPositive: false, icon: FiShield }
]

// Vendor Table Rows
const initialVendors = [
  { id: 1, name: 'Fresh Foods Market', location: 'Downtown District', category: 'Groceries', performance: '4.8', orders: '1245 orders', revenue: '₹45,200', status: 'Active' },
  { id: 2, name: 'TechGadgets Hub', location: 'Westside Mall', category: 'Electronics', performance: '4.5', orders: '856 orders', revenue: '₹120,400', status: 'Active' },
  { id: 3, name: 'Urban Apparel', location: 'Fashion Avenue', category: 'Clothing', performance: 'N/A', orders: '0 orders', revenue: '₹0', status: 'Pending Verification' },
  { id: 4, name: 'Green Pharmacy', location: 'Medical Plaza', category: 'Health', performance: '4.9', orders: '3200 orders', revenue: '₹85,000', status: 'Active' },
  { id: 5, name: 'SneakerHead Supply', location: 'South Station', category: 'Footwear', performance: '3.2', orders: '412 orders', revenue: '₹22,100', status: 'Suspended' }
]

export default function Vendors() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    document.title = 'Vendors - SpeedCopy'
  }, [])

  // Header date range selector state
  const [selectedRange, setSelectedRange] = useState('7days')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [tempStartDate, setTempStartDate] = useState('')
  const [tempEndDate, setTempEndDate] = useState('')
  const [customRange, setCustomRange] = useState({ start: '', end: '' })

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

  // Table status tabs and search
  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem('vendors')
    return saved ? JSON.parse(saved) : initialVendors
  })
  const [activeTab, setActiveTab] = useState('All') // 'All', 'Active', 'Pending Verification', 'Suspended'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRowIds, setSelectedRowIds] = useState([])

  const handleToggleRow = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(x => x !== id))
    } else {
      setSelectedRowIds([...selectedRowIds, id])
    }
  }

  const handleToggleAll = (e, visibleIds) => {
    if (e.target.checked) {
      setSelectedRowIds(visibleIds)
    } else {
      setSelectedRowIds([])
    }
  }

  // Filtering logic
  const filteredVendors = vendors.filter(vendor => {
    // Tab filter
    if (activeTab !== 'All' && vendor.status !== activeTab) return false

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      return (
        vendor.name.toLowerCase().includes(q) ||
        vendor.location.toLowerCase().includes(q) ||
        vendor.category.toLowerCase().includes(q) ||
        vendor.status.toLowerCase().includes(q)
      )
    }
    return true
  })

  const visibleIds = filteredVendors.map(v => v.id)
  const isAllSelected = visibleIds.length > 0 && visibleIds.every(id => selectedRowIds.includes(id))

  // Motion animation configurations
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

  const vendorId = searchParams.get('id')
  if (vendorId) {
    return <VendorDetails vendorId={parseInt(vendorId)} onBack={() => setSearchParams({})} />
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full flex flex-col gap-6 font-sans select-none"
    >
      {/* 1 DIV : HEADER */}
      <div className="w-full h-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] font-black text-gray-900 tracking-tight leading-none">
              Vendors
            </h1>

            {/* Last 7 days Date Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-full px-2.5 py-1 bg-white shadow-sm flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-all focus:outline-none"
              >
                {rangeLabels[selectedRange]}
                <FiChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute left-0 mt-1.5 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-3.5 origin-top-left flex flex-col gap-1"
                    >
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('7days')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${selectedRange === '7days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        Last 7 days
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('30days')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${selectedRange === '30days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        Last 30 days (1 Month)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('year')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${selectedRange === 'year' ? 'bg-gray-900 text-white' : 'text-gray-750 hover:bg-gray-50'
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
              </AnimatePresence>
            </div>
          </div>
          <p className="text-[13px] text-slate-400 font-medium leading-none mt-2">
            Manage marketplace vendors, applications, and performance.
          </p>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-[38px] px-4 bg-white border border-[#E2E8F0] rounded-lg text-[12px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiDownload className="w-4 h-4 text-slate-500" />
            <span>Export</span>
          </motion.button>

          <motion.button
            onClick={() => navigate('/vendor-onboarding')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-[38px] px-4 rounded-lg bg-black text-white text-[12px] font-bold hover:bg-zinc-900 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiPlus className="w-4 h-4 text-white stroke-[2.5]" />
            <span>Onboard Vendor</span>
          </motion.button>
        </div>
      </div>

      {/* 2 DIV : QUICK ACTION */}
      <div className="w-full gap-2.5">
        <QuickActions />
      </div>

      {/* 3 DIV : TOP STATUS CARDS */}
      <div className="w-full pt-0">
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
        >
          {topStatusCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="h-[133.6px] bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-400 tracking-tight leading-none">
                    {card.title}
                  </span>
                  <div className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-650">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-[20px] font-black text-gray-900 tracking-tight mt-1 leading-none">
                  {card.value}
                </div>
                <div className="flex items-center gap-1 mt-1 leading-none">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${card.isPositive ? 'bg-[#DEF7EC] text-[#03543F]' : 'bg-[#FDE8E8] text-[#9B1C1C]'
                    }`}>
                    {card.change}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">this month</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* 4 DIV : SECOND STATUS CARDS */}
      <div className="w-full pt-0">
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        >
          {secondStatusCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="h-[133.6px] bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-400 tracking-tight leading-none">
                    {card.title}
                  </span>
                  <div className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-650">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="text-[20px] font-black text-gray-900 tracking-tight mt-1 leading-none">
                  {card.value}
                </div>
                <div className="flex items-center gap-1 mt-1 leading-none">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${card.isPositive ? 'bg-[#DEF7EC] text-[#03543F]' : 'bg-[#FDE8E8] text-[#9B1C1C]'
                    }`}>
                    {card.change}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">this month</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* 5 DIV : VENDOR TABLE SECTION */}
      <div className="w-full pt-0">
        <motion.div
          variants={tableContainer}
          initial="hidden"
          animate="show"
          className="bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden w-full min-h-[450px]"
        >
          {/* TABLE TOP FILTER DIV */}
          <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#E2E8F0]">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              {['All', 'Active', 'Pending Verification', 'Suspended'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[12.5px] font-bold transition-all cursor-pointer ${activeTab === tab
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
                  placeholder="Search vendors..."
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

          {/* TABLE CONTENT */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] h-10 select-none text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="w-12 px-4 py-2.5">
                    <input
                      type="checkbox"
                      onChange={(e) => handleToggleAll(e, visibleIds)}
                      checked={filteredVendors.length > 0 && selectedRowIds.length === filteredVendors.length}
                      className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-black focus:ring-black cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-2.5">Vendor</th>
                  <th className="px-4 py-2.5">Category</th>
                  <th className="px-4 py-2.5">Performance</th>
                  <th className="px-4 py-2.5">Revenue</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9] bg-white text-[13px]">
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor) => {
                    const isChecked = selectedRowIds.includes(vendor.id)

                    let statusBadge = ''
                    if (vendor.status === 'Active') {
                      statusBadge = 'bg-[#DEF7EC] text-[#03543F]'
                    } else if (vendor.status === 'Pending Verification') {
                      statusBadge = 'bg-[#FFF9E6] text-[#795548]'
                    } else if (vendor.status === 'Suspended') {
                      statusBadge = 'bg-[#FDE8E8] text-[#9B1C1C]'
                    }

                    return (
                      <tr
                        key={vendor.id}
                        className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                        onClick={(e) => {
                          if (
                            e.target.closest('input[type="checkbox"]') ||
                            e.target.closest('button') ||
                            e.target.closest('a') ||
                            e.target.closest('svg')
                          ) {
                            return
                          }
                          setSearchParams({ id: vendor.id })
                        }}
                      >
                        <td className="w-12 px-4 py-3.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleRow(vendor.id)}
                            className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-black focus:ring-black cursor-pointer"
                          />
                        </td>

                        {/* Vendor Name + Location */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-[36px] h-[36px] rounded-full border border-slate-200 bg-slate-55 flex items-center justify-center shrink-0">
                              {/* Empty avatar outline */}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-bold text-gray-900 leading-tight">
                                {vendor.name}
                              </span>
                              <span className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-none">
                                {vendor.location}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3.5">
                          <span className="bg-[#F1F5F9] text-[#475569] font-bold text-[11px] px-2.5 py-0.5 rounded-md">
                            {vendor.category}
                          </span>
                        </td>

                        {/* Performance */}
                        <td className="px-4 py-3.5">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">
                              {vendor.performance === 'N/A' ? 'N/A' : `⭐ ${vendor.performance}`}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-none">
                              {vendor.orders}
                            </span>
                          </div>
                        </td>

                        {/* Revenue */}
                        <td className="px-4 py-3.5 font-bold text-gray-900">
                          {vendor.revenue}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${statusBadge}`}>
                            {vendor.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-2 text-slate-400">
                            <button type="button" className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center">
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button type="button" className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center">
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button type="button" className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center">
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
                      No vendors match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER DIV */}
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E2E8F0] text-[12.5px] font-medium text-slate-400">
            <span>
              Showing 1 to {filteredVendors.length} of {activeTab === 'All' && searchQuery.trim() === '' ? '245' : filteredVendors.length} results
            </span>

            {/* Pagination */}
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
                className="w-7 h-7 rounded-md text-slate-550 hover:text-black hover:bg-slate-50 text-[12px] font-bold flex items-center justify-center cursor-pointer"
              >
                2
              </button>

              <button
                type="button"
                className="w-7 h-7 rounded-md text-slate-550 hover:text-black hover:bg-slate-50 text-[12px] font-bold flex items-center justify-center cursor-pointer"
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
      </div>

    </motion.div>
  )
}

