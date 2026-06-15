import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiMoreHorizontal,
  FiShield,
  FiCheckCircle,
  FiUser,
  FiShoppingCart,
  FiLifeBuoy,
  FiFileText,
  FiPlus,
  FiTrash2
} from 'react-icons/fi'

const customerProfiles = {
  1: {
    id: 'CUS-921',
    name: 'Michael Chen',
    joined: 'Oct 12, 2023',
    lastLogin: '2 hours ago',
    twoFA: 'Enabled',
    status: 'Active',
    isVIP: true,
    email: 'michael.c@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    dob: 'March 15, 1988',
    spent: '₹1,245.00',
    ordersCount: 12,
    avgOrder: '₹103.75',
    company: 'Chen Enterprises LLC',
    taxId: 'US-123456789',
    address: {
      street: '123 Market Street, Apt 4B',
      cityStateZip: 'San Francisco, CA 94105',
      country: 'United States'
    },
    orders: [
    ],
    tickets: [
    ],
    notes: [

    ]
  },
  2: {
    id: 'CUS-922',
    name: 'Emma Wilson',
    joined: 'Mar 05, 2023',
    lastLogin: '5 hours ago',
    twoFA: 'Enabled',
    status: 'Active',
    isVIP: true,
    email: 'emma.w@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    dob: 'June 22, 1991',
    spent: '₹4,520.50',
    ordersCount: 34,
    avgOrder: '₹132.96',
    company: 'Wilson Design Inc.',
    taxId: 'US-223456789',
    address: {
      street: '456 Oak Ave, Suite 12',
      cityStateZip: 'Seattle, WA 98101',
      country: 'United States'
    },
    orders: [

    ],
    tickets: [

    ],
    notes: [
    ]
  },
  3: {
    id: 'CUS-923',
    name: 'James Rodriguez',
    joined: 'Jan 22, 2024',
    lastLogin: '1 day ago',
    twoFA: 'Disabled',
    status: 'Inactive',
    isVIP: false,
    email: 'j.rodriguez@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    dob: 'August 04, 1985',
    spent: '₹129.99',
    ordersCount: 2,
    avgOrder: '₹65.00',
    company: 'Rodriguez Global',
    taxId: 'US-323456789',
    address: {
      street: '789 Pine Rd',
      cityStateZip: 'Austin, TX 78701',
      country: 'United States'
    },
    orders: [
    ],
    tickets: [],
    notes: []
  },
  4: {
    id: 'CUS-924',
    name: 'Sophia Taylor',
    joined: 'Nov 30, 2023',
    lastLogin: '4 hours ago',
    twoFA: 'Enabled',
    status: 'Active',
    isVIP: false,
    email: 'sophia.t@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Boston, MA',
    dob: 'January 12, 1993',
    spent: '₹845.20',
    ordersCount: 8,
    avgOrder: '₹105.65',
    company: 'Taylor Solutions',
    taxId: 'US-423456789',
    address: {
      street: '321 Elm St',
      cityStateZip: 'Boston, MA 02108',
      country: 'United States'
    },
    orders: [
    ],
    tickets: [],
    notes: []
  },
  5: {
    id: 'CUS-925',
    name: 'William Brown',
    joined: 'Sep 18, 2023',
    lastLogin: '1 hour ago',
    twoFA: 'Enabled',
    status: 'Active',
    isVIP: true,
    email: 'will.b@example.com',
    phone: '+1 (555) 876-5432',
    location: 'Chicago, IL',
    dob: 'September 05, 1982',
    spent: '₹2,100.00',
    ordersCount: 15,
    avgOrder: '₹140.00',
    company: 'Brown Logistics',
    taxId: 'US-523456789',
    address: {
      street: '555 Maple Dr',
      cityStateZip: 'Chicago, IL 60601',
      country: 'United States'
    },
    orders: [

    ],
    tickets: [],
    notes: []
  },
  6: {
    id: 'CUS-926',
    name: 'Olivia Martinez',
    joined: 'Feb 10, 2024',
    lastLogin: '3 days ago',
    twoFA: 'Disabled',
    status: 'Inactive',
    isVIP: false,
    email: 'olivia.m@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Miami, FL',
    dob: 'November 30, 1987',
    spent: '₹45.00',
    ordersCount: 1,
    avgOrder: '₹45.00',
    company: 'Martinez Media',
    taxId: 'US-623456789',
    address: {
      street: '888 Cedar Lane',
      cityStateZip: 'Miami, FL 33101',
      country: 'United States'
    },
    orders: [
    ],
    tickets: [],
    notes: []
  },
  7: {
    id: 'CUS-927',
    name: 'Alexander Lee',
    joined: 'Dec 05, 2023',
    lastLogin: '10 mins ago',
    twoFA: 'Enabled',
    status: 'Active',
    isVIP: false,
    email: 'alex.lee@example.com',
    phone: '+1 (555) 765-4321',
    location: 'Portland, OR',
    dob: 'July 19, 1995',
    spent: '₹540.75',
    ordersCount: 5,
    avgOrder: '₹108.15',
    company: 'Lee Technologies',
    taxId: 'US-723456789',
    address: {
      street: '444 Birch Blvd',
      cityStateZip: 'Portland, OR 97201',
      country: 'United States'
    },
    orders: [
    ],
    tickets: [],
    notes: []
  }
}

export default function CustomerDetails({ customerId, onBack }) {
  // Load customer profile, default to Michael Chen (ID 1) if not found
  const customer = customerProfiles[customerId] || customerProfiles[1]

  const [activeTab, setActiveTab] = useState('Profile') // Profile, Orders, Support, Notes
  const [notesList, setNotesList] = useState(customer.notes || [])
  const [newNote, setNewNote] = useState('')

  const handleAddNote = (e) => {
    e.preventDefault()
    if (newNote.trim() !== '') {
      const added = { text: newNote, date: 'Just now' }
      setNotesList([added, ...notesList])
      setNewNote('')
    }
  }

  const handleRemoveNote = (idx) => {
    setNotesList(notesList.filter((_, i) => i !== idx))
  }

  const tabs = [
    { name: 'Profile', icon: FiUser },
    { name: 'Orders History', icon: FiShoppingCart },
    { name: 'Support History', icon: FiLifeBuoy },
    { name: 'Notes', icon: FiFileText }
  ]

  // Animations config
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full max-w-[939px] mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6"
    >

      {/* 1. BREADCRUMB DIV */}
      <div className="w-full h-[20px] flex items-center gap-2 text-[13px] font-sans shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-bold text-[#64748B] hover:text-black transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4 text-[#64748B]" />
          <span>Customers</span>
        </button>
        <span className="text-slate-300 font-medium select-none">/</span>
        <span className="text-[#0F172A] font-bold">{customer.name}</span>
      </div>

      {/* 2. CUSTOMER PROFILE HEADER CARD */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.005 }}
        className="w-full p-6 md:p-8 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] flex flex-col justify-between shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_rgba(0,0,0,0.1)] gap-6"
      >
        {/* Top Info Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-start gap-4">
            {/* Avatar circle */}
            <div className="w-[72px] h-[72px] rounded-full border-[0.8px] border-[#E2E8F0] bg-transparent flex items-center justify-center shrink-0">
              {/* Empty outline circle as shown in design */}
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight leading-none">
                  {customer.name}
                </h2>

                {/* Badges */}
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none">
                    {customer.status}
                  </span>
                  {customer.isVIP && (
                    <span className="bg-[#E0E7FF] text-[#4338CA] border border-[#C7D2FE] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none">
                      VIP
                    </span>
                  )}
                </div>
              </div>

              {/* Contact metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-y-1.5 sm:gap-x-5 mt-1 text-[#64748B] font-medium text-[13px]">
                <span className="flex items-center gap-1.5">
                  <FiMail className="w-[15px] h-[15px] text-[#64748B]" />
                  {customer.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiPhone className="w-[15px] h-[15px] text-[#64748B]" />
                  {customer.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="w-[15px] h-[15px] text-[#64748B]" />
                  {customer.location}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-start">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-[36px] px-4 rounded-lg border border-[#E2E8F0] bg-white text-[13px] font-semibold text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <FiEdit className="w-3.5 h-3.5 text-[#64748B]" /> Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-[36px] w-[36px] rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:bg-slate-50 shadow-sm cursor-pointer"
            >
              <FiMoreHorizontal className="w-4.5 h-4.5 text-[#64748B]" />
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#E2E8F0]"></div>

        {/* Bottom stats row */}
        <div className="flex flex-wrap gap-x-[72px] gap-y-4 text-left">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Spent</span>
            <span className="text-[22px] font-bold text-[#0F172A] mt-1.5 leading-none">
              {customer.spent}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Orders</span>
            <span className="text-[22px] font-bold text-[#0F172A] mt-1.5 leading-none">
              {customer.ordersCount}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Average Order</span>
            <span className="text-[22px] font-bold text-[#0F172A] mt-1.5 leading-none">
              {customer.avgOrder}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3. CUSTOMER DETAIL SECTION */}
      <div className="w-full flex flex-col md:flex-row gap-6 items-stretch shrink-0">

        {/* LEFT COLUMN: Shipping Address + Security Cards */}
        <div className="w-full md:w-[320px] flex flex-col gap-6 shrink-0">

          {/* LEFT CARD 1: Shipping Address */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.01 }}
            className="w-full p-5 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_rgba(0,0,0,0.1)] flex flex-col text-left"
          >
            <h3 className="text-[14px] font-bold text-[#0F172A] flex items-center gap-2">
              <FiMapPin className="w-4 h-4 text-[#64748B]" /> Shipping Address
            </h3>
            <div className="text-[12px] leading-[1.3] text-[#64748B] font-medium mt-3 flex flex-col gap-0.5">
              <span className="text-[#0F172A] font-bold text-[13px] mb-1">{customer.name}</span>
              <span>{customer.address.street}</span>
              <span>{customer.address.cityStateZip}</span>
              <span>{customer.address.country}</span>
            </div>
          </motion.div>

          {/* LEFT CARD 2: Account Security */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.01 }}
            className="w-full p-5 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_rgba(0,0,0,0.1)] flex flex-col justify-between text-left"
          >
            <h3 className="text-[14px] font-bold text-[#0F172A] flex items-center gap-2">
              <FiShield className="w-4 h-4 text-[#64748B]" /> Account Security
            </h3>
            <div className="flex flex-col gap-2.5 mt-4">
              <div className="flex justify-between items-center text-[12.5px]">
                <span className="text-[#64748B] font-medium">Customer ID</span>
                <span className="text-[#0F172A] font-bold">{customer.id}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px]">
                <span className="text-[#64748B] font-medium">Joined</span>
                <span className="text-[#0F172A] font-bold">{customer.joined}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px]">
                <span className="text-[#64748B] font-medium">Last Login</span>
                <span className="text-[#0F172A] font-bold">{customer.lastLogin}</span>
              </div>
              <div className="flex justify-between items-center text-[12.5px]">
                <span className="text-[#64748B] font-medium">2FA Status</span>
                <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px] leading-none ${
                  customer.twoFA === 'Enabled'
                    ? 'text-[#107C41] bg-[#DEF7EC] border border-[#BCF0DA]'
                    : 'text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0]'
                }`}>
                  {customer.twoFA === 'Enabled' && <FiCheckCircle className="w-3 h-3 text-[#107C41]" />}
                  {customer.twoFA}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Tab Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="w-full md:flex-1 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col text-left"
        >
          {/* Tabs header */}
          <div className="w-full h-[48px] px-5 bg-white border-b border-[#E2E8F0] flex gap-6 items-center shrink-0 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`h-full pb-0 px-0.5 text-[12.5px] font-medium cursor-pointer transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'text-[#0F172A] font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{tab.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F172A]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab content area */}
          <div className="w-full flex-1 p-5 md:p-6 bg-white overflow-y-auto">
            <AnimatePresence mode="wait">

              {/* Profile Tab content */}
              {activeTab === 'Profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col"
                >
                  <div className="flex flex-col">
                    <h4 className="text-[14px] md:text-[15px] font-bold text-[#0F172A] font-sans tracking-tight">Personal Information</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mt-3.5">
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Full Name</span>
                        <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{customer.name}</span>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Email Address</span>
                        <span className="text-[13.5px] font-bold text-[#0F172A] mt-1 truncate">{customer.email}</span>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Phone Number</span>
                        <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{customer.phone}</span>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Date of Birth</span>
                        <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{customer.dob}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-[#E2E8F0] my-4"></div>

                  <div className="flex flex-col">
                    <h4 className="text-[14px] md:text-[15px] font-bold text-[#0F172A] font-sans tracking-tight">Company Information (Optional)</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 mt-3.5">
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Company Name</span>
                        <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{customer.company}</span>
                      </div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Tax ID / VAT</span>
                        <span className="text-[13.5px] font-bold text-[#0F172A] mt-1">{customer.taxId}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders History Tab content */}
              {activeTab === 'Orders History' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col h-full"
                >
                  <h4 className="text-[15px] font-bold text-[#0F172A] font-sans tracking-tight mb-3 shrink-0">Orders History</h4>
                  <div className="flex-1 overflow-y-auto">
                    {customer.orders && customer.orders.length > 0 ? (
                      <table className="w-full text-left text-[12px] border-collapse font-sans">
                        <thead>
                          <tr className="border-b border-[#F1F5F9] text-slate-400 font-bold uppercase text-[10px]">
                            <th className="py-2">Order ID</th>
                            <th className="py-2">Date</th>
                            <th className="py-2 text-right">Amount</th>
                            <th className="py-2 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F8FAFC]">
                          {customer.orders.map((ord) => (
                            <tr key={ord.id} className="text-[#0F172A] hover:bg-slate-50/50">
                              <td className="py-2.5 font-bold">{ord.id}</td>
                              <td className="py-2.5 text-[#64748B] font-semibold">{ord.date}</td>
                              <td className="py-2.5 text-right font-bold text-[#0F172A]">{ord.amount}</td>
                              <td className="py-2.5 text-right">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${ord.status === 'Delivered'
                                    ? 'bg-[#DEF7EC] text-[#03543F]'
                                    : 'bg-[#FEF3C7] text-[#92400E]'
                                  }`}>
                                  {ord.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-[13px] text-[#64748B] py-6 text-center">No order history available.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Support History Tab content */}
              {activeTab === 'Support History' && (
                <motion.div
                  key="support"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col h-full"
                >
                  <h4 className="text-[15px] font-bold text-[#0F172A] font-sans tracking-tight mb-3 shrink-0">Support History</h4>
                  <div className="flex-1 overflow-y-auto">
                    {customer.tickets && customer.tickets.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {customer.tickets.map((tkt) => (
                          <div key={tkt.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span className="text-[12.5px] font-bold text-gray-900 truncate">{tkt.subject}</span>
                              <span className="text-[11px] text-slate-400 font-semibold">{tkt.id} • {tkt.date}</span>
                            </div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${tkt.status === 'Open'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}>
                              {tkt.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[13px] text-[#64748B] py-6 text-center">No support tickets found.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Notes Tab content */}
              {activeTab === 'Notes' && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col h-full gap-3"
                >
                  <h4 className="text-[15px] font-bold text-[#0F172A] font-sans tracking-tight shrink-0">Customer Notes</h4>

                  {/* Notes List */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                    {notesList.length > 0 ? (
                      notesList.map((note, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-start gap-4 hover:bg-slate-50/80 transition-colors">
                          <div className="flex flex-col gap-0.5 text-left">
                            <p className="text-[12.5px] text-gray-700 font-semibold leading-relaxed">{note.text}</p>
                            <span className="text-[10px] text-slate-400 font-bold mt-1">{note.date}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveNote(idx)}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer shrink-0"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-[13px] text-[#64748B] py-6 text-center">No notes written yet.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}