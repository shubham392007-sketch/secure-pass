import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Briefcase, Camera } from 'lucide-react';

export default function DeveloperPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <h1 className="text-5xl font-display font-bold text-white text-center mb-16 drop-shadow-md">
          Meet The Developer
        </h1>

        <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-10 border-brand-100/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200/20 rounded-full blur-3xl"></div>
          
          {/* Profile Image Placeholder */}
          <div className="w-48 h-48 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-brand-500/50 flex items-center justify-center shrink-0 z-10">
            <span className="text-5xl font-bold text-white/50">SP</span>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="text-4xl font-display font-bold text-white mb-2">Shubham Pokale</h2>
            <h3 className="text-xl text-brand-100 font-medium mb-6">Developer & Designer</h3>
            
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
              "Passionate about building secure and useful digital tools that help people in everyday life."
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110">
                <Briefcase className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110">
                <Code2 className="w-6 h-6" />
              </a>
              <a href="#" className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110">
                <Camera className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}