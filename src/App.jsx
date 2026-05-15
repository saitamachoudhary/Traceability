import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnquiryToOffer from './pages/EnquiryToOffer';
import OrderToShipment from './pages/OrderToShipment';
import AddEnquiry from './pages/AddEnquiry';
import EditEnquiry from './pages/EditEnquiry';
import EditOrderToShipment from './pages/EditOrderToShipment';
import Login from './pages/Login';
import { ToastProvider } from './contexts/ToastContext';
import { UserProvider } from './contexts/UserContext';

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

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
      </Routes>

      {!isLoginPage && <Footer />}
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
