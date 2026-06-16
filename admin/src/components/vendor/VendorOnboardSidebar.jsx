import React from 'react'
import { LuStore, LuLandmark } from 'react-icons/lu'
import { FiUser, FiFileText, FiShield, FiCheckCircle, FiCheck } from 'react-icons/fi'

const steps = [
  { id: 1, title: 'Business Info', icon: LuStore },
  { id: 2, title: 'Owner Info', icon: FiUser },
  { id: 3, title: 'Documents', icon: FiFileText },
  { id: 4, title: 'Bank Details', icon: LuLandmark },
  { id: 5, title: 'Verification', icon: FiShield },
  { id: 6, title: 'Approval', icon: FiCheckCircle },
]

export default function VendorOnboardSidebar({ activeStep, onStepChange, isMobile }) {
  return (
    <div className={`${isMobile ? 'w-full h-full' : 'hidden sm:flex w-[256px] h-full'} p-6 bg-[#F8FAFC] border-r-[0.8px] border-[#E2E8F0] shrink-0 relative flex flex-col justify-start select-none`}>
      {/* Connecting Line */}
      <div className="absolute left-[40px] top-[40px] bottom-[40px] w-[1px] bg-[#E2E8F0] z-0"></div>

      <div className="flex flex-col justify-between h-full relative z-10">
        {steps.map((step) => {
          const Icon = step.icon
          const isActive = activeStep === step.id
          const isCompleted = step.id < activeStep
          return (
            <div
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isCompleted
                    ? 'bg-black border-black text-white'
                    : isActive
                    ? 'border-black text-black bg-white'
                    : 'border-[#E2E8F0] text-slate-350 bg-white'
                }`}
              >
                {isCompleted ? <FiCheck className="w-4 h-4 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`text-[13px] font-bold transition-all duration-200 ${
                  isCompleted
                    ? 'text-slate-800'
                    : isActive
                    ? 'text-black'
                    : 'text-slate-450 group-hover:text-slate-700'
                }`}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
