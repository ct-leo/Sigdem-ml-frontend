import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { Bell, MailOpen, Mail, AlertOctagon } from "lucide-react";
import type { Notification } from "../../../stores/notifications/notification.types";

interface NotificationStatsProps {
  notifications: Notification[];
}

export const NotificationStats: React.FC<NotificationStatsProps> = ({ notifications }) => {
  const total = notifications.length;
  const unread = notifications.filter((n) => !n.read).length;
  const read = notifications.filter((n) => n.read).length;
  const critical = notifications.filter((n) => n.type === "error" || n.type === "warning").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      <StatCard title="Total Avisos" value={total} icon={Bell} delay={0.1} />
      <StatCard title="No Leídas" value={unread} icon={Mail} delay={0.2} trend={unread > 0 ? "up" : "neutral"} trendValue={unread > 0 ? `${unread} activas` : undefined} />
      <StatCard title="Leídas" value={read} icon={MailOpen} delay={0.3} />
      <StatCard title="Alertas Críticas" value={critical} icon={AlertOctagon} delay={0.4} />
    </div>
  );
};
