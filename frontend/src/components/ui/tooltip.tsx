import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Provides tooltip context to descendants and applies provider-level configuration.
 *
 * @param delayDuration - Time in milliseconds to wait before showing the tooltip; defaults to 0.
 * @param props - Remaining props forwarded to the underlying Tooltip Provider.
 * @returns The configured TooltipPrimitive.Provider element
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

/**
 * Renders a tooltip root element while ensuring it is wrapped in the tooltip provider context and forwards all received props.
 *
 * @returns The rendered tooltip root element with provider context applied
 */
function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/**
 * Render a tooltip trigger element used to toggle tooltip visibility.
 *
 * @param props - Props to apply to the underlying Radix Tooltip Trigger component.
 * @returns A TooltipPrimitive.Trigger element with `data-slot="tooltip-trigger"` and the provided props applied.
 */
function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Renders tooltip content inside a Portal with default styling and an integrated arrow.
 *
 * Additional `className` values are merged with the component's default styles; all other props are forwarded to the underlying Tooltip content primitive.
 *
 * @param className - Optional additional class names to apply to the content element
 * @param sideOffset - Distance in pixels to offset the content from the trigger (default: 0)
 * @param children - Content to display inside the tooltip
 * @param props - Additional props forwarded to the underlying TooltipPrimitive.Content
 * @returns A `JSX.Element` containing the positioned, styled tooltip content and arrow
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }