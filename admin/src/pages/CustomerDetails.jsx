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
  FiTrash2,
  FiClock
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
                <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px] leading-none ${customer.twoFA === 'Enabled'
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
                  className={`h-full pb-0 px-0.5 text-[12.5px] font-medium cursor-pointer transition-all flex items-center gap-1.5 relative ${isActive
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
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.22,
                        ease: 'easeOut',
                        staggerChildren: 0.08,
                        delayChildren: 0.05
                      }
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.15, ease: 'easeIn' }
                    }
                  }}
                  className="flex flex-col w-full"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[16px] font-bold text-[#0F172A]">Recent Orders</h3>
                    <button className="text-[13px] font-medium text-[#0F172A] hover:underline cursor-pointer transition-all">
                      View All Orders
                    </button>
                  </div>

                  <div className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                            ORDER ID
                          </th>
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                            DATE
                          </th>
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                            AMOUNT
                          </th>
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                            STATUS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: '#ORD-7352', date: 'Oct 24, 2023', amount: '$45.00', status: 'Processing' },
                          { id: '#ORD-7104', date: 'Sep 12, 2023', amount: '$120.50', status: 'Delivered' },
                          { id: '#ORD-6899', date: 'Aug 05, 2023', amount: '$845.00', status: 'Delivered' }
                        ].map((ord) => (
                          <motion.tr
                            key={ord.id}
                            variants={{
                              hidden: { opacity: 0, y: 8 },
                              visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
                            }}
                            className="border-b border-[#E2E8F0] last:border-b-0 text-[#0F172A] hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="px-6 py-[14px] text-[13px] font-bold">
                              {ord.id}
                            </td>
                            <td className="px-6 py-[14px] text-[13px] font-medium text-[#64748B]">
                              {ord.date}
                            </td>
                            <td className="px-6 py-[14px] text-[13px] font-bold">
                              {ord.amount}
                            </td>
                            <td className="px-6 py-[14px]">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold leading-tight ${ord.status === 'Processing'
                                    ? 'bg-[#E0EBFF] text-[#2563EB]'
                                    : 'bg-[#DEF7EC] text-[#03543F]'
                                  }`}
                              >
                                {ord.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Support History Tab content */}
              {activeTab === 'Support History' && (
                <motion.div
                  key="support"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.22,
                        ease: 'easeOut',
                        staggerChildren: 0.08,
                        delayChildren: 0.05
                      }
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.15, ease: 'easeIn' }
                    }
                  }}
                  className="flex flex-col w-full"
                >
                  <div className="w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] w-[95px]">
                            TICKET ID
                          </th>
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                            SUBJECT
                          </th>
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] w-[130px]">
                            STATUS
                          </th>
                          <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] w-[120px]">
                            PRIORITY
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: '#TK-1024', subject: 'API Rate Limit Exceeded on', status: 'OPEN', priority: 'High' },
                          { id: '#TK-0988', subject: 'Billing Invoice Missing for Q', status: 'IN PROGRESS', priority: 'Medium' },
                          { id: '#TK-0842', subject: 'How to add new admin user', status: 'RESOLVED', priority: 'Low' },
                          { id: '#TK-0711', subject: 'Password Reset Request', status: 'CLOSED', priority: 'High' }
                        ].map((ord) => {
                          const isMuted = ord.status === 'RESOLVED' || ord.status === 'CLOSED'
                          const idParts = ord.id.split('-')
                          
                          // Priority dot color logic matching screenshot
                          let dotBg = 'bg-[#94A3B8]'
                          if (ord.status === 'CLOSED') {
                            dotBg = 'bg-[#10B981]' // Green dot for row 4 closed high priority
                          } else if (ord.priority === 'High') {
                            dotBg = 'bg-[#DC2626]' // Red dot
                          } else if (ord.priority === 'Medium') {
                            dotBg = 'bg-[#F59E0B]' // Yellow dot
                          }

                          // Status badge style logic
                          let badgeStyle = 'bg-[#E2E8F0] text-[#334155]'
                          if (ord.status === 'OPEN') {
                            badgeStyle = 'bg-[#FDE8E8] text-[#9B1C1C]'
                          } else if (ord.status === 'IN PROGRESS') {
                            badgeStyle = 'bg-[#E0E7FF] text-[#4F46E5]'
                          } else if (ord.status === 'RESOLVED') {
                            badgeStyle = 'bg-[#F1F5F9] text-[#475569]'
                          }

                          return (
                            <motion.tr
                              key={ord.id}
                              variants={{
                                hidden: { opacity: 0, y: 8 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
                              }}
                              className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-slate-50/50 transition-colors"
                            >
                              <td className={`px-6 py-[14px] text-[13px] font-bold leading-tight ${isMuted ? 'text-slate-400' : 'text-[#0F172A]'}`}>
                                {ord.id === '#TK-0711' ? (
                                  <span>#TK-0711</span>
                                ) : (
                                  <div className="flex flex-col">
                                    <span>{idParts[0]}-</span>
                                    <span>{idParts[1]}</span>
                                  </div>
                                )}
                              </td>
                              <td className={`px-6 py-[14px] text-[13px] font-medium ${isMuted ? 'text-slate-400' : 'text-[#0F172A]'}`}>
                                {ord.subject}
                              </td>
                              <td className="px-6 py-[14px]">
                                <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider leading-none ${badgeStyle}`}>
                                  {ord.status}
                                </span>
                              </td>
                              <td className={`px-6 py-[14px] text-[13px] font-medium ${isMuted ? 'text-slate-400' : 'text-[#0F172A]'}`}>
                                <div className="flex items-center gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotBg}`} />
                                  <span>{ord.priority}</span>
                                </div>
                              </td>
                            </motion.tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* Notes Tab content */}
              {activeTab === 'Notes' && (() => {
                const defaultNotes = customer.id === 1 || customer.id === 'CUS-921' ? [
                  { author: 'Sarah J. (Admin)', date: '2 days ago', text: 'Customer called to ask about bulk pricing for holiday season. Quoted them our standard tier 2 discount rate. Follow up next week.', isAdmin: true },
                  { author: 'System Auto-Note', date: 'Oct 12, 2023', text: 'Account upgraded to VIP status automatically based on lifetime spend threshold.', isAdmin: false }
                ] : []
                const displayNotes = [...notesList, ...defaultNotes]

                return (
                  <motion.div
                    key="notes"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.22,
                          ease: 'easeOut',
                          staggerChildren: 0.06,
                          delayChildren: 0.05
                        }
                      },
                      exit: {
                        opacity: 0,
                        y: -10,
                        transition: { duration: 0.15, ease: 'easeIn' }
                      }
                    }}
                    className="flex flex-col w-full h-full gap-4"
                  >
                    {/* Header */}
                    <div className="flex flex-col text-left shrink-0">
                      <h3 className="text-[16px] font-bold text-[#0F172A]">Internal Notes</h3>
                      <p className="text-[12px] text-slate-400 font-medium mt-0.5">Only visible to staff members.</p>
                    </div>

                    {/* Notes List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                      {displayNotes.length > 0 ? (
                        displayNotes.map((note, idx) => {
                          const isAdmin = note.isAdmin !== false
                          return (
                            <motion.div
                              key={note.text + idx}
                              variants={{
                                hidden: { opacity: 0, y: 8 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } }
                              }}
                              layout
                              className={`p-4 rounded-xl border flex flex-col gap-2 text-left ${
                                isAdmin
                                  ? 'bg-[#FFFDF5] border-[#FEF08A]'
                                  : 'bg-[#F8FAFC] border-[#E2E8F0]'
                              }`}
                            >
                              <div className="flex justify-between items-center text-[13px]">
                                <span className="font-bold text-[#0F172A]">{note.author || 'Sarah J. (Admin)'}</span>
                                <span className="text-[#94A3B8] font-medium text-[12px] flex items-center gap-1">
                                  <FiClock className="w-3.5 h-3.5" />
                                  {note.date}
                                </span>
                              </div>
                              <p className="text-[13px] text-[#334155] font-medium leading-relaxed mt-1">
                                {note.text}
                              </p>
                            </motion.div>
                          )
                        })
                      ) : (
                        <p className="text-[13px] text-[#64748B] py-6 text-center">No notes written yet.</p>
                      )}
                    </div>

                    {/* Add Note Form */}
                    <form onSubmit={handleAddNote} className="flex flex-col gap-3 mt-2 shrink-0">
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a new note about this customer..."
                        className="w-full min-h-[88px] p-3.5 bg-white border border-[#E2E8F0] rounded-xl text-[13px] font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]/10 transition-all resize-none"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full h-10 bg-black text-white text-[13px] font-bold rounded-xl hover:bg-zinc-900 transition-all cursor-pointer flex items-center justify-center"
                      >
                        Add Note
                      </motion.button>
                    </form>
                  </motion.div>
                )
              })()}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}