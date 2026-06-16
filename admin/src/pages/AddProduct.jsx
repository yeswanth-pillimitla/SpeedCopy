import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiInfo, FiImage, FiUploadCloud, FiX, FiPlus, FiTrash2 } from 'react-icons/fi'
import ProductTopbar from '../components/product/ProductTopbar.jsx'
import ProductSidebar from '../components/product/ProductSidebar.jsx'
import ProductFooterbar from '../components/product/ProductFooterbar.jsx'

const mediaStepVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.25
    }
  }
}

const formStepVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: {
      duration: 0.2
    }
  }
}

const inputItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

export default function AddProduct() {
  useEffect(() => {
    document.title = 'Add New Product -SpeedCopy'
  }, [])

  const [activeStep, setActiveStep] = useState(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Form Fields State
  const [productName, setProductName] = useState('')
  const [productId] = useState('PRD-1030')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [theme, setTheme] = useState('')
  const [description, setDescription] = useState('')

  // Pricing State
  const [regularPrice, setRegularPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [thresholdPrice, setThresholdPrice] = useState('')
  const [thresholdQuantity, setThresholdQuantity] = useState('')
  const [taxStatus, setTaxStatus] = useState('')
  const [taxClass, setTaxClass] = useState('')

  // Bulk Pricing dynamic rows state
  const [bulkRows, setBulkRows] = useState([
    { id: 1, pricePcs: '', discountPcs: '' }
  ])

  const handleAddBulkRow = () => {
    setBulkRows([
      ...bulkRows,
      { id: Date.now(), pricePcs: '', discountPcs: '' }
    ])
  }

  const handleBulkRowChange = (id, field, value) => {
    setBulkRows(
      bulkRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  const handleRemoveBulkRow = (id) => {
    if (bulkRows.length > 1) {
      setBulkRows(bulkRows.filter((row) => row.id !== id))
    }
  }

  // Toggles State
  const [enableBulk, setEnableBulk] = useState(false)
  const [customizable, setCustomizable] = useState(false)

  // Inventory State
  const [trackInventory, setTrackInventory] = useState(false)
  const [stockQuantity, setStockQuantity] = useState('')
  const [lowStockAlert, setLowStockAlert] = useState('')
  const [stockStatus, setStockStatus] = useState('')

  // Media State
  const [heroImage, setHeroImage] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])

  const heroInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  const handleHeroUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setHeroImage(file)
    }
  }

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setGalleryImages((prev) => {
        const combined = [...prev, ...files]
        return combined.slice(0, 10) // Limit to 10 images
      })
    }
  }

  const handleRemoveGalleryImage = (indexToRemove) => {
    setGalleryImages((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  // Attributes & Variants State
  const [attributes, setAttributes] = useState([
    { id: 1, name: '', value: '' }
  ])
  const [variants, setVariants] = useState([
    { id: 1, optionName: 'Size', optionValues: 'S, M, L' }
  ])

  const addAttribute = () => {
    setAttributes([
      ...attributes,
      { id: Date.now(), name: '', value: '' }
    ])
  }

  const handleAttributeChange = (id, field, value) => {
    setAttributes(
      attributes.map((attr) => (attr.id === id ? { ...attr, [field]: value } : attr))
    )
  }

  const deleteAttribute = (id) => {
    setAttributes(attributes.filter((attr) => attr.id !== id))
  }

  const addOption = () => {
    setVariants([
      ...variants,
      { id: Date.now(), optionName: '', optionValues: '' }
    ])
  }

  const handleVariantChange = (id, field, value) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    )
  }

  const deleteOption = (id) => {
    setVariants(variants.filter((v) => v.id !== id))
  }

  // SEO State
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [urlSlug, setUrlSlug] = useState('')
  const [structuredData, setStructuredData] = useState('')

  // Handlers for footer buttons
  const handleSaveDraft = () => {
    alert(`Draft saved for: ${productName || 'Unnamed Product'}`)
  }

  const handlePreview = () => {
    alert(`Previewing product: ${productName || 'Unnamed Product'}\nCategory: ${category}\nSKU: ${sku}`)
  }

  const handlePublish = () => {
    if (!productName.trim()) {
      alert('Please fill in the Product Name.')
      return
    }
    if (!category) {
      alert('Please select a Category.')
      return
    }
    alert(`Successfully published product: ${productName}\nID: ${productId}\nSKU: ${sku || 'None'}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-screen py-6 px-4 md:px-8 lg:px-10 bg-[#1E293B] flex flex-col justify-start items-center font-sans"
    >
      <div className="w-full max-w-[1000px] bg-white border border-[#E2E8F0] rounded-[16px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.05),0px_8px_16px_-6px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
        {/* TOPBAR */}
        <ProductTopbar onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* CONTAINER FOR SIDEBAR + FORM */}
        <div className="flex flex-col md:flex-row w-full flex-1 min-h-[480px]">
          {/* SIDEBAR */}
          <ProductSidebar activeStep={activeStep} onStepChange={setActiveStep} />

          {/* FORM CONTENT */}
          <div className="flex-1 p-4 md:p-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div
                  key="step-basic"
                  variants={formStepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Header inside Form content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-[16px] font-bold text-gray-900 leading-none">
                        Basic Information
                      </h2>
                      <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
                        Provide the fundamental details of your product.
                      </p>
                    </div>

                    {/* Right side toggles */}
                    <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[12.5px] font-bold text-slate-700">Enable Bulk</span>
                        <button
                          type="button"
                          onClick={() => setEnableBulk(!enableBulk)}
                          className={`w-9 h-5 rounded-full p-[2.5px] transition-colors duration-200 cursor-pointer relative flex items-center shrink-0 ${enableBulk ? 'bg-black' : 'bg-slate-200'
                            }`}
                        >
                          <motion.div
                            layout
                            className="bg-white w-3.5 h-3.5 rounded-full shadow-xs"
                            animate={{ x: enableBulk ? 16 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="text-[12.5px] font-bold text-slate-700">Customizable</span>
                        <button
                          type="button"
                          onClick={() => setCustomizable(!customizable)}
                          className={`w-9 h-5 rounded-full p-[2.5px] transition-colors duration-200 cursor-pointer relative flex items-center shrink-0 ${customizable ? 'bg-black' : 'bg-slate-200'
                            }`}
                        >
                          <motion.div
                            layout
                            className="bg-white w-3.5 h-3.5 rounded-full shadow-xs"
                            animate={{ x: customizable ? 16 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Input fields */}
                  <div className="flex flex-col gap-5">
                    {/* Product Name */}
                    <motion.div variants={inputItemVariants} className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g. Premium Business Cards 300gsm"
                        className="w-full h-10 px-3.5 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold"
                      />
                    </motion.div>

                    {/* Product ID & SKU */}
                    <motion.div variants={inputItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Product ID */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Product ID
                        </label>
                        <input
                          type="text"
                          value={productId}
                          disabled
                          className="w-full h-10 px-3.5 text-[13px] border border-slate-200 rounded-lg bg-slate-50 text-slate-400 font-sans font-semibold cursor-not-allowed"
                        />
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mt-0.5">
                          <FiInfo className="w-3.5 h-3.5 text-slate-400" />
                          <span>Auto-generated identifier</span>
                        </div>
                      </div>

                      {/* SKU */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          SKU
                        </label>
                        <input
                          type="text"
                          value={sku}
                          onChange={(e) => setSku(e.target.value)}
                          placeholder="e.g. PBC-300-01"
                          className="w-full h-10 px-3.5 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold"
                        />
                      </div>
                    </motion.div>

                    {/* Category & Subcategory 1 */}
                    <motion.div variants={inputItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Category */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Category *
                        </label>
                        <div className="relative">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-10 pl-3.5 pr-10 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all appearance-none cursor-pointer text-gray-800 font-semibold"
                          >
                            <option value="" disabled hidden></option>
                            <option value="Printing">Printing</option>
                            <option value="Gifting">Gifting</option>
                            <option value="Shopping">Shopping</option>
                          </select>
                          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                        </div>
                      </div>

                      {/* Subcategory 1 */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Subcategory 1
                        </label>
                        <div className="relative">
                          <select
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            className="w-full h-10 pl-3.5 pr-10 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all appearance-none cursor-pointer text-gray-800 font-semibold"
                          >
                            <option value="" disabled hidden></option>
                            <option value="Business Cards">Business Cards</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Stationery">Stationery</option>
                          </select>
                          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Themes */}
                    <motion.div variants={inputItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Themes
                        </label>
                        <div className="relative">
                          <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full h-10 pl-3.5 pr-10 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all appearance-none cursor-pointer text-gray-800 font-semibold"
                          >
                            <option value="" disabled hidden></option>
                            <option value="Classic">Classic</option>
                            <option value="Modern">Modern</option>
                            <option value="Vintage">Vintage</option>
                            <option value="Minimalist">Minimalist</option>
                          </select>
                          <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div variants={inputItemVariants} className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the product..."
                        rows={4}
                        className="w-full p-3.5 text-[13px] border border-slate-200 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all font-sans text-gray-800 font-semibold"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step-pricing"
                  variants={formStepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Header inside Form content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-[16px] font-bold text-gray-900 leading-none">
                        Pricing
                      </h2>
                      <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
                        Set the cost, discounts, and tax information.
                      </p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!enableBulk ? (
                      <motion.div
                        key="normal-pricing-fields"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="flex flex-col gap-5"
                      >
                        {/* Row 1: Regular Price & Offer/Sale Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Regular Price */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[12.5px] font-bold text-slate-700">
                              Regular Price *
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                              <input
                                type="text"
                                value={regularPrice}
                                onChange={(e) => setRegularPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                            </div>
                          </div>

                          {/* Offer/Sale Price */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[12.5px] font-bold text-slate-700">
                              Offer/Sale Price
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                              <input
                                type="text"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Threshold Price & Threshold Quantity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Threshold Price */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[12.5px] font-bold text-slate-700">
                              Threshold Price
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                              <input
                                type="text"
                                value={thresholdPrice}
                                onChange={(e) => setThresholdPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                            </div>
                          </div>

                          {/* Threshold Quantity */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[12.5px] font-bold text-slate-700">
                              Threshold Quantity
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                              <input
                                type="text"
                                value={thresholdQuantity}
                                onChange={(e) => setThresholdQuantity(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 3: Tax Status */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Tax Status
                          </label>
                          <input
                            type="text"
                            value={taxStatus}
                            onChange={(e) => setTaxStatus(e.target.value)}
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                          />
                        </div>

                        {/* Row 4: Tax Class */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Tax Class
                          </label>
                          <input
                            type="text"
                            value={taxClass}
                            onChange={(e) => setTaxClass(e.target.value)}
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="bulk-pricing-fields"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="flex flex-col gap-5"
                      >
                        {/* Row 1: Regular Price & Offer/Sale Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {/* Regular Price */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[12.5px] font-bold text-slate-700">
                              Regular Price *
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                              <input
                                type="text"
                                value={regularPrice}
                                onChange={(e) => setRegularPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                            </div>
                          </div>

                          {/* Offer/Sale Price */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[12.5px] font-bold text-slate-700">
                              Offer/Sale Price
                            </label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                              <input
                                type="text"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bulk dynamic rows list */}
                        <div className="flex flex-col gap-5">
                          <AnimatePresence initial={false}>
                            {bulkRows.map((row, index) => (
                              <motion.div
                                key={row.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="flex flex-col sm:flex-row sm:items-end gap-3 w-full border-b sm:border-b-0 pb-4 sm:pb-0 border-slate-100"
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1 w-full">
                                  {/* Price /pcs */}
                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-[12.5px] font-bold text-slate-700">
                                      Price/pcs
                                    </label>
                                    <div className="relative flex items-center">
                                      <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                                      <input
                                        type="text"
                                        value={row.pricePcs}
                                        onChange={(e) => handleBulkRowChange(row.id, 'pricePcs', e.target.value)}
                                        placeholder="0.00"
                                        className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                                      />
                                    </div>
                                  </div>

                                  {/* Discount (%) /pcs */}
                                  <div className="flex flex-col gap-1.5">
                                    <div className="flex justify-between items-center w-full">
                                      <label className="text-[12.5px] font-bold text-slate-700">
                                        Discount(%)/pcs
                                      </label>
                                      {index === 0 && (
                                        <button
                                          type="button"
                                          onClick={handleAddBulkRow}
                                          className="text-[12.5px] font-bold text-black hover:text-slate-700 cursor-pointer transition-colors"
                                        >
                                          +Add more
                                        </button>
                                      )}
                                    </div>
                                    <div className="relative flex items-center">
                                      <span className="absolute left-3.5 text-slate-400 text-[13px] font-medium font-sans">₹</span>
                                      <input
                                        type="text"
                                        value={row.discountPcs}
                                        onChange={(e) => handleBulkRowChange(row.id, 'discountPcs', e.target.value)}
                                        placeholder="0.00"
                                        className="w-full h-10 pl-8 pr-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {bulkRows.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveBulkRow(row.id)}
                                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer p-1 shrink-0 self-end sm:self-auto mb-2.5 sm:mb-0 flex items-center gap-1.5"
                                  >
                                    <FiTrash2 className="w-4 h-4" />
                                    <span className="text-[12px] font-bold sm:hidden">Delete</span>
                                  </button>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>

                        {/* Row 3: Tax Status */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Tax Status
                          </label>
                          <input
                            type="text"
                            value={taxStatus}
                            onChange={(e) => setTaxStatus(e.target.value)}
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                          />
                        </div>

                        {/* Row 4: Tax Class */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[12.5px] font-bold text-slate-700">
                            Tax Class
                          </label>
                          <input
                            type="text"
                            value={taxClass}
                            onChange={(e) => setTaxClass(e.target.value)}
                            className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step-inventory"
                  variants={formStepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Header inside Form content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-[16px] font-bold text-gray-900 leading-none">
                        Inventory Management
                      </h2>
                      <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
                        Track stock levels and set low stock notifications.
                      </p>
                    </div>
                  </div>

                  {/* Form Input fields */}
                  <div className="flex flex-col gap-5">
                    {/* Track Inventory Box */}
                    <motion.div
                      variants={inputItemVariants}
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-5 flex items-start gap-4"
                    >
                      <button
                        type="button"
                        onClick={() => setTrackInventory(!trackInventory)}
                        className={`mt-0.5 w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${trackInventory
                            ? 'bg-black border-black text-white'
                            : 'bg-white border-[#CBD5E1] text-transparent hover:border-slate-400'
                          }`}
                      >
                        {trackInventory && (
                          <motion.svg
                            className="w-3.5 h-3.5 stroke-[3]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.15 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </motion.svg>
                        )}
                      </button>

                      <div className="flex flex-col gap-1 select-none cursor-pointer" onClick={() => setTrackInventory(!trackInventory)}>
                        <h3 className="text-[13.5px] font-bold text-slate-800 leading-none">
                          Track Inventory for this product
                        </h3>
                        <p className="text-[12px] text-slate-400 font-semibold mt-1 leading-normal">
                          We will automatically update stock levels when orders are placed.
                        </p>
                      </div>
                    </motion.div>

                    {/* Stock Quantity & Low Stock Alert */}
                    <motion.div variants={inputItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Stock Quantity */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Stock Quantity *
                        </label>
                        <input
                          type="text"
                          value={stockQuantity}
                          onChange={(e) => setStockQuantity(e.target.value)}
                          placeholder="e.g. 100"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                        />
                      </div>

                      {/* Low Stock Alert Threshold */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Low Stock Alert Threshold
                        </label>
                        <input
                          type="text"
                          value={lowStockAlert}
                          onChange={(e) => setLowStockAlert(e.target.value)}
                          placeholder="e.g. 10"
                          className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                        />
                      </div>
                    </motion.div>

                    {/* Stock Status */}
                    <motion.div variants={inputItemVariants} className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">
                        Stock Status
                      </label>
                      <input
                        type="text"
                        value={stockStatus}
                        onChange={(e) => setStockStatus(e.target.value)}
                        className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  key="step-media"
                  variants={mediaStepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Header inside Form content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-[16px] font-bold text-gray-900 leading-none">
                        Product Media
                      </h2>
                      <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
                        Upload images and videos to showcase your product.
                      </p>
                    </div>
                  </div>

                  {/* Form Input fields */}
                  <div className="flex flex-col gap-6">
                    {/* Hero Image Section */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">
                        Hero Image *
                      </label>

                      <input
                        type="file"
                        ref={heroInputRef}
                        onChange={handleHeroUpload}
                        accept="image/*"
                        className="hidden"
                      />

                      {heroImage ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative w-full h-[180px] rounded-xl overflow-hidden border border-[#CBD5E1] bg-white flex items-center justify-center group"
                        >
                          <img
                            src={URL.createObjectURL(heroImage)}
                            className="max-w-full max-h-full object-contain"
                            alt="Hero Preview"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              type="button"
                              onClick={() => heroInputRef.current?.click()}
                              className="bg-white text-slate-800 text-[12px] font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-md"
                            >
                              Change
                            </button>
                            <button
                              type="button"
                              onClick={() => setHeroImage(null)}
                              className="bg-red-500 text-white text-[12px] font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors cursor-pointer shadow-md"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          onClick={() => heroInputRef.current?.click()}
                          className="w-full h-[160px] border-2 border-dashed border-[#CBD5E1] hover:border-slate-400 bg-white rounded-xl flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <FiImage className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col items-center gap-0.5 select-none text-center">
                            <span className="text-[13px] font-bold text-slate-700">Click to upload or drag and drop</span>
                            <span className="text-[11px] font-semibold text-slate-400">SVG, PNG, JPG or GIF (max. 5MB)</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Product Gallery Section */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">
                        Product Gallery
                      </label>

                      <input
                        type="file"
                        ref={galleryInputRef}
                        onChange={handleGalleryUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        onClick={() => galleryInputRef.current?.click()}
                        className="w-full h-[160px] border-2 border-dashed border-[#CBD5E1] hover:border-slate-400 bg-white rounded-xl flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          <FiUploadCloud className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-center gap-0.5 select-none text-center">
                          <span className="text-[13px] font-bold text-slate-700">Upload additional images</span>
                          <span className="text-[11px] font-semibold text-slate-400">Select multiple files (max. 10 images)</span>
                        </div>
                      </motion.div>

                      {galleryImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-3">
                          <AnimatePresence>
                            {galleryImages.map((file, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative aspect-square rounded-lg overflow-hidden border border-[#E2E8F0] bg-slate-50 flex items-center justify-center group"
                              >
                                <img
                                  src={URL.createObjectURL(file)}
                                  className="max-w-full max-h-full object-contain"
                                  alt={`Gallery Preview ${idx + 1}`}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveGalleryImage(idx)}
                                    className="bg-red-500 text-white text-[10.5px] font-bold px-2 py-1 rounded hover:bg-red-600 transition-colors cursor-pointer shadow-md"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 5 && (
                <motion.div
                  key="step-attributes"
                  variants={mediaStepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Header inside Form content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-[16px] font-bold text-gray-900 leading-none">
                        Attributes & Variants
                      </h2>
                      <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
                        Define custom properties and product variations.
                      </p>
                    </div>
                  </div>

                  {/* Form Input fields */}
                  <div className="flex flex-col gap-6">
                    {/* Dynamic Attributes Header Row */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center w-full">
                        <h3 className="text-[13.5px] font-bold text-slate-800 leading-none">
                          Dynamic Attributes
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={addAttribute}
                          className="flex items-center gap-1.5 text-[12.5px] font-bold text-black hover:text-slate-700 cursor-pointer transition-colors"
                        >
                          <FiPlus className="w-4 h-4 stroke-[2.5]" />
                          <span>Add Attribute</span>
                        </motion.button>
                      </div>

                      {/* Attributes input list */}
                      <div className="flex flex-col gap-3">
                        <AnimatePresence initial={false}>
                          {attributes.map((attr) => (
                            <motion.div
                              key={attr.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, height: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col sm:flex-row sm:items-center gap-3 w-full border-b sm:border-b-0 pb-4 sm:pb-0 border-slate-100"
                            >
                              <input
                                type="text"
                                value={attr.name}
                                onChange={(e) => handleAttributeChange(attr.id, 'name', e.target.value)}
                                placeholder="Name (e.g. Material)"
                                className="w-full sm:w-[220px] shrink-0 h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                              <input
                                type="text"
                                value={attr.value}
                                onChange={(e) => handleAttributeChange(attr.id, 'value', e.target.value)}
                                placeholder="Value (e.g. 100% Cotton)"
                                className="w-full sm:flex-1 h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                              />
                              <button
                                type="button"
                                onClick={() => deleteAttribute(attr.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer p-1 shrink-0 self-end sm:self-auto flex items-center gap-1.5"
                              >
                                <FiTrash2 className="w-4 h-4" />
                                <span className="text-[12px] font-bold sm:hidden">Delete</span>
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Variant Management Header Row */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-start w-full gap-4">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-[13.5px] font-bold text-slate-800 leading-none">
                            Variant Management
                          </h3>
                          <p className="text-[11.5px] text-slate-400 font-semibold leading-normal">
                            Does this product have multiple options, like different sizes or colors?
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={addOption}
                          className="flex items-center gap-1.5 text-[12.5px] font-bold text-black hover:text-slate-700 cursor-pointer transition-colors shrink-0 pt-0.5"
                        >
                          <FiPlus className="w-4 h-4 stroke-[2.5]" />
                          <span>Add Option</span>
                        </motion.button>
                      </div>

                      {/* Variant card list */}
                      <div className="flex flex-col gap-4">
                        <AnimatePresence initial={false}>
                          {variants.map((v) => (
                            <motion.div
                              key={v.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, height: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 w-full"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 flex-1 w-full">
                                {/* Option Name */}
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11.5px] font-bold text-slate-500">
                                    Option Name
                                  </label>
                                  <input
                                    type="text"
                                    value={v.optionName}
                                    onChange={(e) => handleVariantChange(v.id, 'optionName', e.target.value)}
                                    placeholder="Size"
                                    className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                                  />
                                </div>

                                {/* Option Values */}
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[11.5px] font-bold text-slate-500">
                                    Option Values (comma separated)
                                  </label>
                                  <input
                                    type="text"
                                    value={v.optionValues}
                                    onChange={(e) => handleVariantChange(v.id, 'optionValues', e.target.value)}
                                    placeholder="S, M, L"
                                    className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                                  />
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => deleteOption(v.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer p-1 shrink-0 self-end sm:self-auto mt-2 sm:mt-5 flex items-center gap-1.5"
                              >
                                <FiTrash2 className="w-4 h-4" />
                                <span className="text-[12px] font-bold sm:hidden">Delete</span>
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 6 && (
                <motion.div
                  key="step-seo"
                  variants={mediaStepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Header inside Form content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-[16px] font-bold text-gray-900 leading-none">
                        Search Engine Optimization
                      </h2>
                      <p className="text-[12.5px] text-slate-400 font-semibold mt-2">
                        Optimize how your product appears in search engine results.
                      </p>
                    </div>
                  </div>

                  {/* Form Input fields */}
                  <div className="flex flex-col gap-6">
                    {/* Meta Title */}
                    <motion.div variants={inputItemVariants} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center w-full">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Meta Title
                        </label>
                        <span className="text-[11.5px] text-slate-400 font-semibold select-none">
                          {metaTitle.length} / 60
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        maxLength={60}
                        placeholder="Product Title | Your Store Name"
                        className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                      />
                    </motion.div>

                    {/* Meta Description */}
                    <motion.div variants={inputItemVariants} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center w-full">
                        <label className="text-[12.5px] font-bold text-slate-700">
                          Meta Description
                        </label>
                        <span className="text-[11.5px] text-slate-400 font-semibold select-none">
                          {metaDescription.length} / 160
                        </span>
                      </div>
                      <textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        maxLength={160}
                        rows={4}
                        placeholder="A brief summary of the product for search engine results..."
                        className="w-full p-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold placeholder-slate-400"
                      />
                    </motion.div>

                    {/* URL Slug */}
                    <motion.div variants={inputItemVariants} className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">
                        URL Slug
                      </label>
                      <div className="flex flex-col sm:flex-row sm:items-center w-full border border-[#E2E8F0] bg-white rounded-lg overflow-hidden focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-200/50 transition-all">
                        <div className="w-full sm:w-auto bg-[#F8FAFC]/90 border-b sm:border-b-0 sm:border-r border-[#E2E8F0] px-3.5 h-10 flex items-center text-[13px] text-slate-400 font-semibold select-none shrink-0">
                          store.com/products/
                        </div>
                        <input
                          type="text"
                          value={urlSlug}
                          onChange={(e) => setUrlSlug(e.target.value)}
                          placeholder="premium-business-cards"
                          className="w-full sm:flex-1 h-10 px-3.5 text-[13px] focus:outline-none font-sans text-[#111827] font-semibold placeholder-slate-400"
                        />
                      </div>
                    </motion.div>

                    {/* Structured Data */}
                    <motion.div variants={inputItemVariants} className="flex flex-col gap-1.5">
                      <label className="text-[12.5px] font-bold text-slate-700">
                        Structured Data (Schema)
                      </label>
                      <input
                        type="text"
                        value={structuredData}
                        onChange={(e) => setStructuredData(e.target.value)}
                        className="w-full h-10 px-3.5 text-[13px] border border-[#E2E8F0] bg-white rounded-lg focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200/50 transition-all font-sans text-[#111827] font-semibold"
                      />
                      <span className="text-[11px] text-slate-400 font-semibold mt-0.5 select-none">
                        Helps search engines understand your product details.
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeStep > 6 && (
                <motion.div
                  key={`step-${activeStep}`}
                  variants={formStepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                >
                  <div className="flex flex-col border-b border-slate-100 pb-5 mb-6 gap-4">
                    <h2 className="text-[16px] font-bold text-gray-900 leading-none">
                      Coming Soon
                    </h2>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FOOTERBAR */}
        <ProductFooterbar
          activeStep={activeStep}
          onBack={() => {
            if (activeStep > 1) setActiveStep(activeStep - 1)
          }}
          onSaveDraft={handleSaveDraft}
          onPreview={handlePreview}
          onPublish={handlePublish}
        />
      </div>

      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-start">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[280px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10"
            >
              {/* Header with Title and Close Button */}
              <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center bg-slate-50 shrink-0">
                <span className="text-[13px] font-black text-gray-900 tracking-tight leading-none font-sans uppercase">
                  Steps
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-black transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-200/50 flex items-center justify-center"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Menu steps */}
              <div className="flex-1 overflow-y-auto">
                <ProductSidebar
                  activeStep={activeStep}
                  onStepChange={(step) => {
                    setActiveStep(step)
                    setIsMobileMenuOpen(false)
                  }}
                  forceVertical={true}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
