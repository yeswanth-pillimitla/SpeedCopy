import { motion } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'

const quickActionsList = [
  { text: 'Create Offer', style: 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5', hasPlus: true },
  { text: 'Add product', style: 'border-slate-300 text-slate-700 hover:bg-slate-50', hasPlus: true },
  { text: 'Audit Logs', style: 'border-[#D97706] text-[#D97706] hover:bg-[#D97706]/5', hasPlus: false },
  { text: 'Add Staff', style: 'border-black text-black hover:bg-black/5', hasPlus: true },
  { text: 'Add Vendor', style: 'border-[#C084FC] text-[#A855F7] hover:bg-[#C084FC]/5', hasPlus: true },
  { text: 'Send notification', style: 'border-[#10B981] text-[#10B981] hover:bg-[#10B981]/5', hasPlus: false },
]

function QuickActions() {
  return (
    <div className="mt-0">
      <h3 className="text-[15px] font-bold tracking-wider  mb-2">Quick Actions</h3>
      <div className="flex flex-wrap gap-2.5 py-1">
        {quickActionsList.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              h-[36px] px-3.5 rounded-full border text-[13px] font-semibold flex items-center gap-1.5 transition-all shadow-sm bg-white cursor-pointer
              ${action.style}
            `}
          >
            {action.hasPlus && <FiPlus className="w-4 h-4 stroke-[2.5]" />}
            {action.text}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
