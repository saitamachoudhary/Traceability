import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { initSession } from '../utils/auth';
import { useToast } from '../contexts/ToastContext';
import { useUser } from '../contexts/UserContext';
import { loginUser, initApp} from '../utils/apiClient';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { refreshUser } = useUser();
  const redirectTo = location.state?.from || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
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
        await refreshUser();
        showToast({
          type: 'success',
          message: 'Login Successful'
        });
        navigate(redirectTo, { replace: true });
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
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Column: Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 relative">
        <div className="w-full max-w-[380px] flex flex-col items-center text-center">

          {/* Logo */}
          <div className="mb-6 flex items-center justify-center w-full">
            <img src="/andritzlogo.png" alt="Andritz Logo" className="h-9 object-contain" />
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome Back</h1>
          <p className="text-[13px] text-text-secondary mb-6">
            Enter your email and password to access your account.
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-3.5 text-left">
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-bold text-text-primary ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sellostore@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label className="text-[13px] font-bold text-text-primary ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="5ellostore."
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-border-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[14px] transition-colors"
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
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white py-3 rounded-lg font-bold text-[15px] mt-2 transition-colors cursor-pointer shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoggingIn && <Loader2 className="w-5 h-5 animate-spin" />}
              {isLoggingIn ? 'Logging In...' : 'Log In'}
            </button>
          </form>

        </div>
      </div>

      {/* Right Column: Illustration */}
      <div className="w-full md:w-1/2 bg-[#0A3D75] flex-col justify-center items-center p-6 md:p-10 lg:p-12 relative overflow-hidden hidden md:flex">
        {/* Subtle background patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D75] to-[#1e538c]"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"></div>

        <div className="relative z-10 w-full max-w-[480px] flex flex-col min-h-0">
          <h2 className="text-white text-2xl lg:text-[30px] font-bold leading-[1.2] mb-3">
            Effortlessly manage your team and operations.
          </h2>
          <p className="text-white/80 text-[14px] mb-5 font-medium">
            Log in to access your CRM dashboard and manage your team.
          </p>

          <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-white p-1 min-h-0">
            <img
              src="/chart-illustration.jpg"
              alt="Dashboard Illustration"
              className="w-full h-auto max-h-[42vh] object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
