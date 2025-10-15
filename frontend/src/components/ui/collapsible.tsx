import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Render a Radix Collapsible root element with a standardized `data-slot="collapsible"` attribute.
 *
 * @param props - All props are forwarded to the underlying `CollapsiblePrimitive.Root` component.
 * @returns A React element rendering the Radix Collapsible root with `data-slot="collapsible"`.
 */
function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

/**
 * Renders a Radix CollapsibleTrigger element and forwards all provided props.
 *
 * @param props - Props forwarded to the underlying CollapsibleTrigger element
 * @returns The rendered collapsible trigger element
 */
function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

/**
 * Renders Radix UI's CollapsibleContent with a `data-slot="collapsible-content"` attribute and forwards all props.
 *
 * @param props - Props to pass through to the underlying `CollapsiblePrimitive.CollapsibleContent` component
 * @returns A `CollapsiblePrimitive.CollapsibleContent` element with the `data-slot="collapsible-content"` attribute
 */
function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }