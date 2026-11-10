import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A32]/60",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(120deg,#F5D8A8,#E8B56A_45%,#FF8A32)] text-[#17100A] shadow-[0_10px_32px_rgba(255,138,50,.2)] hover:brightness-105",
        outline:
          "border border-[rgba(232,181,106,.28)] bg-white/[0.015] text-[#F6EFE4] hover:border-[rgba(232,181,106,.5)] hover:bg-[rgba(232,181,106,.07)]",
        ghost:
          "text-[#A79C8D] hover:bg-white/[0.04] hover:text-[#F6EFE4]",
        danger:
          "border border-[rgba(226,112,90,.35)] bg-[rgba(226,112,90,.08)] text-[#E9A091] hover:bg-[rgba(226,112,90,.14)]",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-6 text-[0.82rem] uppercase tracking-[0.08em]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
