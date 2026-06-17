import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiDownload,
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiPlus,
  FiPercent,
  FiTag,
  FiFolder,
  FiShare2,
  FiCalendar,
  FiX,
  FiCopy,
  FiCheck,
  FiUpload,
  FiBell,
  FiArrowUpRight,
  FiEye,
  FiEdit,
  FiTrash2,
  FiLayout,
  FiAlertTriangle,
  FiSliders,
  FiGrid
} from 'react-icons/fi'
import { LuStore, LuTicket, LuMegaphone } from 'react-icons/lu'
import { MdOutlineLocalOffer } from 'react-icons/md'

// ─── Mock Initial Offers ──────────────────────────────────────────────────────
const initialOffers = [
  {
    id: 'OFF-001',
    name: 'Flat ₹100 Off',
    type: 'Flat Discount',
    target: 'All',
    code: 'FLAT100',
    discount: '₹100',
    discountVal: 100,
    minOrder: '₹499',
    minOrderVal: 499,
    usage: 342,
    maxUsage: 1000,
    expiry: '30 Jun 2025',
    status: 'Active'
  },
  {
    id: 'OFF-002',
    name: '25% Off Printing',
    type: 'Percentage',
    target: 'Printing',
    code: 'PRINT25',
    discount: '25%',
    discountVal: 25,
    minOrder: '₹299',
    minOrderVal: 299,
    usage: 89,
    maxUsage: 500,
    expiry: '15 Jun 2025',
    status: 'Active'
  },
  {
    id: 'OFF-003',
    name: 'Vendor Flash Sale',
    type: 'Vendor Offer',
    target: 'Gifting',
    code: 'VENDOR50',
    discount: '50%',
    discountVal: 50,
    minOrder: '₹999',
    minOrderVal: 999,
    usage: 12,
    maxUsage: 100,
    expiry: '20 Jun 2025',
    status: 'Scheduled'
  },
  {
    id: 'OFF-004',
    name: 'Category Mega Deal',
    type: 'Category Offer',
    target: 'Shopping',
    code: 'CATDEAL',
    discount: '30%',
    discountVal: 30,
    minOrder: '₹599',
    minOrderVal: 599,
    usage: 201,
    maxUsage: 300,
    expiry: '01 Jun 2025',
    status: 'Expired'
  },
  {
    id: 'OFF-005',
    name: 'First Order Flat',
    type: 'Flat Discount',
    target: 'All',
    code: 'FIRST50',
    discount: '₹50',
    discountVal: 50,
    minOrder: '₹199',
    minOrderVal: 199,
    usage: 1204,
    maxUsage: Infinity,
    expiry: '31 Dec 2025',
    status: 'Active'
  }
]

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, icon: Icon, iconBg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 min-w-[200px] bg-white rounded-[14px] border border-[#E2E8F0] p-5 flex items-start justify-between gap-3 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[12px] text-slate-500 font-medium leading-none">{title}</span>
        <span className="text-[26px] font-bold text-slate-900 leading-tight mt-1">{value}</span>
        <span className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</span>
      </div>
      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
    </motion.div>
  )
}

// ─── Create Offer Modal ───────────────────────────────────────────────────────
function CreateOfferModal({ onClose, onSave }) {
  const [offerType, setOfferType] = useState('Flat Discount')
  const [offerName, setOfferName] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [flatAmount, setFlatAmount] = useState('')
  const [minOrderValue, setMinOrderValue] = useState('')
  const [maxDiscountCap, setMaxDiscountCap] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSave = () => {
    if (!offerName.trim() || !promoCode.trim()) return
    const discountStr = offerType === 'Percentage' ? `${flatAmount || '10'}%` : `₹${flatAmount || '100'}`
    const isPct = offerType === 'Percentage' || offerType === 'Vendor Offer' || offerType === 'Category Offer'
    onSave({
      id: `OFF-0${Math.floor(Math.random() * 900) + 100}`,
      name: offerName,
      type: offerType,
      target: offerType === 'Vendor Offer' ? 'Gifting' : offerType === 'Category Offer' ? 'Shopping' : 'All',
      code: promoCode.toUpperCase(),
      discount: discountStr,
      discountVal: parseInt(flatAmount) || 10,
      minOrder: `₹${minOrderValue || '0'}`,
      minOrderVal: parseInt(minOrderValue) || 0,
      usage: 0,
      maxUsage: parseInt(maxDiscountCap) || 1000,
      expiry: endDate ? new Date(endDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : '31 Dec 2025',
      status: 'Active'
    })
    onClose()
  }

  const types = [
    { name: 'Flat Discount', icon: FiTag, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { name: 'Percentage', icon: FiPercent, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { name: 'Vendor Offer', icon: LuStore, color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { name: 'Category Offer', icon: FiGrid, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-[16px] shadow-2xl w-full max-w-[500px] flex flex-col max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-slate-900 leading-tight">Create New Offer</h3>
            <p className="text-[12px] text-slate-400 mt-0.5 font-medium">Configure discount rules and targeting</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          {/* Offer Type selector */}
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-slate-700">Offer Type</span>
            <div className="grid grid-cols-2 gap-2.5">
              {types.map(t => {
                const Icon = t.icon
                const isSelected = offerType === t.name
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setOfferType(t.name)}
                    className={`h-[48px] px-3 border rounded-[10px] flex items-center gap-2.5 text-[12px] font-semibold transition-all ${
                      isSelected
                        ? 'border-black bg-slate-50 text-slate-900 ring-1 ring-black'
                        : 'border-[#E2E8F0] hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${t.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {t.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Offer Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Offer Name</label>
            <input
              value={offerName}
              onChange={e => setOfferName(e.target.value)}
              placeholder="e.g. Summer Sale 20% Off"
              className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black bg-[#F8FAFC]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Promo Code */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">Promo Code</label>
              <input
                value={promoCode}
                onChange={e => setPromoCode(e.target.value.toUpperCase())}
                placeholder="SUMMER20"
                className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black bg-[#F8FAFC]"
              />
            </div>
            {/* Flat Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">
                {offerType === 'Percentage' ? 'Percentage (%)' : 'Flat Amount (₹)'}
              </label>
              <input
                type="number"
                value={flatAmount}
                onChange={e => setFlatAmount(e.target.value)}
                placeholder={offerType === 'Percentage' ? '20' : '100'}
                className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black bg-[#F8FAFC]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Min Order Value */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">Min. Order Value (₹)</label>
              <input
                type="number"
                value={minOrderValue}
                onChange={e => setMinOrderValue(e.target.value)}
                placeholder="499"
                className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black bg-[#F8FAFC]"
              />
            </div>
            {/* Max Usage / Discount Cap */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">Max Discount Cap / Usage</label>
              <input
                type="number"
                value={maxDiscountCap}
                onChange={e => setMaxDiscountCap(e.target.value)}
                placeholder="500"
                className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black bg-[#F8FAFC]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 focus:outline-none bg-[#F8FAFC]"
              />
            </div>
            {/* End Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-slate-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 focus:outline-none bg-[#F8FAFC]"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-4 rounded-[8px] text-[12px] font-semibold text-slate-600 bg-white border border-[#E2E8F0] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-[36px] px-5 rounded-[8px] text-[12px] font-semibold text-white bg-black hover:bg-slate-800 transition-colors"
          >
            Create Offer
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Create Notification Modal ────────────────────────────────────────────────
function CreateNotificationModal({ onClose, onSend }) {
  const [template, setTemplate] = useState('System Update')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [audience, setAudience] = useState('All Users')
  const [linkUrl, setLinkUrl] = useState('')
  const [scheduleType, setScheduleType] = useState('immediate')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState('')

  const templates = [
    { name: 'System Update', icon: FiLayout },
    { name: 'New Promotion', icon: LuMegaphone },
    { name: 'Security Alert', icon: FiAlertTriangle },
    { name: 'Maintenance', icon: FiSliders }
  ]

  const handleTemplateClick = (name) => {
    setTemplate(name)
    if (name === 'System Update') {
      setTitle('System Update: App improvements!')
      setMessage('We have rolled out new features. Update your app to enjoy a smoother and faster shopping experience.')
    } else if (name === 'New Promotion') {
      setTitle('Big Deals Await You! 🎁')
      setMessage('Shop the best discounts of the season. Flat discount and promo codes are live right now!')
    } else if (name === 'Security Alert') {
      setTitle('Security Checkpoint Reminder')
      setMessage('Please verify your security credentials to keep your SpeedCopy transaction wallet safe and secure.')
    } else if (name === 'Maintenance') {
      setTitle('Scheduled System Maintenance')
      setMessage('SpeedCopy admin will undergo routine database maintenance tonight from 2 AM to 4 AM UTC.')
    }
  }

  const handleSave = () => {
    if (!title.trim() || !message.trim()) return
    onSend({
      title,
      message,
      audience,
      linkUrl
    })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-[16px] shadow-2xl w-full max-w-[540px] flex flex-col max-h-[92vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-slate-900 leading-tight">Create New Push Notification</h3>
            <p className="text-[12px] text-slate-400 mt-0.5 font-medium">Configure and target your message to users.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          {/* Message Templates */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-700">Message Templates</span>
            <div className="grid grid-cols-4 gap-2">
              {templates.map(t => {
                const Icon = t.icon
                const isSelected = template === t.name
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => handleTemplateClick(t.name)}
                    className={`p-2.5 border rounded-[10px] flex flex-col items-center gap-1.5 text-center transition-all ${
                      isSelected
                        ? 'border-black bg-slate-50 text-slate-900 ring-1 ring-black'
                        : 'border-[#E2E8F0] hover:bg-slate-50 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <span className="text-[10px] font-bold leading-tight">{t.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Notification Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter a brief, engaging title"
              className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black bg-[#F8FAFC]"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[12px] font-bold text-slate-700">
              <label>Notification Message</label>
              <span className="text-slate-400 font-medium">{message.length}/150</span>
            </div>
            <textarea
              maxLength={150}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={3}
              className="p-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-black bg-[#F8FAFC] resize-none"
            />
          </div>

          {/* Target Audience */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Target Audience</label>
            <select
              value={audience}
              onChange={e => setAudience(e.target.value)}
              className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 focus:outline-none bg-[#F8FAFC]"
            >
              <option>All Users</option>
              <option>Active Shoppers</option>
              <option>Inactive Users (30+ days)</option>
              <option>Vendors Only</option>
            </select>
          </div>

          {/* Link/Action URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Link/Action URL</label>
            <div className="flex items-center h-[38px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
              <span className="px-3 text-[11px] text-slate-400 font-medium h-full flex items-center border-r border-[#E2E8F0]">
                https://
              </span>
              <input
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                placeholder="example.com/promo"
                className="flex-1 px-3 text-[13px] text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="flex flex-col gap-2 p-4 border border-[#E2E8F0] bg-[#F8FAFC] rounded-[10px]">
            <span className="text-[12px] font-bold text-slate-700">Schedule</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[12px] font-medium text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  checked={scheduleType === 'immediate'}
                  onChange={() => setScheduleType('immediate')}
                  className="accent-black"
                />
                Send Immediately
              </label>
              <label className="flex items-center gap-2 text-[12px] font-medium text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  checked={scheduleType === 'later'}
                  onChange={() => setScheduleType('later')}
                  className="accent-black"
                />
                Schedule for Later
              </label>
            </div>

            {scheduleType === 'later' && (
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-bold">Date</span>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={e => setScheduleDate(e.target.value)}
                    className="h-[34px] px-3.5 border border-[#E2E8F0] rounded-[6px] text-[12px] bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 font-bold">Time (Local)</span>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={e => setScheduleTime(e.target.value)}
                    className="h-[34px] px-3.5 border border-[#E2E8F0] rounded-[6px] text-[12px] bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* File Upload Box */}
          <div
            className={`border-2 border-dashed rounded-[10px] p-6 text-center flex flex-col items-center justify-center gap-2 transition-colors ${
              dragActive ? 'border-black bg-slate-50' : 'border-[#E2E8F0] bg-[#F8FAFC]'
            }`}
            onDragOver={e => { e.preventDefault(); setDragActive(true) }}
            onDragLeave={() => setDragActive(false)}
            onDrop={e => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) setFileName(e.dataTransfer.files[0].name) }}
          >
            <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <FiUpload className="w-4 h-4" />
            </div>
            <span className="text-[12px] font-bold text-slate-800">
              {fileName ? `Selected: ${fileName}` : 'Click to upload or drag and drop'}
            </span>
            <span className="text-[10px] text-slate-400">PNG, JPG or SVG (max. 800×400px)</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-4 rounded-[8px] text-[12px] font-semibold text-slate-600 bg-white border border-[#E2E8F0] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="h-[36px] px-5 rounded-[8px] text-[12px] font-semibold text-white bg-black hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <LuMegaphone className="w-3.5 h-3.5" />
            Send Notification
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Promotions Component ───────────────────────────────────────────────
export default function Promotions() {
  useEffect(() => {
    document.title = 'Promotions - SpeedCopy'
  }, [])

  const [offers, setOffers] = useState(initialOffers)
  const [filterTab, setFilterTab] = useState('All Offers')
  const [searchQuery, setSearchQuery] = useState('')
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  // Status badge colors mapper
  const statusColors = {
    'Active': 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]',
    'Scheduled': 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    'Expired': 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]'
  }

  // Type badge background colors
  const typeStyles = {
    'Flat Discount': 'bg-[#EFF6FF] text-[#1D4ED8]',
    'Percentage': 'bg-[#F5F3FF] text-[#6D28D9]',
    'Vendor Offer': 'bg-[#FFF7ED] text-[#C2410C]',
    'Category Offer': 'bg-[#ECFDF5] text-[#047857]'
  }

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteOffer = (id) => {
    setOffers(prev => prev.filter(o => o.id !== id))
  }

  const handleAddOffer = (newOffer) => {
    setOffers(prev => [newOffer, ...prev])
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  // Filter & search implementation
  const filteredOffers = offers.filter(o => {
    const matchesTab = filterTab === 'All Offers' || o.type === filterTab
    const matchesSearch = o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Growth & Operations</h1>
            <span className="h-[24px] px-3 rounded-full border border-[#E2E8F0] bg-white text-[11px] font-semibold text-slate-500 flex items-center shadow-sm">
              Last 7 days
            </span>
          </div>
          <p className="text-[12px] text-slate-400 font-medium">Manage offers & promotions from one place.</p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-[36px] px-4 rounded-[9px] border border-[#E2E8F0] bg-white text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <FiDownload className="w-3.5 h-3.5" />
            Export
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 h-[36px] px-4 rounded-[9px] border border-[#E2E8F0] bg-white text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 transition-transform duration-700 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Stats Section ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Offers"
          value="14"
          sub="3 expiring soon"
          icon={FiTag}
          iconBg="bg-black text-white"
        />
        <StatCard
          title="Total Redemptions"
          value="2,847"
          sub="+12% this week"
          icon={FiArrowUpRight}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Revenue Impact"
          value="₹1.2L"
          sub="Discount given"
          icon={FiPercent}
          iconBg="bg-rose-50 text-rose-600"
        />
        <StatCard
          title="Avg. Basket Size"
          value="₹834"
          sub="With active promo"
          icon={FiSliders}
          iconBg="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* ── Table Card ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
        
        {/* Filter Toolbar / Header actions inside card */}
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0]">
          {/* Search bar & filter pills */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="flex items-center h-[38px] px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] flex-1">
              <FiSearch className="text-slate-400 w-4 h-4 mr-2" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search offers..."
                className="text-[13px] text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none flex-1"
              />
            </div>
            <button className="flex items-center gap-1.5 h-[38px] px-4 border border-[#E2E8F0] rounded-[8px] bg-white text-[12px] font-semibold text-slate-600 hover:bg-slate-50">
              <FiFilter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotificationModal(true)}
              className="flex items-center gap-1.5 h-[38px] px-4 rounded-[8px] border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <FiPlus className="w-3.5 h-3.5 text-slate-500" />
              Create notification
            </button>
            <button
              onClick={() => setShowOfferModal(true)}
              className="flex items-center gap-1.5 h-[38px] px-4 rounded-[8px] bg-black text-white text-[12px] font-bold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FiPlus className="w-3.5 h-3.5" />
              Create Offer
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-4 border-b border-[#E2E8F0] px-5 py-2.5 bg-[#F8FAFC]">
          {['All Offers', 'Flat Discount', 'Percentage', 'Vendor Offer', 'Category Offer'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1 rounded-[6px] text-[11px] font-semibold transition-colors ${
                filterTab === tab
                  ? 'bg-white text-slate-900 border border-[#E2E8F0] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Offers List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-slate-55 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                <th className="py-3 px-6">Offer</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Min. Order</th>
                <th className="py-3 px-4">Usage</th>
                <th className="py-3 px-4">Expiry</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((o) => (
                <tr key={o.id} className="border-b border-[#E2E8F0] hover:bg-slate-50/50 transition-colors text-[13px] text-slate-700">
                  {/* Offer title & target info */}
                  <td className="py-4 px-6 flex flex-col gap-0.5">
                    <span className="font-bold text-slate-800">{o.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{o.id} • {o.target}</span>
                  </td>

                  {/* Type Badge */}
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${typeStyles[o.type] || 'bg-slate-100 text-slate-600'}`}>
                      {o.type}
                    </span>
                  </td>

                  {/* Code */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-bold tracking-wide">
                        {o.code}
                      </span>
                      <button
                        onClick={() => handleCopyCode(o.id, o.code)}
                        className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {copiedId === o.id ? <FiCheck className="w-3 h-3 text-emerald-500" /> : <FiCopy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>

                  {/* Discount */}
                  <td className="py-4 px-4 font-bold text-slate-900">{o.discount}</td>

                  {/* Min Order */}
                  <td className="py-4 px-4 font-semibold text-slate-500">{o.minOrder}</td>

                  {/* Usage with progress bar */}
                  <td className="py-4 px-4 flex flex-col gap-1 min-w-[120px]">
                    <span className="font-semibold text-slate-700">
                      {o.usage}/{o.maxUsage === Infinity ? '∞' : o.maxUsage}
                    </span>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-black h-full"
                        style={{ width: `${o.maxUsage === Infinity ? 0 : Math.min(100, (o.usage / o.maxUsage) * 100)}%` }}
                      />
                    </div>
                  </td>

                  {/* Expiry */}
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1.5 text-slate-500 font-medium text-[12px]">
                      <FiCalendar className="w-3.5 h-3.5 text-slate-400" />
                      {o.expiry}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColors[o.status] || 'bg-slate-100 text-slate-600'}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredOffers.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No active offers found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showOfferModal && (
          <CreateOfferModal
            onClose={() => setShowOfferModal(false)}
            onSave={handleAddOffer}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotificationModal && (
          <CreateNotificationModal
            onClose={() => setShowNotificationModal(false)}
            onSend={(data) => {
              alert(`Notification sent: ${data.title}`)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
