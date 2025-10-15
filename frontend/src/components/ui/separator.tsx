import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Render a styled separator element with predefined layout and defaults.
 *
 * Renders a separator with utility classes that adapt based on `orientation` and merges any extra
 * `className` values. Adds `data-slot="separator"` and forwards all other props to the underlying element.
 *
 * @param className - Additional class names to merge with the component's default styles
 * @param orientation - Layout direction, either `"horizontal"` or `"vertical"`; defaults to `"horizontal"`
 * @param decorative - Whether the separator is purely decorative; defaults to `true`
 * @returns The separator element to be rendered in the React tree
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }