
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "vibrant-gradient text-white hover:brightness-125 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)]",
    secondary: "bg-white text-slate-900 hover:bg-slate-100",
    outline: "border-2 border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500/10",
    gold: "bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 text-slate-950 hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.4)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          PROCESANDO...
        </>
      ) : children}
    </button>
  );
};
