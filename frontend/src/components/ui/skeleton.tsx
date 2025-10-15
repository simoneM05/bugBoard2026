import { cn } from "@/lib/utils"

/**
 * Renders a skeleton placeholder div with a pulsing accent background.
 *
 * @param className - Additional CSS classes to merge with the default skeleton styles.
 * @param props - Other props forwarded to the underlying div element.
 * @returns The div element with `data-slot="skeleton"` and combined classes for skeleton styling.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }