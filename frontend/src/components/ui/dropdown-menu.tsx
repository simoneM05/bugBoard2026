"use client"

import * as React from "react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type PointerDownEvent = Parameters<
  NonNullable<DropdownMenuPrimitive.DropdownMenuContentProps["onPointerDown"]>
>[0]
type PointerDownOutsideEvent = Parameters<
  NonNullable<
    DropdownMenuPrimitive.DropdownMenuContentProps["onPointerDownOutside"]
  >
>[0]

/**
 * Renders a Radix DropdownMenu root element with a standardized `data-slot`.
 *
 * Renders the underlying Radix `DropdownMenu.Root`, forwarding all received props
 * and adding `data-slot="dropdown-menu"` for consistent styling and queryability.
 *
 * @returns The rendered DropdownMenu root element
 */
function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

/**
 * Renders a Radix DropdownMenu Portal with a data-slot attribute for styling and targeting.
 *
 * Forwards all received props to the underlying Radix Portal.
 *
 * @returns The Portal element with data-slot="dropdown-menu-portal"
 */
function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

/**
 * Render a dropdown menu trigger element that forwards all props and sets a `data-slot="dropdown-menu-trigger"` attribute.
 *
 * @param props - Props forwarded to the underlying trigger element
 * @returns The trigger React element with forwarded props and the `data-slot` attribute
 */
function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

/**
 * Renders dropdown menu content inside a Portal with consistent styling and mouse-close focus handling.
 *
 * If closed via a mouse pointer event, the component prevents the automatic focus change that would normally occur
 * on close unless a custom `onCloseAutoFocus` handler is provided.
 *
 * @param sideOffset - Distance in pixels between the trigger and the content (default: 4).
 * @param onPointerDown - Optional handler invoked on pointer down inside the content; used here to mark mouse-origin closes.
 * @param onPointerDownOutside - Optional handler invoked on pointer down outside the content; used here to mark mouse-origin closes.
 * @param onCloseAutoFocus - Optional handler invoked when the menu would auto-focus an element on close; if omitted, mouse-initiated closes will prevent the default auto-focus behavior.
 * @returns The DropdownMenu content element rendered within a Portal.
 */
function DropdownMenuContent({
  className,
  sideOffset = 4,
  onPointerDown,
  onPointerDownOutside,
  onCloseAutoFocus,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  const isCloseFromMouse = React.useRef<boolean>(false)

  const handlePointerDown = React.useCallback(
    (e: PointerDownEvent) => {
      isCloseFromMouse.current = true
      onPointerDown?.(e)
    },
    [onPointerDown]
  )

  const handlePointerDownOutside = React.useCallback(
    (e: PointerDownOutsideEvent) => {
      isCloseFromMouse.current = true
      onPointerDownOutside?.(e)
    },
    [onPointerDownOutside]
  )

  const handleCloseAutoFocus = React.useCallback(
    (e: Event) => {
      if (onCloseAutoFocus) {
        return onCloseAutoFocus(e)
      }

      if (!isCloseFromMouse.current) {
        return
      }

      e.preventDefault()
      isCloseFromMouse.current = false
    },
    [onCloseAutoFocus]
  )

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-40 overflow-hidden rounded-md border p-1 shadow-lg",
          className
        )}
        onPointerDown={handlePointerDown}
        onPointerDownOutside={handlePointerDownOutside}
        onCloseAutoFocus={handleCloseAutoFocus}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

/**
 * Wraps the Radix DropdownMenu Group, forwarding all props and adding a `data-slot="dropdown-menu-group"` attribute for styling and selection.
 *
 * @returns A DropdownMenu group element with the provided props and the `data-slot="dropdown-menu-group"` attribute.
 */
function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

/**
 * A styled dropdown menu item component that wraps Radix's Item and applies consistent classes and data attributes.
 *
 * The component forwards remaining props to the underlying Radix Item, sets `data-slot="dropdown-menu-item"`,
 * and exposes `data-inset` and `data-variant` for styling and state hooks.
 *
 * @param inset - When true, adds left inset padding and sets `data-inset` to enable inset styling
 * @param variant - Visual variant for the item; `"default"` applies normal styling and `"destructive"` applies destructive styling and attributes
 * @returns A React element representing the styled dropdown menu item with appropriate data attributes and classes
 */
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled dropdown menu checkbox item with a positioned check indicator.
 *
 * @param checked - Whether the checkbox item is checked.
 * @returns A React element representing a dropdown menu checkbox item with an embedded check icon and the provided children.
 */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon size={16} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

/**
 * Wraps the Radix RadioGroup primitive and adds a consistent `data-slot` attribute.
 *
 * @returns A RadioGroup element that forwards all props to the underlying Radix primitive and includes `data-slot="dropdown-menu-radio-group"`.
 */
function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

/**
 * Renders a dropdown menu radio item with consistent styling and a positioned selection indicator.
 *
 * The component forwards all RadioItem props to the underlying Radix primitive, applies shared
 * dropdown item styles (focus, disabled, layout, and SVG handling), and renders a left-positioned
 * ItemIndicator containing a circle icon to denote selection.
 *
 * @returns A React element representing a styled RadioItem for use inside DropdownMenu.
 */
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

/**
 * Renders a styled label for use inside a DropdownMenu.
 *
 * @param inset - When `true`, applies left inset spacing to align the label with items that include leading icons.
 * @returns The rendered label element for placement inside a dropdown menu.
 */
function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-xs font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled horizontal separator for use inside the dropdown menu.
 *
 * @returns A horizontal separator element with dropdown-menu-specific styling and a `data-slot="dropdown-menu-separator"` attribute.
 */
function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled keyboard-like shortcut hint (<kbd>) for use inside dropdown menu items.
 *
 * @param className - Additional CSS classes merged with the component's default styling.
 * @param props - Additional span attributes passed through to the underlying element.
 * @returns A `<kbd>` element styled as a compact keyboard shortcut label.
 */
function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <kbd
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "bg-background text-muted-foreground/70 ms-auto -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a dropdown submenu root element and forwards all props to the underlying primitive while setting a `data-slot="dropdown-menu-sub"` attribute.
 *
 * @returns A React element representing the submenu root with forwarded props and the `data-slot="dropdown-menu-sub"` attribute
 */
function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

/**
 * Render a submenu trigger with a right-facing chevron and optional inset spacing.
 *
 * @param inset - When true, applies left inset padding for alignment with other inset items
 * @returns The DropdownMenu SubTrigger element containing the provided children and a chevron indicator
 */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon
        size={16}
        className="text-muted-foreground/80 ml-auto"
      />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

/**
 * Renders a styled dropdown submenu content panel and forwards all props.
 *
 * @returns The SubContent element with default dropdown submenu styling, a `data-slot="dropdown-menu-sub-content"` attribute, and any passed props applied.
 */
function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-40 overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}