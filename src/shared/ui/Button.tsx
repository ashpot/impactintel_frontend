import { cn } from "../utils/cn";
import React from "react";

type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-text-primary01 border border-brand-primary hover:bg-brand-primary/90",
  outline:
    "bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary/5",
  ghost:
    "bg-transparent border border-transparent hover:bg-dashboard-bg",
  danger:
    "bg-transparent border border-red-500 hover:bg-red-50",
};

const sizeStyles: Record<Size, string> = {
  sm: "py-3 px-4 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2.5",
};

const Spinner = () => (
  <svg
    className="animate-spin w-4 h-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      d="M12 2a10 10 0 0 1 10 10"
      strokeLinecap="round"
    />
  </svg>
);

const Button = ({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg",
        "active:scale-95 transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        // variant + size
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
