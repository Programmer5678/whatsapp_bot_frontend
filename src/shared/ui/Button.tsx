import React from 'react';
import './Button.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}
export function Button({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `button button--${variant} button--${size} ${className}`.trim();
  return <button className={classes} {...props}>
      {children}
    </button>;
}