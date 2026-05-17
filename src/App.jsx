import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnquiryToOffer from './pages/EnquiryToOffer';
import OrderToShipment from './pages/OrderToShipment';
import AddEnquiry from './pages/AddEnquiry';
import EditEnquiry from './pages/EditEnquiry';
import EditOrderToShipment from './pages/EditOrderToShipment';
import Login from './pages/Login';
import E2ODashboard from './pages/E2ODashboard';
import O2SDashboard from './pages/O2SDashboard';
import RequireAuth from './components/RequireAuth';
import { ToastProvider } from './contexts/ToastContext';
import { UserProvider } from './contexts/UserContext';
import { initSession, isLoggedIn } from './utils/auth';
import { DEV_FALLBACK_TOKEN } from './config';

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isFullscreenPage = ['/analytics-e2o', '/analytics-o2s'].includes(location.pathname);

  // ── DEV ONLY: seed session from config.js fallback token on startup ────
  // In production this never runs — real login calls initSession() instead.
  useEffect(() => {
    if (import.meta.env.DEV && !isLoggedIn()) {
      initSession(DEV_FALLBACK_TOKEN);
    }
  }, []);
  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className={isLoginPage ? "min-h-screen bg-white" : "min-h-screen flex flex-col pt-16 bg-[var(--color-background)]"}>
      {!isLoginPage && <Navbar />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/e2o" element={<RequireAuth><EnquiryToOffer /></RequireAuth>} />
        <Route path="/o2s" element={<RequireAuth><OrderToShipment /></RequireAuth>} />
        <Route path="/e2o/add" element={<RequireAuth><AddEnquiry /></RequireAuth>} />
        <Route path="/e2o/edit/:id" element={<RequireAuth><EditEnquiry /></RequireAuth>} />
        <Route path="/o2s/edit/:id" element={<RequireAuth><EditOrderToShipment /></RequireAuth>} />
        <Route path="/analytics-e2o" element={<RequireAuth><E2ODashboard /></RequireAuth>} />
        <Route path="/analytics-o2s" element={<RequireAuth><O2SDashboard /></RequireAuth>} />
      </Routes>

      {!isLoginPage && !isFullscreenPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <Router>
          <AppLayout />
        </Router>
      </UserProvider>
    </ToastProvider>
  );
}

export default App;
