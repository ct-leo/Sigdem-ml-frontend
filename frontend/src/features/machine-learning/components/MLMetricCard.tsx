import React from "react";
import { Card, CardContent } from "../../../components/ui/Card";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";

interface MLMetricCardProps {
  title: string;
  value: string | number;
  variation: string;
  description: string;
  icon: LucideIcon;
  color: "navy" | "green" | "gold" | "red";
  delay?: number;
}

export const MLMetricCard: React.FC<MLMetricCardProps> = ({
  title,
  value,
  variation,
  description,
  icon: Icon,
  color,
  delay = 0,
}) => {
  const isPositive = variation.startsWith("+");
  const isNeutral = variation.startsWith("0");

  const colors = {
    navy: {
      text: "text-navy-blue",
      bg: "bg-navy-blue/5 border-navy-blue/10",
      border: "border-l-navy-blue border-l-4",
    },
    green: {
      text: "text-[#749763]", // Dashboard Green
      bg: "bg-[#749763]/5 border-[#749763]/10",
      border: "border-l-[#749763] border-l-4",
    },
    gold: {
      text: "text-golden-sand",
      bg: "bg-[#D4AA45]/5 border-[#D4AA45]/10",
      border: "border-l-golden-sand border-l-4",
    },
    red: {
      text: "text-[#DC2626]",
      bg: "bg-[#DC2626]/5 border-[#DC2626]/10",
      border: "border-l-[#DC2626] border-l-4",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="h-full"
    >
      <Card className={cn("hover:shadow-md transition-all h-full overflow-hidden", colors[color].border)}>
        <CardContent className="p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                {title}
              </span>
              <div className={cn("p-2 rounded-lg border", colors[color].bg)}>
                <Icon className={cn("w-4 h-4", colors[color].text)} />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-text-primary tracking-tight">{value}</h3>
              <span
                className={cn(
                  "text-xs font-bold flex items-center",
                  isPositive ? "text-dashboard-green" : isNeutral ? "text-text-secondary" : "text-danger"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                ) : isNeutral ? null : (
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                )}
                {variation}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-text-secondary mt-3 leading-normal">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
