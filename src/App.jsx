import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';
import { ToastProvider } from './contexts/ToastContext';
import { UserProvider } from './contexts/UserContext';
import { initSession, isLoggedIn } from './utils/auth';
import { DEV_FALLBACK_TOKEN } from './config';

// Login is small and renders first — keep it eager so the auth screen paints
// without a Suspense flash. Everything else is route-split.
import Login from './pages/Login';

const Home                  = lazy(() => import('./pages/Home'));
const EnquiryToOffer        = lazy(() => import('./pages/EnquiryToOffer'));
const OrderToShipment       = lazy(() => import('./pages/OrderToShipment'));
const AddEnquiry            = lazy(() => import('./pages/AddEnquiry'));
const EditEnquiry           = lazy(() => import('./pages/EditEnquiry'));
const EditOrderToShipment   = lazy(() => import('./pages/EditOrderToShipment'));
const E2ODashboard          = lazy(() => import('./pages/E2ODashboard'));
const O2SDashboard          = lazy(() => import('./pages/O2SDashboard'));

const RouteFallback = () => (
  <div className="flex-1 w-full flex items-center justify-center min-h-[50vh]">
    <div className="flex items-center gap-2 text-primary">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="font-medium text-[14px]">Loading…</span>
    </div>
  </div>
);

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

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/"               element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/e2o"            element={<RequireAuth><EnquiryToOffer /></RequireAuth>} />
          <Route path="/o2s"            element={<RequireAuth><OrderToShipment /></RequireAuth>} />
          <Route path="/e2o/add"        element={<RequireAuth><AddEnquiry /></RequireAuth>} />
          <Route path="/e2o/edit/:id"   element={<RequireAuth><EditEnquiry /></RequireAuth>} />
          <Route path="/o2s/edit/:id"   element={<RequireAuth><EditOrderToShipment /></RequireAuth>} />
          <Route path="/analytics-e2o"  element={<RequireAuth><E2ODashboard /></RequireAuth>} />
          <Route path="/analytics-o2s"  element={<RequireAuth><O2SDashboard /></RequireAuth>} />
        </Routes>
      </Suspense>

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
