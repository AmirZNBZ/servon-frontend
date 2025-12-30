import ProtectedRoute from "@/src/components/guards/ProtectedRoute";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: DashboardLayoutProps) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default layout;
