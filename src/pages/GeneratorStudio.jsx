import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Grid, Key, History as HistoryIcon, Heart, Settings, 
  Globe, Mail, Smartphone, Wifi, Gamepad2, Briefcase, Bitcoin, Code, PenTool 
} from 'lucide-react';
import PasswordGenerator from '../components/PasswordGenerator';

const categories = [
  { id: 'universal', icon: Globe, title: 'Universal', desc: 'Generate a strong password for anything.' },
  { id: 'email', icon: Mail, title: 'Email / Account', desc: 'Secure your email and other accounts.' },
  { id: 'google', icon: Globe, title: 'Google', desc: 'Strong password for your Google account.' },
  { id: 'social', icon: Globe, title: 'Social Media', desc: 'Secure your social media accounts.' },
  { id: 'banking', icon: Briefcase, title: 'Banking', desc: 'Secure password for your banking needs.' },
  { id: 'pin', icon: Smartphone, title: 'Phone Lock (PIN)', desc: 'Generate a secure PIN for your phone.' },
  { id: 'wifi', icon: Wifi, title: 'Wi-Fi', desc: 'Strong password for your Wi-Fi network.' },
  { id: 'gaming', icon: Gamepad2, title: 'Gaming', desc: 'Secure your gaming accounts.' },
  { id: 'work', icon: Briefcase, title: 'Work / Office', desc: 'Password for your work accounts.' },
  { id: 'crypto', icon: Bitcoin, title: 'Crypto Wallet', desc: 'Secure your crypto wallets.' },
  { id: 'dev', icon: Code, title: 'Developer / API', desc: 'Strong password for APIs and developers.' },
  { id: 'custom', icon: PenTool, title: 'Custom Password', desc: 'Customize your own password.' }
];

export default function GeneratorStudio() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  const menu = [
    { path: '/generator', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/generator/all', icon: Grid, label: 'All Generators' },
    { path: '/generator/universal', icon: Key, label: 'Universal Generator' },
    { path: '/history', icon: HistoryIcon, label: 'Password History' },
    { path: '/history?filter=favorites', icon: Heart, label: 'Favorites' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-1 w-full max-w-[1600px] mx-auto overflow-hidden bg-white/10 rounded-3xl border border-white/20 shadow-2xl my-6 backdrop-blur-xl">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 flex flex-col p-6 space-y-3 bg-black/10">
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Key className="w-6 h-6 text-white" />
            <span className="text-xl font-display font-bold text-white">Studio</span>
          </Link>
        </div>
        {menu.map(item => {
           const active = location.pathname === item.path || (location.pathname === '/generator' && item.path === '/generator/universal' && activeCategory);
           return (
             <Link 
               key={item.label}
               to={item.path}
               onClick={() => {
                 if (item.path === '/generator') setActiveCategory(null);
                 if (item.path === '/generator/universal') setActiveCategory(categories[0]);
               }}
               className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-medium transition-all ${active ? 'bg-brand-100 text-white shadow-lg scale-105' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
             >
               <item.icon className="w-5 h-5" />
               {item.label}
             </Link>
           )
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10 relative scroll-smooth bg-gradient-to-br from-white/5 to-transparent">
        <AnimatePresence mode="wait">
          {activeCategory ? (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
               <button onClick={() => setActiveCategory(null)} className="mb-6 text-white/70 hover:text-white flex items-center gap-2 font-medium">
                 ← Back to Categories
               </button>
               <PasswordGenerator category={activeCategory} />
            </motion.div>
          ) : (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-10">
                <h1 className="text-4xl font-display font-bold text-white mb-2">Choose Password Type</h1>
                <p className="text-white/70 text-lg">Select a category to generate a secure password</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveCategory(cat)}
                    className="white-card p-6 flex flex-col items-center text-center cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-100/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <cat.icon className="w-8 h-8 text-brand-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 flex-1">{cat.desc}</p>
                    <button className="w-full bg-brand-100 text-white py-2.5 rounded-full font-semibold hover:bg-brand-200 transition-colors">
                      Generate →
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}