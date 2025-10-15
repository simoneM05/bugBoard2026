'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Define CardContext
type CardContextType = {
  variant: 'default' | 'accent';
};

const CardContext = React.createContext<CardContextType>({
  variant: 'default', // Default value
});

// Hook to use CardContext
const useCardContext = () => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error('useCardContext must be used within a Card component');
  }
  return context;
};

// Variants
const cardVariants = cva('flex flex-col items-stretch text-card-foreground rounded-xl', {
  variants: {
    variant: {
      default: 'bg-card border border-border shadow-xs black/5',
      accent: 'bg-muted shadow-xs p-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const cardHeaderVariants = cva('flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5', {
  variants: {
    variant: {
      default: 'border-b border-border',
      accent: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const cardContentVariants = cva('grow p-5', {
  variants: {
    variant: {
      default: '',
      accent: 'bg-card rounded-t-xl [&:last-child]:rounded-b-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const cardTableVariants = cva('grid grow', {
  variants: {
    variant: {
      default: '',
      accent: 'bg-card rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const cardFooterVariants = cva('flex items-center px-5 min-h-14', {
  variants: {
    variant: {
      default: 'border-t border-border',
      accent: 'bg-card rounded-b-xl mt-[2px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Renders a themed card container and exposes its visual variant to descendant components.
 *
 * The `variant` controls the card's visual styling and is made available to children via context.
 *
 * @param variant - The visual style to apply; `'default'` applies the standard card styling, `'accent'` applies the alternate muted/accent styling. Defaults to `'default'`.
 */
function Card({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return (
    <CardContext.Provider value={{ variant: variant || 'default' }}>
      <div data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />
    </CardContext.Provider>
  );
}

/**
 * Renders a card header container that applies variant-specific header styles from CardContext.
 *
 * @returns A `div` element with data-slot `"card-header"` and classes composed from the current card variant and the optional `className` prop.
 */
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { variant } = useCardContext();
  return <div data-slot="card-header" className={cn(cardHeaderVariants({ variant }), className)} {...props} />;
}

/**
 * Renders the card content area according to the current Card variant.
 *
 * The element is rendered as a div with `data-slot="card-content"`, merges variant-driven classes with any
 * provided `className`, and forwards remaining div attributes to the element.
 *
 * @returns A div element representing the card content area.
 */
function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { variant } = useCardContext();
  return <div data-slot="card-content" className={cn(cardContentVariants({ variant }), className)} {...props} />;
}

/**
 * Renders the card's table area and applies styling based on the current card variant.
 *
 * @param className - Additional CSS classes to merge with the variant-derived classes
 * @returns A div element that serves as the card's table container with variant-specific styling
 */
function CardTable({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { variant } = useCardContext();
  return <div data-slot="card-table" className={cn(cardTableVariants({ variant }), className)} {...props} />;
}

/**
 * Render a card footer element whose styling adapts to the current card variant.
 *
 * @param className - Additional CSS classes to apply to the footer container
 * @returns A div element serving as the card footer
 */
function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { variant } = useCardContext();
  return <div data-slot="card-footer" className={cn(cardFooterVariants({ variant }), className)} {...props} />;
}

/**
 * Renders a heading container for a Card with vertical spacing between its children.
 *
 * @returns A div element that serves as the card heading container.
 */
function CardHeading({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-heading" className={cn('space-y-1', className)} {...props} />;
}

/**
 * Renders a horizontal toolbar container for a Card, intended to hold action controls.
 *
 * @returns The toolbar container element for a Card.
 */
function CardToolbar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-toolbar" className={cn('flex items-center gap-2.5', className)} {...props} />;
}

/**
 * Renders the card's title element using the component's typography and optional classes.
 *
 * @param className - Additional CSS classes to merge with the title's base typography classes
 * @param props - Additional HTML attributes applied to the underlying `h3` element
 * @returns The rendered `h3` element serving as the card title
 */
function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('text-base font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

/**
 * Renders the card description container with small, muted text styling.
 *
 * @param className - Additional CSS classes appended to the base description styles
 * @returns A div element with data-slot="card-description" and base typography classes
 */
function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

// Exports
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardHeading, CardTable, CardTitle, CardToolbar };