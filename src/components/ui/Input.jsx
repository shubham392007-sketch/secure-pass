export const Input = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-white/80">{label}</label>}
      <input
        className={`w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};
