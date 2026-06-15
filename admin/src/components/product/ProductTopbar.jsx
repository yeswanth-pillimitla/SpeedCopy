import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiX, FiMenu } from 'react-icons/fi'

export default function ProductTopbar({ onMenuClick }) {
  const navigate = useNavigate()

  return (
    <div className="w-full flex justify-between items-start border-b border-[#E2E8F0] p-4 md:px-6 md:py-4 bg-white rounded-t-[16px] shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden text-slate-400 hover:text-black transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 flex items-center justify-center border border-[#E2E8F0] shrink-0"
        >
          <FiMenu className="w-4 h-4" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-[18px] md:text-[20px] font-black text-gray-900 tracking-tight leading-none font-sans">
            Add New Product
          </h1>
          <p className="text-[11.5px] md:text-[13px] text-slate-400 font-semibold mt-2 font-sans">
            Fill in the details to create a new product listing.
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/products')}
        className="text-slate-400 hover:text-black transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-50 flex items-center justify-center"
      >
        <FiX className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  )
}
