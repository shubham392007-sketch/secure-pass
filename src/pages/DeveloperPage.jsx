import { ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';

export default function DeveloperPage() {
  const socialLinks = [
    { name: 'LinkedIn', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, url: 'https://www.linkedin.com/in/shubham-pokale-94030b37a', color: 'hover:bg-blue-600' },
    { name: 'GitHub', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, url: 'https://github.com/shubham392007-sketch', color: 'hover:bg-gray-800' },
    { name: 'Instagram', icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, url: 'https://www.instagram.com/shubhamofficial_2007/', color: 'hover:bg-pink-600' }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <Card variant="glass" className="p-8 sm:p-12 relative overflow-hidden" hover={false}>
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-brand-200/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-brand-400/20 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Profile Image Ring Animation */}
            <div className="relative mb-8 group">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full border-2 border-dashed border-brand-200/50 group-hover:border-brand-200 transition-colors"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-dotted border-white/20 group-hover:border-white/40 transition-colors"
              />
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-brand-100 to-brand-400 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
                <Code2 className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Developer Info */}
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-2 tracking-tight">Shubham Pokale</h1>
            <p className="text-xl sm:text-2xl text-brand-200 font-medium mb-6">Developer & Designer</p>
            
            <p className="text-white/70 max-w-lg mb-10 text-lg">
              Passionate about building secure, beautiful, and highly functional web applications. 
              Creator of SecurePass, combining cybersecurity best practices with premium user experience.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium transition-colors ${link.color} shadow-lg`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                  <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
                </motion.a>
              ))}
            </div>
            
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
