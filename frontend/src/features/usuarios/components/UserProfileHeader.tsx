import React from "react";
import type { User } from "../types/user.types";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";
import { Building, Briefcase, Mail } from "lucide-react";

interface UserProfileHeaderProps {
  user: User;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
  };

  return (
    <div className="bg-white border border-border-color rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 select-none">
      {/* Big avatar circle */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-navy-blue to-[#1e4b85] text-white flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-white select-none">
          {getInitials(user.fullName)}
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 flex flex-col gap-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
          <h2 className="text-2xl font-black text-text-primary">{user.fullName}</h2>
          <div className="flex gap-2 justify-center md:justify-start flex-wrap scale-95 origin-left">
            <UserRoleBadge role={user.role} />
            <UserStatusBadge status={user.status} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 text-xs text-text-secondary font-semibold">
          <span className="flex items-center gap-1.5 justify-center md:justify-start">
            <Briefcase className="w-4 h-4 text-navy-blue" />
            {user.position}
          </span>
          <span className="flex items-center gap-1.5 justify-center md:justify-start">
            <Building className="w-4 h-4 text-[#7DAA74]" />
            {user.area}
          </span>
          <span className="flex items-center gap-1.5 justify-center md:justify-start">
            <Mail className="w-4 h-4 text-[#7DAA74]" />
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
};
