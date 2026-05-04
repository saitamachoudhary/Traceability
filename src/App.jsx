import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EnquiryToOffer from './pages/EnquiryToOffer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-16 bg-[var(--color-background)]">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/e2o" element={<EnquiryToOffer />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
