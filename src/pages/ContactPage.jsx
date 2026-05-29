import { motion } from 'framer-motion';
import { Code2, Briefcase, Camera, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const contacts = [
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/shubham-pokale',
      username: 'shubham-pokale',
      icon: Briefcase,
    },
    {
      name: 'GitHub',
      link: 'https://github.com/shubham392007-sketch',
      username: 'shubham392007-sketch',
      icon: Code2,
    },
    {
      name: 'Instagram',
      link: 'https://instagram.com/shubhamofficial_2007',
      username: 'shubhamofficial_2007',
      icon: Camera,
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-6xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-display font-bold text-white mb-4 drop-shadow-md">
          Contact
        </h1>
        <p className="text-xl text-white/80">
          Feel free to connect with me through any of these platforms.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {contacts.map((contact, i) => (
          <motion.a
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 flex flex-col items-start group hover:bg-brand-200/20 transition-all hover:-translate-y-2 border-white/10 hover:border-brand-100/50"
          >
            <div className="p-4 bg-white/10 rounded-2xl mb-6 group-hover:bg-brand-100 transition-colors">
              <contact.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{contact.name}</h3>
            <p className="text-white/60 text-sm mb-8 break-all font-medium">
              {contact.link}
            </p>
            <div className="mt-auto self-end p-2 bg-white/5 rounded-full group-hover:bg-white group-hover:text-brand-200 text-white transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </motion.a>
        ))}
      </div>
      
      <div className="mt-20 text-white/50 text-sm font-medium">
        © 2026 SecurePass. All rights reserved.
      </div>
    </div>
  );
}