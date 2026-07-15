"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type AnimatedButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
};

const sizeClasses = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-sm sm:text-base",
};

const variantClasses = {
  primary:
    "bg-gradient-to-r from-blue-500 to-sky-400 text-[#050810] shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_12px_40px_rgba(37,99,235,0.35)] hover:from-blue-400 hover:to-sky-300",
  secondary:
    "border border-blue-500/20 bg-blue-500/[0.06] text-foreground hover:border-blue-400/30 hover:bg-blue-500/10",
  ghost: "text-muted hover:text-foreground hover:bg-white/[0.05]",
};

function ButtonInner({
  children,
  variant = "primary",
  size = "md",
  className,
}: Pick<AnimatedButtonProps, "children" | "variant" | "size" | "className">) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: AnimatedButtonProps) {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.02, y: -1 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2, ease },
      };

  if (href) {
    return (
      <motion.div {...motionProps} className={cn("inline-flex", className?.includes("w-full") && "flex w-full")}>
        <Link
          href={href}
          className={cn(
            "inline-flex rounded-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30",
            className?.includes("w-full") && "w-full",
          )}
        >
          <ButtonInner variant={variant} size={size} className={cn(className, className?.includes("w-full") && "w-full")}>
            {children}
          </ButtonInner>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      {...motionProps}
      className={cn("inline-flex rounded-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30", className)}
    >
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </motion.button>
  );
}
