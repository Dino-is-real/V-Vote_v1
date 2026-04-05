import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VoterDashboard from './pages/VoterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import AuditorDashboard from './pages/AuditorDashboard';
import Results from './pages/Results';
import SmoothScroll from './components/layout/SmoothScroll';

const AppContent = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${isLanding ? '' : 'pt-24'}`}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/voter" element={<VoterDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/candidate" element={<CandidateDashboard />} />
          <Route path="/auditor" element={<AuditorDashboard />} />
          <Route path="/results" element={<Results />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <SmoothScroll>
          <AppContent />
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-white text-slate-800 shadow-xl border border-slate-100 rounded-lg',
              duration: 3000,
              style: {
                fontFamily: 'Outfit, Inter, sans-serif'
              }
            }}
          />
        </SmoothScroll>
      </Router>
    </AuthProvider>
  );
}

export default App;
