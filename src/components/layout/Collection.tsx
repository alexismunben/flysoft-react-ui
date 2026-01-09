import React from "react";

export interface CollectionProps {
  children: React.ReactNode;
  gap?: string;
  direction?: "column" | "row";
  wrap?: boolean;
  className?: string;
}

export const Collection: React.FC<CollectionProps> = ({
  children,
  gap = "1rem",
  direction = "column",
  wrap = false,
  className = "",
}) => {
  const baseClasses = `
    flex
    font-[var(--font-default)]
  `;

  const directionClasses = {
    column: "flex-col",
    row: "flex-row",
  };

  const wrapClass = wrap ? "flex-wrap" : "flex-nowrap";

  const classes =
    `${baseClasses} ${directionClasses[direction]} ${wrapClass} ${className}`.trim();

  const style: React.CSSProperties = {
    gap: gap,
  };

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
