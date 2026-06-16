import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiChevronLeft } from 'react-icons/fi'

export default function ProductFooterbar({ onSaveDraft, onPreview, onPublish, activeStep, onBack }) {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center border-t border-[#E2E8F0] p-4 md:px-6 md:py-4 bg-white rounded-b-[16px] shrink-0 font-sans gap-3 md:gap-0">
      {/* Left Back button */}
      <button
        type="button"
        disabled={activeStep === 1}
        onClick={onBack}
        className={`w-full md:w-auto text-[12px] font-bold flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg transition-all ${
          activeStep === 1
            ? 'bg-white text-slate-350 border border-slate-200 cursor-not-allowed opacity-50'
            : 'bg-white text-slate-700 border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer shadow-xs'
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      {/* Right action buttons */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-2 w-full md:w-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSaveDraft && onSaveDraft()}
          className="w-full md:w-auto h-9 px-4 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer shadow-sm transition-all"
        >
          Save Draft
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPreview && onPreview()}
          className="w-full md:w-auto h-9 px-4 rounded-lg border border-[#E2E8F0] bg-white text-[12px] font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center cursor-pointer shadow-sm transition-all"
        >
          Preview
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onPublish && onPublish()}
          className="w-full md:w-auto h-9 px-4 rounded-lg bg-black text-white text-[12px] font-bold hover:bg-zinc-900 flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          <FiCheckCircle className="w-4 h-4 text-white" />
          Publish Product
        </motion.button>
      </div>
    </div>
  )
}
