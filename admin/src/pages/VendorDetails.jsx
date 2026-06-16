import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiMoreHorizontal,
  FiCheckCircle,
  FiUser,
  FiPackage,
  FiShoppingCart,
  FiFileText
} from 'react-icons/fi'
import { LuStore } from 'react-icons/lu'

// Import Sidebar and Topbar components as requested (to be available in scope)
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'

export default function VendorDetails({ vendorId, onBack }) {
  const [activeTab, setActiveTab] = useState('Profile') // Profile, Products, Orders, Documents

  // Framer motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  }

  const tabContentVariants = {
    hidden: { opacity: 0, x: 8 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, x: -8, transition: { duration: 0.15 } }
  }

  const tabs = [
    { name: 'Profile', icon: FiUser },
    { name: 'Products', icon: FiPackage },
    { name: 'Orders', icon: FiShoppingCart },
    { name: 'Documents', icon: FiFileText }
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="w-[938px] min-h-[845px] p-8 bg-[#F8FAFC] flex flex-col gap-6 font-sans mx-auto"
    >
      {/* ====================================
          1) BREADCRUMB DIV
          ==================================== */}
      <div className="w-[859.2px] h-[20px] flex items-center gap-4 text-[13px] shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-bold text-[#64748B] hover:text-black transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4 text-[#64748B]" />
          <span>Vendors</span>
        </button>
        <span className="text-slate-300 font-medium select-none">/</span>
        <span className="text-[#0F172A] font-bold">Fresh Foods Market</span>
      </div>

      {/* ====================================
          2) VENDOR HEADER CARD DIV
          ==================================== */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="w-[859.2px] h-[258.38px] bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] p-6 flex flex-col justify-between shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
      >
        {/* Top profile details row */}
        <div className="flex justify-between items-start w-full">
          <div className="flex items-start gap-4">
            {/* Vendor image placeholder */}
            <div className="w-[72px] h-[72px] rounded-[14px] border border-slate-200 bg-white shadow-xs flex items-center justify-center shrink-0">
            </div>

            {/* Vendor Name + Badges + Contacts */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-[22px] font-bold text-[#0F172A] tracking-tight leading-none">
                  Fresh Foods Market
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="bg-[#DEF7EC] text-[#03543F] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none">
                    Active
                  </span>
                  <span className="bg-[#F1F5F9] text-[#475569] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none">
                    Groceries
                  </span>
                </div>
              </div>

              {/* Info contacts row with icons */}
              <div className="flex items-center gap-5 mt-1 text-[#64748B] font-medium text-[12.5px]">
                <span className="flex items-center gap-1.5">
                  <FiMail className="w-[15px] h-[15px] text-[#64748B]" />
                  <span>contact@freshfoods.com</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FiPhone className="w-[15px] h-[15px] text-[#64748B]" />
                  <span>+1 (555) 987-6543</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="w-[15px] h-[15px] text-[#64748B]" />
                  <span>Downtown District, CA</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => console.log('Edit Vendor Clicked')}
              className="h-[36px] px-4 rounded-lg border border-[#E2E8F0] bg-white text-[12.5px] font-bold text-[#0F172A] hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <FiEdit className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Edit Vendor</span>
            </button>
            <button
              onClick={() => console.log('Menu Clicked')}
              className="h-[36px] w-[36px] rounded-lg border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:text-[#0F172A] shadow-sm cursor-pointer hover:bg-slate-50"
            >
              <FiMoreHorizontal className="w-4.5 h-4.5 text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-[#E2E8F0]"></div>

        {/* Bottom stats metrics */}
        <div className="flex justify-between items-center w-full px-1 text-left">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Revenue</span>
            <span className="text-[20px] font-bold text-[#0F172A] mt-1.5 leading-none">
              ₹45,200
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Orders</span>
            <span className="text-[20px] font-bold text-[#0F172A] mt-1.5 leading-none">
              1245
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Active Products</span>
            <span className="text-[20px] font-bold text-[#0F172A] mt-1.5 leading-none">
              342
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Rejected Orders</span>
            <span className="text-[20px] font-bold text-[#0F172A] mt-1.5 leading-none">
              240
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Commision</span>
            <span className="text-[20px] font-bold text-[#0F172A] mt-1.5 leading-none">
              ₹50,000
            </span>
          </div>
        </div>
      </motion.div>

      {/* ====================================
          3) DETAILS SECTION (GRID)
          ==================================== */}
      <div className="w-[859.2px] h-[477.57px] flex gap-6 mt-2 shrink-0">
        
        {/* ====================================
            LEFT DIV
            ==================================== */}
        <div className="w-[320px] h-[389.2px] flex flex-col gap-6 shrink-0 text-left">
          
          {/* LEFT TOP CARD: Business Details */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="w-[320px] h-[170px] p-5 bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col justify-between"
          >
            <h3 className="text-[13.5px] font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#F8FAFC] pb-2 leading-none shrink-0">
              <LuStore className="w-4 h-4 text-[#64748B]" />
              <span>Business Details</span>
            </h3>

            <div className="flex-1 flex flex-col justify-center gap-2 text-[12.5px] mt-1">
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Owner</span>
                <span className="text-[#0F172A] font-bold">Sarah Jenkins</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Commission Rate</span>
                <span className="text-[#0F172A] font-bold">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Joined</span>
                <span className="text-[#0F172A] font-bold">Jan 12,2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748B] font-semibold">Verification</span>
                <span className="text-[#107C41] flex items-center gap-1 font-bold">
                  <FiCheckCircle className="w-3.5 h-3.5 text-[#107C41]" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* LEFT BOTTOM CARD: Location */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="w-[320px] h-[152.6px] p-5 bg-[#FFFFFF] border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] flex flex-col"
          >
            <h3 className="text-[13.5px] font-bold text-[#0F172A] flex items-center gap-2 border-b border-[#F8FAFC] pb-2 leading-none shrink-0">
              <FiMapPin className="w-4 h-4 text-[#64748B]" />
              <span>Location</span>
            </h3>

            <div className="text-[12.5px] leading-[1.4] text-[#64748B] font-medium mt-3.5 flex flex-col gap-0.5">
              <span>456 Downtown Blvd, Suite 2</span>
              <span>Downtown District, CA 90210</span>
              <span>United States</span>
            </div>
          </motion.div>

        </div>

        {/* ====================================
            RIGHT DIV (TABS + CONTENT CARD)
            ==================================== */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="w-[515.2px] h-[400px] bg-white border-[0.8px] border-[#E2E8F0] rounded-[14px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] overflow-hidden flex flex-col text-left"
        >
          {/* TOP TAB BAR */}
          <div className="w-full h-[48px] px-5 bg-white border-b border-[#E2E8F0] flex gap-6 items-center shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name
              const TabIcon = tab.icon
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`h-full pb-0 px-0.5 text-[12.5px] font-medium cursor-pointer transition-all flex items-center gap-1.5 relative ${
                    isActive ? 'text-black font-bold' : 'text-[#64748B] hover:text-black'
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{tab.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeVendorTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* TAB CONTENT AREA */}
          <div className="w-full flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'Profile' && (
                <motion.div
                  key="profile"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col h-full"
                >
                  {/* Legal Information Section */}
                  <div className="flex flex-col">
                    <h4 className="text-[14.5px] font-bold text-gray-900 leading-none">
                      Legal Information
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-4 text-left">
                      <div className="flex flex-col">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                          Legal Business Name
                        </span>
                        <span className="text-[13px] font-bold text-gray-900 mt-1">
                          Fresh Foods Market LLC
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                          Tax ID / EIN
                        </span>
                        <span className="text-[13px] font-bold text-gray-900 mt-1">
                          XX-XXXXXXX
                        </span>
                      </div>
                      <div className="col-span-2 flex flex-col mt-0.5">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                          Business Type
                        </span>
                        <span className="text-[13px] font-bold text-gray-900 mt-1">
                          Limited Liability Company (LLC)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-[#E2E8F0] my-5"></div>

                  {/* Contact Persons Section */}
                  <div className="flex flex-col">
                    <h4 className="text-[14.5px] font-bold text-gray-900 leading-none">
                      Contact Persons
                    </h4>

                    {/* Contact Card */}
                    <div className="mt-3.5 p-4 border border-[#E2E8F0] rounded-xl bg-[#F8FAFC]/55 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 text-gray-900 font-extrabold flex items-center justify-center text-xs shrink-0 select-none">
                          SJ
                        </div>
                        <div className="flex flex-col items-start leading-tight">
                          <span className="text-[13px] font-bold text-gray-900">
                            Sarah Jenkins
                          </span>
                          <span className="text-[11px] text-slate-400 font-bold mt-0.5">
                            Primary Owner
                          </span>
                        </div>
                      </div>

                      {/* Right side contact information */}
                      <div className="flex flex-col items-end text-[12px] font-bold text-slate-700 leading-[1.35]">
                        <span>sarah@freshfoods.com</span>
                        <span className="text-slate-400 font-medium mt-0.5">+1 (555) 987-6543</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Products' && (
                <motion.div
                  key="products"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col w-full text-left gap-0"
                >
                  {/* Product Row 1 */}
                  <div className="py-3 border-b-[0.8px] border-[#E2E8F0] flex items-center justify-between gap-2 text-left">
                    <div className="flex items-center gap-3 w-[170px] min-w-0">
                      {/* Image placeholder */}
                      <div className="w-8 h-8 rounded-[4px] bg-[#E5E7EB] shrink-0" />
                      <div className="flex flex-col leading-tight min-w-0">
                        <span className="text-[13px] font-bold text-gray-900 truncate">Bussiness Cards</span>
                        <span className="text-[11px] text-slate-400 font-semibold mt-0.5 truncate">SKU: AUD-WH-001</span>
                      </div>
                    </div>
                    <span className="text-[12.5px] text-[#64748B] font-medium w-[75px] truncate">Printing</span>
                    <span className="text-[13px] font-black text-gray-900 w-[75px]">₹299.00</span>
                    <span className="text-[12px] text-slate-500 font-semibold w-[65px]">45 units</span>
                    <div className="w-[75px] flex justify-end">
                      <span className="bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none shrink-0">
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* Product Row 2 */}
                  <div className="py-3 border-b-[0.8px] border-[#E2E8F0] flex items-center justify-between gap-2 text-left">
                    <div className="flex items-center gap-3 w-[170px] min-w-0">
                      {/* Image placeholder */}
                      <div className="w-8 h-8 rounded-[4px] bg-[#E5E7EB] shrink-0" />
                      <div className="flex flex-col leading-tight min-w-0">
                        <span className="text-[13px] font-bold text-gray-900 truncate">Customised mug</span>
                        <span className="text-[11px] text-slate-400 font-semibold mt-0.5 truncate">SKU: WEA-SW-005</span>
                      </div>
                    </div>
                    <span className="text-[12.5px] text-[#64748B] font-medium w-[75px] truncate">gifting</span>
                    <span className="text-[13px] font-black text-gray-900 w-[75px]">₹399.00</span>
                    <span className="text-[12px] text-slate-500 font-semibold w-[65px]">8 units</span>
                    <div className="w-[75px] flex justify-end">
                      <span className="bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3] text-[9.5px] font-bold px-2 py-0.5 rounded-full leading-none shrink-0">
                        Low Stock
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Orders' && (
                <motion.div
                  key="orders"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col w-full text-left gap-0 overflow-x-auto scrollbar-none"
                >
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b-[0.8px] border-[#E2E8F0] h-[40px] text-[12px] font-semibold text-[#64748B] uppercase tracking-wider select-none text-left">
                        <th className="px-4 py-2 font-semibold">Order ID</th>
                        <th className="px-4 py-2 font-semibold">Customer</th>
                        <th className="px-4 py-2 font-semibold">Date</th>
                        <th className="px-4 py-2 font-semibold">Amount</th>
                        <th className="px-4 py-2 font-semibold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] text-[13px] text-[#0F172A]">
                      {/* Row 1 */}
                      <tr className="h-[64px] hover:bg-slate-50/30 transition-colors">
                        <td className="px-4 py-2 font-bold text-gray-900">#ORD-7432</td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col leading-tight">
                            <span className="font-bold text-gray-900">John Doe</span>
                            <span className="text-[11px] text-slate-400 font-semibold mt-0.5">john.doe@example.com</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-slate-500 font-semibold">Oct 24, 2023</td>
                        <td className="px-4 py-2 font-black text-gray-900">₹299.00</td>
                        <td className="px-4 py-2 text-right">
                          <span className="inline-block bg-[#DCFCE7] text-[#008236] text-[10px] font-bold px-2.5 py-0.5 rounded-full leading-none">
                            Delivered
                          </span>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="h-[64px] hover:bg-slate-50/30 transition-colors">
                        <td className="px-4 py-2 font-bold text-gray-900">#ORD-7433</td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col leading-tight">
                            <span className="font-bold text-gray-900">Sarah Smith</span>
                            <span className="text-[11px] text-slate-400 font-semibold mt-0.5">sarah.s@example.com</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-slate-500 font-semibold">Oct 25, 2023</td>
                        <td className="px-4 py-2 font-black text-gray-900">₹399.00</td>
                        <td className="px-4 py-2 text-right">
                          <span className="inline-block bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold px-2.5 py-0.5 rounded-full leading-none">
                            Processing
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              )}

              {activeTab === 'Documents' && (
                <motion.div
                  key="documents"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="flex flex-col items-center justify-center h-full text-center py-10"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3">
                    <FiFileText className="w-5 h-5" />
                  </div>
                  <h5 className="text-[13.5px] font-bold text-gray-900">No Documents Found</h5>
                  <p className="text-[11.5px] text-slate-400 font-semibold mt-1">No legal or verification documents uploaded yet.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
