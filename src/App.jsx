import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GeneratorStudio from './pages/GeneratorStudio';
import HistoryPage from './pages/HistoryPage';
import DeveloperPage from './pages/DeveloperPage';
import ContactPage from './pages/ContactPage';
import { PasswordProvider } from './context/PasswordContext';

export default function App() {
  return (
    <PasswordProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-1 flex flex-col relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/generator/*" element={<GeneratorStudio />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/developer" element={<DeveloperPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          {/* Global Background Elements */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-100/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-400/40 rounded-full blur-[100px]" />
          </div>
        </div>
      </BrowserRouter>
    </PasswordProvider>
  );
}