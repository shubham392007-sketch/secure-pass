import { motion } from 'framer-motion';

export const Card = ({ children, variant = 'glass', className = '', hover = true, ...props }) => {
  const baseStyle = "p-6 rounded-[24px]";
  
  const variants = {
    glass: "glass-card",
    white: "white-card",
    dark: "bg-cyber-900 border border-cyber-800 text-white shadow-2xl"
  };

  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? { whileHover: { y: -5 } } : {};

  return (
    <Component
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
};
