import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnquiryToOffer from './pages/EnquiryToOffer';
import AddEnquiry from './pages/AddEnquiry';
import EditEnquiry from './pages/EditEnquiry';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
      <div className="min-h-screen flex flex-col pt-16 bg-[var(--color-background)]">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/e2o" element={<EnquiryToOffer />} />
          <Route path="/e2o/add" element={<AddEnquiry />} />
          <Route path="/e2o/edit/:id" element={<EditEnquiry />} />
        </Routes>

        <Footer />
      </div>
    </Router>
    </ToastProvider>
  );
}

export default App;
