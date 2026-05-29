import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Generator', path: '/generator' },
    { name: 'Developers', path: '/developer' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="relative z-50 w-full px-8 py-6 flex items-center justify-between max-w-[1600px] mx-auto">
      <Link to="/" className="flex items-center gap-2 group">
        <Shield className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        <span className="text-2xl font-display font-bold text-white tracking-tight">SecurePass</span>
      </Link>
      
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

      <Link 
        to="/generator" 
        className="bg-white text-brand-200 px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm"
      >
        Get Started
      </Link>
    </nav>
  );
}