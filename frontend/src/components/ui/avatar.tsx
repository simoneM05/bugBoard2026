import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Renders a styled avatar root element.
 *
 * @param className - Additional CSS classes appended to the default avatar styles
 * @returns The avatar root element with combined base and custom classes
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the avatar image slot for the Avatar component with a square aspect ratio and full sizing.
 *
 * @param className - Additional CSS classes to merge with the default "aspect-square size-full"
 * @returns The configured AvatarPrimitive.Image element used as the avatar image slot
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Fallback slot for the Avatar component shown when the image is missing or fails to load.
 *
 * Applies compact, centered fallback styling and forwards all props to the underlying fallback primitive.
 *
 * @returns A JSX element rendering the avatar fallback with the component's styling and any provided props.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-secondary flex size-full items-center justify-center rounded-[inherit] text-xs",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }