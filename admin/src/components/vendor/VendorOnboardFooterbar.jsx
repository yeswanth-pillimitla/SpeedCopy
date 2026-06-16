import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function VendorOnboardFooterbar({ activeStep, totalSteps, onBack, onNext }) {
  const isFirstStep = activeStep === 1

  return (
    <div className="w-full h-[70.4px] flex justify-between items-center px-6 py-4 bg-[#F8FAFC] border-t-[0.8px] border-[#E2E8F0] shrink-0 select-none">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep}
        className={`h-9 px-4 rounded-lg text-[12px] font-bold flex items-center gap-1.5 transition-all ${
          isFirstStep
            ? 'bg-white text-slate-350 border border-slate-200 cursor-not-allowed opacity-50'
            : 'bg-white text-slate-700 border border-[#E2E8F0] hover:bg-slate-50 cursor-pointer shadow-xs'
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <button
        type="button"
        onClick={onNext}
        className="h-9 px-4 rounded-lg bg-black hover:bg-zinc-900 text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
      >
        <span>{activeStep === totalSteps ? 'Approve Vendor' : 'Next Step'}</span>
        <FiChevronRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  )
}
