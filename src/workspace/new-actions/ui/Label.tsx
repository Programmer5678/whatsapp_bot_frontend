import React, { forwardRef, Component } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../shared/utils/helpers';
/**
 * Label component - used only in new-actions forms
 */
const labelVariants = cva('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
const Label = forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>>(({
  className,
  ...props
}, ref) => <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />);
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };