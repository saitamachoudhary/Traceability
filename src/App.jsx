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
        <Route path="/" element={<Home />} />
        <Route path="/e2o" element={<EnquiryToOffer />} />
        <Route path="/o2s" element={<OrderToShipment />} />
        <Route path="/e2o/add" element={<AddEnquiry />} />
        <Route path="/e2o/edit/:id" element={<EditEnquiry />} />
        <Route path="/o2s/edit/:id" element={<EditOrderToShipment />} />
        <Route path="/analytics-e2o" element={<E2ODashboard />} />
        <Route path="/analytics-o2s" element={<O2SDashboard />} />
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
