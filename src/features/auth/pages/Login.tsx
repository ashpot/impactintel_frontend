import { useState } from "react";
import loginLogo from '@/assets/brand/brandLogo_login.png'
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </>
    )}
  </svg>
);


const LoginPage = ()=>{
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = ()=>{
    navigate('/dashboard')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 font-lato bg-bg-main"
    >
      <div
        className="w-full max-w-5xl rounded-3xl overflow-hidden flex"
        style={{ minHeight: "600px" }}
      >
        {/* ── LEFT PANEL ── */}

        <Slider/>
        
        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-col justify-between w-full md:w-1/2 px-12 py-10">
          {/* Logo */}
          <div className="flex justify-end mb-3">
            <img 
              src={loginLogo} 
              alt="brand logo" 
              className="w-57.5"
            />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6 flex-1 justify-center">
            <div>
              <h1
                className="text-3xl font-bold text-text-title mb-1 tracking-wide"
              >
                Client Login
              </h1>
              <p className="text-text-body text-lg">
                Access your organization's workspace.
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-text-title text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-placeholder outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                style={{
                  boxShadow: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#F5B800";
                  e.target.style.boxShadow = "0 0 0 3px rgba(245,184,0,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-800 text-sm font-semibold" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 bg-gray-50 focus:bg-white pr-12"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#F5B800";
                    e.target.style.boxShadow = "0 0 0 3px rgba(245,184,0,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-0.5">
                Your access level (Admin, Officer, Auditor) is automatically detected.
              </p>
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
            //   disabled={isLoading}
              className="bg-brand-primary w-full py-3.5 rounded-full font-bold text-gray-900 text-base transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                boxShadow: "0 4px 20px rgba(245,184,0,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#e0a900";
                (e.target as HTMLButtonElement).style.boxShadow = "0 6px 25px rgba(245,184,0,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#F5B800";
                (e.target as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(245,184,0,0.3)";
              }}
            >
              {false ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                "Log In"
              )}
            </button>

            {/* Forgot password */}
            <p className="text-center text-sm text-gray-500 font-semibold">
              Forgot Password?{" "}
              <a
                href="#"
                className="font-semibold transition-colors text-brand-primary"
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#e0a900")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#F5B800")}
              >
                Reset
              </a>
            </p>
          </div>

                <hr className="w-full border-border-secondary my-5"/>
          {/* Footer */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              {/* <LockIcon /> */}
              <span>Secure, role-based access.</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-600 transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage