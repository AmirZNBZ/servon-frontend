"use client";

import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { ReactNode } from "react";

type PermissionRouteProps = {
  permission: string;
  children: ReactNode;
};

const PermissionRoute = ({ children, permission }: PermissionRouteProps) => {
  const { user } = useAuth();

  if (!user?.permissions.includes(permission)) {
    return (
      <div className="rounded border border-red-500 p-4 text-red-500">
        You do not have access to this page
      </div>
    );
  }

  return <>{children}</>;
};

export default PermissionRoute;
