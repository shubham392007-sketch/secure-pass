import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Generator', path: '/generator' },
    { name: 'Developer', path: '/developer' },
  ];

  return (
    <nav className="relative z-50 w-full px-4 sm:px-8 py-4 sm:py-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          <span className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">SecurePass</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/generator" 
            className="bg-white text-brand-200 px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-500/95 backdrop-blur-xl border-t border-white/10 p-4 flex flex-col gap-4 shadow-2xl md:hidden z-50 rounded-b-2xl"
          >
            {links.map(link => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium p-3 rounded-xl ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                >
                  {link.name}
                </Link>
              )
            })}
            <Link 
              to="/generator" 
              onClick={() => setIsOpen(false)}
              className="bg-white text-brand-200 px-6 py-4 rounded-xl font-bold text-center mt-2"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}