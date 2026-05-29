import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Zap, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 pt-20 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-sm">
            Generate Strong <br/> Passwords Instantly
          </h1>
          <p className="text-xl text-white/80 font-medium max-w-lg">
            Secure. Reliable. Fast. Your security, our priority.
          </p>
          
          <div className="space-y-4 pt-2">
            {['Strong & Secure', 'Easy to Use', '100% Free', 'No Data Stored'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
                <span className="font-medium text-lg">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link to="/generator" className="inline-flex items-center gap-3 bg-white text-brand-200 px-8 py-4 rounded-full font-bold text-lg shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-1">
              Generate Password <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 relative flex justify-center"
        >
           {/* Glowing Lock Illustration */}
           <div className="relative w-[400px] h-[400px] flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-white/20 rounded-full blur-[60px]" 
              />
              <div className="absolute inset-8 bg-white/30 rounded-full blur-xl border border-white/40"></div>
              <div className="absolute inset-16 bg-white rounded-full flex items-center justify-center shadow-2xl z-10 border-[8px] border-white/50">
                <Lock className="w-40 h-40 text-brand-200" strokeWidth={1.5} />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30 z-20"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
           </div>
        </motion.div>
      </div>

      {/* Feature Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full border-t border-white/20 pt-16">
         {[
           { icon: Lock, title: '100% Secure', desc: 'Your data is never stored or shared.' },
           { icon: Zap, title: 'Easy to Use', desc: 'Generate passwords in one click.' },
           { icon: Shield, title: 'Multiple Options', desc: 'Different types for every need.' },
           { icon: Globe, title: 'Universal', desc: 'One password for anything.' },
         ].map((f, i) => (
           <motion.div 
             key={i}
             whileHover={{ y: -5 }}
             className="flex flex-col items-center text-center p-6 lg:border-r border-white/10 last:border-0"
           >
             <f.icon className="w-10 h-10 mb-5 text-white drop-shadow-md" />
             <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
             <p className="text-white/70 font-medium">{f.desc}</p>
           </motion.div>
         ))}
      </div>
    </div>
  );
}