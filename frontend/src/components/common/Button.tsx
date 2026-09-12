import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-lg transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-white text-black hover:bg-zinc-200 shadow',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
    outline: 'bg-transparent text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700',
    danger: 'bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-800',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs space-x-1.5',
    md: 'px-4 py-2 text-xs space-x-2',
    lg: 'px-5 py-2.5 text-sm space-x-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
    </button>
  );
};
