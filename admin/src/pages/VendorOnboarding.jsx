import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiChevronDown, FiFileText, FiUploadCloud, FiCheck } from 'react-icons/fi'
import { LuShieldCheck } from 'react-icons/lu'

import VendorOnboardTopbar from '../components/vendor/VendorOnboardTopbar.jsx'
import VendorOnboardSidebar from '../components/vendor/VendorOnboardSidebar.jsx'
import VendorOnboardFooterbar from '../components/vendor/VendorOnboardFooterbar.jsx'

export default function VendorOnboarding() {
  useEffect(() => {
    document.title = 'Vendor Onboarding - SpeedCopy'
  }, [])

  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const totalSteps = 6

  // Form states
  // Step 1: Business Info
  const [businessName, setBusinessName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [category, setCategory] = useState('')
  const [taxId, setTaxId] = useState('')

  // Step 2: Owner Info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')
  const [residentialAddress, setResidentialAddress] = useState('')

  // Step 3: Documents
  const [licenseFile, setLicenseFile] = useState(null)
  const [taxCertificate, setTaxCertificate] = useState(null)
  const [ownerIdFile, setOwnerIdFile] = useState(null)

  // Step 4: Bank Details
  const [bankName, setBankName] = useState('')
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [commission, setCommission] = useState('')
  const [settlementCycle, setSettlementCycle] = useState('Weekly')

  // Step 5: Verification
  const [idType, setIdType] = useState('Passport')
  const [idNumber, setIdNumber] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('Pending')

  // Step 6: Approval
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0]
    if (!file) return

    // Accept PDF, JPG, PNG only
    const allowedExtensions = /(\.pdf|\.jpg|\.jpeg|\.png)$/i
    if (!allowedExtensions.exec(file.name)) {
      alert('Only PDF, JPG, and PNG files are allowed.')
      return
    }

    // Max size 5MB
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('File size must be less than 5MB.')
      return
    }

    setFile(file)
  }

  const handleNext = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1)
    } else {
      // Save vendor to localStorage
      const savedVendorsStr = localStorage.getItem('vendors')
      let currentVendors = savedVendorsStr ? JSON.parse(savedVendorsStr) : [
        { id: 1, name: 'Fresh Foods Market', location: 'Downtown District', category: 'Groceries', performance: '4.8', orders: '1245 orders', revenue: '₹45,200', status: 'Active' },
        { id: 2, name: 'TechGadgets Hub', location: 'Westside Mall', category: 'Electronics', performance: '4.5', orders: '856 orders', revenue: '₹120,400', status: 'Active' },
        { id: 3, name: 'Urban Apparel', location: 'Fashion Avenue', category: 'Clothing', performance: 'N/A', orders: '0 orders', revenue: '₹0', status: 'Pending Verification' },
        { id: 4, name: 'Green Pharmacy', location: 'Medical Plaza', category: 'Health', performance: '4.9', orders: '3200 orders', revenue: '₹85,000', status: 'Active' },
        { id: 5, name: 'SneakerHead Supply', location: 'South Station', category: 'Footwear', performance: '3.2', orders: '412 orders', revenue: '₹22,100', status: 'Suspended' }
      ]

      const newVendor = {
        id: currentVendors.length + 1,
        name: businessName || 'New Vendor',
        location: residentialAddress || 'Downtown District',
        category: category || 'Groceries',
        performance: 'N/A',
        orders: '0 orders',
        revenue: '₹0',
        status: 'Active'
      }

      localStorage.setItem('vendors', JSON.stringify([...currentVendors, newVendor]))

      alert('Vendor approved and onboarding application submitted successfully!')
      navigate('/vendors')
    }
  }

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleClose = () => {
    navigate('/vendors')
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-[#1E293B] flex items-center justify-center p-4 z-50 overflow-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-[896px] h-[95vh] sm:h-[615.2px] bg-white border border-[#E2E8F0] rounded-[16px] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* TOPBAR */}
        <VendorOnboardTopbar
          onClose={handleClose}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* MIDDLE SECTION */}
        <div className="flex w-full flex-1 min-h-0 relative">
          {/* SIDEBAR */}
          <VendorOnboardSidebar
            activeStep={activeStep}
            onStepChange={setActiveStep}
            isMobile={false}
          />

          {/* MOBILE SIDEBAR OVERLAY */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: -250 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -250 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-y-0 left-0 z-35 w-[256px] h-full sm:hidden border-r border-[#E2E8F0] shadow-xl"
              >
                <VendorOnboardSidebar
                  activeStep={activeStep}
                  onStepChange={(step) => {
                    setActiveStep(step)
                    setIsMobileMenuOpen(false)
                  }}
                  isMobile={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Overlay backdrop when mobile sidebar is open */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute inset-0 bg-black/60 z-30 sm:hidden"
              />
            )}
          </AnimatePresence>

          {/* RIGHT CONTENT DIV */}
          <div className="w-full sm:w-[640px] flex-1 p-6 sm:p-8 bg-white flex flex-col justify-start overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div
                  key="step-business"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col w-full h-full justify-between"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight leading-none font-sans">
                        Business Information
                      </h3>
                      <p className="text-[12.5px] text-[#64748B] font-semibold mt-2">
                        Provide the legal business details for the vendor.
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                      {/* Legal Business Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Legal Business Name *
                        </label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Acme Corp LLC"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                        />
                      </div>

                      {/* Store / Display Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Store / Display Name *
                        </label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Acme Store"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                        />
                      </div>

                      {/* Two column row */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Business Type */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Business Type
                          </label>
                          <input
                            type="text"
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            placeholder=""
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                          />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Category
                          </label>
                          <div className="relative">
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full h-10 pl-3.5 pr-10 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all appearance-none cursor-pointer text-gray-800 font-semibold bg-white"
                            >
                              <option value="" disabled hidden></option>
                              <option value="Groceries">Groceries</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Clothing">Clothing</option>
                              <option value="Health">Health</option>
                              <option value="Footwear">Footwear</option>
                            </select>
                            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Tax ID / EIN */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Tax ID / EIN
                        </label>
                        <input
                          type="text"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          placeholder="XX-XXXXXXX"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step-owner"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col w-full h-full justify-between"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight leading-none font-sans">
                        Owner Information
                      </h3>
                      <p className="text-[12.5px] text-[#64748B] font-semibold mt-2">
                        Primary contact and ownership details.
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                      {/* Row 1: First Name & Last Name */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                          />
                        </div>
                      </div>

                      {/* Row 2: Email Address & Phone Number */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={ownerEmail}
                            onChange={(e) => setOwnerEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Phone Number *
                          </label>
                          <input
                            type="text"
                            value={ownerPhone}
                            onChange={(e) => setOwnerPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                          />
                        </div>
                      </div>

                      {/* Row 3: Residential Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Residential Address
                        </label>
                        <input
                          type="text"
                          value={residentialAddress}
                          onChange={(e) => setResidentialAddress(e.target.value)}
                          placeholder="123 Main St, City, Country"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step-documents"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col w-full h-full justify-between"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight leading-none font-sans">
                        Document Upload
                      </h3>
                      <p className="text-[12.5px] text-[#64748B] font-semibold mt-2">
                        Upload required legal and compliance documents.
                      </p>
                    </div>

                    {/* Upload Cards */}
                    <div className="flex flex-col gap-3">
                      {/* Card 1: Business License */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Icon Box */}
                          <div className="w-10 h-10 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[#64748B] shrink-0">
                            <FiFileText className="w-5 h-5" />
                          </div>
                          {/* Text */}
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-bold text-[#0F172A] leading-tight font-sans">
                              Business License
                            </span>
                            <span className={`text-[11px] font-medium mt-0.5 font-sans leading-none ${licenseFile ? 'text-emerald-600 font-bold' : 'text-[#64748B]'}`}>
                              {licenseFile ? licenseFile.name : 'PDF, JPG or PNG (Max 5MB)'}
                            </span>
                          </div>
                        </div>

                        {/* Button */}
                        <label className="cursor-pointer h-9 px-3.5 bg-white border border-[#E2E8F0] rounded-[8px] flex items-center gap-1.5 text-[12.5px] font-bold text-slate-750 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs select-none">
                          <FiUploadCloud className="w-4 h-4 text-slate-550" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, setLicenseFile)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Card 2: Tax Registration Certificate */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Icon Box */}
                          <div className="w-10 h-10 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[#64748B] shrink-0">
                            <FiFileText className="w-5 h-5" />
                          </div>
                          {/* Text */}
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-bold text-[#0F172A] leading-tight font-sans">
                              Tax Registration Certificate
                            </span>
                            <span className={`text-[11px] font-medium mt-0.5 font-sans leading-none ${taxCertificate ? 'text-emerald-600 font-bold' : 'text-[#64748B]'}`}>
                              {taxCertificate ? taxCertificate.name : 'PDF, JPG or PNG (Max 5MB)'}
                            </span>
                          </div>
                        </div>

                        {/* Button */}
                        <label className="cursor-pointer h-9 px-3.5 bg-white border border-[#E2E8F0] rounded-[8px] flex items-center gap-1.5 text-[12.5px] font-bold text-slate-750 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs select-none">
                          <FiUploadCloud className="w-4 h-4 text-slate-550" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, setTaxCertificate)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Card 3: Owner ID (Passport/Driver's License) */}
                      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Icon Box */}
                          <div className="w-10 h-10 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[#64748B] shrink-0">
                            <FiFileText className="w-5 h-5" />
                          </div>
                          {/* Text */}
                          <div className="flex flex-col">
                            <span className="text-[13.5px] font-bold text-[#0F172A] leading-tight font-sans">
                              Owner ID (Passport/Driver's License)
                            </span>
                            <span className={`text-[11px] font-medium mt-0.5 font-sans leading-none ${ownerIdFile ? 'text-emerald-600 font-bold' : 'text-[#64748B]'}`}>
                              {ownerIdFile ? ownerIdFile.name : 'PDF, JPG or PNG (Max 5MB)'}
                            </span>
                          </div>
                        </div>

                        {/* Button */}
                        <label className="cursor-pointer h-9 px-3.5 bg-white border border-[#E2E8F0] rounded-[8px] flex items-center gap-1.5 text-[12.5px] font-bold text-slate-750 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs select-none">
                          <FiUploadCloud className="w-4 h-4 text-slate-550" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, setOwnerIdFile)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  key="step-bank"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col w-full h-full justify-between"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight leading-none font-sans">
                        Bank Details
                      </h3>
                      <p className="text-[12.5px] text-[#64748B] font-semibold mt-2">
                        Bank account information for marketplace settlements.
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col gap-4">
                      {/* Row 1: Account Holder Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700 font-sans">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          placeholder="Acme Corp LLC"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8] bg-white"
                        />
                      </div>

                      {/* Row 2: Bank Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700 font-sans">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          placeholder="Chase Bank"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8] bg-white"
                        />
                      </div>

                      {/* Row 3: Account Number & Routing/SWIFT */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Account Number */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700 font-sans">
                            Account Number
                          </label>
                          <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="000000000000"
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8] bg-white"
                          />
                        </div>

                        {/* Routing / SWIFT */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700 font-sans">
                            Routing Number / SWIFT
                          </label>
                          <input
                            type="text"
                            value={ifscCode}
                            onChange={(e) => setIfscCode(e.target.value)}
                            placeholder="XXXXXXXX"
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8] bg-white"
                          />
                        </div>
                      </div>

                      {/* Row 4: Default Commission & Settlement Cycle */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Default Commission Percentage (%) */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700 font-sans">
                            Default Commission Percentage (%)
                          </label>
                          <input
                            type="text"
                            value={commission}
                            onChange={(e) => setCommission(e.target.value)}
                            placeholder="15"
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold placeholder-[#94A3B8] bg-white"
                          />
                        </div>

                        {/* Settlement Cycle (Days) */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700 font-sans">
                            Settlement Cycle (Days)
                          </label>
                          <div className="relative">
                            <select
                              value={settlementCycle}
                              onChange={(e) => setSettlementCycle(e.target.value)}
                              className="w-full h-10 pl-3.5 pr-10 text-[13px] border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all appearance-none cursor-pointer text-gray-800 font-semibold bg-white"
                            >
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                            </select>
                            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 5 && (
                <motion.div
                  key="step-verification"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col w-full h-full justify-between"
                >
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-extrabold text-[#0F172A] tracking-tight leading-none font-sans">
                        Identity Verification
                      </h3>
                      <p className="text-[12.5px] text-[#64748B] font-semibold mt-2">
                        Review the submitted information and perform background checks.
                      </p>
                    </div>

                    {/* Card Wrapper */}
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col">
                      {/* Row 1 */}
                      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5 mb-3.5">
                        <div className="flex items-center gap-3">
                          <LuShieldCheck className="w-5 h-5 text-[#D97706]" />
                          <span className="text-[13.5px] font-bold text-[#334155] font-sans">
                            Background Check
                          </span>
                        </div>
                        <span className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold font-sans leading-relaxed ${
                          verificationStatus === 'Verified'
                            ? 'bg-[#D1FAE5] text-[#059669]'
                            : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}>
                          {verificationStatus}
                        </span>
                      </div>

                      {/* Row 2 */}
                      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5 mb-3.5">
                        <div className="flex items-center gap-3">
                          <LuShieldCheck className="w-5 h-5 text-[#D97706]" />
                          <span className="text-[13.5px] font-bold text-[#334155] font-sans">
                            Tax ID Verification
                          </span>
                        </div>
                        <span className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold font-sans leading-relaxed ${
                          verificationStatus === 'Verified'
                            ? 'bg-[#D1FAE5] text-[#059669]'
                            : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}>
                          {verificationStatus}
                        </span>
                      </div>

                      {/* Row 3 */}
                      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3.5 mb-4">
                        <div className="flex items-center gap-3">
                          <LuShieldCheck className="w-5 h-5 text-[#D97706]" />
                          <span className="text-[13.5px] font-bold text-[#334155] font-sans">
                            Bank Account Validation
                          </span>
                        </div>
                        <span className={`rounded-full px-3 py-0.5 text-[11px] font-extrabold font-sans leading-relaxed ${
                          verificationStatus === 'Verified'
                            ? 'bg-[#D1FAE5] text-[#059669]'
                            : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}>
                          {verificationStatus}
                        </span>
                      </div>

                      {/* Button Section */}
                      <button
                        type="button"
                        onClick={() => setVerificationStatus('Verified')}
                        className="w-full h-10 bg-white border border-[#E2E8F0] rounded-[8px] flex items-center justify-center text-[12.5px] font-bold text-[#334155] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer select-none"
                      >
                        Run Automatic Verification
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 6 && (
                <motion.div
                  key="step-approval"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center w-full h-full text-center py-2 px-6 gap-6"
                >
                  {/* Success Icon */}
                  <div className="w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center text-[#059669] shrink-0">
                    <FiCheck className="w-8 h-8 stroke-[3]" />
                  </div>

                  {/* Title Section */}
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight leading-none font-sans text-center">
                      Ready for Approval
                    </h3>
                    <p className="text-[13px] text-[#64748B] font-medium leading-relaxed max-w-[420px] text-center font-sans">
                      All necessary information has been collected. You can
                      now approve this vendor to start selling on the
                      marketplace.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-4 flex flex-col text-left">
                    {/* Row 1 */}
                    <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3 mb-3 text-[13px]">
                      <span className="font-semibold text-slate-550 font-sans">Commission Rate</span>
                      <span className="font-bold text-slate-800 font-sans">12%</span>
                    </div>
                    {/* Row 2 */}
                    <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3 mb-3 text-[13px]">
                      <span className="font-semibold text-slate-550 font-sans">Payout Cycle</span>
                      <span className="font-bold text-slate-800 font-sans">Weekly</span>
                    </div>
                    {/* Row 3 */}
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-550 font-sans">Status upon approval</span>
                      <span className="font-bold text-emerald-600 font-sans">Active</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FOOTERBAR */}
        <VendorOnboardFooterbar
          activeStep={activeStep}
          totalSteps={totalSteps}
          onBack={handleBack}
          onNext={handleNext}
        />
      </motion.div>
    </div>
  )
}
