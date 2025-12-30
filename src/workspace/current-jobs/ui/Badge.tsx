import React from 'react';
import './Badge.css';
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  children: React.ReactNode;
  className?: string;
}
export function Badge({
  variant = 'default',
  children,
  className = ''
}: BadgeProps) {
  return <div className={`badge badge--${variant} ${className}`}>{children}</div>;
}