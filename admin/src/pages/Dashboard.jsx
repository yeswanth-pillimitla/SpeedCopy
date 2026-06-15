import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import QuickActions from '../components/QuickActions.jsx'
import {
  FiUsers,
  FiShoppingCart,
  FiBox,
  FiSettings,
  FiChevronDown,
  FiDollarSign,
  FiClock,
  FiRefreshCw,
  FiArrowUpRight,
  FiArrowDownRight,
  FiLifeBuoy
} from 'react-icons/fi'
import { LuStore } from 'react-icons/lu'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard -SpeedCopy'
  }, [])

  // State for date range filtering
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('7days') // '7days', '30days', 'year', 'custom'
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

  // Stable pseudo-random generator to vary values realistically per selected range
  const getSeededValue = (seedString, min = 1000, max = 9000) => {
    let hash = 0
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash)
    }
    const rng = Math.abs(Math.sin(hash)) * 1000
    const val = min + (rng % (max - min))
    return Math.round(val)
  }

  const getDashboardData = () => {
    let revenueData = []
    let totalRev = 0
    let totalOrd = 0
    let activeCust = 33493
    let activeVend = 1204
    let activeProd = 45294
    let pendingOrd = 243
    let refundReq = 18
    let supportTkt = 42

    const today = new Date('2026-06-12')

    if (selectedRange === '7days') {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const rev = getSeededValue(dateStr + '_7d', 1200, 3200)
        revenueData.push({ month: dateStr, revenue: rev })
        totalRev += rev
      }
      totalOrd = Math.round(totalRev / 3.4)
      activeCust = 8432
      activeVend = 245
      activeProd = 1290
      pendingOrd = 28
      refundReq = 3
      supportTkt = 8
    } else if (selectedRange === '30days') {
      for (let i = 5; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i * 5)
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const rev = getSeededValue(dateStr + '_30d', 4500, 9500)
        revenueData.push({ month: dateStr, revenue: rev })
        totalRev += rev
      }
      totalRev = Math.round(totalRev * 2.2)
      totalOrd = 8432
      activeCust = 33493
      activeVend = 1204
      activeProd = 45294
      pendingOrd = 243
      refundReq = 18
      supportTkt = 42
    } else if (selectedRange === 'year') {
      for (let i = 11; i >= 0; i--) {
        const d = new Date(today)
        d.setMonth(today.getMonth() - i)
        const monthStr = d.toLocaleDateString('en-US', { month: 'short' })
        const rev = getSeededValue(monthStr + '_year', 45000, 98000)
        revenueData.push({ month: monthStr, revenue: rev })
        totalRev += rev
      }
      totalOrd = Math.round(totalRev / 3.8)
      activeCust = 142095
      activeVend = 4590
      activeProd = 189204
      pendingOrd = 892
      refundReq = 74
      supportTkt = 285
    } else if (selectedRange === 'custom' && customRange.start && customRange.end) {
      const start = new Date(customRange.start)
      const end = new Date(customRange.end)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

      if (diffDays <= 10) {
        for (let i = 0; i < diffDays; i++) {
          const d = new Date(start)
          d.setDate(start.getDate() + i)
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          const rev = getSeededValue(dateStr + '_custom', 800, 2500)
          revenueData.push({ month: dateStr, revenue: rev })
          totalRev += rev
        }
      } else if (diffDays <= 60) {
        const points = Math.min(10, Math.ceil(diffDays / 5))
        for (let i = 0; i < points; i++) {
          const d = new Date(start)
          d.setDate(start.getDate() + Math.round((i * diffDays) / points))
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          const rev = getSeededValue(dateStr + '_custom', 4000, 8000)
          revenueData.push({ month: dateStr, revenue: rev })
          totalRev += rev
        }
      } else {
        const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1
        const points = Math.min(12, diffMonths)
        for (let i = 0; i < points; i++) {
          const d = new Date(start)
          d.setMonth(start.getMonth() + Math.round((i * diffMonths) / points))
          const monthStr = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
          const rev = getSeededValue(monthStr + '_custom', 30000, 75000)
          revenueData.push({ month: monthStr, revenue: rev })
          totalRev += rev
        }
      }
      totalOrd = Math.round(totalRev / 3.6)
      activeCust = Math.round(totalRev * 2.8)
      activeVend = Math.round(totalRev * 0.08)
      activeProd = Math.round(totalRev * 3.2)
      pendingOrd = Math.round(totalOrd * 0.03)
      refundReq = Math.round(totalOrd * 0.002)
      supportTkt = Math.round(totalOrd * 0.005)
    } else {
      // Default to 7 days if custom not applied
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(today.getDate() - i)
        const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const rev = getSeededValue(dateStr + '_7d', 1200, 3200)
        revenueData.push({ month: dateStr, revenue: rev })
        totalRev += rev
      }
      totalOrd = Math.round(totalRev / 3.4)
      activeCust = 8432
      activeVend = 245
      activeProd = 1290
      pendingOrd = 28
      refundReq = 3
      supportTkt = 8
    }

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue), 1000)
    const niceMax = Math.ceil(maxRevenue / 1000) * 1000

    const pVal = getSeededValue(selectedRange + '_cat_p', 35, 55)
    const gVal = getSeededValue(selectedRange + '_cat_g', 20, 35)
    const sVal = 100 - pVal - gVal
    const categoryData = [
      { name: 'Printing', value: pVal, color: '#111827' },
      { name: 'Gifting', value: gVal, color: '#6B7280' },
      { name: 'Shopping', value: sVal, color: '#E5E7EB' },
    ]

    return {
      revenueData,
      niceMax,
      totalRevenue: totalRev,
      categoryData,
      stats: [
        { title: 'Total Revenue', value: `₹${totalRev.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`, change: '+14.5%', isPositive: true, icon: FiDollarSign },
        { title: 'Total Orders', value: totalOrd.toLocaleString('en-IN'), change: '+21.2%', isPositive: true, icon: FiShoppingCart },
        { title: 'Active Customers', value: activeCust.toLocaleString('en-IN'), change: '+5.4%', isPositive: true, icon: FiUsers },
        { title: 'Active Vendors', value: activeVend.toLocaleString('en-IN'), change: '+1.2%', isPositive: true, icon: LuStore },
        { title: 'Active Products', value: activeProd.toLocaleString('en-IN'), change: '+12.5%', isPositive: true, icon: FiBox },
        { title: 'Pending Orders', value: pendingOrd.toLocaleString('en-IN'), change: '-4.5%', isPositive: false, icon: FiClock },
        { title: 'Refund Requests', value: refundReq.toLocaleString('en-IN'), change: '-12.5%', isPositive: false, icon: FiRefreshCw },
        { title: 'Support Tickets', value: supportTkt.toLocaleString('en-IN'), change: '+2.4%', isPositive: true, icon: FiLifeBuoy },
      ]
    }
  }

  const data = getDashboardData()
  const stats = data.stats
  const revenueData = data.revenueData
  const categoryData = data.categoryData

  const formatShortAmount = (amount) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`
    return `₹${amount}`
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

  // Latest Orders Table Rows
  const latestOrders = [
    { id: '#ORD-7352', customer: 'Michael Chen', product: 'Custom Business Cards', amount: '₹45.00', status: 'Processing' },
    { id: '#ORD-7351', customer: 'Emma Wilson', product: 'Personalized Coffee Mug', amount: '₹18.50', status: 'Delivered' },
    { id: '#ORD-7350', customer: 'James Rodriguez', product: 'Wireless Earbuds Pro', amount: '₹129.99', status: 'Shipped' },
    { id: '#ORD-7349', customer: 'Sophia Taylor', product: 'Premium Leather Notebook', amount: '₹32.00', status: 'Processing' },
    { id: '#ORD-7348', customer: 'William Brown', product: 'A4 Photo Prints (x50)', amount: '₹25.00', status: 'Delivered' },
  ]

  // Recent Activities timeline
  const activities = [
    { text: 'New vendor Premium Prints registered', time: '5 mins ago', type: 'vendor', icon: LuStore, iconBg: 'bg-indigo-50 text-indigo-600' },
    { text: 'Order #ORD-7345 was marked as returned', time: '1 hour ago', type: 'return', icon: FiShoppingCart, iconBg: 'bg-rose-50 text-rose-600' },
    { text: 'System backup completed successfully', time: '3 hours ago', type: 'backup', icon: FiSettings, iconBg: 'bg-emerald-50 text-emerald-600' },
    { text: 'Support ticket #TKT-892 escalated to high priority', time: '4 hours ago', type: 'ticket', icon: FiLifeBuoy, iconBg: 'bg-amber-50 text-amber-600' },
  ]

  // Animations config
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Header Title Row */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-bold text-gray-900 tracking-tight font-sans">
            Dashboard Overview
          </h1>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-full px-2.5 py-1 bg-white shadow-sm font-sans flex items-center gap-1 cursor-pointer hover:bg-gray-50 transition-all focus:outline-none"
            >
              {rangeLabels[selectedRange]} <FiChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <>
                {/* Invisible backdrop for closing when clicking outside */}
                <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 md:right-auto md:left-0 mt-1.5 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-3.5 origin-top-right md:origin-top-left flex flex-col gap-1"
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
                    className={`text-left px-3 py-2 text-[12px] font-bold rounded-lg transition-colors cursor-pointer w-full ${selectedRange === 'year' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
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
        <p className="text-[13px] text-gray-400 font-medium leading-none mt-1.5">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Quick Actions Row */}
      <QuickActions />

      {/* Stats 8-Card Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2"
      >
        {stats.map((stat, i) => {
          const StatIcon = stat.icon
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="w-full h-[133.6px] bg-white border border-[#E2E8F0] rounded-[14px] p-5 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-gray-400 tracking-tight font-sans">
                  {stat.title}
                </span>
                <div className="w-[30px] h-[30px] rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-gray-650">
                  <StatIcon className="w-3.5 h-3.5 animate-pulse-slow" />
                </div>
              </div>

              {/* Middle row */}
              <div className="text-[20px] font-black text-gray-900 tracking-tight mt-1 leading-none font-sans">
                {stat.value}
              </div>

              {/* Bottom row */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`
                  text-[11px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 leading-none
                  ${stat.isPositive
                    ? 'bg-[#DEF7EC] text-[#03543F]'
                    : 'bg-[#FDE8E8] text-[#9B1C1C]'}
                `}>
                  {stat.isPositive ? <FiArrowUpRight className="w-3 h-3 stroke-[2.5]" /> : <FiArrowDownRight className="w-3 h-3 stroke-[2.5]" />}
                  {stat.change}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">vs last month</span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Analytics Section */}
      <section className="w-full flex flex-col lg:flex-row gap-6 mt-2">
        {/* Left Chart Card - Revenue Analytics */}
        <div className="flex-1 bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-sm flex flex-col justify-between min-h-[429.6px]">
          <div>
            <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">
              Revenue Analytics
            </h3>
            <p className="text-[11px] text-gray-400 font-medium">Monthly revenue progression for current fiscal period.</p>
          </div>

          {/* Recharts Area Chart */}
          <div className="w-full h-[280px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#111827" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#111827" stopOpacity={0.0} />
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
                  domain={[0, data.niceMax]}
                  ticks={[0, Math.round(data.niceMax * 0.25), Math.round(data.niceMax * 0.5), Math.round(data.niceMax * 0.75), data.niceMax]}
                  tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}
                  labelStyle={{ color: '#94A3B8', fontSize: '10px' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#111827"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Category Card - Revenue by Category */}
        <div className="w-full lg:w-[320px] shrink-0 bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-sm flex flex-col justify-between min-h-[429.6px]">
          <div>
            <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">
              Revenue by Category
            </h3>
            <p className="text-[11px] text-gray-400 font-medium">Breakdown by vertical.</p>
          </div>

          {/* Donut Chart */}
          <div className="w-full h-[180px] flex items-center justify-center relative mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Absolute Center Indicator */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-[20px] font-black text-gray-900 leading-none font-sans">{formatShortAmount(data.totalRevenue)}</span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5 tracking-wider">Total</span>
            </div>
          </div>

          {/* Legends Section */}
          <div className="space-y-2.5 mt-2">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-[13px] font-medium font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></span>
                  <span className="text-gray-500">{entry.name}</span>
                </div>
                <span className="text-gray-900 font-bold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orders + Activity */}
      <section className="w-full flex flex-col lg:flex-row gap-6 mt-2">
        {/* Latest Orders Card */}
        <div className="flex-1 bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">
                Latest Orders
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">Real-time listing of incoming purchases.</p>
            </div>
            <button className="text-[12px] font-bold text-black hover:underline cursor-pointer">
              View All
            </button>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-[13px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-slate-50/50">
                  <th className="py-2.5 px-3 font-semibold text-gray-400 text-[11px] uppercase tracking-wider">Order ID</th>
                  <th className="py-2.5 px-3 font-semibold text-gray-400 text-[11px] uppercase tracking-wider">Customer</th>
                  <th className="py-2.5 px-3 font-semibold text-gray-400 text-[11px] uppercase tracking-wider">Product</th>
                  <th className="py-2.5 px-3 font-semibold text-gray-400 text-[11px] uppercase tracking-wider">Amount</th>
                  <th className="py-2.5 px-3 font-semibold text-gray-400 text-[11px] uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {latestOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-bold text-gray-900">{order.id}</td>
                    <td className="py-3 px-3 text-gray-600 font-medium">{order.customer}</td>
                    <td className="py-3 px-3 text-gray-500 font-normal truncate max-w-[120px]">{order.product}</td>
                    <td className="py-3 px-3 font-semibold text-gray-900">{order.amount}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`
                        inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border leading-none
                        ${order.status === 'Delivered' && 'bg-emerald-50 text-emerald-800 border-emerald-100'}
                        ${order.status === 'Processing' && 'bg-amber-50 text-amber-800 border-amber-100'}
                        ${order.status === 'Shipped' && 'bg-blue-50 text-blue-800 border-blue-100'}
                      `}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div className="w-full lg:w-[320px] shrink-0 bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-gray-900 tracking-tight font-sans">
              Recent Activities
            </h3>
            <p className="text-[11px] text-gray-400 font-medium">Event log across platform operations.</p>
          </div>

          {/* Timeline */}
          <div className="flex-1 my-5 relative">
            <div className="space-y-0">
              {activities.map((act, i) => {
                const ActIcon = act.icon
                const isLast = i === activities.length - 1
                return (
                  <div key={i} className="flex gap-3 relative items-start pb-5 last:pb-0">
                    {/* Vertical line segment inside the item */}
                    {!isLast && (
                      <div className="absolute left-[17px] top-[34px] bottom-0 w-[1px] bg-gray-200"></div>
                    )}

                    <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 border border-white shadow-sm z-10 ${act.iconBg}`}>
                      <ActIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col pt-0.5">
                      <span className="text-[12px] font-semibold text-gray-800 leading-tight">
                        {act.text}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold mt-1">
                        {act.time}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Load More Button */}
          <button
            type="button"
            className="w-full h-[38px] bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-black rounded-[10px] text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center"
          >
            Load More
          </button>
        </div>
      </section>

    </div>
  )
}

export default Dashboard
