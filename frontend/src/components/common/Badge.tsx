import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'monochrome';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm'
}) => {
  const variantStyles = {
    default: 'bg-zinc-900 text-zinc-300 border border-zinc-800',
    success: 'bg-emerald-950/80 text-emerald-300 border border-emerald-800',
    warning: 'bg-amber-950/80 text-amber-300 border border-amber-800',
    danger: 'bg-rose-950/80 text-rose-300 border border-rose-800',
    info: 'bg-zinc-800 text-white border border-zinc-700',
    monochrome: 'bg-white text-black font-extrabold',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`inline-flex items-center font-bold tracking-wide rounded-md ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};
