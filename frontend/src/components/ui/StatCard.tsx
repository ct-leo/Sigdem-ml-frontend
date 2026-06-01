import React from "react";
import { Card, CardContent } from "./Card";
import {TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
              <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
            </div>
            <div className="p-3 bg-light-bg rounded-lg">
              <Icon className="w-5 h-5 text-navy-blue" />
            </div>
          </div>
          
          {(trendValue || description) && (
            <div className="mt-4 flex items-center text-sm">
              {trend && trendValue && (
                <span
                  className={cn(
                    "flex items-center font-medium mr-2",
                    trend === "up" ? "text-dashboard-green" : trend === "down" ? "text-danger" : "text-text-secondary"
                  )}
                >
                  {trend === "up" ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : trend === "down" ? (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  ) : null}
                  {trendValue}
                </span>
              )}
              {description && (
                <span className="text-text-secondary">{description}</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
