import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Zap, CheckCircle2, ArrowRight, Star, Key, ShieldCheck, ChevronDown } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const stats = [
  { label: 'Passwords Generated', value: '1M+' },
  { label: 'Active Users', value: '50K+' },
  { label: 'Data Breaches Prevented', value: '100K+' },
  { label: 'Uptime', value: '99.9%' }
];

const testimonials = [
  { name: 'Alex Johnson', role: 'Security Analyst', text: 'SecurePass is my go-to tool for generating robust, uncrackable passwords. The offline capability is a huge plus.' },
  { name: 'Sarah Lee', role: 'Software Engineer', text: 'The beautiful UI combined with powerful customization makes this the best password generator I have ever used.' },
  { name: 'Michael Chen', role: 'IT Administrator', text: 'I recommend SecurePass to all my clients. The entropy calculator helps them understand password strength intuitively.' }
];

const faqs = [
  { q: 'Is my data stored anywhere?', a: 'No, SecurePass is a 100% client-side application. No passwords or data are ever sent to a server.' },
  { q: 'Can I use SecurePass offline?', a: 'Yes! SecurePass works completely offline and can be installed as a PWA on your device.' },
  { q: 'What makes a password strong?', a: 'A strong password is long (16+ characters), contains a mix of uppercase, lowercase, numbers, and symbols, and is not a dictionary word.' },
  { q: 'Are passphrases better than random passwords?', a: 'Passphrases are often easier to remember while maintaining high entropy, making them excellent for master passwords.' }
];

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card variant="glass" hover={false} className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">{q}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 text-white/80">
          <p>{a}</p>
        </motion.div>
      )}
    </Card>
  );
};

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 overflow-hidden">
      
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16 mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-sm">
            Generate Strong <br className="hidden sm:block"/> Passwords Instantly
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-medium max-w-lg">
            Secure. Reliable. Fast. Your digital security, elevated.
          </p>
          
          <div className="space-y-4 pt-2">
            {['Client-Side Generation', 'Offline Support', 'Zero Data Collection', 'Advanced Customization'].map((feature, i) => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className="flex items-center gap-3 text-white/90">
                <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
                <span className="font-medium text-lg">{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-6">
            <Link to="/generator">
              <Button variant="primary" className="text-lg px-8 py-4">
                Launch Workspace <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 relative flex justify-center w-full max-w-md lg:max-w-full"
        >
           {/* Glowing Lock Illustration */}
           <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-white/20 rounded-full blur-[60px]" 
              />
              <div className="absolute inset-8 bg-white/30 rounded-full blur-xl border border-white/40"></div>
              <div className="absolute inset-16 bg-white rounded-full flex items-center justify-center shadow-2xl z-10 border-[8px] border-white/50">
                <Lock className="w-32 h-32 sm:w-40 sm:h-40 text-brand-200" strokeWidth={1.5} />
              </div>
              
              <motion.div 
                animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-10 right-10 sm:right-0 bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30 z-20"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute bottom-10 left-10 sm:left-0 bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30 z-20"
              >
                <Key className="w-8 h-8 text-white" />
              </motion.div>
           </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
        {stats.map((stat, idx) => (
          <Card key={idx} variant="glass" className="text-center py-8">
            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
            <p className="text-white/70 font-medium">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Why SecurePass */}
      <div className="w-full mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose SecurePass?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Built with modern web technologies, providing unmatched security without compromising user experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Lock, title: 'Military-grade Security', desc: 'Utilizes Web Crypto API for true randomness, avoiding predictable math functions.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Optimized React application with zero server latency. Works instantly on any device.' },
            { icon: ShieldCheck, title: 'Privacy First', desc: 'No tracking, no analytics, no databases. Your passwords never leave your browser.' },
          ].map((f, i) => (
            <Card key={i} variant="glass" className="flex flex-col items-start p-8">
              <div className="bg-white/20 p-4 rounded-2xl mb-6">
                <f.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-white/70 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full mb-32">
        <h2 className="text-4xl font-bold mb-12 text-center">Trusted by Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} variant="glass" className="p-8 relative">
              <Star className="absolute top-8 right-8 w-6 h-6 text-yellow-400 fill-current opacity-50" />
              <p className="text-lg italic mb-6 text-white/90">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-white/60 text-sm">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="w-full max-w-3xl mx-auto mb-32">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full text-center py-16 px-4 bg-white/10 rounded-[32px] border border-white/20 backdrop-blur-md mb-12">
        <h2 className="text-4xl font-bold mb-6">Ready to secure your digital life?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Stop using weak passwords. Start generating cryptographically secure credentials today.</p>
        <Link to="/generator">
          <Button variant="primary" className="text-lg px-10 py-5">
            Start Generating Now
          </Button>
        </Link>
      </div>

    </div>
  );
}
