import React from "react";
import { StatCard } from "../../../components/ui/StatCard";
import { FileText, Clock, CheckCircle, XCircle, AlertTriangle, Megaphone, Users } from "lucide-react";

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Trámites"
        value="1,248"
        icon={FileText}
        trend="up"
        trendValue="+12%"
        description="vs mes anterior"
        delay={0.1}
      />
      <StatCard
        title="Trámites Pendientes"
        value="156"
        icon={Clock}
        trend="neutral"
        trendValue="Estable"
        delay={0.2}
      />
      <StatCard
        title="Trámites Aprobados"
        value="982"
        icon={CheckCircle}
        trend="up"
        trendValue="+8%"
        description="vs mes anterior"
        delay={0.3}
      />
      <StatCard
        title="Trámites Críticos"
        value="12"
        icon={AlertTriangle}
        trend="down"
        trendValue="-2"
        description="vs semana anterior"
        delay={0.4}
      />
      <StatCard
        title="Trámites Rechazados"
        value="110"
        icon={XCircle}
        trend="down"
        trendValue="-5%"
        delay={0.5}
      />
      <StatCard
        title="Convocatorias Activas"
        value="3"
        icon={Megaphone}
        delay={0.6}
      />
      <StatCard
        title="Currículos Procesados"
        value="4,520"
        icon={Users}
        trend="up"
        trendValue="+450"
        description="este mes"
        delay={0.7}
      />
    </div>
  );
};
