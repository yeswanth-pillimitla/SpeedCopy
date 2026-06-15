import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function Forgot() {
  useEffect(() => {
    document.title = 'Forgot Password -SpeedCopy'
  }, [])

  const [forgotIdentifier, setForgotIdentifier] = useState('')
  const navigate = useNavigate()

  const handleSendForgotOtp = (e) => {
    e.preventDefault()
    console.log('Sending forgot password OTP for:', forgotIdentifier)
    if (forgotIdentifier.trim() !== '') {
      alert(`OTP sent to: ${forgotIdentifier}`)
      navigate('/otp')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#4B4B4B] flex items-center justify-center p-4">
      {/* Centered Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] bg-white rounded-[32px] md:rounded-[40px] px-6 py-10 md:px-8 md:py-10 shadow-2xl relative flex flex-col border border-gray-100"
      >
        <h2 className="text-[22px] font-bold text-black tracking-tight text-center font-sans">
          Forgot Password?
        </h2>
        <p className="text-[13px] text-gray-500 text-center mt-2 mb-8 leading-relaxed font-sans">
          Enter your email or mobile number to reset your password.
        </p>

        <form onSubmit={handleSendForgotOtp}>
          {/* Identifier Input */}
          <div className="mb-6 w-full">
            <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
              Email or Mobile Number
            </label>
            <input
              type="text"
              required
              value={forgotIdentifier}
              onChange={(e) => setForgotIdentifier(e.target.value)}
              placeholder="name@company.com"
              className="w-full h-11 px-4 text-[14px] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-full focus:outline-none focus:ring-1.5 focus:ring-black focus:border-transparent transition-all bg-white font-sans"
            />
          </div>

          {/* Send OTP Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.995 }}
            className="w-full h-11 bg-black text-white rounded-full text-[14px] font-semibold hover:bg-zinc-900 transition-colors cursor-pointer mb-6 flex items-center justify-center gap-2 font-sans"
          >
            Send OTP <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </form>

        {/* Back to Login Button */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-[13px] font-semibold text-black hover:underline cursor-pointer flex items-center justify-center gap-1.5 self-center font-sans"
        >
          <FiArrowLeft className="w-4 h-4 stroke-[2.5]" /> Back to Login
        </button>
      </motion.div>
    </div>
  )
}

export default Forgot
