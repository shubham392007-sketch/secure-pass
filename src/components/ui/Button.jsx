import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 interactive-element";
  
  const variants = {
    primary: "bg-white text-brand-200 hover:bg-gray-50 shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-white hover:bg-white/10",
    outline: "border-2 border-white text-white hover:bg-white/10"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
