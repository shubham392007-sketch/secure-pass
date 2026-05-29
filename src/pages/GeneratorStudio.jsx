import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Key, History as HistoryIcon, 
  Globe, Mail, Smartphone, Wifi, Gamepad2, Briefcase, Bitcoin, Code, PenTool, Menu, X
} from 'lucide-react';
import PasswordGenerator from '../components/PasswordGenerator';
import { usePassword } from '../context/PasswordContext';

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
  const { history } = usePassword();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menu = [
    { path: '/generator', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/history', icon: HistoryIcon, label: 'Password History' },
  ];

  return (
    <div className="flex flex-1 w-full max-w-[1600px] mx-auto overflow-hidden bg-white/10 sm:rounded-3xl border-y sm:border border-white/20 sm:shadow-2xl sm:my-6 backdrop-blur-xl relative">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-brand-200 text-white rounded-xl shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-40 w-72 border-r border-white/10 flex flex-col p-6 space-y-3 bg-cyber-900/95 lg:bg-black/10 backdrop-blur-xl transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-6 mt-12 lg:mt-0">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Key className="w-6 h-6 text-brand-200" />
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
                 setIsSidebarOpen(false);
                 if (item.path === '/generator') setActiveCategory(null);
               }}
               className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-medium transition-all ${active ? 'bg-gradient-to-r from-brand-100 to-brand-400 text-white shadow-lg' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
             >
               <item.icon className="w-5 h-5" />
               {item.label}
             </Link>
           )
        })}

        {/* Recent Passwords Panel */}
        <div className="mt-auto pt-6 border-t border-white/10 hidden lg:block">
          <h4 className="text-sm font-semibold text-white/50 mb-4 uppercase tracking-wider">Recent</h4>
          <div className="space-y-2">
            {history.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-sm text-white/90">
                <span className="truncate max-w-[120px] font-mono">{item.password}</span>
                <span className="text-xs text-white/40">{item.category}</span>
              </div>
            ))}
            {history.length === 0 && (
              <p className="text-sm text-white/40 text-center py-4">No recent passwords</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 relative scroll-smooth bg-gradient-to-br from-white/5 to-transparent pt-20 lg:pt-10">
        <AnimatePresence mode="wait">
          {activeCategory ? (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
               <button onClick={() => setActiveCategory(null)} className="mb-6 text-white/70 hover:text-white flex items-center gap-2 font-medium bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors w-fit">
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
              <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">Choose Password Type</h1>
                <p className="text-white/70 text-base sm:text-lg">Select a category to generate a tailored secure password</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setActiveCategory(cat)}
                    className="glass-card p-6 cursor-pointer hover:border-brand-200/50 group interactive-element"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-brand-200/20 group-hover:scale-110 transition-all duration-300">
                      <cat.icon className="w-6 h-6 text-brand-100 group-hover:text-brand-200" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-100 transition-colors">{cat.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{cat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}