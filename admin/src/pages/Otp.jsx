import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function Otp() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(59)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    if (timer === 0) return

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  useEffect(() => {
    // Focus the first input field on mount
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, 50)
  }, [])

  const handleOtpChange = (element, index) => {
    const val = element.value
    if (isNaN(val)) return false

    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)

    if (val !== '' && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus()
      } else {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    }
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    const code = otp.join('')
    console.log('Verifying OTP code:', code)
    if (code.length === 6) {
      alert(`OTP code verified: ${code}`)
      navigate('/login')
    }
  }

  const handleResend = () => {
    if (timer === 0) {
      setTimer(59)
      setOtp(['', '', '', '', '', ''])
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus()
        }
      }, 50)
      console.log('Resending OTP code...')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#4B4B4B] flex items-center justify-center p-4">
      {/* Centered Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] bg-white rounded-[32px] md:rounded-[40px] px-6 py-10 md:px-8 md:py-10 shadow-2xl relative flex flex-col items-center border border-gray-100"
      >
        <h2 className="text-[22px] font-bold text-black tracking-tight text-center font-sans">
          Verify Your Identity
        </h2>
        <p className="text-[13px] text-gray-500 text-center mt-2 mb-8 font-sans">
          We've sent a 6-digit code to +1 (555) 000-1234
        </p>

        <form onSubmit={handleVerifyOtp} className="w-full flex flex-col items-center">
          {/* 6-digit OTP Inputs */}
          <div className="flex justify-between w-full gap-2 mb-8">
            {otp.map((val, index) => (
              <motion.input
                key={index}
                type="text"
                maxLength={1}
                value={val}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                whileFocus={{ scale: 1.05 }}
                className="w-11 h-11 sm:w-12 sm:h-12 border border-gray-250 rounded-[12px] text-center text-[18px] font-semibold text-black focus:outline-none focus:border-black focus:ring-0 transition-colors bg-white font-sans"
              />
            ))}
          </div>

          {/* Verify OTP Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.995 }}
            className="w-full h-11 bg-black text-white rounded-full text-[14px] font-semibold hover:bg-zinc-900 transition-colors cursor-pointer mb-6 font-sans"
          >
            Verify OTP
          </motion.button>
        </form>

        {/* Resend Section */}
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[13px] text-gray-500 font-sans">
            Didn't receive the code? 
            <span 
              onClick={handleResend}
              className={`font-semibold text-black ml-1 ${timer === 0 ? 'hover:underline cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
            >
              Resend
            </span>
          </p>
          {timer > 0 ? (
            <p className="text-[11px] text-gray-400 font-sans">
              Resend in 00:{timer.toString().padStart(2, '0')}
            </p>
          ) : (
            <p className="text-[11px] text-emerald-600 font-sans font-medium">
              Ready to resend code
            </p>
          )}
        </div>

        {/* Back to Login Button */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-[13px] font-semibold text-black hover:underline cursor-pointer flex items-center justify-center gap-1.5 self-center font-sans mt-6"
        >
          <FiArrowLeft className="w-4 h-4 stroke-[2.5]" /> Back to Login
        </button>
      </motion.div>
    </div>
  )
}

export default Otp
