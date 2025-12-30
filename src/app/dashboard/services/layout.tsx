import PermissionRoute from "@/src/components/guards/PermissionRoute";
import { ReactNode } from "react";

interface ServicesLayoutProps {
  children: ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return <PermissionRoute permission="CREATE_SERVICE">{children}</PermissionRoute>;
}
