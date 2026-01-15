import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-ring/20 cursor-pointer select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-orange-500 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 hover:from-primary/90 hover:to-orange-400",
        destructive:
          "bg-gradient-to-r from-destructive to-red-600 text-white shadow-lg shadow-destructive/25 hover:shadow-xl hover:shadow-destructive/30 hover:-translate-y-0.5 focus-visible:ring-destructive/20",
        outline:
          "border-2 border-primary/20 bg-background text-foreground shadow-sm hover:bg-primary/5 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 hover:shadow-md",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:-translate-y-0.5 hover:shadow-md",
        ghost:
          "text-foreground hover:bg-accent/50 hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        glow:
          "bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 animate-pulse-subtle",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-lg gap-1.5 px-4 text-xs has-[>svg]:px-3",
        lg: "h-12 rounded-xl px-8 text-base has-[>svg]:px-5",
        xl: "h-14 rounded-2xl px-10 text-lg font-bold has-[>svg]:px-6",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
