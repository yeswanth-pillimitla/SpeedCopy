import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  FiArrowLeft,
  FiCalendar,
  FiPrinter,
  FiChevronDown,
  FiUser,
  FiCreditCard,
  FiTruck,
  FiClock,
  FiCheck,
  FiBox
} from 'react-icons/fi'
import { LuStore } from 'react-icons/lu'

export default function OrderDetails({ orderId, onBack }) {
  const navigate = useNavigate()

  // Local state for status dropdown
  const [currentStatus, setCurrentStatus] = useState('Processing')
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)

  // Status mapping to color/badge class
  const getBadgeClass = (status) => {
    switch (status) {
      case 'New':
        return 'bg-[#EFF6FF] text-[#2563EB]'
      case 'Processing':
        return 'bg-[#FFFBEB] text-[#D97706]'
      case 'Ready For Pickup':
        return 'bg-[#F3E8FF] text-[#6B21A8]'
      case 'Shipping':
        return 'bg-[#F5F3FF] text-[#5B21B6]'
      case 'Delivered':
        return 'bg-[#DEF7EC] text-[#03543F]'
      case 'Returned':
        return 'bg-[#FDE8E8] text-[#9B1C1C]'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  // Define steps for order workflow card
  const workflowSteps = [
    { label: 'Generated', subtext: 'Completed', key: 'New' },
    { label: 'Accepted', subtext: 'Completed', key: 'Accepted' },
    { label: 'Processing', subtext: 'Currently processing in this stage.', key: 'Processing' },
    { label: 'Ready For Pickup', key: 'Ready For Pickup' },
    { label: 'Shipping', key: 'Shipping' },
    { label: 'Delivered', key: 'Delivered' }
  ]

  // Status hierarchy helper to determine step styling
  const getStepStatus = (stepKey) => {
    const statusOrder = ['New', 'Accepted', 'Processing', 'Ready For Pickup', 'Shipping', 'Delivered']
    const activeIdx = statusOrder.indexOf(currentStatus)
    const stepIdx = statusOrder.indexOf(stepKey)

    if (stepIdx <= activeIdx) return 'completed'
    return 'pending'
  }

  // Animation configurations
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-full max-w-[939px] mx-auto p-8 bg-[#F8FAFC] flex flex-col gap-6 font-sans select-none"
    >
      {/* 1) BREADCRUMB SECTION */}
      <div className="w-full max-w-[860px] h-[20px] flex items-center gap-4 text-[13px] font-medium leading-none">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Orders</span>
        </button>
        <span className="text-gray-350">/</span>
        <span className="font-bold text-black">{orderId}</span>
      </div>

      {/* 2) ORDER HEADER SECTION */}
      <div className="w-full max-w-[860px] pt-0">
        <div className="w-full bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:h-[121.6px]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-[20px] font-black text-gray-900 tracking-tight leading-none">
                Order {orderId}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${getBadgeClass(currentStatus)}`}>
                {currentStatus}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-gray-400 font-semibold leading-none">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>Placed on May 28, 2026, 14:30 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <motion.button
              onClick={() => window.print()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-9 px-4 rounded-lg border border-gray-250 bg-white hover:bg-slate-55 text-[12px] font-bold text-gray-700 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <FiPrinter className="w-4 h-4 text-slate-500" />
              <span>Print Invoice</span>
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-9 px-4 rounded-lg bg-black hover:bg-zinc-900 text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>Update Status</span>
                <FiChevronDown className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isStatusDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsStatusDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-1.5 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 py-1 origin-top-right flex flex-col"
                    >
                      {['New', 'Processing', 'Ready For Pickup', 'Shipping', 'Delivered', 'Returned'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setCurrentStatus(status)
                            setIsStatusDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[12px] font-bold transition-colors hover:bg-slate-50 flex items-center justify-between ${
                            currentStatus === status ? 'text-black' : 'text-slate-550'
                          }`}
                        >
                          <span>{status}</span>
                          {currentStatus === status && (
                            <FiCheck className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 3) CONTENT SECTION */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[860px] flex flex-col md:flex-row gap-6 pt-0 md:h-[949.13px]"
      >
        {/* LEFT SIDE COLUMN */}
        <div className="w-full md:w-[516px] flex flex-col gap-6 md:h-[925.13px]">
          {/* LEFT CARD 1 - ORDER WORKFLOW */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col md:h-[442.56px]"
          >
            <h3 className="text-[14px] font-bold text-gray-900 tracking-tight mb-6">
              Order Workflow
            </h3>

            <div className="flex-1 flex flex-col justify-between relative pl-1 select-none">
              {workflowSteps.map((step, index) => {
                const stepStatus = getStepStatus(step.key)
                const isLineCompleted = index < workflowSteps.length - 1 && getStepStatus(workflowSteps[index + 1].key) === 'completed'
                return (
                  <div key={index} className="flex gap-4 relative items-start flex-1">
                    {/* Icon column */}
                    <div className="relative flex items-center justify-center w-8 h-8 shrink-0 z-10">
                      {/* Workflow state icon */}
                      {stepStatus === 'completed' ? (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.08 }}
                          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center z-10"
                        >
                          <FiCheck className="w-4 h-4 text-white stroke-[3.5]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: index * 0.08 }}
                          className="w-8 h-8 rounded-full bg-white border-2 border-[#E2E8F0] text-[#94A3B8] flex items-center justify-center z-10"
                        >
                          <FiClock className="w-4 h-4 text-[#94A3B8] stroke-[2.5]" />
                        </motion.div>
                      )}
                    </div>

                    {/* Connector line segment */}
                    {index < workflowSteps.length - 1 && (
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        style={{ originY: 0 }}
                        className={`absolute top-4 left-[15px] bottom-0 w-[2px] z-0 ${
                          isLineCompleted ? 'bg-black' : 'bg-[#E2E8F0]'
                        }`}
                      />
                    )}

                    {/* Content beside icon */}
                    <div className="flex flex-col leading-none pt-[7px]">
                      <span className={`text-[13px] font-semibold ${
                        stepStatus === 'completed' ? 'text-[#111827]' : 'text-[#64748B]'
                      }`}>
                        {step.label}
                      </span>
                      {step.subtext && (
                        <span className={`text-[11px] font-medium mt-1.5 leading-none ${
                          step.subtext === 'Completed' ? 'text-[#94A3B8]' : 'text-[#64748B]'
                        }`}>
                          {step.subtext}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* LEFT CARD 2 - PRODUCTS */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white border border-[#E2E8F0] rounded-[14px] p-6 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col justify-between md:h-[482.57px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FiBox className="w-4 h-4 text-slate-500" />
                <h3 className="text-[14px] font-bold text-gray-900 tracking-tight">
                  Products (2)
                </h3>
              </div>

              {/* Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-2.5 text-left font-bold">ITEM</th>
                      <th className="py-2.5 text-right font-bold w-20">PRICE</th>
                      <th className="py-2.5 text-center font-bold w-16">QTY</th>
                      <th className="py-2.5 text-right font-bold w-24">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] text-[13px]">
                    {/* Product 1 */}
                    <tr>
                      <td className="py-4 pr-3 flex items-center gap-3">
                        <div className="w-[54px] h-[54px] rounded-lg border border-slate-100 bg-[#F8FAFC] flex items-center justify-center overflow-hidden shrink-0">
                          <img src="/Buds.jpg" alt="Buds" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-col leading-snug">
                          <span className="font-bold text-gray-900">
                            Wireless Noise Cancelling Earbuds
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
                            SKU: PRD-1027
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-right text-slate-600 font-semibold">₹129.99</td>
                      <td className="py-4 text-center text-slate-500 font-semibold">2</td>
                      <td className="py-4 text-right font-bold text-gray-900">₹259.98</td>
                    </tr>

                    {/* Product 2 */}
                    <tr>
                      <td className="py-4 pr-3 flex items-center gap-3">
                        <div className="w-[54px] h-[54px] rounded-lg border border-slate-100 bg-[#F8FAFC] flex items-center justify-center overflow-hidden shrink-0">
                          <img src="/watch.jpg" alt="Watch" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-col leading-snug">
                          <span className="font-bold text-gray-900">
                            Smart Fitness Watch
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
                            SKU: PRD-1024
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-right text-slate-600 font-semibold">₹89.00</td>
                      <td className="py-4 text-center text-slate-500 font-semibold">1</td>
                      <td className="py-4 text-right font-bold text-gray-900">₹89.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations Summary */}
            <div className="mt-6 flex flex-col items-end border-t border-[#F1F5F9] pt-4 text-[12.5px] font-medium">
              <div className="w-64 flex flex-col gap-2">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">₹348.98</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Discounts (20%)</span>
                  <span className="text-gray-900 font-bold">₹60</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax</span>
                  <span className="text-gray-900 font-bold">₹29.66</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-gray-900 font-bold">₹15.00</span>
                </div>
                <div className="border-t border-[#F1F5F9] my-1 pt-2.5 flex justify-between items-baseline">
                  <span className="text-gray-900 font-black">Total</span>
                  <span className="text-[18px] font-black text-gray-900">₹393.64</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE COLUMN */}
        <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-6 md:h-[814.8px]">
          {/* RIGHT CARD 1 - CUSTOMER INFORMATION */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col md:h-[313px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiUser className="w-4 h-4 text-slate-500" />
              <h3 className="text-[14px] font-bold text-gray-900 tracking-tight">
                Customer Information
              </h3>
            </div>

            <div className="flex flex-col gap-0.5 leading-none">
              <span className="text-[13px] font-bold text-gray-900">Emma Wilson</span>
              <span className="text-[12px] text-slate-450 font-medium mt-1.5">emma.w@example.com</span>
              <span className="text-[12px] text-slate-450 font-medium mt-1.5">+1 (555) 987-6543</span>
            </div>

            <div className="border-t border-[#F1F5F9] my-4"></div>

            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
                SHIPPING ADDRESS
              </span>
              <p className="text-[12px] text-slate-500 font-medium leading-relaxed mt-2.5">
                456 Lexington Ave, Suite 300 New York, NY 10017 United States
              </p>
            </div>

            <motion.button
              onClick={() => navigate('/customers?id=2')}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="mt-5 w-full h-[36px] border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg text-[12px] font-bold text-slate-700 transition-all cursor-pointer flex items-center justify-center"
            >
              View Profile
            </motion.button>
          </motion.div>

          {/* RIGHT CARD 2 - VENDOR INFORMATION */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col gap-3 md:h-[180.6px]"
          >
            <div className="flex items-center gap-2">
              <LuStore className="w-4 h-4 text-slate-500" />
              <h3 className="text-[14px] font-bold text-gray-900 tracking-tight">
                Vendor Information
              </h3>
            </div>

            <div className="flex flex-col gap-0.5 leading-none">
              <span className="text-[13px] font-bold text-gray-900">TechStore Electronics</span>
              <span className="text-[12px] text-slate-450 font-medium mt-1.5">support@techstore.com</span>
              <span className="text-[12px] text-slate-450 font-medium mt-1.5">+1 (800) 123-TECH</span>
            </div>
          </motion.div>

          {/* RIGHT CARD 3 - PAYMENT */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col gap-3 md:h-[128.6px]"
          >
            <div className="flex items-center gap-2">
              <FiCreditCard className="w-4 h-4 text-slate-500" />
              <h3 className="text-[14px] font-bold text-gray-900 tracking-tight">
                Payment
              </h3>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-semibold leading-none">
                <span className="font-extrabold text-black tracking-tight text-[11px] bg-slate-100 px-1 py-0.5 rounded uppercase">VISA</span>
                <span>ending in 4242</span>
              </div>
              <span className="bg-[#DEF7EC] text-[#03543F] px-2 py-0.5 rounded-full text-[10px] font-bold leading-none">
                Paid
              </span>
            </div>
          </motion.div>

          {/* RIGHT CARD 4 - SHIPPING & TRACKING */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-white border border-[#E2E8F0] rounded-[14px] p-5 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col gap-3 md:h-[192.6px]"
          >
            <div className="flex items-center gap-2">
              <FiTruck className="w-4 h-4 text-slate-500" />
              <h3 className="text-[14px] font-bold text-gray-900 tracking-tight">
                Shipping & Tracking
              </h3>
            </div>

            <div className="flex flex-col gap-2.5 text-[12.5px] font-medium leading-none">
              <div className="flex justify-between">
                <span className="text-slate-400">Courier</span>
                <span className="text-gray-900 font-bold">FedEx</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Tracking No.</span>
                <span className="text-[#2563EB] hover:underline font-bold cursor-pointer">
                  FX892374928374
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Est. Delivery</span>
                <span className="text-gray-900 font-bold">June 02, 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
