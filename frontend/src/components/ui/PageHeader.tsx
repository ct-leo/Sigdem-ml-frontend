import React from "react";
import { cn } from "../../lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)} {...props}>
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
};
