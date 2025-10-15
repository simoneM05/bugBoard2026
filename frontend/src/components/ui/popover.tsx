import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Renders a Radix Popover root element with the `data-slot="popover"` attribute.
 *
 * @returns The Popover root element with all given props forwarded to `PopoverPrimitive.Root`
 */
function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/**
 * Renders a popover trigger element with a `data-slot="popover-trigger"` attribute and forwards all received props.
 *
 * @param props - Props forwarded to the underlying popover trigger element
 * @returns The trigger element with forwarded props
 */
function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

/**
 * Render styled popover content inside a Portal with configurable alignment, offset, and an optional arrow.
 *
 * The component mounts the popover content into a Portal, applies default styling and animations, and forwards any
 * additional props to the underlying content element.
 *
 * @param className - Additional CSS classes to apply to the content container
 * @param align - Alignment of the content relative to the trigger; defaults to `"center"`
 * @param sideOffset - Offset in pixels between the trigger and the content; defaults to `4`
 * @param showArrow - Whether to render an arrow pointing to the trigger; defaults to `false`
 * @returns The rendered Popover content element
 */
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  showArrow = false,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  showArrow?: boolean
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      >
        {props.children}
        {showArrow && (
          <PopoverPrimitive.Arrow className="fill-popover -my-px drop-shadow-[0_1px_0_var(--border)]" />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

/**
 * Wraps the Radix Popover Anchor and applies a `data-slot="popover-anchor"` attribute.
 *
 * @returns The `PopoverPrimitive.Anchor` element with all provided props forwarded.
 */
function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }