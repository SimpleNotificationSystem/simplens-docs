import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-600/30 dark:text-neutral-400/30",

        // Shine effect
        "animate-shiny-text bg-clip-text bg-no-repeat bg-size-[var(--shiny-width)_100%]",

        // Shine gradient
        "bg-linear-to-r from-transparent via-black dark:via-white to-transparent",

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
