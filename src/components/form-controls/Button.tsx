import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children?: React.ReactNode;
}

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  children,
  className = "",
  disabled,
  onClick,
  ...props
}) => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [ripples, setRipples] = React.useState<Ripple[]>([]);

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-sm transition-colors 
    cursor-pointer relative overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed
    font-[var(--font-default)]
  `;

  const variantClasses = {
    primary: `
      bg-[var(--color-primary)] text-[var(--color-primary-contrast)] 
      hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]
    `,
    outline: `
      border border-[var(--color-primary)] text-[var(--color-primary)] 
      hover:bg-[var(--color-bg-secondary)] focus:ring-[var(--color-primary)]
    `,
    ghost: `
      text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] 
      focus:ring-[var(--color-primary)]
    `,
  };

  const sizeClasses = {
    sm: `${children ? "px-3 py-1.5" : "p-1.5"} text-sm`,
    md: `${children ? "px-4 py-2" : "p-2"} text-base`,
    lg: `${children ? "px-6 py-3" : "p-3"} text-lg`,
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const renderIcon = () => {
    if (!icon) return null;

    const iconClasses =
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

    return (
      <i
        className={`fa ${icon} ${iconClasses} ${
          children ? (iconPosition === "right" ? "ml-2" : "mr-2") : ""
        }`}
      />
    );
  };

  const rippleColor =
    variant === "primary" ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.15)";

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!disabled && !loading && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = window.performance.now();

      const newRipple: Ripple = { id, x, y, size };
      setRipples((prev) => [...prev, newRipple]);

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
    }

    onClick?.(event);
  };

  return (
    <button
      ref={buttonRef}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      <span className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full opacity-40 flysoft-button-ripple"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </span>
      <span className="relative inline-flex items-center justify-center">
        {loading && <i className="fa fa-spinner fa-spin mr-2" />}
        {icon && iconPosition === "left" && !loading && renderIcon()}
        {children}
        {icon && iconPosition === "right" && !loading && renderIcon()}
      </span>
    </button>
  );
};
