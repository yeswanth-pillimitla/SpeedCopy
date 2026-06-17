import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiDownload,
  FiRefreshCw,
  FiLink,
  FiUsers,
  FiCopy,
  FiExternalLink,
  FiTrash2,
  FiPlus,
  FiX,
  FiCheck,
  FiGift
} from 'react-icons/fi'
import { LuLink2, LuGift } from 'react-icons/lu'
import { TbCircleDashed } from 'react-icons/tb'

// ─── Initial Data ────────────────────────────────────────────────────────────
const initialLinks = [
  {
    id: 1,
    name: 'Homepage — General',
    url: 'https://qcommerce.io/ref/general',
    clicks: 1240,
    signups: 312
  },
  {
    id: 2,
    name: 'Social Media Campaign',
    url: 'https://qcommerce.io/ref/social25',
    clicks: 3100,
    signups: 410
  },
  {
    id: 3,
    name: 'Email Newsletter',
    url: 'https://qcommerce.io/ref/email-jun',
    clicks: 890,
    signups: 61
  }
]

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, icon: Icon, iconBg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex-1 min-w-[180px] bg-white rounded-[14px] border border-[#E2E8F0] p-5 flex items-start justify-between gap-3 shadow-sm"
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] text-slate-500 font-medium leading-none">{title}</span>
        <span className="text-[26px] font-bold text-slate-900 leading-tight">{value}</span>
        <span className="text-[11px] text-slate-400 font-medium">{sub}</span>
      </div>
      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
    </motion.div>
  )
}

// ─── Tracking Link Row ────────────────────────────────────────────────────────
function TrackingRow({ link, onCopy, onDelete, copiedId }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-4 py-4 px-4 border border-[#E2E8F0] rounded-[10px] bg-white hover:bg-[#F8FAFC] transition-colors group"
    >
      {/* Link icon */}
      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
        <LuLink2 className="w-3.5 h-3.5 text-slate-500" />
      </div>

      {/* Name + URL */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-[13px] font-semibold text-slate-800 leading-none">{link.name}</span>
        <span className="text-[11px] text-slate-400 truncate">{link.url}</span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 shrink-0">
        <div className="flex flex-col items-end">
          <span className="text-[13px] font-bold text-slate-800">{link.clicks.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 font-medium">Clicks</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[13px] font-bold text-slate-800">{link.signups}</span>
          <span className="text-[10px] text-slate-400 font-medium">Sign-ups</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
        <button
          title="Open link"
          className="w-7 h-7 rounded-[7px] flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          onClick={() => window.open(link.url, '_blank')}
        >
          <FiExternalLink className="w-3.5 h-3.5" />
        </button>
        <button
          title="Copy link"
          className="w-7 h-7 rounded-[7px] flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          onClick={() => onCopy(link.id, link.url)}
        >
          {copiedId === link.id
            ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
            : <FiCopy className="w-3.5 h-3.5" />}
        </button>
        <button
          title="Delete link"
          className="w-7 h-7 rounded-[7px] flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
          onClick={() => onDelete(link.id)}
        >
          <FiTrash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── New Link Modal ───────────────────────────────────────────────────────────
function NewLinkModal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  const handleSave = () => {
    if (!name.trim() || !slug.trim()) return
    onSave({
      id: Date.now(),
      name: name.trim(),
      url: `https://qcommerce.io/ref/${slug.trim().toLowerCase().replace(/\s+/g, '-')}`,
      clicks: 0,
      signups: 0
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
        className="bg-white rounded-[16px] shadow-2xl w-full max-w-[420px] p-6 flex flex-col gap-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-slate-900">New Referral Link</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-slate-600">Campaign Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Instagram Campaign"
              className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] text-[13px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-black/10 bg-[#F8FAFC] placeholder-slate-400"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-slate-600">URL Slug</label>
            <div className="flex items-center h-[38px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
              <span className="px-3 text-[11px] text-slate-400 font-medium whitespace-nowrap border-r border-[#E2E8F0] h-full flex items-center">
                qcommerce.io/ref/
              </span>
              <input
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="my-campaign"
                className="flex-1 px-3 text-[13px] text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="h-[36px] px-4 rounded-[8px] text-[13px] font-semibold text-slate-600 border border-[#E2E8F0] hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !slug.trim()}
            className="h-[36px] px-5 rounded-[8px] text-[13px] font-semibold text-white bg-black hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Link
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Referral Page ───────────────────────────────────────────────────────
export default function Referral() {
  useEffect(() => {
    document.title = 'Referral - SpeedCopy'
  }, [])

  const [activeTab, setActiveTab] = useState('url-tracking')
  const [links, setLinks] = useState(initialLinks)
  const [copiedId, setCopiedId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [baseUrl] = useState('https://qcommerce.io/ref/')
  const [utmSource] = useState('referral')
  const [copiedBase, setCopiedBase] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Date range
  const [selectedRange, setSelectedRange] = useState('7days')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const rangeLabels = {
    '7days': 'Last 7 days',
    '30days': 'Last 30 days',
    'year': 'Last 1 Year'
  }

  const handleCopy = (id, url) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleCopyBase = () => {
    navigator.clipboard.writeText(baseUrl)
    setCopiedBase(true)
    setTimeout(() => setCopiedBase(false), 2000)
  }

  const handleDelete = (id) => {
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  const handleAddLink = (link) => {
    setLinks(prev => [...prev, link])
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1200)
  }

  const stats = [
    {
      title: 'Total Referral Visits',
      value: '4,582',
      sub: '+18% this month',
      icon: LuLink2,
      iconBg: 'bg-black text-white'
    },
    {
      title: 'Conversions',
      value: '783',
      sub: '17.1% conversion rate',
      icon: FiUsers,
      iconBg: 'bg-[#EFF6FF] text-[#2563EB]'
    },
    {
      title: 'Orders Generated',
      value: '517',
      sub: 'From referrals',
      icon: TbCircleDashed,
      iconBg: 'bg-[#F0FDF4] text-[#16A34A]'
    },
    {
      title: 'Rewards Paid Out',
      value: '₹25,850',
      sub: 'This quarter',
      icon: LuGift,
      iconBg: 'bg-[#FFF7ED] text-[#EA580C]'
    }
  ]

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">Referral</h1>
            {/* Date range pill */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1.5 h-[28px] px-3 rounded-full border border-[#E2E8F0] bg-white text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
              >
                {rangeLabels[selectedRange]}
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-1.5 z-20 bg-white border border-[#E2E8F0] rounded-[10px] shadow-lg overflow-hidden min-w-[160px]"
                  >
                    {Object.entries(rangeLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => { setSelectedRange(key); setIsDropdownOpen(false) }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] font-medium transition-colors ${selectedRange === key ? 'bg-[#F1F5F9] text-black' : 'text-slate-600 hover:bg-slate-50'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-[12px] text-slate-400 font-medium">Manage referral from one place.</p>
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

      {/* ── Stats Cards ──────────────────────────────────────────────── */}
      <div className="flex gap-4 flex-wrap">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* ── Tab Card ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Tab Nav */}
        <div className="flex border-b border-[#E2E8F0] px-6 pt-4 gap-6">
          {[
            { id: 'url-tracking', label: 'URL Tracking' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-[13px] font-semibold transition-colors relative ${
                activeTab === tab.id
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="referral-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* ── URL Tracking Tab ──────────────────────────────────── */}
          {activeTab === 'url-tracking' && (
            <motion.div
              key="url-tracking"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* ─ Referral URL Configuration ─ */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex flex-col gap-0.5">
                    <h2 className="text-[14px] font-bold text-slate-900">Referral URL Configuration</h2>
                    <p className="text-[12px] text-slate-400 font-medium">Set up trackable referral links for users and campaigns.</p>
                  </div>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-1.5 h-[36px] px-4 rounded-[9px] bg-black text-white text-[13px] font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <FiPlus className="w-3.5 h-3.5" />
                    New Link
                  </button>
                </div>

                {/* URL + UTM inputs */}
                <div className="flex gap-4 flex-wrap">
                  <div className="flex flex-col gap-1.5 flex-1 min-w-[220px]">
                    <label className="text-[12px] font-semibold text-slate-600">Base Referral URL</label>
                    <div className="flex items-center h-[38px] rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
                      <input
                        readOnly
                        value={baseUrl}
                        className="flex-1 px-3 text-[12px] text-slate-600 bg-transparent focus:outline-none"
                      />
                      <button
                        onClick={handleCopyBase}
                        className="w-9 h-full flex items-center justify-center border-l border-[#E2E8F0] hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                      >
                        {copiedBase
                          ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                          : <FiCopy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
                    <label className="text-[12px] font-semibold text-slate-600">UTM Source Default</label>
                    <input
                      readOnly
                      value={utmSource}
                      className="h-[38px] px-3 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] text-[12px] text-slate-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ─ Active Tracking Links ─ */}
              <div className="flex flex-col gap-3">
                <h3 className="text-[13px] font-semibold text-slate-700">Active Tracking Links</h3>
                <div className="flex flex-col gap-2.5">
                  <AnimatePresence mode="popLayout">
                    {links.map(link => (
                      <TrackingRow
                        key={link.id}
                        link={link}
                        copiedId={copiedId}
                        onCopy={handleCopy}
                        onDelete={handleDelete}
                      />
                    ))}
                    {links.length === 0 && (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-12 text-center flex flex-col items-center gap-3"
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                          <LuLink2 className="w-5 h-5 text-slate-400" />
                        </div>
                        <p className="text-[13px] text-slate-400 font-medium">No tracking links yet. Create one above.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── New Link Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <NewLinkModal
            onClose={() => setShowModal(false)}
            onSave={handleAddLink}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
