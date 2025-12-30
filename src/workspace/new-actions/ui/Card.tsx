import React, { forwardRef } from 'react';
import { cn } from '../../../shared/utils/helpers';
/**
 * Card component - used only in new-actions for form container
 */
const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm', className)} {...props} />);
Card.displayName = 'Card';
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />);
CardContent.displayName = 'CardContent';
export { Card, CardContent };