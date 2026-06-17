import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuickActions from '../components/QuickActions.jsx'
import {
  FiChevronDown,
  FiRefreshCw,
  FiDownload,
  FiArrowUpRight,
  FiArrowDownRight,
  FiTrendingUp,
  FiCreditCard,
  FiDollarSign,
  FiSearch,
  FiEye,
  FiCheck,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCreditCard as FiCard,
  FiFilter,
  FiPlus,
  FiFileText,
  FiMoreHorizontal,
  FiX,
} from 'react-icons/fi'
import { FaPiggyBank } from "react-icons/fa";
import {
  LuWallet,
  LuArrowRightLeft,
  LuBuilding2,
} from 'react-icons/lu'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'

// Data 

const revenuePayoutsData = [
  { month: 'Jan', revenue: 178000, payouts: 130000 },
  { month: 'Feb', revenue: 162000, payouts: 118000 },
  { month: 'Mar', revenue: 195000, payouts: 148000 },
  { month: 'Apr', revenue: 210000, payouts: 165000 },
  { month: 'May', revenue: 240000, payouts: 188000 },
  { month: 'Jun', revenue: 278000, payouts: 218000 },
]

const feeRefundData = [
  { month: 'Jan', value: 7200 },
  { month: 'Feb', value: 6800 },
  { month: 'Mar', value: 9400 },
  { month: 'Apr', value: 8600 },
  { month: 'May', value: 10200 },
  { month: 'Jun', value: 12500 },
]

const juneSummary = [
  { label: 'Gross Revenue', value: '₹27,80,000', icon: FiTrendingUp },
  { label: 'Total Payouts', value: '₹21,80,000', icon: LuWallet },
  { label: 'Platform Fees', value: '₹1,25,000', icon: FaPiggyBank },
  { label: 'Refunds Issued', value: '₹83,200', icon: FiRefreshCw },
  { label: 'Net Profit', value: '₹3,91,800', icon: FiDollarSign },
]

const tabs = ['Overview', 'Transactions', 'Vendor Payouts', 'Invoices', 'Settlement Rules', 'Wallet management']

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 110, damping: 16 } },
}

//DateRange Dropdown 

// Compact variant used by charts
function CompactDropdown({ options }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 border border-gray-200 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-all focus:outline-none cursor-pointer font-sans font-semibold text-gray-600 text-[11px] px-2.5 py-1"
      >
        {selected}
        <FiChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
              className="absolute right-0 mt-1.5 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-2 origin-top-right flex flex-col gap-0.5"
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { setSelected(opt); setOpen(false) }}
                  className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full
                    ${selected === opt ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Full Dashboard-style dropdown for the page header
function DateRangeDropdown({ options, compact = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState(options[0])
  const [tempStartDate, setTempStartDate] = useState('')
  const [tempEndDate, setTempEndDate] = useState('')
  const [customRange, setCustomRange] = useState({ start: '', end: '' })

  if (compact) return <CompactDropdown options={options} />

  const rangeLabel = selectedRange === 'custom' && customRange.start && customRange.end
    ? `${new Date(customRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(customRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : selectedRange

  const handleRangeSelect = (range) => {
    setSelectedRange(range)
    if (range !== 'custom') setIsDropdownOpen(false)
  }

  const handleCustomApply = () => {
    if (tempStartDate && tempEndDate) {
      setCustomRange({ start: tempStartDate, end: tempEndDate })
      setSelectedRange('custom')
      setIsDropdownOpen(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-full px-2.5 py-1 bg-white shadow-sm font-sans flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-all focus:outline-none"
      >
        {rangeLabel}
        <FiChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <>
          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsDropdownOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 mt-1.5 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-3.5 origin-top-left flex flex-col gap-1"
          >
            <button
              type="button"
              onClick={() => handleRangeSelect('Last 7 days')}
              className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full
                ${selectedRange === 'Last 7 days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Last 7 days
            </button>
            <button
              type="button"
              onClick={() => handleRangeSelect('Last 30 days')}
              className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full
                ${selectedRange === 'Last 30 days' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Last 30 days (1 Month)
            </button>
            <button
              type="button"
              onClick={() => handleRangeSelect('Last 1 Year')}
              className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full
                ${selectedRange === 'Last 1 Year' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
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
  )
}

// Finance Card

function FinanceCard({ title, value, change, isPositive, icon: Icon, dark = false }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`w-full rounded-[14px] p-5 flex flex-col justify-between
        ${dark
          ? 'bg-black'
          : 'bg-white border border-[#E2E8F0] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]'
        }`}
      style={{ minHeight: '131.6px' }}
    >
      {/* Top row: title + icon */}
      <div className="flex items-start justify-between">
        <span className={`text-[12px] font-semibold tracking-tight font-sans leading-snug
          ${dark ? 'text-gray-400' : 'text-gray-400'}`}>
          {title}
        </span>
        <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 ml-2
          ${dark ? 'bg-white/10 text-white' : 'bg-slate-50 border border-slate-100 text-gray-500'}`}>
          <Icon className="w-[14px] h-[14px]" />
        </div>
      </div>

      {/* Amount */}
      <div className={`text-[24px] font-black tracking-tight leading-none font-sans mt-2
        ${dark ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>

      {/* Change badge + label */}
      <div className="flex items-center gap-1.5 mt-2">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 leading-none
          ${isPositive
            ? dark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#DEF7EC] text-[#03543F]'
            : dark ? 'bg-red-500/20 text-red-400' : 'bg-[#FDE8E8] text-[#9B1C1C]'
          }`}>
          {isPositive
            ? <FiArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            : <FiArrowDownRight className="w-3 h-3 stroke-[2.5]" />
          }
          {change}
        </span>
        <span className={`text-[10px] font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}>vs last month</span>
      </div>
    </motion.div>
  )
}

//  Custom Tooltip

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white rounded-xl px-3.5 py-2.5 shadow-2xl text-[11px]">
        <p className="text-gray-400 font-semibold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="font-bold" style={{ color: p.color }}>
            {p.name}: ₹{(p.value / 1000).toFixed(0)}k
          </p>
        ))}
      </div>
    )
  }
  return null
}

//  Revenue vs Payouts Chart 

function RevenuePayoutsChart() {
  const [selectedChart, setSelectedChart] = useState('revenue')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      {/* Chart Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">Revenue vs Payouts</h3>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">Monthly financial flow — Jan to Jun 2026</p>
        </div>
        <DateRangeDropdown
          options={['Last 6 months', 'Last 3 months', 'Last 12 months']}
          compact={true}
        />
      </div>

      {/* Chart */}
      <div className="w-full" style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenuePayoutsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradPayouts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#111827" stopOpacity={0.10} />
                <stop offset="100%" stopColor="#111827" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              domain={[0, 300000]}
              ticks={[0, 70000, 140000, 210000, 280000]}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Only render the selected line */}
            {selectedChart === 'revenue' && (
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#6366F1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#gradRevenue)"
              />
            )}
            {selectedChart === 'payouts' && (
              <Area
                type="monotone"
                dataKey="payouts"
                name="Payouts"
                stroke="#111827"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#gradPayouts)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend — clickable toggle buttons */}
      <div className="flex items-center gap-5 mt-3 pl-1">
        <button
          type="button"
          onClick={() => setSelectedChart('revenue')}
          className="flex items-center gap-2 cursor-pointer focus:outline-none group"
        >
          <span
            className="w-3 h-3 rounded-full inline-block transition-opacity duration-200"
            style={{
              backgroundColor: '#111827',
              opacity: selectedChart === 'revenue' ? 1 : 0.3,
            }}
          />
          <span
            className={`text-[12px] font-semibold font-sans transition-colors duration-200
              ${selectedChart === 'revenue' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            Revenue
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedChart('payouts')}
          className="flex items-center gap-2 cursor-pointer focus:outline-none group"
        >
          <span
            className="w-3 h-3 rounded-full inline-block transition-opacity duration-200"
            style={{
              backgroundColor: '#6366F1',
              opacity: selectedChart === 'payouts' ? 1 : 0.3,
            }}
          />
          <span
            className={`text-[12px] font-semibold font-sans transition-colors duration-200
              ${selectedChart === 'payouts' ? 'text-gray-900' : 'text-gray-400'}`}
          >
            Payouts
          </span>
        </button>
      </div>
    </motion.div>
  )
}

// Fee Refund Breakdown Chart

function FeeRefundBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-white rounded-[14px] border border-[#E2E8F0] p-5 flex flex-col"
      style={{ flex: '1 1 0', minWidth: 0 }}
    >
      <h4 className="text-[13px] font-bold text-gray-900 tracking-tight font-sans mb-3">Fee &amp; Refund Breakdown</h4>
      <div className="flex-1" style={{ minHeight: '160px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={feeRefundData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={22}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 500 }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              domain={[0, 14000]}
              ticks={[0, 4000, 7000, 11000, 14000]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
              formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Amount']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {feeRefundData.map((_, i) => (
                <Cell key={i} fill="#FECACA" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

// Transactions Tab

const txnData = [
  {
    id: 'TXN-8841', desc: 'Customer payment — ORD-9021', date: 'Jun 7, 2026',
    type: 'Credit', vendor: 'PrintHub', method: 'Razorpay',
    amount: '+₹12,400', amountColor: 'text-emerald-600', status: 'Settled',
  },
  {
    id: 'TXN-8840', desc: 'Vendor payout — PrintHub', date: 'Jun 7, 2026',
    type: 'Debit', vendor: 'PrintHub', method: 'Bank Transfer',
    amount: '-₹10,580', amountColor: 'text-red-600', status: 'Processed',
  },
  {
    id: 'TXN-8839', desc: 'Refund — ORD-9016', date: 'Jun 6, 2026',
    type: 'Debit', vendor: 'TechStore', method: 'Razorpay',
    amount: '-₹4,508', amountColor: 'text-red-600', status: 'Processed',
  },
  {
    id: 'TXN-8838', desc: 'Customer payment — ORD-9020', date: 'Jun 6, 2026',
    type: 'Credit', vendor: 'TechStore', method: 'Stripe',
    amount: '+₹89,999', amountColor: 'text-emerald-600', status: 'Settled',
  },
  {
    id: 'TXN-8837', desc: 'Platform fee collection', date: 'Jun 5, 2026',
    type: 'Credit', vendor: 'Platform', method: 'Auto-deduct',
    amount: '+₹3,240', amountColor: 'text-emerald-600', status: 'Settled',
  },
  {
    id: 'TXN-8836', desc: 'Vendor payout — CraftGift', date: 'Jun 5, 2026',
    type: 'Debit', vendor: 'CraftGift', method: 'UPI',
    amount: '-₹8,275', amountColor: 'text-red-600', status: 'Pending',
  },
  {
    id: 'TXN-8835', desc: 'Dispute hold — ORD-9018', date: 'Jun 4, 2026',
    type: 'Hold', vendor: 'PrintHub', method: 'Razorpay',
    amount: '₹3,500', amountColor: 'text-amber-600', status: 'On Hold',
  },
]

function TypeBadge({ type }) {
  if (type === 'Credit') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
      <FiArrowUpRight className="w-3 h-3 stroke-[2.5]" /> Credit
    </span>
  )
  if (type === 'Debit') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">
      <FiArrowDownRight className="w-3 h-3 stroke-[2.5]" /> Debit
    </span>
  )
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
      <FiAlertCircle className="w-3 h-3" /> Hold
    </span>
  )
}

function StatusBadge({ status }) {
  const map = {
    Settled: { cls: 'bg-emerald-50 text-emerald-700 border-emerald-100', Icon: FiCheck },
    Processed: { cls: 'bg-blue-50 text-blue-700 border-blue-100', Icon: FiClock },
    Pending: { cls: 'bg-amber-50 text-amber-600 border-amber-100', Icon: FiClock },
    'On Hold': { cls: 'bg-red-50 text-red-600 border-red-100', Icon: FiAlertCircle },
  }
  const { cls, Icon } = map[status] || map['Pending']
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${cls}`}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  )
}

function TransactionsTab() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const totalPages = 3
  const filters = ['All', 'Credit', 'Debit', 'Hold']

  const filtered = txnData.filter(t => {
    const matchFilter = filter === 'All' || t.type === filter
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase()) ||
      t.vendor.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-white rounded-[14px] border border-[#E2E8F0] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden"
    >
      {/* 1. Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-b border-[#E2E8F0]" style={{ minHeight: '70px' }}>
        {/* Left: search + filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="pl-8 pr-3 py-1.5 text-[12px] font-medium border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 w-[190px] font-sans text-gray-700 placeholder-gray-400"
            />
          </div>
          {/* Filter pills */}
          {filters.map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`h-[30px] px-3.5 rounded-full text-[12px] font-bold transition-all cursor-pointer border font-sans
                ${filter === f
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Right: Export */}
        <button
          type="button"
          className="h-[34px] px-3.5 flex items-center gap-1.5 rounded-[8px] border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all cursor-pointer font-sans shrink-0"
        >
          <FiDownload className="w-3.5 h-3.5 text-gray-500" />
          Export CSV
        </button>
      </div>

      {/* 2. Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-[#E2E8F0]" style={{ background: '#F8FAFC', height: '40px' }}>
              {['TRANSACTION', 'TYPE', 'VENDOR', 'METHOD', 'AMOUNT', 'STATUS', 'ACTIONS'].map(col => (
                <th
                  key={col}
                  className={`py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap
                    ${col === 'ACTIONS' ? 'text-right pr-5' : 'text-left'}
                    ${col === 'TRANSACTION' ? 'pl-5' : 'px-3'}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#F1F5F9]">
            {filtered.map((txn, i) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="hover:bg-slate-50/60 transition-colors"
              >
                {/* Transaction */}
                <td className="pl-5 pr-3 py-3.5">
                  <span className="block text-[13px] font-bold text-gray-900 font-sans">{txn.id}</span>
                  <span className="block text-[11px] text-gray-500 font-medium mt-0.5">{txn.desc}</span>
                  <span className="block text-[10px] text-gray-400 font-medium mt-0.5">{txn.date}</span>
                </td>

                {/* Type */}
                <td className="px-3 py-3.5">
                  <TypeBadge type={txn.type} />
                </td>

                {/* Vendor */}
                <td className="px-3 py-3.5 text-[13px] font-semibold text-gray-700 font-sans whitespace-nowrap">
                  {txn.vendor}
                </td>

                {/* Method */}
                <td className="px-3 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-600 font-sans whitespace-nowrap">
                    <FiCreditCard className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    {txn.method}
                  </span>
                </td>

                {/* Amount */}
                <td className="px-3 py-3.5">
                  <span className={`text-[14px] font-black font-sans whitespace-nowrap ${txn.amountColor}`}>
                    {txn.amount}
                  </span>
                </td>

                {/* Status */}
                <td className="px-3 py-3.5">
                  <StatusBadge status={txn.status} />
                </td>

                {/* Actions */}
                <td className="pr-5 pl-3 py-3.5 text-right">
                  <button
                    type="button"
                    className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-slate-100 transition-all cursor-pointer ml-auto"
                  >
                    <FiEye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </motion.tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[13px] text-gray-400 font-medium">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Pagination Footer */}
      <div
        className="flex items-center justify-between px-5 border-t border-[#E2E8F0]"
        style={{ height: '66px' }}
      >
        <span className="text-[12px] font-medium text-gray-500 font-sans">
          Showing <span className="font-bold text-gray-900">7</span> of{' '}
          <span className="font-bold text-gray-900">1,284</span> transactions
        </span>

        <div className="flex items-center gap-1">
          {/* Prev */}
          <button
            type="button"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer transition-all"
          >
            <FiChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Page numbers */}
          {[1, 2, 3].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`w-[30px] h-[30px] rounded-full text-[12px] font-bold transition-all cursor-pointer border font-sans
                ${page === n
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {n}
            </button>
          ))}

          {/* Ellipsis */}
          <span className="text-[12px] text-gray-400 font-semibold px-0.5">...</span>

          {/* Next */}
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer transition-all"
          >
            <FiChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}


function JuneSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.42 }}
      className="bg-white rounded-[14px] border-t border-[#E2E8F0] border border-[#E2E8F0] p-5 flex flex-col gap-4 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
      style={{ minWidth: '220px', width: '256px', flexShrink: 0 }}
    >
      <h4 className="text-[13px] font-bold text-gray-900 font-sans">June Summary</h4>
      <div className="flex flex-col gap-3 flex-1">
        {juneSummary.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-[26px] h-[26px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-500 shrink-0">
                <Icon className="w-3 h-3" />
              </div>
              <span className="text-[12px] font-medium text-gray-500 font-sans">{label}</span>
            </div>
            <span className="text-[12px] font-bold text-gray-900 font-sans">{value}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[#E2E8F0]" />

      {/* Download P&L */}
      <button
        type="button"
        onClick={() => alert('Downloading P&L Statement…')}
        className="w-full text-[12px] font-bold text-gray-900 hover:underline flex items-center justify-center gap-1 cursor-pointer transition-all"
      >
        Download P&amp;L Statement →
      </button>
    </motion.div>
  )
}

// Vendor Payouts Tab Component
function VendorPayoutsTab() {
  const [payouts, setPayouts] = useState([
    { id: 1, name: 'GadgetWorld', orders: 12, bank: 'HDFC Bank ****4521', amount: 42800, date: 'Jun 10, 2026', held: false },
    { id: 2, name: 'StyleMart', orders: 7, bank: 'ICICI Bank ****8832', amount: 18350, date: 'Jun 10, 2026', held: false },
    { id: 3, name: 'FreshBasket', orders: 4, bank: 'SBI ****1190', amount: 9120, date: 'Jun 12, 2026', held: false },
    { id: 4, name: 'PrintHub', orders: 9, bank: 'Axis Bank ****7743', amount: 31640, date: 'Jun 14, 2026', held: false },
  ])

  const [totalPaid, setTotalPaid] = useState(6840000)
  const [transactionsCount, setTransactionsCount] = useState(1204)
  const [failedCount, setFailedCount] = useState(3)

  const activePayouts = payouts.filter(p => !p.held)
  const totalAmount = payouts.reduce((sum, p) => sum + p.amount, 0)
  const avgPayout = transactionsCount > 0 ? Math.round(totalPaid / transactionsCount) : 0

  const handleHold = (id) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, held: !p.held } : p))
  }

  const handlePayNow = (id) => {
    const p = payouts.find(x => x.id === id)
    if (!p) return
    setPayouts(prev => prev.filter(x => x.id !== id))
    setTotalPaid(prev => prev + p.amount)
    setTransactionsCount(prev => prev + 1)
  }

  const handleProcessAll = () => {
    const toPay = payouts.filter(p => !p.held)
    if (toPay.length === 0) return
    const paidSum = toPay.reduce((sum, p) => sum + p.amount, 0)
    setPayouts(prev => prev.filter(p => p.held))
    setTotalPaid(prev => prev + paidSum)
    setTransactionsCount(prev => prev + toPay.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-white rounded-[14px] border border-[#E2E8F0] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      {/* 1) Header Div */}
      <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]" style={{ height: '60px' }}>
        <div>
          <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">Pending Payouts</h3>
          <p className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">
            ₹{totalAmount.toLocaleString('en-IN')} scheduled across {payouts.length} vendor{payouts.length === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleProcessAll}
          disabled={activePayouts.length === 0}
          className="h-[34px] px-3.5 flex items-center gap-1.5 rounded-[8px] bg-black text-[12px] font-semibold text-white hover:bg-gray-900 transition-all cursor-pointer font-sans disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <LuArrowRightLeft className="w-3.5 h-3.5 text-white" />
          Process All Payouts
        </button>
      </div>

      {/* 2) Vendor Payout List Div */}
      <div className="p-4 flex flex-col gap-3 bg-white">
        <AnimatePresence mode="popLayout">
          {payouts.map((payout) => (
            <motion.div
              key={payout.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-full min-h-[70px] rounded-[12px] border border-[#E2E8F0] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white hover:border-gray-300 transition-colors"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-500 shrink-0">
                  <LuBuilding2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 font-sans">{payout.name}</div>
                  <div className="text-[11px] text-gray-400 font-medium font-sans flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span>{payout.orders} orders</span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <FiCreditCard className="w-3 h-3 text-gray-400 shrink-0" />
                      {payout.bank}
                    </span>
                  </div>
                </div>
              </div>

              {/* MIDDLE DETAILS */}
              <div className="flex flex-col items-start sm:items-end sm:text-right sm:ml-auto sm:mr-6">
                <span className="text-[15px] font-extrabold text-gray-900 font-sans leading-none">
                  ₹{payout.amount.toLocaleString('en-IN')}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium font-sans mt-1">
                  <FiClock className="w-3 h-3 text-gray-400 shrink-0" />
                  Due {payout.date}
                </span>
              </div>

              {/* RIGHT SIDE BUTTONS */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleHold(payout.id)}
                  className={`h-[32px] px-3.5 text-[12px] font-bold rounded-lg transition-all cursor-pointer font-sans border
                    ${payout.held
                      ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      : 'bg-[#F1F5F9] text-gray-700 border-slate-200 hover:bg-slate-100'}`}
                >
                  {payout.held ? 'Release' : 'Hold'}
                </button>
                <button
                  type="button"
                  onClick={() => handlePayNow(payout.id)}
                  className="h-[32px] px-3.5 text-[12px] font-bold rounded-lg bg-black hover:bg-gray-900 text-white transition-all cursor-pointer font-sans border border-black"
                >
                  Pay Now
                </button>
              </div>
            </motion.div>
          ))}
          {payouts.length === 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center text-[13px] text-gray-400 font-medium"
            >
              No pending payouts left.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3) Payout History Div */}
      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] p-4 flex flex-col gap-4">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider font-sans">
          Payout History — Last 30 Days
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4 text-center flex flex-col justify-center items-center">
            <span className="text-[20px] font-black text-gray-900 font-sans tracking-tight">
              ₹{(totalPaid / 100000).toFixed(1)}L
            </span>
            <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">Total Paid</span>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4 text-center flex flex-col justify-center items-center">
            <span className="text-[20px] font-black text-gray-900 font-sans tracking-tight">
              {transactionsCount.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">Transactions</span>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4 text-center flex flex-col justify-center items-center">
            <span className="text-[20px] font-black text-gray-900 font-sans tracking-tight">
              ₹{avgPayout.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">Avg Payout</span>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4 text-center flex flex-col justify-center items-center">
            <span className="text-[20px] font-black text-gray-900 font-sans tracking-tight">
              {failedCount}
            </span>
            <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">Failed</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Invoices Tab Component
function InvoicesTab() {
  const [invoices, setInvoices] = useState([
    { id: 'INV-2025-0142', vendor: 'PrintHub', issued: 'Jun 1, 2026', due: 'Jun 15, 2026', amount: 45200, status: 'Paid' },
    { id: 'INV-2025-0141', vendor: 'GadgetWorld', issued: 'Jun 1, 2026', due: 'Jun 15, 2026', amount: 128000, status: 'Pending' },
    { id: 'INV-2025-0140', vendor: 'CraftGift', issued: 'May 28, 2026', due: 'Jun 11, 2026', amount: 22400, status: 'Overdue' },
    { id: 'INV-2025-0139', vendor: 'TechStore', issued: 'May 25, 2026', due: 'Jun 8, 2026', amount: 312500, status: 'Paid' },
    { id: 'INV-2025-0138', vendor: 'FreshBasket', issued: 'May 22, 2026', due: 'Jun 5, 2026', amount: 18750, status: 'Overdue' },
  ])

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const handleNewInvoice = () => {
    const vendors = ['PrintHub', 'GadgetWorld', 'CraftGift', 'TechStore', 'FreshBasket', 'StyleMart']
    const randomVendor = vendors[Math.floor(Math.random() * vendors.length)]
    const randomAmt = Math.floor(Math.random() * 50 + 5) * 1000
    const randomStatus = ['Paid', 'Pending', 'Overdue'][Math.floor(Math.random() * 3)]

    const today = new Date()
    const due = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
    const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    const nextNum = invoices.length > 0
      ? parseInt(invoices[0].id.split('-')[2]) + 1
      : 143
    const newId = `INV-2025-0${nextNum}`

    const newInv = {
      id: newId,
      vendor: randomVendor,
      issued: formatDate(today),
      due: formatDate(due),
      amount: randomAmt,
      status: randomStatus
    }

    setInvoices(prev => [newInv, ...prev])
  }

  const handleDownload = (invId) => {
    alert(`Downloading PDF statement for invoice ${invId}...`)
  }

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.vendor.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || inv.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-white rounded-[14px] border border-[#E2E8F0] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] overflow-hidden"
    >
      {/* 1) Header / Action Div */}
      <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0]" style={{ height: '65px' }}>
        {/* Left side: search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search invoices..."
            className="pl-9 pr-4 py-1.5 text-[12px] font-medium border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 w-[190px] font-sans text-gray-700 placeholder-gray-400"
            style={{ height: '36px' }}
          />
        </div>

        {/* Right side: filter + new invoice */}
        <div className="flex items-center gap-2">
          {/* Filter button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen(!filterOpen)}
              className="h-[36px] px-3.5 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white text-[12px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all cursor-pointer font-sans"
            >
              <FiFilter className="w-3.5 h-3.5 text-gray-500" />
              Filter{filter !== 'All' ? `: ${filter}` : ''}
            </button>

            {filterOpen && (
              <>
                <div className="fixed inset-0 z-40 cursor-default" onClick={() => setFilterOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-40 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-2 origin-top-right flex flex-col gap-0.5">
                  {['All', 'Paid', 'Pending', 'Overdue'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => { setFilter(f); setFilterOpen(false); }}
                      className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full
                        ${filter === f ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* New Invoice button */}
          <button
            type="button"
            onClick={handleNewInvoice}
            className="h-[36px] px-3.5 flex items-center gap-1.5 rounded-full bg-black text-[12px] font-bold text-white hover:bg-gray-900 transition-all cursor-pointer font-sans"
          >
            <FiPlus className="w-3.5 h-3.5 text-white" />
            New Invoice
          </button>
        </div>
      </div>

      {/* 2) Invoice Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[750px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[#E2E8F0]" style={{ background: '#F8FAFC', height: '40px' }}>
              <th className="pl-5 pr-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">INVOICE #</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">VENDOR</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">ISSUED</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">DUE DATE</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">AMOUNT</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">STATUS</th>
              <th className="pr-5 pl-3 py-2.5 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#F1F5F9]">
            <AnimatePresence mode="popLayout">
              {filteredInvoices.map((inv, idx) => (
                <motion.tr
                  key={inv.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -8 }}
                  transition={{ delay: idx * 0.04 }}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {/* Invoice # */}
                  <td className="pl-5 pr-3 py-4">
                    <span className="flex items-center gap-2 text-[13px] font-bold text-gray-900 font-sans">
                      <FiFileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {inv.id}
                    </span>
                  </td>

                  {/* Vendor */}
                  <td className="px-3 py-4 text-[13px] font-semibold text-gray-700 font-sans whitespace-nowrap">
                    {inv.vendor}
                  </td>

                  {/* Issued */}
                  <td className="px-3 py-4 text-[12px] font-medium text-gray-500 font-sans whitespace-nowrap">
                    {inv.issued}
                  </td>

                  {/* Due Date */}
                  <td className="px-3 py-4 text-[12px] font-medium text-gray-500 font-sans whitespace-nowrap">
                    {inv.due}
                  </td>

                  {/* Amount */}
                  <td className="px-3 py-4 text-[13px] font-bold text-gray-900 font-sans whitespace-nowrap">
                    ₹{inv.amount.toLocaleString('en-IN')}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-4">
                    {inv.status === 'Paid' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <FiCheck className="w-3 h-3 stroke-[2.5]" /> Paid
                      </span>
                    )}
                    {inv.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        <FiClock className="w-3 h-3" /> Pending
                      </span>
                    )}
                    {inv.status === 'Overdue' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">
                        <FiAlertCircle className="w-3 h-3" /> Overdue
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="pr-5 pl-3 py-4 text-right">
                    <div className="flex items-center justify-end gap-3.5">
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(inv)}
                        className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(inv.id)}
                        className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                        title="Download Invoice"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>

            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[13px] text-gray-400 font-medium">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Preview Modal overlay */}
      {selectedInvoice && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] transition-opacity" onClick={() => setSelectedInvoice(null)} />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-2xl max-w-md w-full border border-gray-100 shadow-2xl p-6 pointer-events-auto flex flex-col gap-4 origin-center"
            >
              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 font-sans flex items-center gap-1.5">
                    <FiFileText className="w-4 h-4 text-gray-400" />
                    {selectedInvoice.id}
                  </h3>
                  <p className="text-[12px] text-gray-400 font-medium mt-0.5">Vendor invoice details</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="text-gray-400 hover:text-gray-600 font-bold text-[18px] focus:outline-none"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 my-2">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-semibold font-sans">Vendor</label>
                  <p className="text-[13px] font-bold text-gray-800 font-sans mt-0.5">{selectedInvoice.vendor}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-semibold font-sans">Amount</label>
                  <p className="text-[13px] font-extrabold text-gray-900 font-sans mt-0.5">₹{selectedInvoice.amount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-semibold font-sans">Issued Date</label>
                  <p className="text-[12px] font-medium text-gray-600 font-sans mt-0.5">{selectedInvoice.issued}</p>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-semibold font-sans">Due Date</label>
                  <p className="text-[12px] font-medium text-gray-600 font-sans mt-0.5">{selectedInvoice.due}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-[11px] text-gray-400 font-semibold font-sans">STATUS</span>
                <div>
                  {selectedInvoice.status === 'Paid' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <FiCheck className="w-3 h-3 stroke-[2.5]" /> Paid
                    </span>
                  )}
                  {selectedInvoice.status === 'Pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      <FiClock className="w-3 h-3" /> Pending
                    </span>
                  )}
                  {selectedInvoice.status === 'Overdue' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">
                      <FiAlertCircle className="w-3 h-3" /> Overdue
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => handleDownload(selectedInvoice.id)}
                  className="flex-1 h-9 bg-black hover:bg-gray-900 text-white rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 font-sans"
                >
                  <FiDownload className="w-3.5 h-3.5 text-white" />
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="h-9 px-4 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-[12px] font-bold transition-all cursor-pointer font-sans"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  )
}

// Custom Toggle Switch
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none p-[2px]
        ${checked ? 'bg-black' : 'bg-[#CBD5E1]'}`}
    >
      <span
        className={`pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`}
      />
    </button>
  )
}

// Settlement Rules Tab Component
function SettlementRulesTab() {
  const [cycle, setCycle] = useState('Weekly')
  const [day, setDay] = useState('Monday')
  const [threshold, setThreshold] = useState('₹500')
  const [holdPeriod, setHoldPeriod] = useState('7')

  const [rules, setRules] = useState({
    platformFee: true,
    refundAmount: true,
    holdDispute: true,
    gstFees: true,
    tdsDeduction: false,
  })

  const [saved, setSaved] = useState(false)

  const handleToggle = (key) => {
    setRules(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    alert('Settlement rules saved successfully!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-white rounded-[14px] border border-[#E2E8F0] p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] relative"
    >
      {/* Save indicator toast */}
      {saved && (
        <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-[12px] font-bold shadow-md z-10 flex items-center gap-1.5 animate-bounce">
          <FiCheck className="w-3.5 h-3.5" />
          Settings saved!
        </div>
      )}

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left Side: Payout Configuration */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">
            Payout Configuration
          </h3>

          <div className="flex flex-col gap-4">
            {/* Field 1: Settlement Cycle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-700 font-sans">
                Settlement Cycle
              </label>
              <input
                type="text"
                value={cycle}
                onChange={e => setCycle(e.target.value)}
                className="w-full h-[40px] px-3.5 text-[12px] font-medium border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans text-gray-700"
              />
            </div>

            {/* Field 2: Settlement Day */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-700 font-sans">
                Settlement Day
              </label>
              <input
                type="text"
                value={day}
                onChange={e => setDay(e.target.value)}
                className="w-full h-[40px] px-3.5 text-[12px] font-medium border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans text-gray-700"
              />
            </div>

            {/* Field 3: Minimum Payout Threshold */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-700 font-sans">
                Minimum Payout Threshold
              </label>
              <input
                type="text"
                value={threshold}
                onChange={e => setThreshold(e.target.value)}
                className="w-full h-[40px] px-3.5 text-[12px] font-medium border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans text-gray-700"
              />
            </div>

            {/* Field 4: Settlement Hold Period */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-700 font-sans">
                Settlement Hold Period (days after delivery)
              </label>
              <input
                type="text"
                value={holdPeriod}
                onChange={e => setHoldPeriod(e.target.value)}
                className="w-full h-[40px] px-3.5 text-[12px] font-medium border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Deduction Rules */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">
            Deduction Rules
          </h3>

          <div className="flex flex-col divide-y divide-gray-100">
            {/* Setting 1: Auto-deduct Platform Fee */}
            <div className="flex items-center justify-between py-3.5">
              <div>
                <div className="text-[13px] font-bold text-gray-900 font-sans">Auto-deduct Platform Fee</div>
                <div className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">Fees are deducted before vendor payout</div>
              </div>
              <Toggle checked={rules.platformFee} onChange={() => handleToggle('platformFee')} />
            </div>

            {/* Setting 2: Auto-deduct Refund Amount */}
            <div className="flex items-center justify-between py-3.5">
              <div>
                <div className="text-[13px] font-bold text-gray-900 font-sans">Auto-deduct Refund Amount</div>
                <div className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">Refunds charged back to vendor wallet</div>
              </div>
              <Toggle checked={rules.refundAmount} onChange={() => handleToggle('refundAmount')} />
            </div>

            {/* Setting 3: Hold Payout on Active Dispute */}
            <div className="flex items-center justify-between py-3.5">
              <div>
                <div className="text-[13px] font-bold text-gray-900 font-sans">Hold Payout on Active Dispute</div>
                <div className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">Pause payout if a dispute is open</div>
              </div>
              <Toggle checked={rules.holdDispute} onChange={() => handleToggle('holdDispute')} />
            </div>

            {/* Setting 4: GST on Platform Fees */}
            <div className="flex items-center justify-between py-3.5">
              <div>
                <div className="text-[13px] font-bold text-gray-900 font-sans">GST on Platform Fees</div>
                <div className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">Apply 18% GST on collected platform fees</div>
              </div>
              <Toggle checked={rules.gstFees} onChange={() => handleToggle('gstFees')} />
            </div>

            {/* Setting 5: TDS Deduction */}
            <div className="flex items-center justify-between py-3.5">
              <div>
                <div className="text-[13px] font-bold text-gray-900 font-sans">TDS Deduction (Section 194O)</div>
                <div className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">Auto-deduct 1% TDS on vendor payments</div>
              </div>
              <Toggle checked={rules.tdsDeduction} onChange={() => handleToggle('tdsDeduction')} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Save Button */}
      <div className="flex justify-end mt-8 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={handleSave}
          className="h-[38px] px-5 bg-black hover:bg-gray-900 text-white rounded-lg text-[12px] font-bold transition-all cursor-pointer font-sans"
        >
          Save Settlement Rules
        </button>
      </div>
    </motion.div>
  )
}

// Wallet Management Tab Component
function WalletManagementTab() {
  const [viewingWalletId, setViewingWalletId] = useState(null)
  const [wallets, setWallets] = useState([
    { id: 1, name: 'Alice Johnson', initials: 'AJ', color: 'bg-purple-100 text-purple-700 border-purple-200', avatarBg: 'bg-purple-600', balance: 12480.50, tier: 'Enterprise', status: 'Active', creditLimit: 50000, dailyLimit: 2500, autoReload: true, lastActivity: '2026-06-08 09:14 AM' },
    { id: 2, name: 'Bob Martinez', initials: 'BM', color: 'bg-blue-100 text-blue-700 border-blue-200', avatarBg: 'bg-blue-600', balance: 3205.75, tier: 'Premium', status: 'Active', creditLimit: 10000, dailyLimit: 1000, autoReload: false, lastActivity: '2026-06-07 03:42 PM' },
    { id: 3, name: 'Charlie Smith', initials: 'CS', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', avatarBg: 'bg-emerald-600', balance: 7630.20, tier: 'Premium', status: 'Active', creditLimit: 15000, dailyLimit: 1500, autoReload: true, lastActivity: '2026-06-06 11:20 AM' },
    { id: 4, name: 'David Lee', initials: 'DL', color: 'bg-slate-100 text-slate-700 border-slate-200', avatarBg: 'bg-slate-600', balance: 0.00, tier: 'Standard', status: 'Inactive', creditLimit: 0, dailyLimit: 500, autoReload: false, lastActivity: '2026-06-05 04:15 PM' },
    { id: 5, name: 'Eva Green', initials: 'EG', color: 'bg-pink-100 text-pink-700 border-pink-200', avatarBg: 'bg-pink-600', balance: 0.00, tier: 'Standard', status: 'Inactive', creditLimit: 0, dailyLimit: 500, autoReload: false, lastActivity: '2026-06-04 02:30 PM' },
  ])

  const [transactions, setTransactions] = useState([
    { id: 'TXN-9081', user: 'Alice Johnson', type: 'Credit', amount: 1200.00, date: '2026-06-08 10:30 AM', desc: 'Wallet topup' },
    { id: 'TXN-9080', user: 'Bob Martinez', type: 'Debit', amount: -350.00, date: '2026-06-07 04:00 PM', desc: 'Platform Fee' },
    { id: 'TXN-9079', user: 'Alice Johnson', type: 'Debit', amount: -2500.00, date: '2026-06-06 02:14 PM', desc: 'Payout release' },
  ])

  const [subTab, setSubTab] = useState('Wallets')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(1)
  const [modalTxnType, setModalTxnType] = useState('Credit')
  const [modalAmt, setModalAmt] = useState('')
  const [modalDesc, setModalDesc] = useState('')

  const activeCount = wallets.filter(w => w.status === 'Active').length
  const inactiveCount = wallets.filter(w => w.status === 'Inactive').length
  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)

  // Wallet Details Sub-View
  if (viewingWalletId !== null) {
    const selectedWallet = wallets.find(w => w.id === viewingWalletId)
    const name = selectedWallet ? selectedWallet.name : 'Alice Johnson'
    const walletId = selectedWallet ? `WLT-100${22 + selectedWallet.id}` : 'WLT-10023'
    const email = selectedWallet ? `${name.toLowerCase().replace(/\s/g, '')}@company.com` : 'alice@company.com'
    const balance = selectedWallet ? selectedWallet.balance : 10000

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full bg-white rounded-[14px] border border-[#E2E8F0] p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col gap-6"
      >
        {/* Breadcrumb back navigation */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 font-sans">
          <button
            type="button"
            onClick={() => setViewingWalletId(null)}
            className="hover:text-gray-600 transition-colors cursor-pointer"
          >
            Accounts
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => setViewingWalletId(null)}
            className="hover:text-gray-600 transition-colors cursor-pointer"
          >
            Wallet Management
          </button>
          <span>/</span>
          <span className="text-gray-900">{name}</span>
        </div>

        {/* 1) User Information Section */}
        <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
          <h2 className="text-[20px] font-black text-gray-950 font-sans tracking-tight">
            {name}
          </h2>
          <p className="text-[12px] text-gray-400 font-medium font-sans">
            {walletId} • {email}
          </p>
        </div>

        {/* 2) Balance Card Section */}
        <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4 flex flex-col gap-1.5 shadow-sm max-w-sm">
          <span className="text-[11px] font-bold text-gray-400 font-sans uppercase tracking-wider">Available Balance</span>
          <div className="flex items-center justify-between">
            <span className="text-[22px] font-black text-gray-900 font-sans leading-none">
              ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <LuWallet className="w-5 h-5 text-gray-400 shrink-0" />
          </div>
        </div>

        {/* 3) Recent Transactions Section */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider font-sans">
            Recent transactions
          </h4>

          <div className="flex flex-col border border-[#E2E8F0] rounded-xl overflow-hidden divide-y divide-[#E2E8F0]">
            {/* Transaction 1 */}
            <div className="p-3.5 flex items-center justify-between bg-white hover:bg-slate-50/50 transition-colors gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <FiArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 font-sans">Manual top-up by admin</div>
                  <div className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">
                    TXN-98741 • 2026-06-08 09:14 AM
                  </div>
                </div>
              </div>
              <span className="text-[13px] font-bold text-emerald-600 font-sans whitespace-nowrap">
                +₹5,000
              </span>
            </div>

            {/* Transaction 2 */}
            <div className="p-3.5 flex items-center justify-between bg-white hover:bg-slate-50/50 transition-colors gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                  <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 font-sans">Bulk order payment - ORD-459</div>
                  <div className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">
                    TXN-98740 • 2026-06-08 08:30 AM
                  </div>
                </div>
              </div>
              <span className="text-[13px] font-bold text-red-600 font-sans whitespace-nowrap">
                -₹5,000
              </span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end mt-4 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => setViewingWalletId(null)}
            className="h-[36px] px-4 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg text-[12px] font-bold transition-all cursor-pointer font-sans"
          >
            ← Back to Wallet List
          </button>
        </div>
      </motion.div>
    )
  }

  const handleAddTxn = (e) => {
    e.preventDefault()
    const amt = parseFloat(modalAmt)
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    const userId = parseInt(selectedUser)
    const userWallet = wallets.find(w => w.id === userId)
    if (!userWallet) return

    // Update wallet balance
    const updatedWallets = wallets.map(w => {
      if (w.id === userId) {
        const netAmt = modalTxnType === 'Credit' ? amt : -amt
        return { ...w, balance: Math.max(0, w.balance + netAmt), lastActivity: new Date().toISOString().replace('T', ' ').substring(0, 16) }
      }
      return w
    })
    setWallets(updatedWallets)

    // Log transaction
    const nextTxnNum = transactions.length > 0
      ? parseInt(transactions[0].id.split('-')[1]) + 1
      : 9082
    const newTxn = {
      id: `TXN-${nextTxnNum}`,
      user: userWallet.name,
      type: modalTxnType,
      amount: modalTxnType === 'Credit' ? amt : -amt,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      desc: modalDesc || (modalTxnType === 'Credit' ? 'Wallet topup' : 'Debit charge')
    }
    setTransactions(prev => [newTxn, ...prev])

    // Reset and close
    setModalAmt('')
    setModalDesc('')
    setModalOpen(false)
  }

  const handleExport = () => {
    alert('Exporting wallet data CSV...')
  }

  const filteredWallets = wallets.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.tier.toLowerCase().includes(search.toLowerCase()) ||
      w.id.toString().includes(search)
    const matchesStatus = statusFilter === 'All Status' || w.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredTransactions = transactions.filter(t => {
    return t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full bg-white rounded-[14px] border border-[#E2E8F0] p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col gap-6"
    >
      {/* 1) Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-bold text-gray-900 tracking-tight font-sans">
            Wallet Management
          </h3>
          <p className="text-[12px] text-gray-400 font-medium font-sans mt-0.5">
            Monitor balances, transactions &amp; limits
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export button */}
          <button
            type="button"
            onClick={handleExport}
            className="h-[36px] px-3.5 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white text-[12px] font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all cursor-pointer font-sans"
          >
            <FiDownload className="w-3.5 h-3.5 text-gray-500" />
            Export
          </button>
          {/* Add credit / debit button */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-[36px] px-3.5 flex items-center gap-1.5 rounded-lg bg-black text-[12px] font-bold text-white hover:bg-gray-900 transition-all cursor-pointer font-sans"
          >
            <FiPlus className="w-3.5 h-3.5 text-white" />
            Add Credit / Debit
          </button>
        </div>
      </div>

      {/* 2) Wallet Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[110px]">
          <span className="text-[12px] font-semibold text-gray-400 font-sans">Total Balance</span>
          <span className="text-[20px] font-black text-gray-900 font-sans mt-1">
            ₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">{wallets.length} Wallets</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[110px]">
          <span className="text-[12px] font-semibold text-gray-400 font-sans">Active Wallets</span>
          <span className="text-[20px] font-black text-gray-900 font-sans mt-1">{activeCount}</span>
          <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">{inactiveCount} Inactive</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[110px]">
          <span className="text-[12px] font-semibold text-gray-400 font-sans">Today's Volume</span>
          <span className="text-[20px] font-black text-gray-900 font-sans mt-1">₹6,200</span>
          <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">Completed Transactions</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[110px]">
          <span className="text-[12px] font-semibold text-gray-400 font-sans">Pending Transactions</span>
          <span className="text-[20px] font-black text-gray-900 font-sans mt-1">1</span>
          <span className="text-[11px] text-gray-400 font-medium font-sans mt-1">Awaiting Processing</span>
        </div>
      </div>

      {/* 3) Wallet / Transaction Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
        <button
          type="button"
          onClick={() => setSubTab('Wallets')}
          className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all cursor-pointer font-sans
            ${subTab === 'Wallets' ? 'bg-gray-100 text-gray-955' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Wallets
        </button>
        <button
          type="button"
          onClick={() => setSubTab('Transactions')}
          className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition-all cursor-pointer font-sans
            ${subTab === 'Transactions' ? 'bg-gray-100 text-gray-955' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Transactions
        </button>
      </div>

      {/* 4) Search Filter Section */}
      <div className="flex items-center gap-3" style={{ height: '60px' }}>
        {/* Left side: search */}
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={subTab === 'Wallets' ? "Search wallet ID, name, email..." : "Search transactions..."}
            className="pl-9 pr-4 py-1.5 text-[12px] font-medium border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 w-full font-sans text-gray-700 placeholder-gray-400 h-[40px]"
          />
        </div>

        {/* Right side: All Status dropdown */}
        {subTab === 'Wallets' && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              className="h-[40px] px-3.5 border border-[#E2E8F0] rounded-lg bg-slate-50 text-[12px] font-bold text-gray-700 flex items-center gap-1.5 hover:bg-slate-100 cursor-pointer font-sans"
            >
              {statusFilter}
              <FiChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {statusDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40 cursor-default" onClick={() => setStatusDropdownOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-40 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-2 origin-top-right flex flex-col gap-0.5">
                  {['All Status', 'Active', 'Inactive'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => { setStatusFilter(st); setStatusDropdownOpen(false); }}
                      className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full
                        ${statusFilter === st ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 5) Wallet Table or Transaction List Section */}
      {subTab === 'Wallets' ? (
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[900px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[#E2E8F0]" style={{ background: '#F8FAFC', height: '40px' }}>
                <th className="pl-5 pr-2 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">#</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">WALLET/USER</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">BALANCE</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">TIER</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">STATUS</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">CREDIT LIMIT</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">DAILY LIMIT</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">AUTO RELOAD</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">LAST ACTIVITY</th>
                <th className="pr-5 pl-2 py-2.5 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#F1F5F9]">
              <AnimatePresence mode="popLayout">
                {filteredWallets.map((w, idx) => (
                  <motion.tr
                    key={w.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => setViewingWalletId(w.id)}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                  >
                    {/* Index */}
                    <td className="pl-5 pr-2 py-4 text-[13px] text-gray-400 font-bold font-sans">
                      {w.id}
                    </td>

                    {/* Wallet/User */}
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 ${w.avatarBg}`}>
                          {w.initials}
                        </div>
                        <span
                          onClick={(e) => { e.stopPropagation(); setViewingWalletId(w.id); }}
                          className="text-[13px] font-bold text-gray-900 font-sans hover:underline hover:text-gray-950 transition-colors"
                        >
                          {w.name}
                        </span>
                      </div>
                    </td>

                    {/* Balance */}
                    <td className="px-3 py-4 text-[13px] font-semibold text-gray-800 font-sans whitespace-nowrap">
                      ₹{w.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Tier */}
                    <td className="px-3 py-4">
                      {w.tier === 'Enterprise' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
                          Enterprise
                        </span>
                      )}
                      {w.tier === 'Premium' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                          Premium
                        </span>
                      )}
                      {w.tier === 'Standard' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-100">
                          Standard
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-4">
                      {w.status === 'Active' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Credit Limit */}
                    <td className="px-3 py-4 text-[13px] text-gray-600 font-medium font-sans whitespace-nowrap">
                      ${w.creditLimit.toLocaleString()}
                    </td>

                    {/* Daily Limit */}
                    <td className="px-3 py-4 text-[13px] text-gray-600 font-medium font-sans whitespace-nowrap">
                      ₹{w.dailyLimit.toLocaleString('en-IN')}
                    </td>

                    {/* Auto Reload */}
                    <td className="px-3 py-4">
                      {w.autoReload ? (
                        <span className="flex items-center gap-1 text-[12px] font-semibold text-gray-700 font-sans">
                          <FiCheck className="w-3.5 h-3.5 text-gray-500" /> On
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[12px] font-semibold text-gray-400 font-sans">
                          <FiX className="w-3.5 h-3.5 text-gray-300" /> Off
                        </span>
                      )}
                    </td>

                    {/* Last Activity */}
                    <td className="px-3 py-4 text-[12px] text-gray-500 font-medium font-sans whitespace-nowrap">
                      {w.lastActivity}
                    </td>

                    {/* Actions */}
                    <td className="pr-5 pl-2 py-4 text-right">
                      <div className="flex items-center justify-end gap-3.5">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setViewingWalletId(w.id); }}
                          className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                          title="Actions"
                        >
                          <FiMoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {filteredWallets.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-[13px] text-gray-400 font-medium">
                    No wallets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Transactions List View */
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[700px]">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[#E2E8F0]" style={{ background: '#F8FAFC', height: '40px' }}>
                <th className="pl-5 pr-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">TXN ID</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">USER</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">TYPE</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">AMOUNT</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">DATE</th>
                <th className="pr-5 pl-3 py-2.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider font-sans whitespace-nowrap">DESCRIPTION</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#F1F5F9]">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((t, idx) => (
                  <motion.tr
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                    transition={{ delay: idx * 0.04 }}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="pl-5 pr-3 py-4 text-[13px] font-bold text-gray-900 font-sans">{t.id}</td>
                    <td className="px-3 py-4 text-[13px] font-semibold text-gray-700 font-sans">{t.user}</td>
                    <td className="px-3 py-4">
                      {t.type === 'Credit' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Credit
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">
                          Debit
                        </span>
                      )}
                    </td>
                    <td className={`px-3 py-4 text-[13px] font-bold font-sans ${t.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {t.amount >= 0 ? '+' : ''}₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-3 py-4 text-[12px] text-gray-500 font-medium font-sans whitespace-nowrap">{t.date}</td>
                    <td className="pr-5 pl-3 py-4 text-[12px] text-gray-600 font-medium font-sans">{t.desc}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[13px] text-gray-400 font-medium">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Credit / Debit Modal overlay */}
      {modalOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] transition-opacity" onClick={() => setModalOpen(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white rounded-2xl max-w-md w-full border border-gray-100 shadow-2xl p-6 pointer-events-auto flex flex-col gap-4 origin-center"
            >
              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 font-sans flex items-center gap-1.5">
                    <FiPlus className="w-4 h-4 text-gray-400" />
                    Add Credit / Debit
                  </h3>
                  <p className="text-[12px] text-gray-400 font-medium mt-0.5">Adjust wallet balance manually</p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 font-bold text-[18px] focus:outline-none"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddTxn} className="flex flex-col gap-4">
                {/* User Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-700 font-sans">Select Wallet/User</label>
                  <select
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                    className="w-full h-[38px] px-3 text-[12px] font-medium border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans text-gray-700"
                  >
                    {wallets.map(w => (
                      <option key={w.id} value={w.id}>{w.name} (₹{w.balance.toLocaleString('en-IN')})</option>
                    ))}
                  </select>
                </div>

                {/* Transaction Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-700 font-sans">Adjustment Type</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setModalTxnType('Credit')}
                      className={`flex-1 h-9 rounded-lg text-[12px] font-bold transition-all border font-sans
                        ${modalTxnType === 'Credit' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-gray-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      Credit (Add)
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalTxnType('Debit')}
                      className={`flex-1 h-9 rounded-lg text-[12px] font-bold transition-all border font-sans
                        ${modalTxnType === 'Debit' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-gray-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      Debit (Subtract)
                    </button>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-700 font-sans">Amount (₹)</label>
                  <input
                    type="number"
                    value={modalAmt}
                    onChange={e => setModalAmt(e.target.value)}
                    placeholder="Enter amount"
                    required
                    min="1"
                    step="0.01"
                    className="w-full h-[38px] px-3.5 text-[12px] font-medium border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-gray-700 font-sans">Description / Notes</label>
                  <input
                    type="text"
                    value={modalDesc}
                    onChange={e => setModalDesc(e.target.value)}
                    placeholder="e.g. Wallet correction, bonus credit"
                    className="w-full h-[38px] px-3.5 text-[12px] font-medium border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 font-sans text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 mt-2 pt-3 border-t border-gray-100">
                  <button
                    type="submit"
                    className="flex-1 h-9 bg-black hover:bg-gray-900 text-white rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center font-sans"
                  >
                    Apply Balance
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="h-9 px-4 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl text-[12px] font-bold transition-all cursor-pointer font-sans"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  )
}

//  Main Page 

function Accounts() {
  const [activeTab, setActiveTab] = useState('Overview')

  useEffect(() => {
    document.title = 'Accounts & Finance — SpeedCopy'
  }, [])

  return (
    <div className="w-full flex flex-col gap-6">

      {/*  SECTION 1: Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Left — title + dropdown inline (same as Dashboard) */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[24px] font-bold text-gray-900 tracking-tight font-sans leading-tight">
              Accounts &amp; Finance
            </h1>
            <DateRangeDropdown
              options={['Last 7 days', 'Last 30 days', 'Last 1 Year']}
            />
          </div>
          <p className="text-[13px] text-gray-400 font-medium mt-1.5 leading-none">
            Revenue, payouts, invoices and financial settlements.
          </p>
        </div>

        {/* Right — action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-[34px] px-3.5 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all cursor-pointer font-sans"
          >
            <FiRefreshCw className="w-3.5 h-3.5 text-gray-500" />
            Reconcile
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-[34px] px-3.5 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white text-[12px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all cursor-pointer font-sans"
          >
            <FiDownload className="w-3.5 h-3.5 text-gray-500" />
            Export
          </motion.button>
        </div>
      </div>

      {/* SECTION 2: Quick Actions */}
      <QuickActions />

      {/* SECTION 3: First Finance Cards Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <FinanceCard
          title="Total Revenue (Jun)"
          value="₹27.8L"
          change="+15.4%"
          isPositive={true}
          icon={FiTrendingUp}
          dark={true}
        />
        <FinanceCard
          title="Vendor Payouts"
          value="₹21.8L"
          change="+12.1%"
          isPositive={true}
          icon={LuWallet}
        />
        <FinanceCard
          title="Platform Fees"
          value="₹1.25L"
          change="+8.3%"
          isPositive={true}
          icon={FaPiggyBank}
        />
        <FinanceCard
          title="Pending Refunds"
          value="₹83,200"
          change="-6.2%"
          isPositive={false}
          icon={FiRefreshCw}
        />
      </motion.div>

      {/*SECTION 4: Second Finance Cards Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <FinanceCard
          title="Gross Revenue"
          value="₹27.8L"
          change="+15.4%"
          isPositive={true}
          icon={FiTrendingUp}
          dark={true}
        />
        <FinanceCard
          title="Net Revenue"
          value="₹21.8L"
          change="+12.1%"
          isPositive={true}
          icon={LuWallet}
        />
        <FinanceCard
          title="Total Profit"
          value="₹1.25L"
          change="+8.3%"
          isPositive={true}
          icon={FaPiggyBank}
        />
        {/* Empty 4th slot — keeps card widths same as row 1 */}
        <div className="hidden lg:block" />
      </motion.div>

      {/* ── SECTION 5: Analytics Container ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="w-full bg-white border border-[#E2E8F0] rounded-[16px] shadow-sm overflow-hidden"
      >

        {/* PART 1: Tabs Header */}
        <div
          className="w-full overflow-x-auto"
          style={{ borderBottom: '0.8px solid #E2E8F0', background: 'rgba(248,250,252,0.6)' }}
        >
          <div className="flex items-end min-w-max px-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative h-[46px] px-4 text-[13px] font-semibold whitespace-nowrap transition-colors cursor-pointer focus:outline-none font-sans
                  ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-900 rounded-t-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* PART 2 & 3: Content */}
        <div className="p-5 sm:p-6 flex flex-col gap-6">

          {activeTab === 'Overview' && (
            <>
              {/* PART 2: Revenue vs Payouts Chart */}
              <RevenuePayoutsChart />

              {/* PART 3: Bottom Analytics Cards */}
              <div className="flex flex-col lg:flex-row gap-4 items-stretch">
                <FeeRefundBreakdown />
                <JuneSummary />
              </div>
            </>
          )}

          {activeTab === 'Transactions' && <TransactionsTab />}

          {activeTab === 'Vendor Payouts' && <VendorPayoutsTab />}

          {activeTab === 'Invoices' && <InvoicesTab />}

          {activeTab === 'Settlement Rules' && <SettlementRulesTab />}

          {activeTab === 'Wallet management' && <WalletManagementTab />}

          {!['Overview', 'Transactions', 'Vendor Payouts', 'Invoices', 'Settlement Rules', 'Wallet management'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <FiClock className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-[14px] font-bold text-gray-700 font-sans">{activeTab}</p>
              <p className="text-[12px] text-gray-400 font-medium mt-1">This section is coming soon.</p>
            </div>
          )}

        </div>
      </motion.div>

    </div>
  )
}

export default Accounts
