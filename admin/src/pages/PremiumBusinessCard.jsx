import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowLeft,
  FiShare2,
  FiEdit,
  FiMoreHorizontal,
  FiShoppingCart,
  FiDollarSign,
  FiRefreshCw,
  FiEye,
  FiImage,
  FiTag,
  FiPercent,
  FiLayers,
  FiCheck
} from 'react-icons/fi'
import { LuPackage } from 'react-icons/lu'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import QuickActions from '../components/QuickActions.jsx'

export default function PremiumBusinessCard() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('Overview')
  const [listingVisible, setListingVisible] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Customization & Pricing fields
  const [productTag, setProductTag] = useState('Best selling')
  const [discount, setDiscount] = useState('20%')
  const [mrp, setMrp] = useState(25.00)
  const [offerPrice, setOfferPrice] = useState(19.99)
  const [costPrice, setCostPrice] = useState(8.50)
  const [totalStock, setTotalStock] = useState(5000)
  const [reservedStock, setReservedStock] = useState(320)
  const [lowStockAlert, setLowStockAlert] = useState(200)

  // Recharts Sales Performance Data (Jan - Jun)
  const salesData = [
    { name: 'Jan', orders: 140, revenue: 3500 },
    { name: 'Feb', orders: 110, revenue: 2750 },
    { name: 'Mar', orders: 200, revenue: 5000 },
    { name: 'Apr', orders: 180, revenue: 4500 },
    { name: 'May', orders: 230, revenue: 5750 },
    { name: 'Jun', orders: 210, revenue: 5250 },
  ]

  // Compute availability stats
  const availableStock = totalStock - reservedStock
  const availablePercent = Math.round((availableStock / totalStock) * 100)

  // Share action
  const handleShare = () => {
    alert('Product details link copied to clipboard!')
  }

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-6 font-sans text-slate-800 antialiased"
    >

      {/* ================================================
          DIV 1 : PRODUCT HEADER
          ================================================ */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 shrink-0">

        {/* Left Side */}
        <div className="flex flex-col">
          {/* Back button */}
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-[12px] font-bold text-slate-400 hover:text-black transition-colors w-fit mb-1.5 cursor-pointer"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> Products
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[22px] font-black text-gray-900 tracking-tight leading-none">
              Premium Business Cards 300gsm
            </h1>

            {/* Badges */}
            <div className="flex gap-1.5">
              <span className="bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none flex items-center justify-center">
                Active
              </span>
              <span className="bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none flex items-center justify-center">
                Customizable
              </span>
            </div>
          </div>

          <span className="text-[12px] text-slate-400 font-semibold mt-1.5">
            PRD-1029 · BC-300-FC · Vendor: <span className="text-slate-650 font-bold">PrintHub</span>
          </span>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="h-[34px] px-3.5 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiShare2 className="w-4 h-4 text-slate-500" /> Share
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className="h-[34px] px-4 rounded-lg bg-black text-white text-[12px] font-bold hover:bg-zinc-900 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <FiEdit className="w-3.5 h-3.5 text-white" /> Edit Product
          </button>

          <button className="h-[34px] w-[34px] rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 shadow-sm cursor-pointer">
            <FiMoreHorizontal className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* ================================================
          DIV 2 : QUICK ACTIONS
          ================================================ */}
      <div className="w-full h-[76px] pt-[3px] pb-[3px] flex items-center gap-2.5 shrink-0 overflow-x-auto">
        <QuickActions />
      </div>

      {/* ================================================
          DIV 3 : PRODUCT TABS
          ================================================ */}
      <div className="w-full h-[48px] border-b border-[#E2E8F0] flex gap-8 items-end shrink-0">
        {['Overview', 'Analytics', 'Activity'].map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 text-[13px] font-bold cursor-pointer transition-all ${isActive
                  ? 'text-black border-b-2 border-black font-extrabold'
                  : 'text-slate-400 hover:text-black font-semibold'
                }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* ================================================
          DIV 4 : MAIN CONTENT AREA
          ================================================ */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 shrink-0">

        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">

          {/* ================================================
              LEFT SECTION 1 : PERFORMANCE CARDS
              ================================================ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3.5"
          >
            {/* Card 1: Total Orders */}
            <motion.div
              variants={cardVariants}
              className="w-full h-[121.58px] p-4 bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Total Orders</span>
                <FiShoppingCart className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[18px] font-black text-gray-900 leading-none">1,842</div>
              <div className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
                <span className="leading-none">↗</span> +12.4% <span className="text-slate-450 font-medium font-sans lowercase animate-none">vs last month</span>
              </div>
            </motion.div>

            {/* Card 2: Total Revenue */}
            <motion.div
              variants={cardVariants}
              className="w-full h-[121.58px] p-4 bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Total Revenue</span>
                <FiDollarSign className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[18px] font-black text-gray-900 leading-none">₹46.0k</div>
              <div className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
                <span className="leading-none">↗</span> +8.2% <span className="text-slate-455 font-medium font-sans lowercase animate-none">vs last month</span>
              </div>
            </motion.div>

            {/* Card 3: Return Rate */}
            <motion.div
              variants={cardVariants}
              className="w-full h-[121.58px] p-4 bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Return Rate</span>
                <FiRefreshCw className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[18px] font-black text-gray-900 leading-none">1.2%</div>
              <div className="text-[9.5px] font-bold text-rose-600 flex items-center gap-0.5">
                <span className="leading-none">↘</span> -0.3% <span className="text-slate-460 font-medium font-sans lowercase animate-none">vs last month</span>
              </div>
            </motion.div>

            {/* Card 4: Page Views */}
            <motion.div
              variants={cardVariants}
              className="w-full h-[121.58px] p-4 bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Page Views</span>
                <FiEye className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-[18px] font-black text-gray-900 leading-none">9,340</div>
              <div className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-0.5">
                <span className="leading-none">↗</span> +5.1% <span className="text-slate-465 font-medium font-sans lowercase animate-none">vs last month</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ================================================
              LEFT SECTION 2 : PRODUCT IMAGES
              ================================================ */}
          <div className="w-full h-auto min-h-[296.73px] bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col justify-between gap-4">
            <h2 className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
              <FiImage className="w-4 h-4 text-slate-500" /> Product Images
            </h2>

            {/* Grid of 4 image placeholders */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-1">
              {/* Primary box */}
              <div className="aspect-square bg-slate-50 border-2 border-black rounded-xl flex flex-col items-center justify-center relative shadow-sm group cursor-pointer overflow-hidden">
                <LuPackage className="w-7 h-7 text-slate-400" />
                <span className="absolute bottom-1.5 bg-black text-white text-[9px] font-extrabold px-2 py-0.5 rounded leading-none">
                  Primary
                </span>
              </div>

              {/* Dotted boxes */}
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="aspect-square bg-slate-50/50 border border-dashed border-slate-350 rounded-xl flex items-center justify-center hover:bg-slate-50 hover:border-slate-400 transition-colors cursor-pointer">
                  <LuPackage className="w-7 h-7 text-slate-350" />
                </div>
              ))}
            </div>

            {/* Inputs underneath */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-400">Product Tag</label>
                <div className="relative">
                  <select
                    value={productTag}
                    onChange={(e) => setProductTag(e.target.value)}
                    className="w-full h-9 px-3 text-[13px] font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all cursor-pointer appearance-none"
                  >
                    <option value="Best selling">Best selling</option>
                    <option value="New release">New release</option>
                    <option value="Featured">Featured</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-400">Add discount</label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="e.g. 20%"
                  className="w-full h-9 px-3 text-[13px] font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans"
                />
              </div>
            </div>
          </div>

          {/* ================================================
              LEFT SECTION 3 : DESCRIPTION
              ================================================ */}
          <div className="w-full h-auto min-h-[224.58px] bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              <h2 className="text-[13px] font-bold text-gray-900">Description</h2>
              <p className="text-[12.5px] leading-relaxed text-slate-500 font-medium">
                Professional-grade business cards printed on 300gsm matte finish cardstock. Available with full-color printing on both sides, with optional UV coating and rounded corners. Ideal for corporate identity, networking, and brand representation.
              </p>
            </div>

            {/* Tag badges */}
            <div className="flex flex-wrap gap-1.5 pt-3">
              {['business', 'corporate', 'printing', 'premium', 'cards'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-[#E2E8F0] text-slate-500 text-[10.5px] font-semibold px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-50 hover:text-black transition-colors"
                >
                  <FiTag className="w-3 h-3 text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ================================================
              LEFT SECTION 4 : SALES PERFORMANCE
              ================================================ */}
          <div className="w-full h-auto min-h-[277.6px] bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-gray-900">Sales Performance</h2>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Last 6 months</span>
            </div>

            {/* Bar Chart */}
            <div className="w-full h-[180px] mt-4 font-sans text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 240]}
                    ticks={[0, 60, 120, 180, 240]}
                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 6000]}
                    ticks={[0, 1500, 3000, 4500, 6000]}
                    tickFormatter={(val) => `₹${(val / 1000) % 1 === 0 ? (val / 1000) : (val / 1000).toFixed(1)}k`}
                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 500 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '11px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="orders"
                    fill="#E2E8F0"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={45}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    fill="transparent"
                    maxBarSize={0}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">

          {/* ================================================
              RIGHT CARD 1 : LISTING STATUS
              ================================================ */}
          <div className="w-full h-auto min-h-[79.6px] p-5 bg-white border border-[#E2E8F0] rounded-[14px] flex items-center justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-gray-900 leading-tight">Listing Status</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-0.5">Visible in store</span>
            </div>

            {/* iOS style Toggle Switch */}
            <button
              onClick={() => setListingVisible(!listingVisible)}
              className={`w-[40px] h-[22px] rounded-full p-[2px] transition-colors duration-200 cursor-pointer relative flex items-center ${listingVisible ? 'bg-black' : 'bg-slate-200'
                }`}
            >
              <div
                className={`bg-white w-[18px] h-[18px] rounded-full shadow-sm transform transition-transform duration-200 ${listingVisible ? 'translate-x-[18px]' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          {/* ================================================
              RIGHT CARD 2 : PRICING
              ================================================ */}
          <div className="w-full h-auto min-h-[209.6px] p-5 bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] gap-4">
            <h2 className="text-[13px] font-bold text-gray-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <FiPercent className="w-4 h-4 text-slate-500" /> Pricing
            </h2>

            <div className="flex flex-col gap-3 pt-1">
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>MRP / List Price</span>
                <span className="text-slate-800 font-bold">₹{mrp.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>Offer Price</span>
                <span className="text-[#6366F1] font-extrabold">₹{offerPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>Cost Price</span>
                <span className="text-slate-800 font-bold">₹{costPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>Gross Margin</span>
                <span className="text-emerald-600 font-extrabold">
                  {mrp > 0 ? `${(((mrp - offerPrice) / mrp) * 100).toFixed(0)}%` : '0%'}
                </span>
              </div>
            </div>
          </div>

          {/* ================================================
              RIGHT CARD 3 : INVENTORY
              ================================================ */}
          <div className="w-full h-auto min-h-[255.4px] p-5 bg-white border border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] gap-4">
            <h2 className="text-[13px] font-bold text-gray-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
              <FiLayers className="w-4 h-4 text-slate-500" /> Inventory
            </h2>

            <div className="flex flex-col gap-2.5 pt-1.5">
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>Total Stock</span>
                <span className="text-slate-800 font-bold">{totalStock.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>Reserved</span>
                <span className="text-slate-800 font-bold">{reservedStock}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>Available</span>
                <span className="text-emerald-600 font-extrabold">{availableStock.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px] font-semibold text-slate-400">
                <span>Low Stock Alert</span>
                <span className="text-slate-800 font-bold">&lt; {lowStockAlert}</span>
              </div>
            </div>

            {/* Progress Bar & Available Subtext */}
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${availablePercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{availablePercent}% available</span>
            </div>
          </div>

        </div>

      </div>

      {/* Edit Modal (Popup on click) */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[16px] border border-[#E2E8F0] p-6 w-[450px] shadow-2xl flex flex-col gap-4"
            >
              <h3 className="text-[16px] font-bold text-gray-900 border-b border-slate-100 pb-2">Edit Product Catalog Settings</h3>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-400">MRP (INR)</label>
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(parseFloat(e.target.value) || 0)}
                    className="w-full h-9 px-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-400">Offer Price (INR)</label>
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(parseFloat(e.target.value) || 0)}
                    className="w-full h-9 px-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-slate-400">Total Stock</label>
                  <input
                    type="number"
                    value={totalStock}
                    onChange={(e) => setTotalStock(parseInt(e.target.value) || 0)}
                    className="w-full h-9 px-3 text-[13px] border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="h-8 px-4 text-[12px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    alert('Catalog settings updated locally!')
                  }}
                  className="h-8 px-4 text-[12px] font-bold text-white bg-black hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <FiCheck className="w-3.5 h-3.5" /> Save changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
