import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = (variant: string) => {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  switch(variant) {
    case "default": return cn(base, "border-transparent bg-primary text-primary-foreground hover:bg-primary/80");
    case "secondary": return cn(base, "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80");
    case "destructive": return cn(base, "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80");
    case "outline": return cn(base, "text-foreground");
    case "success": return cn(base, "border-transparent bg-green-500 text-white hover:bg-green-600");
    case "warning": return cn(base, "border-transparent bg-yellow-500 text-white hover:bg-yellow-600");
    default: return cn(base, "border-transparent bg-primary text-primary-foreground hover:bg-primary/80");
  }
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants(variant), className)} {...props} />
  )
}

export { Badge, badgeVariants }
