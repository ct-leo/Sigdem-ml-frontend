import React from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  ...props
}) => {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-[#749763]/10 text-[#749763]", // Dashboard Green
    warning: "bg-[#D4AA45]/10 text-[#D4AA45]", // Golden Sand
    danger: "bg-[#DC2626]/10 text-[#DC2626]",
    info: "bg-[#163B70]/10 text-[#163B70]",    // Navy Blue
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
