import React from 'react'
import { motion } from 'framer-motion'

const stepsList = [
  { id: 1, title: 'Basic Information', desc: 'Name, category, and identifiers' },
  { id: 2, title: 'Pricing', desc: 'Cost, discounts, and taxes' },
  { id: 3, title: 'Inventory', desc: 'Stock levels and alerts' },
  { id: 4, title: 'Media', desc: 'Images and videos' },
  { id: 5, title: 'Attributes', desc: 'Variants and custom fields' },
  { id: 6, title: 'SEO', desc: 'Search engine optimization' }
]

export default function ProductSidebar({ activeStep = 1, onStepChange, forceVertical = false }) {
  return (
    <div className={forceVertical
      ? "w-full p-4 bg-white flex flex-col gap-3 overflow-y-auto shrink-0 self-stretch font-sans"
      : "hidden md:flex w-full md:w-[260px] border-b md:border-b-0 md:border-r border-[#E2E8F0] p-3 md:p-4 bg-[#F8FAFC]/50 flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-x-visible shrink-0 self-stretch font-sans flex-nowrap md:flex-wrap"
    }>
      {stepsList.map((step) => {
        const isActive = activeStep === step.id
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepChange && onStepChange(step.id)}
            className={forceVertical
              ? `flex items-start text-left gap-3.5 p-3.5 rounded-[12px] group cursor-pointer focus:outline-none relative w-full shrink-0 transition-all duration-200 ${
                isActive
                  ? 'bg-white shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]'
                  : 'hover:bg-slate-100/50'
              }`
              : `flex items-center md:items-start text-left gap-3.5 p-2.5 md:p-3.5 rounded-[12px] group cursor-pointer focus:outline-none relative w-auto md:w-full shrink-0 transition-all duration-200 ${
                isActive
                  ? 'bg-white shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]'
                  : 'hover:bg-slate-100/50'
              }`
            }
          >
            {/* Left Active Indicator */}
            {isActive && (
              <motion.div
                layoutId={forceVertical ? "activeIndicatorVertical" : "activeIndicator"}
                className={forceVertical
                  ? "absolute left-0 top-3 bottom-3 w-[3px] bg-black rounded-r-[3px]"
                  : "hidden md:block absolute left-0 top-3 bottom-3 w-[3px] bg-black rounded-r-[3px]"
                }
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}

            {/* Step Number Circle */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 transition-colors duration-200 ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-slate-150 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'
              }`}
            >
              {step.id}
            </div>

            {/* Step Texts */}
            <div className="flex flex-col leading-none pt-0.5 whitespace-nowrap">
              <span
                className={`text-[13px] font-bold transition-colors duration-200 ${
                  isActive ? 'text-[#111827] font-extrabold' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {step.title}
              </span>
              <span
                className={`text-[11px] font-semibold mt-1.5 leading-normal transition-colors duration-200 ${
                  isActive ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {step.desc}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
