import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiDownload, 
  FiUpload, 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiMoreHorizontal, 
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from 'react-icons/fi'
import { LuPackage } from 'react-icons/lu'
import QuickActions from '../components/QuickActions.jsx'

const initialProducts = [
  {
    id: 'PRD-1-029',
    name: 'Premium',
    isCustom: true,
    category: 'Printing',
    subCategory: 'Business Cards',
    vendor: 'PrintHub',
    price: 25.00,
    oldPrice: 19.99,
    inventory: 5000,
    status: 'Active'
  },
  {
    id: 'PRD-1-028',
    name: 'Personalized',
    isCustom: true,
    category: 'Gifting',
    subCategory: 'Accessories',
    vendor: 'CraftGift',
    price: 45.00,
    oldPrice: null,
    inventory: 120,
    status: 'Active'
  },
  {
    id: 'PRD-1027',
    name: 'Wireless Noise',
    isCustom: false,
    category: 'Shopping',
    subCategory: 'Electronics',
    vendor: 'TechStore',
    price: 129.99,
    oldPrice: 99.99,
    inventory: 45,
    status: 'Low Stock'
  },
  {
    id: 'PRD-1-026',
    name: 'Custom Canvas',
    isCustom: true,
    category: 'Printing',
    subCategory: 'Wall Art',
    vendor: 'PrintHub',
    price: 35.00,
    oldPrice: null,
    inventory: 300,
    status: 'Active'
  },
  {
    id: 'PRD-1-025',
    name: 'Engraved Wooden',
    isCustom: true,
    category: 'Gifting',
    subCategory: 'Stationery',
    vendor: 'CraftGift',
    price: 28.00,
    oldPrice: 22.00,
    inventory: 0,
    status: 'Out of Stock'
  },
  {
    id: 'PRD-1024',
    name: 'Smart Fitness',
    isCustom: false,
    category: 'Shopping',
    subCategory: 'Electronics',
    vendor: 'GadgetWorld',
    price: 89.00,
    oldPrice: null,
    inventory: 210,
    status: 'Active'
  },
  {
    id: 'PRD-1-023',
    name: 'A4 Corporate Brochures',
    isCustom: true,
    category: 'Printing',
    subCategory: 'Marketing',
    vendor: 'PrintHub',
    price: 150.00,
    oldPrice: 120.00,
    inventory: 10000,
    status: 'Draft'
  }
]

const summaryCards = [
  { label: 'Total Products', value: '45,294', isRed: false },
  { label: 'Active Products', value: '42,105', isRed: false },
  { label: 'In Stock', value: '39,842', isRed: false },
  { label: 'Out of Stock', value: '2,263', isRed: true },
  { label: 'Low stock', value: '24', isRed: false },
  { label: 'Products on Offer', value: '8,432', isRed: false },
]

function Products() {
  useEffect(() => {
    document.title = 'Products -SpeedCopy'
  }, [])

  // Date Dropdown States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('7days')
  const [tempStartDate, setTempStartDate] = useState('')
  const [tempEndDate, setTempEndDate] = useState('')
  const [customRange, setCustomRange] = useState({ start: '', end: '' })

  // Table Filtering and Search States
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRows, setSelectedRows] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // Labels for range
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

  // Row Selection logic
  const handleSelectAll = (e, visibleIds) => {
    if (e.target.checked) {
      setSelectedRows(visibleIds)
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (productId) => {
    if (selectedRows.includes(productId)) {
      setSelectedRows(selectedRows.filter(id => id !== productId))
    } else {
      setSelectedRows([...selectedRows, productId])
    }
  }

  // Categories and search filtering
  const filteredProducts = initialProducts.filter(product => {
    // 1. Tab filter
    if (activeTab !== 'All') {
      if (activeTab === 'Drafts') {
        if (product.status !== 'Draft') return false
      } else {
        if (product.category !== activeTab) return false
      }
    }
    // 2. Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      const matchesName = product.name.toLowerCase().includes(query)
      const matchesId = product.id.toLowerCase().includes(query)
      const matchesCategory = product.category.toLowerCase().includes(query)
      const matchesSubCategory = product.subCategory.toLowerCase().includes(query)
      const matchesVendor = product.vendor.toLowerCase().includes(query)
      return matchesName || matchesId || matchesCategory || matchesSubCategory || matchesVendor
    }
    return true
  })

  const visibleIds = filteredProducts.map(p => p.id)
  const isAllSelected = visibleIds.length > 0 && visibleIds.every(id => selectedRows.includes(id))

  // Animations configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  const tableRowVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col gap-6 pb-12 font-sans"
    >
      {/* DIV 1: PRODUCT HEADER */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 py-1">
        {/* Title and Date Selector */}
        <div className="flex flex-col">
          <Link
            to="/premium-business-card"
            className="w-fit inline-flex items-center gap-0.5 text-[13px] font-bold text-slate-500 hover:text-black transition-all duration-200 cursor-pointer mb-2"
          >
            Premium Business Cards
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] font-bold text-gray-900 tracking-tight leading-none">
              Products
            </h1>
            <div className="relative">
              <button
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
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${selectedRange === '7days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        Last 7 days
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('30days')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${selectedRange === '30days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        Last 30 days (1 Month)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRangeSelect('year')}
                        className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${selectedRange === 'year' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        Last 1 Year
                      </button>

                      <div className="border-t border-gray-100 my-2 pt-2">
                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold px-3 mb-2">Custom Date Range</div>
                        <div className="flex flex-col gap-2.5 px-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 font-bold">Start Date</label>
                            <input
                              type="date"
                              value={tempStartDate}
                              onChange={(e) => setTempStartDate(e.target.value)}
                              max={tempEndDate || undefined}
                              className="w-full text-[12px] font-medium border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-900"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-gray-500 font-bold">End Date</label>
                            <input
                              type="date"
                              value={tempEndDate}
                              onChange={(e) => setTempEndDate(e.target.value)}
                              min={tempStartDate || undefined}
                              className="w-full text-[12px] font-medium border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-900"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleCustomApply}
                            disabled={!tempStartDate || !tempEndDate}
                            className="w-full h-8 bg-gray-900 hover:bg-black disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-lg text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center mt-1"
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
          <p className="text-[13px] text-gray-400 font-medium mt-1 leading-none">
            Manage your catalog, inventory, and pricing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-9 px-3.5 rounded-lg border border-gray-200 bg-white text-[13px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiDownload className="w-4 h-4 text-gray-500" /> Export
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-9 px-3.5 rounded-lg border border-gray-200 bg-white text-[13px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiUpload className="w-4 h-4 text-gray-500" /> Import
          </motion.button>

          <Link to="/add-product">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-9 px-4 rounded-lg bg-black text-white text-[13px] font-bold hover:bg-zinc-900 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <FiPlus className="w-4 h-4 text-white stroke-[2.5]" /> Add Product
            </motion.button>
          </Link>
        </div>
      </div>

      {/* DIV 2: QUICK ACTIONS */}
      <QuickActions />

      {/* DIV 3: PRODUCT SUMMARY CARDS */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full grid grid-cols-3 md:grid-cols-6 gap-3.5 pt-2"
      >
        {summaryCards.map((card, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -2 }}
            className="w-full h-[81.6px] p-4 bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
          >
            <span className="text-[11px] font-semibold text-gray-400 tracking-tight leading-none">
              {card.label}
            </span>
            <span className={`text-[18px] font-bold leading-none ${card.isRed ? 'text-[#EF4444]' : 'text-gray-900'}`}>
              {card.value}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* DIV 4: PRODUCTS TABLE SECTION */}
      <div className="w-full bg-white border border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden flex flex-col">
        
        {/* TABLE TOP FILTER DIV */}
        <div className="w-full h-[70.4px] px-4 py-3 flex items-center justify-between border-b border-[#E2E8F0] bg-white gap-4">
          {/* Filters tabs */}
          <div className="flex items-center gap-1">
            {['All', 'Printing', 'Gifting', 'Shopping', 'Drafts'].map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#F1F5F9] text-black font-bold shadow-sm' 
                      : 'text-gray-500 hover:text-black hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Search and Filter Icon */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FiSearch className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search products..."
                className="w-[200px] h-9 pl-9 pr-3 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans"
              />
            </div>
            
            <button className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-black hover:bg-slate-50 transition-all cursor-pointer shadow-sm">
              <FiFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TABLE MIDDLE CONTENT DIV */}
        <div className="w-full overflow-x-auto min-h-[490px] flex flex-col justify-between">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-slate-50/20">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e, visibleIds)}
                    className="rounded border-gray-300 text-black focus:ring-black cursor-pointer w-4 h-4"
                  />
                </th>
                <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">PRODUCT INFO</th>
                <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">CATEGORY</th>
                <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">VENDOR</th>
                <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans text-right">PRICE</th>
                <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans text-right">INVENTORY</th>
                <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">STATUS</th>
                <th className="py-3 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans text-right">ACTIONS</th>
              </tr>
            </thead>
            
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-[#F1F5F9]"
            >
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 text-[13px] font-medium font-sans">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isChecked = selectedRows.includes(product.id)
                  
                  // Status styles
                  let statusClass = ''
                  if (product.status === 'Active') {
                    statusClass = 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
                  } else if (product.status === 'Low Stock') {
                    statusClass = 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                  } else if (product.status === 'Out of Stock') {
                    statusClass = 'bg-[#FDE8E8] text-[#9B1C1C] border-[#FBD5D5]'
                  } else if (product.status === 'Draft') {
                    statusClass = 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]'
                  }

                  // Inventory styles
                  let inventoryClass = 'text-gray-700 font-semibold'
                  if (product.inventory === 0) {
                    inventoryClass = 'text-[#EF4444] font-bold'
                  } else if (product.inventory < 50) {
                    inventoryClass = 'text-[#D97706] font-bold'
                  }

                  return (
                    <motion.tr
                      key={product.id}
                      variants={tableRowVariants}
                      className={`hover:bg-[#F8FAFC]/50 transition-colors ${isChecked ? 'bg-[#F8FAFC]' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(product.id)}
                          className="rounded border-gray-300 text-black focus:ring-black cursor-pointer w-4 h-4"
                        />
                      </td>

                      {/* Product Info (Logo Box + Name/Id/Badge) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                            <LuPackage className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-bold text-gray-900 truncate leading-tight">
                              {product.id === 'PRD-1-029' ? (
                                <Link to="/premium-business-card" className="hover:underline hover:text-black cursor-pointer">
                                  {product.name}
                                </Link>
                              ) : (
                                product.name
                              )}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[11px] text-gray-400 font-medium">
                                {product.id}
                              </span>
                              {product.isCustom && (
                                <span className="bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] text-[9px] font-extrabold px-1 rounded tracking-wide leading-none py-[1px]">
                                  Custom
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col leading-none">
                          <span className="text-[12px] font-semibold text-gray-800">
                            {product.category}
                          </span>
                          <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                            {product.subCategory}
                          </span>
                        </div>
                      </td>

                      {/* Vendor */}
                      <td className="py-3.5 px-4 text-[13px] font-semibold text-gray-700">
                        {product.vendor}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex flex-col items-end leading-none">
                          <span className="text-[13px] font-bold text-gray-900">
                            ₹{product.price.toFixed(2)}
                          </span>
                          {product.oldPrice && (
                            <span className="text-[10px] font-bold text-[#10B981] line-through mt-0.5">
                              ₹{product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Inventory */}
                      <td className={`py-3.5 px-4 text-right text-[13px] ${inventoryClass}`}>
                        {product.inventory.toLocaleString('en-IN')}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border leading-none ${statusClass}`}>
                          {product.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 text-gray-400">
                          {product.id === 'PRD-1-029' ? (
                            <Link to="/premium-business-card" className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer flex items-center justify-center">
                              <FiEye className="w-[15px] h-[15px]" />
                            </Link>
                          ) : (
                            <button className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer">
                              <FiEye className="w-[15px] h-[15px]" />
                            </button>
                          )}
                          <button className="p-1 hover:text-black hover:bg-slate-100 rounded transition-colors cursor-pointer">
                            <FiMoreHorizontal className="w-[15px] h-[15px]" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </motion.tbody>
          </table>
        </div>

        {/* TABLE FOOTER DIV */}
        <div className="w-full h-[66.4px] px-4 py-3 flex items-center justify-between border-t border-[#E2E8F0] bg-white text-[12px] font-medium text-gray-400">
          <div>
            Showing <span className="font-bold text-gray-750">1</span> to <span className="font-bold text-gray-750">{filteredProducts.length}</span> of <span className="font-bold text-gray-750">45,294</span> results
          </div>
          
          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[12px] transition-all cursor-pointer ${
                currentPage === 1 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-500 hover:text-black hover:bg-slate-50'
              }`}
            >
              1
            </button>

            <button 
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-[12px] transition-all cursor-pointer ${
                currentPage === 2 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-500 hover:text-black hover:bg-slate-50'
              }`}
            >
              2
            </button>

            <button 
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-[12px] transition-all cursor-pointer ${
                currentPage === 3 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-500 hover:text-black hover:bg-slate-50'
              }`}
            >
              3
            </button>

            <span className="text-gray-300 px-1 select-none">...</span>

            <button 
              disabled={currentPage === 3}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default Products
