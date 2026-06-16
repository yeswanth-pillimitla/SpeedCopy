import React from 'react'
import { FiX, FiMenu } from 'react-icons/fi'

export default function VendorOnboardTopbar({ onClose, onToggleMenu, isMobileMenuOpen }) {
  return (
    <div className="w-full h-[80.8px] flex justify-between items-center px-6 py-4 border-b-[0.8px] border-[#E2E8F0] bg-white shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger menu toggle */}
        <button
          onClick={onToggleMenu}
          className="sm:hidden text-slate-500 hover:text-black transition-colors p-1.5 rounded-lg hover:bg-slate-100/50 cursor-pointer flex items-center justify-center shrink-0"
        >
          {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>

        <div className="flex flex-col">
          <h2 className="text-[18px] font-black text-[#0F172A] tracking-tight leading-none font-sans">
            Vendor Onboarding
          </h2>
          <p className="text-[12.5px] text-[#64748B] font-semibold mt-2">
            Add a new vendor to the marketplace
          </p>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="text-[#94A3B8] hover:text-[#0F172A] transition-colors p-1.5 rounded-lg hover:bg-slate-100/50 cursor-pointer flex items-center justify-center shrink-0"
      >
        <FiX className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  )
}
