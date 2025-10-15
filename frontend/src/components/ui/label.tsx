'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Label as LabelPrimitive } from 'radix-ui';

const labelVariants = cva(
  'text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'font-medium',
        secondary: 'font-normal',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

/**
 * Renders a styled Radix UI Label.Root with configurable visual variants.
 *
 * @param className - Additional CSS classes to merge with the computed variant classes
 * @param variant - Visual variant to apply; `"primary"` applies `font-medium`, `"secondary"` applies `font-normal`. Defaults to `"primary"`.
 * @returns A Radix `Label.Root` element with merged classes and `data-slot="label"`.
 */
function Label({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>) {
  return <LabelPrimitive.Root data-slot="label" className={cn(labelVariants({ variant }), className)} {...props} />;
}

export { Label };