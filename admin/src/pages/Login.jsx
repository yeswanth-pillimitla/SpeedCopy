import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Login() {
  useEffect(() => {
    document.title = 'Sign In -SpeedCopy'
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', { email, password, rememberMe })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-0 sm:p-4 md:p-8 lg:p-12">
      {/* Main Container - 1280px x 1024px on desktop */}
      <div className="w-full max-w-[1280px] h-auto md:h-[1024px] bg-white flex flex-col md:flex-row md:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.06)] md:rounded-[40px] overflow-hidden border border-gray-100">

        {/* LEFT SIDE DIV */}
        <div className="w-full md:w-1/2 h-auto md:h-full bg-[#F8FAFC] flex flex-col items-center justify-center py-12 md:py-16 relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-100">

          {/* LEFT IMAGE CARD DIV */}
          <motion.div
            className="w-full max-w-[544px] aspect-square px-6 md:px-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-white rounded-[40px] md:rounded-[48px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] border border-gray-100/50 overflow-hidden flex items-center justify-center">
              <img
                src="loginImage.jpg"
                className="w-full h-full object-cover scale-[1.1] select-none"
                alt="loginPageImage"
              />
            </div>
          </motion.div>

          {/* LEFT BOTTOM TEXT DIV */}
          <motion.div
            className="w-full max-w-[408px] mt-8 flex flex-col items-center text-center z-10 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-[20px] font-bold text-[#111827] tracking-tight mb-2 font-sans">
              Streamlined Operations
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed font-sans font-normal">
              Manage inventory, process orders, and orchestrate deliveries from a single, unified enterprise dashboard.
            </p>
          </motion.div>
        </div>


        {/* RIGHT SIDE DIV */}
        <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-between items-center bg-white py-12 md:py-8 px-6 md:px-[48px] relative">

          {/* Vertically centers card on desktop */}
          <div className="hidden md:block flex-1"></div>

          {/* LOGIN CARD DIV */}
          <motion.div
            className="w-full max-w-[544px] h-fit px-6 py-10 md:px-[52px] md:py-[44px] border border-gray-200/80 rounded-[32px] md:rounded-[40px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.01)]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col">

              {/* LOGIN HEADER */}
              <div className="flex flex-col items-center text-center">
                {/* Logo Section */}
                <div className="flex items-center justify-center gap-1.5 mb-5">
                  <span className="text-[26px] font-black text-black tracking-[-0.05em] font-sans">
                    speedcopy
                  </span>
                  <img src="logo.jpg" alt="logoImage" className="w-[26px] h-[26px] object-contain" />
                </div>

                <h1 className="text-[24px] font-bold text-gray-900 tracking-tight mb-1">
                  Sign in to Speedcopy Hub
                </h1>
                <p className="text-[14px] text-gray-500 font-normal">
                  Manage your operations with precision.
                </p>
              </div>

              {/* INPUT FIELDS */}
              <motion.div
                className="space-y-4 mt-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Email Field */}
                <div>
                  <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                    Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-11 px-4 text-[14px] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-full focus:outline-none focus:ring-1.5 focus:ring-black focus:border-transparent transition-all bg-white"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 px-4 text-[14px] text-gray-900 placeholder-gray-400 border border-gray-200 rounded-full focus:outline-none focus:ring-1.5 focus:ring-black focus:border-transparent transition-all bg-white"
                  />
                </div>
              </motion.div>

              {/* REMEMBER SECTION */}
              <div className="flex items-center justify-between text-[13px] mt-4 mb-6">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2 text-gray-500 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${rememberMe ? 'border-black bg-black' : 'border-gray-300 bg-white'}`}>
                    {rememberMe && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  Remember me
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/forgot')}
                  className="font-semibold text-black hover:underline transition-all cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.995 }}
                  className="w-full h-11 bg-black text-white rounded-full text-[14px] font-semibold hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  Login
                </motion.button>
              </div>

              {/* DIVIDER SECTION */}
              <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-[13px] text-gray-400 font-normal">Or continue with</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* OTP BUTTON */}
              <div>
                <motion.button
                  type="button"
                  onClick={() => navigate('/otp')}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.995 }}
                  className="w-full h-11 bg-white border border-gray-200 text-black rounded-full text-[14px] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Sign In with OTP
                </motion.button>
              </div>

            </form>
          </motion.div>

          {/* Vertically centers card on desktop */}
          <div className="hidden md:block flex-1"></div>

          {/* BOTTOM FOOTER DIV */}
          <div className="w-full max-w-[544px] h-auto md:h-[76px] pt-8 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-6 text-[12px] text-gray-400 font-medium">
              <a href="#privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            </div>
            <p className="text-[12px] text-gray-400 mt-2">
              &copy; 2026 Speedcopy. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login
