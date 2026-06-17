import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import OrderDetails from './OrderDetails.jsx'
import {
  FiChevronDown,
  FiDownload,
  FiSearch,
  FiFilter,
  FiEye,
  FiMoreHorizontal,
  FiArrowUpRight,
  FiArrowDownRight,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'
import QuickActions from '../components/QuickActions.jsx'

// Data for page 1 and page 2
const page1Orders = [
  { id: 'ORD-9021', date: 'May 29, 2026', customer: 'Michael Chen', vendor: 'PrintHub', items: '2 items', total: '$124.00', status: 'New' },
  { id: 'ORD-9020', date: 'May 28, 2026', customer: 'Emma Wilson', vendor: 'TechStore', items: '1 item', total: '$899.99', status: 'Processing' },
  { id: 'ORD-9019', date: 'May 28, 2026', customer: 'James Rodriguez', vendor: 'CraftGift', items: '4 items', total: '$45.50', status: 'Ready For Pickup' },
  { id: 'ORD-9018', date: 'May 27, 2026', customer: 'Sophia Taylor', vendor: 'PrintHub', items: '1 item', total: '$35.00', status: 'Shipping' },
  { id: 'ORD-9017', date: 'May 26, 2026', customer: 'William Brown', vendor: 'GadgetWorld', items: '1 item', total: '$129.00', status: 'Delivered' },
  { id: 'ORD-9016', date: 'May 25, 2026', customer: 'Olivia Martinez', vendor: 'TechStore', items: '3 items', total: '$450.75', status: 'Returned' },
  { id: 'ORD-9015', date: 'May 24, 2026', customer: 'Alexander Lee', vendor: 'CraftGift', items: '2 items', total: '$85.00', status: 'Delivered' }
]

const page2Orders = [
  { id: 'ORD-9014', date: 'May 23, 2026', customer: 'William Brown', vendor: 'PrintHub', items: '1 item', total: '$45.00', status: 'Delivered' },
  { id: 'ORD-9013', date: 'May 22, 2026', customer: 'Emma Wilson', vendor: 'GadgetWorld', items: '3 items', total: '$150.00', status: 'Processing' },
  { id: 'ORD-9012', date: 'May 21, 2026', customer: 'Sophia Taylor', vendor: 'TechStore', items: '2 items', total: '$220.00', status: 'Shipping' }
]

const allOrdersList = [...page1Orders, ...page2Orders]

const statsCardsData = [
  { title: 'Total Orders', value: '12,493', colorClass: 'text-gray-900' },
  { title: 'Pending orders', value: '400', colorClass: 'text-[#DC2626]' }, // red
  { title: 'New Orders', value: '142', colorClass: 'text-[#4F46E5]' }, // purple
  { title: 'Processing', value: '485', colorClass: 'text-[#D97706]' }, // orange
  { title: 'Delivered', value: '11,204', colorClass: 'text-[#16A34A]' }, // green
  { title: 'Shipped', value: '662', colorClass: 'text-[#16A34A]' }, // green
  { title: 'Returned', value: '662', colorClass: 'text-[#DC2626]' } // red
]

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const orderId = searchParams.get('id')

  useEffect(() => {
    document.title = 'Orders - SpeedCopy'
  }, [])

  // Header range dropdown state
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

  // Table Top Filters state
  const [activeTab, setActiveTab] = useState('All') // 'All', 'New', 'Processing', 'Shipping', 'Delivered', 'Returned'
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1) // Page 1 or 2
  const [selectedRowIds, setSelectedRowIds] = useState([])

  // Row 2 Dropdowns states
  const [activeDropdown, setActiveDropdown] = useState(null) // 'category', 'vendor', 'status'
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [vendorFilter, setVendorFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  if (orderId) {
    return <OrderDetails orderId={orderId} onBack={() => setSearchParams({})} />
  }

  // CSV Export functionality
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer', 'Vendor', 'Items', 'Total', 'Status']
    const csvRows = [headers.join(',')]

    allOrdersList.forEach(ord => {
      csvRows.push([
        ord.id,
        ord.date,
        ord.customer,
        ord.vendor,
        ord.items,
        ord.total.replace('$', '').replace(',', ''),
        ord.status
      ].join(','))
    })

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'orders_export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Row Selection logic
  const handleToggleSelectRow = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(x => x !== id))
    } else {
      setSelectedRowIds([...selectedRowIds, id])
    }
  }

  const handleToggleSelectAll = (e, visibleIds) => {
    if (e.target.checked) {
      setSelectedRowIds(visibleIds)
    } else {
      setSelectedRowIds([])
    }
  }

  // Filter and Search order items
  const getFilteredOrders = () => {
    let list = currentPage === 1 ? page1Orders : page2Orders

    // Tab filter
    if (activeTab !== 'All') {
      list = list.filter(ord => ord.status === activeTab)
    }

    // Row 2 dropdown status filter
    if (statusFilter !== 'All') {
      list = list.filter(ord => ord.status === statusFilter)
    }

    // Row 2 dropdown vendor filter
    if (vendorFilter !== 'All') {
      list = list.filter(ord => ord.vendor === vendorFilter)
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      list = list.filter(ord =>
        ord.id.toLowerCase().includes(q) ||
        ord.customer.toLowerCase().includes(q) ||
        ord.vendor.toLowerCase().includes(q) ||
        ord.status.toLowerCase().includes(q)
      )
    }

    return list
  }

  const visibleOrders = getFilteredOrders()
  const visibleIds = visibleOrders.map(o => o.id)
  const isAllSelected = visibleIds.length > 0 && visibleIds.every(id => selectedRowIds.includes(id))

  // Animations configuration
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  }

  const cardsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  }

  const cardItem = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  const tableRowVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full flex flex-col gap-6"
    >
      {/* 1. HEADER SECTION */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] font-black text-gray-900 tracking-tight leading-none font-sans">
              Orders
            </h1>

            {/* Last 7 Days Dropdown (matches Dashboard exactly) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-full px-2.5 py-1 bg-white shadow-sm font-sans flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-all focus:outline-none"
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
            Manage and track customer orders across all vendors.
          </p>
        </div>

        {/* Export CSV Button */}
        <motion.button
          onClick={handleExportCSV}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-[38px] px-4 bg-white border border-[#E2E8F0] rounded-lg text-[12px] font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <FiDownload className="w-4 h-4 text-slate-500" />
          <span>Export CSV</span>
        </motion.button>
      </div>

      {/* 2. QUICK ACTIONS SECTION */}
      <div className="w-full">
        <QuickActions />
      </div>

      {/* 3. ORDER STATUS CARD SECTION */}
      <div className="w-full">
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3.5 w-full"
        >
          {statsCardsData.map((card, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="h-[81.6px] p-4 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              <span className="text-[10px] font-bold text-slate-400 tracking-tight leading-none text-left whitespace-nowrap">
                {card.title}
              </span>
              <span className={`text-[18px] font-bold leading-none text-left ${card.colorClass}`}>
                {card.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 4. ORDERS TABLE SECTION */}
      <div className="w-full flex flex-col shrink-0">
        <div className="w-full bg-white border border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden flex flex-col">

          {/* TABLE TOP FILTER SECTION */}
          <div className="w-full h-[120px] p-4 flex flex-col justify-between border-b border-[#E2E8F0] shrink-0">
            {/* ROW 1: Tabs on Left, Search + Filter on Right */}
            <div className="flex items-center justify-between w-full">
              {/* Left tabs */}
              <div className="flex items-center gap-1">
                {['All', 'New', 'Processing', 'Shipping', 'Delivered', 'Returned'].map((tab) => {
                  const isActive = activeTab === tab
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab)
                        setCurrentPage(1)
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[12.5px] font-bold transition-all cursor-pointer ${isActive
                        ? 'bg-[#F8FAFC] text-black font-black'
                        : 'text-slate-400 hover:text-slate-700'
                        }`}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>

              {/* Right Search and Filter */}
              <div className="flex items-center gap-2">
                <div className="relative w-[200px]">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                    <FiSearch className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    placeholder="Search orders..."
                    className="w-full h-8 pl-9 pr-3 text-[12.5px] bg-[#F8FAFC] border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans font-medium placeholder-slate-400"
                  />
                </div>
                <button className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-50 transition-all cursor-pointer shadow-xs">
                  <FiFilter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ROW 2: Filter Options (Category, Vendor, Date, Status dropdowns) */}
            <div className="flex items-center gap-2 text-left relative">
              <span className="text-[12.5px] font-bold text-slate-700 flex items-center gap-1.5 mr-1">
                <FiFilter className="w-3.5 h-3.5 text-slate-500" />
                Filters:
              </span>

              {/* Category Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                  className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-medium text-[#64748B] hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Category: {categoryFilter}</span>
                  <FiChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'category' && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute left-0 mt-1 w-40 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1"
                      >
                        {['All', 'Printing', 'Gifting', 'Shopping'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => {
                              setCategoryFilter(cat)
                              setActiveDropdown(null)
                            }}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-slate-700 hover:bg-slate-50 font-medium"
                          >
                            {cat}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Vendor Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'vendor' ? null : 'vendor')}
                  className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-medium text-[#64748B] hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Vendor: {vendorFilter}</span>
                  <FiChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'vendor' && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute left-0 mt-1 w-40 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1"
                      >
                        {['All', 'PrintHub', 'TechStore', 'CraftGift', 'GadgetWorld'].map(ven => (
                          <button
                            key={ven}
                            onClick={() => {
                              setVendorFilter(ven)
                              setActiveDropdown(null)
                            }}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-slate-700 hover:bg-slate-50 font-medium"
                          >
                            {ven}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Date Button (Mocked) */}
              <button
                className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-medium text-[#64748B] hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>dd-mm-yy</span>
                <FiChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Status Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
                  className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[12px] font-medium text-[#64748B] hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Status: {statusFilter}</span>
                  <FiChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'status' && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute left-0 mt-1 w-44 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1"
                      >
                        {['All', 'New', 'Processing', 'Ready For Pickup', 'Shipping', 'Delivered', 'Returned'].map(st => (
                          <button
                            key={st}
                            onClick={() => {
                              setStatusFilter(st)
                              setActiveDropdown(null)
                            }}
                            className="w-full text-left px-3 py-1.5 text-[12px] text-slate-700 hover:bg-slate-50 font-medium"
                          >
                            {st}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* TABLE CONTENT SECTION */}
          <div className="w-full overflow-x-auto bg-white text-left">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#E2E8F0] h-[40.58px] select-none text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-2.5 w-12">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleToggleSelectAll(e, visibleIds)}
                      className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-black focus:ring-black cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-2.5">ORDER ID</th>
                  <th className="px-6 py-2.5">DATE</th>
                  <th className="px-6 py-2.5">CUSTOMER</th>
                  <th className="px-6 py-2.5">VENDOR</th>
                  <th className="px-6 py-2.5">ITEMS</th>
                  <th className="px-6 py-2.5">TOTAL</th>
                  <th className="px-6 py-2.5">STATUS</th>
                  <th className="px-6 py-2.5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <motion.tbody
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.04 }
                  }
                }}
                initial="hidden"
                animate="show"
                className="divide-y divide-[#F1F5F9] bg-white text-[13px]"
              >
                {visibleOrders.length > 0 ? (
                  visibleOrders.map((ord) => {
                    const isChecked = selectedRowIds.includes(ord.id)

                    // Specific status styles requested
                    let badgeClass = 'bg-slate-100 text-slate-700'
                    if (ord.status === 'New') {
                      badgeClass = 'bg-[#EFF6FF] text-[#2563EB]' // blue
                    } else if (ord.status === 'Processing') {
                      badgeClass = 'bg-[#FFFBEB] text-[#D97706]' // yellow/orange
                    } else if (ord.status === 'Ready For Pickup') {
                      badgeClass = 'bg-[#F3E8FF] text-[#6B21A8]' // purple
                    } else if (ord.status === 'Shipping') {
                      badgeClass = 'bg-[#F5F3FF] text-[#5B21B6]' // purple/light violet
                    } else if (ord.status === 'Delivered') {
                      badgeClass = 'bg-[#DEF7EC] text-[#03543F]' // green
                    } else if (ord.status === 'Returned') {
                      badgeClass = 'bg-[#FDE8E8] text-[#9B1C1C]' // red
                    }

                    return (
                      <motion.tr
                        key={ord.id}
                        variants={tableRowVariants}
                        onClick={(e) => {
                          if (
                            e.target.closest('input[type="checkbox"]') ||
                            e.target.closest('button') ||
                            e.target.closest('svg')
                          ) {
                            return
                          }
                          setSearchParams({ id: ord.id })
                        }}
                        className={`hover:bg-[#F8FAFC]/50 transition-colors cursor-pointer ${isChecked ? 'bg-[#F8FAFC]/80' : ''
                          }`}
                      >
                        <td className="px-6 py-3.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSelectRow(ord.id)}
                            className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-black focus:ring-black cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-3.5 font-bold text-gray-900">
                          {ord.id}
                        </td>
                        <td className="px-6 py-3.5 text-slate-500 font-medium">
                          {ord.date}
                        </td>
                        <td className="px-6 py-3.5 font-bold text-gray-900">
                          {ord.customer}
                        </td>
                        <td className="px-6 py-3.5 text-slate-700 font-semibold">
                          {ord.vendor}
                        </td>
                        <td className="px-6 py-3.5 text-slate-500 font-normal">
                          {ord.items}
                        </td>
                        <td className="px-6 py-3.5 font-bold text-gray-900">
                          {ord.total}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${badgeClass}`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2 text-slate-400">
                            <button
                              onClick={() => setSearchParams({ id: ord.id })}
                              className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center">
                              <FiMoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-bold">
                      No orders match your filters.
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </table>
          </div>

          {/* PAGINATION SECTION */}
          <div className="w-full h-[66.4px] p-4 flex items-center justify-between border-t border-[#E2E8F0] text-[12.5px] font-medium text-slate-400 shrink-0">
            <div>
              Showing <span className="font-bold text-gray-800">{currentPage === 1 ? '1' : '8'}</span> to{' '}
              <span className="font-bold text-gray-800">
                {currentPage === 1 ? page1Orders.length : page1Orders.length + page2Orders.length}
              </span> of <span className="font-bold text-gray-800">12,493</span> results
            </div>

            <div className="flex items-center gap-1 select-none">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className={`w-7 h-7 rounded-md text-[12px] font-bold flex items-center justify-center cursor-pointer transition-all ${currentPage === 1
                  ? 'bg-black text-white'
                  : 'text-slate-500 hover:text-black hover:bg-slate-50'
                  }`}
              >
                1
              </button>

              <button
                onClick={() => setCurrentPage(2)}
                className={`w-7 h-7 rounded-md text-[12px] font-bold flex items-center justify-center cursor-pointer transition-all ${currentPage === 2
                  ? 'bg-black text-white'
                  : 'text-slate-500 hover:text-black hover:bg-slate-50'
                  }`}
              >
                2
              </button>

              <button
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === 2}
                className="w-7 h-7 rounded-md border border-slate-100 text-slate-400 hover:text-black hover:border-slate-350 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FiChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
