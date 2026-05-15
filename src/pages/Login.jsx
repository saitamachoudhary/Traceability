import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { initSession } from '../utils/auth';
import { useToast } from '../contexts/ToastContext';
import { loginUser } from '../utils/apiClient';

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        const response = await fetch("https://apphub.andritz.com/appsapi/appbuilder/app/init/af853ae1-c513-11f0-8899-af2975f8a698", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${BEARER_TOKEN}`
          }
        });
        const data = await response.json();
        console.log("App init:", data);
      } catch (error) {
        console.error("App init failed:", error);
      }
    };

    initApp();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoggingIn(true);
    try {
      const response = await loginUser(email, password);

      if (response?.status?.value?.toLowerCase() === "success" && response?.data?.data?.token) {
        initSession(response.data.data.token);
        showToast({
          type: 'success',
          message: 'Login Successful'
        });
        navigate('/');
      } else {
        const errorMsg = response?.data?.data?.exception || "Login Failed";
        showToast({
          type: 'error',
          message: errorMsg
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast({
        type: 'error',
        message: 'An error occurred during login'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 relative">
        <div className="w-full max-w-[400px] flex flex-col items-center text-center">

          {/* Logo */}
          <div className="mb-12 flex items-center justify-center w-full">
            <img src="/andritzlogo.png" alt="Andritz Logo" className="h-10 object-contain" />
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-3">Welcome Back</h1>
          <p className="text-[14px] text-text-secondary mb-10">
            Enter your email and password to access your account.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-primary ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sellostore@company.com"
                className="w-full px-4 py-3 rounded-lg border border-border-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[13px] font-bold text-text-primary ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="5ellostore."
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-border-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white py-3.5 rounded-lg font-bold text-[15px] mt-4 transition-colors cursor-pointer shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoggingIn && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoggingIn ? 'Logging In...' : 'Log In'}
            </button>
          </form>

        </div>
      </div>

      {/* Right Column: Illustration */}
      <div className="w-full md:w-1/2 bg-[#0A3D75] flex flex-col justify-center items-center p-8 md:p-16 lg:p-24 relative overflow-hidden hidden md:flex">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D75] to-[#1e538c]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 w-full max-w-[500px] flex flex-col">
          <h2 className="text-white text-3xl lg:text-[40px] font-bold leading-[1.2] mb-5">
            Effortlessly manage your team and operations.
          </h2>
          <p className="text-white/80 text-[16px] mb-12 font-medium">
            Log in to access your CRM dashboard and manage your team.
          </p>

          <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-white p-1">
            <img
              src="/chart-illustration.jpg"
              alt="Dashboard Illustration"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
